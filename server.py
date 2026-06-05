import http.server
import socketserver
import json
import threading
import urllib.request
import urllib.parse
import time
import uuid
import os

PORT = 8080
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

# Configuration
BOT_TOKEN = "8058066110:AAGhwlsX1hNa0ycugqF3WX9A-kZGx35sMQQ"
ADMIN_ID = "5967116314"

# In-memory database (fallback)
requests_db = {}

use_firebase = False
db = None

try:
    import firebase_admin
    from firebase_admin import credentials
    from firebase_admin import firestore
    
    cred = credentials.Certificate('firebase-key.json')
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    use_firebase = True
    print("Firebase initialized successfully!", flush=True)
except Exception as e:
    print(f"Firebase initialization failed or module not found: {e}. Falling back to in-memory db.", flush=True)

def telegram_api(method, data=None):
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/{method}"
    try:
        if data:
            req = urllib.request.Request(url, data=json.dumps(data).encode('utf-8'), headers={'Content-Type': 'application/json'})
        else:
            req = urllib.request.Request(url)
        with urllib.request.urlopen(req, timeout=40) as response:
            return json.loads(response.read().decode())
    except Exception as e:
        print(f"Telegram API Error: {e}", flush=True)
        return None

def send_approval_request(req_id, phone, course_id, email=None):
    email_text = f"\n📧 البريد: <code>{email}</code>" if email else ""
    text = f"🔥 <b>طلب شراء جديد!</b>\n\n📱 الرقم المحول منه: <code>{phone}</code>{email_text}\n📚 الكورس: <b>{course_id}</b>\n\nهل تؤكد استلام الحوالة؟"
    reply_markup = {
        "inline_keyboard": [
            [
                {"text": "✅ موافق", "callback_data": f"approve_{req_id}"},
                {"text": "❌ رفض", "callback_data": f"reject_{req_id}"}
            ]
        ]
    }
    telegram_api("sendMessage", {
        "chat_id": ADMIN_ID,
        "text": text,
        "parse_mode": "HTML",
        "reply_markup": reply_markup
    })

def telegram_polling_thread():
    offset = None
    while True:
        try:
            url = f"getUpdates?timeout=30&allowed_updates=%5B%5D"
            if offset:
                url += f"&offset={offset}"
            res = telegram_api(url)
            if res and res.get('ok'):
                for update in res['result']:
                    offset = update['update_id'] + 1
                    if 'message' in update and 'text' in update['message']:
                        text = update['message']['text']
                        if text == '/users' and str(update['message']['chat']['id']) == ADMIN_ID:
                            if use_firebase:
                                try:
                                    docs = db.collection('purchases').where('status', '==', 'approved').get()
                                    msg = "👥 <b>قائمة المشتركين المفتوح لهم كورسات:</b>\n\n"
                                    for doc in docs:
                                        d = doc.to_dict()
                                        email_part = f" ({d.get('email')})" if d.get('email') else ""
                                        msg += f"📱 <code>{d.get('phone', 'Unknown')}</code>{email_part} - 📚 <b>{d.get('course_id', 'Unknown')}</b>\n"
                                    if not docs:
                                        msg += "لا يوجد مشتركين حتى الآن."
                                    telegram_api("sendMessage", {"chat_id": ADMIN_ID, "text": msg, "parse_mode": "HTML"})
                                except Exception as e:
                                    print(f"Fetch users error: {e}", flush=True)
                                    
                    if 'callback_query' in update:
                        cb = update['callback_query']
                        data = cb['data']
                        cb_id = cb['id']
                        
                        if data.startswith('approve_') or data.startswith('reject_') or data.startswith('revoke_'):
                            action = 'approved'
                            if data.startswith('reject_'):
                                action = 'rejected'
                            elif data.startswith('revoke_'):
                                action = 'revoked'
                            
                            req_id = data.replace('approve_', '').replace('reject_', '').replace('revoke_', '')
                            
                            phone = "Unknown"
                            course_id = "Unknown"
                            
                            # Update Firebase or Memory
                            if use_firebase:
                                try:
                                    doc_ref = db.collection('purchases').document(req_id)
                                    doc = doc_ref.get()
                                    if doc.exists:
                                        phone = doc.to_dict().get('phone', 'Unknown')
                                        course_id = doc.to_dict().get('course_id', 'Unknown')
                                        doc_ref.update({'status': action})
                                except Exception as e:
                                    print(f"Firestore update error: {e}", flush=True)
                            else:
                                if req_id in requests_db:
                                    phone = requests_db[req_id].get('phone', 'Unknown')
                                    course_id = requests_db[req_id].get('course_id', 'Unknown')
                                    requests_db[req_id]['status'] = action

                            if action == 'approved':
                                msg = "تمت الموافقة بنجاح!"
                                icon = "✅ تمت الموافقة"
                                reply_markup = {"inline_keyboard": [[{"text": "⛔️ سحب الصلاحية (قفل الكورس)", "callback_data": f"revoke_{req_id}"}]]}
                            elif action == 'rejected':
                                msg = "تم الرفض."
                                icon = "❌ تم الرفض"
                                reply_markup = {"inline_keyboard": []}
                            else:
                                msg = "تم سحب الصلاحية وقفل الكورس!"
                                icon = "⛔️ تم سحب الصلاحية"
                                reply_markup = {"inline_keyboard": []}
                            
                            telegram_api("answerCallbackQuery", {"callback_query_id": cb_id, "text": msg})
                            telegram_api("editMessageText", {
                                "chat_id": cb['message']['chat']['id'],
                                "message_id": cb['message']['message_id'],
                                "text": f"{icon}\nالرقم: <code>{phone}</code>\nالكورس: <b>{course_id}</b>",
                                "parse_mode": "HTML",
                                "reply_markup": reply_markup
                            })
        except Exception as e:
            print(f"Polling error: {e}", flush=True)
            time.sleep(5)
        time.sleep(1)

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store, must-revalidate')
        super().end_headers()

    def do_POST(self):
        if self.path == '/api/checkout':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            try:
                data = json.loads(post_data.decode('utf-8'))
                phone = data.get('phone')
                course_id = data.get('course_id', 'Unknown')
                device_id = data.get('device_id', 'Unknown')
                uid = data.get('uid', '')
                email = data.get('email', '')
                if not phone:
                    self.send_response(400)
                    self.end_headers()
                    self.wfile.write(b'{"error": "Phone is required"}')
                    return
                
                req_id = str(uuid.uuid4())
                
                # Save to Firebase or memory
                if use_firebase:
                    try:
                        db.collection('purchases').document(req_id).set({
                            'phone': phone,
                            'course_id': course_id,
                            'device_id': device_id,
                            'uid': uid,
                            'email': email,
                            'status': 'pending',
                            'timestamp': firestore.SERVER_TIMESTAMP
                        })
                    except Exception as e:
                        print(f"Firestore save error: {e}", flush=True)
                else:
                    requests_db[req_id] = {
                        'phone': phone,
                        'course_id': course_id,
                        'device_id': device_id,
                        'uid': uid,
                        'email': email,
                        'status': 'pending'
                    }
                
                # Send to Telegram
                send_approval_request(req_id, phone, course_id, email=email)
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"req_id": req_id}).encode('utf-8'))
            except Exception as e:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))
            return

        if self.path == '/api/notify_auth':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            try:
                data = json.loads(post_data.decode('utf-8'))
                action = data.get('action', 'login')
                method = data.get('method', 'email')
                email = data.get('email', 'Unknown')
                name = data.get('name', 'Unknown')
                phone = data.get('phone', 'Unknown')
                
                action_ar = "تسجيل دخول جديد" if action == 'login' else "إنشاء حساب جديد"
                method_ar = "البريد الإلكتروني" if method == 'email' else method.capitalize()
                
                text = f"👤 <b>{action_ar}!</b>\n\n"
                text += f"الطريقة: <b>{method_ar}</b>\n"
                text += f"الاسم: {name}\n"
                text += f"البريد: <code>{email}</code>\n"
                if phone and phone != 'Unknown':
                    text += f"الهاتف: <code>{phone}</code>\n"
                
                telegram_api("sendMessage", {
                    "chat_id": ADMIN_ID,
                    "text": text,
                    "parse_mode": "HTML"
                })
                
                self.send_response(200)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(b'{"status": "ok"}')
            except Exception as e:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode('utf-8'))
            return

    def do_GET(self):
        if self.path.startswith('/api/my_courses'):
            query = urllib.parse.urlparse(self.path).query
            params = urllib.parse.parse_qs(query)
            device_id = params.get('device_id', [None])[0]
            uid = params.get('uid', [None])[0]
            
            courses = set()
            if use_firebase:
                try:
                    if uid and uid != 'null' and uid != 'undefined':
                        docs = db.collection('purchases').where('uid', '==', uid).where('status', '==', 'approved').get()
                        for doc in docs:
                            c_id = doc.to_dict().get('course_id')
                            if c_id:
                                courses.add(c_id)
                    if device_id and device_id != 'null' and device_id != 'undefined':
                        docs = db.collection('purchases').where('device_id', '==', device_id).where('status', '==', 'approved').get()
                        for doc in docs:
                            c_id = doc.to_dict().get('course_id')
                            if c_id:
                                courses.add(c_id)
                except Exception as e:
                    print(f"Error fetching my_courses: {e}", flush=True)
            else:
                for req_id, req in requests_db.items():
                    if req.get('status') == 'approved':
                        if (uid and req.get('uid') == uid) or (device_id and req.get('device_id') == device_id):
                            c_id = req.get('course_id')
                            if c_id:
                                courses.add(c_id)
                                
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"courses": list(courses)}).encode('utf-8'))
            return
            
        if self.path.startswith('/api/status'):
            query = urllib.parse.urlparse(self.path).query
            params = urllib.parse.parse_qs(query)
            req_id = params.get('id', [None])[0]
            
            if req_id:
                status = None
                if use_firebase:
                    try:
                        doc = db.collection('purchases').document(req_id).get()
                        if doc.exists:
                            status = doc.to_dict().get('status', 'pending')
                        elif req_id in requests_db:
                            status = requests_db[req_id]['status']
                    except Exception as e:
                        if req_id in requests_db:
                            status = requests_db[req_id]['status']
                else:
                    if req_id in requests_db:
                        status = requests_db[req_id]['status']
                
                if status:
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({"status": status}).encode('utf-8'))
                    return
            
            self.send_response(404)
            self.end_headers()
            self.wfile.write(b'{"error": "Not found"}')
            return
        
        # Serve static files normally
        return super().do_GET()

if __name__ == "__main__":
    t = threading.Thread(target=telegram_polling_thread, daemon=True)
    t.start()
    
    with socketserver.TCPServer(("", PORT), CustomHandler) as httpd:
        print(f"Serving at port {PORT}", flush=True)
        httpd.serve_forever()
