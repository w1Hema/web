// course-player.js - AETHER ACADEMY PREMIUM INTERACTIVE LOGIC

document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    initAnimatedBackground();

    // Secure course access via LocalStorage
    const urlParams = new URLSearchParams(window.location.search);
    const currentCourse = urlParams.get('course') || 'programming';

    if (localStorage.getItem(`unlocked_${currentCourse}`) === 'true') {
        // Access Granted
        initCoursePlayer();
    } else {
        // Access Denied
        alert(document.documentElement.lang === 'ar' ? 'عذراً، لم تقم بشراء هذا الكورس أو أنك تستخدم جهازاً مختلفاً.' : 'Sorry, you have not purchased this course or are using a different device.');
        window.location.href = 'index.html';
    }
});

window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 800);
    }
});

// --- 1. Ambient Animated Background ---
function initAnimatedBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let width, height;
    let particles = [];
    
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    
    window.addEventListener('resize', resize);
    resize();
    
    class Particle {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.4;
            this.speedY = (Math.random() - 0.5) * 0.4;
            this.opacity = Math.random() * 0.4 + 0.1;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > width) this.speedX *= -1;
            if (this.y < 0 || this.y > height) this.speedY *= -1;
        }
        
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(139, 92, 246, ${this.opacity})`;
            ctx.fill();
        }
    }
    
    function initParticles() {
        particles = [];
        const particleCount = Math.min(Math.floor(width * height / 20000), 80);
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, width, height);
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(139, 92, 246, ${0.12 - distance / 1000})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    initParticles();
    animate();
}

// --- 2. Course Curriculum Data ---
// --- Detect which course from URL parameter ---
const urlParams = new URLSearchParams(window.location.search);
const currentCourse = urlParams.get('course') || 'programming';

// --- Course Configurations ---
const allCourses = {
    programming: {
        title: "تأسيس البرمجة الشامل",
        storageKey: "programming_course_progress",
        curriculum: [
            {
                moduleTitle: "الوحدة الأولى: أساسيات البرمجة بلغة C++",
                lessons: [
                    { id: "v1", title: "المقدمة الشاملة لتأسيس بيئة العمل", duration: "10:15", videoId: "9ndH9Qo05F4", desc: "شرح كامل لأهمية اللغة وكيفية تثبيت بيئة العمل الصحيحة." },
                    { id: "v2", title: "هيكلة البرنامج وأنواع البيانات (Data Types)", duration: "14:20", videoId: "FMSOoWQR92I", desc: "تعرف على الهيكل الأساسي للبرنامج وأنواع البيانات المتاحة في C++." },
                    { id: "v3", title: "إتقان المتغيرات والثوابت البرمجية", duration: "08:45", videoId: "3uBCZOGbUIA", desc: "كيفية تعريف وتخزين البيانات المتغيرة والثابتة في الذاكرة." },
                    { id: "v4", title: "المعاملات الحسابية والمنطقية (Operators)", duration: "12:10", videoId: "NU_IdBZq1qc", desc: "استخدام العوامل الحسابية لإجراء العمليات المعقدة والمنطقية." },
                    { id: "v5", title: "الجمل الشرطية المتقدمة (If, Switch)", duration: "15:30", videoId: "a-uNI6ADrL0", desc: "بناء منطق البرنامج القادر على اتخاذ القرارات حسب المدخلات." },
                    { id: "v6", title: "حلقات التكرار وبناء الخوارزميات (Loops)", duration: "11:50", videoId: "lui_SjvGl2I", desc: "شرح حلقات for و while و do-while وتطبيقاتها العملية." },
                    { id: "v7", title: "المصفوفات ومعالجة البيانات (Arrays)", duration: "16:05", videoId: "C6Rl3nGIqIM", desc: "تخزين سلاسل البيانات المترابطة داخل المصفوفات وكيفية معالجتها." },
                    { id: "v8", title: "الدوال البرمجية وأساسيات إعادة الاستخدام", duration: "13:25", videoId: "lox_MKNB1OE", desc: "تعلم مبدأ تقسيم الكود باستخدام الدوال Functions واستدعائها." },
                    { id: "v9", title: "المؤشرات وإدارة الذاكرة (Pointers)", duration: "18:40", videoId: "YdzcQUbSbQ4", desc: "أقوى ميزة في C++: التحكم المباشر بمساحات الذاكرة عبر المؤشرات." },
                    { id: "v10", title: "مبادئ البرمجة كائنية التوجه (OOP)", duration: "21:15", videoId: "BW2S_C5S7_k", desc: "مقدمة لعالم البرمجة كائنية التوجه، الكائنات والفئات." }
                ]
            }
        ]
    },
    ai: {
        title: "أساسيات الذكاء الاصطناعي",
        storageKey: "ai_course_progress",
        curriculum: [
            {
                moduleTitle: "الوحدة الأولى: مدخل إلى عالم الذكاء الاصطناعي",
                lessons: [
                    { id: "ai1", title: "ما هو الذكاء الاصطناعي؟ مقدمة شاملة", duration: "12:30", videoId: "aircAruvnKk", desc: "تعريف الذكاء الاصطناعي وتاريخه وأهم تطبيقاته في حياتنا اليومية." },
                    { id: "ai2", title: "أنواع الذكاء الاصطناعي والتعلم الآلي", duration: "15:45", videoId: "mJeNghZXtMo", desc: "الفرق بين AI و ML و Deep Learning وكيف يعمل كل نوع." },
                    { id: "ai3", title: "الشبكات العصبية الاصطناعية Neural Networks", duration: "18:20", videoId: "0QczhVg5HaI", desc: "كيف تحاكي الشبكات العصبية طريقة تفكير الدماغ البشري." },
                    { id: "ai4", title: "التعلم العميق Deep Learning من الصفر", duration: "22:10", videoId: "6M5VXKLf4D4", desc: "فهم طبقات التعلم العميق وكيفية تدريب النماذج المعقدة." },
                    { id: "ai5", title: "معالجة اللغات الطبيعية NLP", duration: "16:35", videoId: "CMrHM8a3hqw", desc: "كيف يفهم الكمبيوتر اللغة البشرية ويحللها ويستجيب لها." },
                    { id: "ai6", title: "الرؤية الحاسوبية Computer Vision", duration: "14:50", videoId: "OcycT1Jwsns", desc: "تعليم الآلة رؤية وفهم الصور والفيديوهات تلقائياً." },
                    { id: "ai7", title: "تطبيقات عملية: ChatGPT وبناء البوتات", duration: "19:15", videoId: "s_LmC-ynqGM", desc: "بناء تطبيقات ذكاء اصطناعي عملية باستخدام أدوات حديثة." },
                    { id: "ai8", title: "أخلاقيات الذكاء الاصطناعي ومستقبله", duration: "11:40", videoId: "UwsrzCVZAb8", desc: "التحديات الأخلاقية والمستقبل المتوقع لتقنيات الذكاء الاصطناعي." },
                    { id: "ai9", title: "مشروع عملي: بناء نموذج تصنيف صور", duration: "25:00", videoId: "tPYj3fFJGjk", desc: "تطبيق عملي شامل لبناء نموذج ذكاء اصطناعي يصنف الصور." },
                    { id: "ai10", title: "خارطة طريق احتراف الذكاء الاصطناعي", duration: "13:55", videoId: "JMUxmLyrhSk", desc: "الخطة الكاملة لتعلم الذكاء الاصطناعي من المبتدئ للمحترف." }
                ]
            }
        ]
    },
    networks: {
        title: "أساسيات شبكات الحاسوب",
        storageKey: "networks_course_progress",
        curriculum: [
            {
                moduleTitle: "الوحدة الأولى: مدخل إلى عالم الشبكات",
                lessons: [
                    { id: "net1", title: "مقدمة في شبكات الحاسوب وأنواعها", duration: "11:20", videoId: "sMHzfigUxz4", desc: "تعرف على مفهوم الشبكات وأنواعها LAN, WAN, MAN وأهميتها." },
                    { id: "net2", title: "نموذج OSI السبع طبقات بالتفصيل", duration: "18:45", videoId: "A31bxOyj5mk", desc: "شرح مفصل لطبقات نموذج OSI السبعة ووظيفة كل طبقة." },
                    { id: "net3", title: "بروتوكول TCP/IP والإنترنت", duration: "15:30", videoId: "PpsEaqJV_A0", desc: "كيف يعمل بروتوكول TCP/IP وكيف تنتقل البيانات عبر الإنترنت." },
                    { id: "net4", title: "عنونة IP وتقسيم الشبكات Subnetting", duration: "20:15", videoId: "ecCuyq-Wpjc", desc: "فهم عناوين IPv4 وكيفية تقسيم الشبكات الفرعية." },
                    { id: "net5", title: "أجهزة الشبكات: Router, Switch, Hub", duration: "13:40", videoId: "1z0ULvg_pW8", desc: "الفرق بين أجهزة الشبكات المختلفة ووظائفها." },
                    { id: "net6", title: "نظام DNS وكيف يعمل الإنترنت", duration: "14:25", videoId: "27r4Bzuj5NQ", desc: "كيف يتم تحويل أسماء المواقع إلى عناوين IP عبر نظام DNS." },
                    { id: "net7", title: "أمن الشبكات والجدران النارية Firewall", duration: "17:50", videoId: "hExRDVZHhig", desc: "حماية الشبكات من الاختراق وأساسيات الأمن السيبراني." },
                    { id: "net8", title: "الشبكات اللاسلكية WiFi وبروتوكولاتها", duration: "12:35", videoId: "Uz-RTurph3c", desc: "تقنيات الاتصال اللاسلكي ومعايير WiFi المختلفة." },
                    { id: "net9", title: "إعداد شبكة عملية من الصفر", duration: "22:00", videoId: "QKfk7YFILws", desc: "تطبيق عملي لبناء وإعداد شبكة محلية كاملة خطوة بخطوة." },
                    { id: "net10", title: "شهادة CCNA: خارطة الطريق الاحترافية", duration: "16:10", videoId: "rv3QK2UquxM", desc: "كيف تبدأ رحلتك نحو احتراف الشبكات وشهادة CCNA." }
                ]
            }
        ]
    },
    webdev: {
        title: "تطوير الويب الشامل",
        storageKey: "webdev_course_progress",
        curriculum: [{
            moduleTitle: "الوحدة الأولى: أساسيات تطوير الويب",
            lessons: [
                { id: "wd1", title: "مقدمة في تطوير الويب وكيف يعمل الإنترنت", duration: "14:30", videoId: "Q_AcOkuLxGo", desc: "فهم كيفية عمل الإنترنت والمتصفحات وأساسيات تطوير المواقع." },
                { id: "wd2", title: "أساسيات HTML5 وبناء الصفحات", duration: "18:20", videoId: "6QAELgirvjs", desc: "تعلم هيكلة صفحات الويب باستخدام عناصر HTML5 الحديثة." },
                { id: "wd3", title: "تنسيق المواقع باستخدام CSS3", duration: "16:45", videoId: "Z-5QVutAEW4", desc: "إتقان التنسيق والتصميم المرئي للمواقع باستخدام CSS3." },
                { id: "wd4", title: "التصميم المتجاوب Responsive Design", duration: "13:10", videoId: "K24lUqcT0Ms", desc: "جعل الموقع يعمل بشكل مثالي على جميع الأجهزة والشاشات." },
                { id: "wd5", title: "أساسيات JavaScript للمبتدئين", duration: "20:30", videoId: "eKuNnpWhm7c", desc: "تعلم لغة JavaScript لإضافة التفاعل والديناميكية للمواقع." },
                { id: "wd6", title: "التعامل مع DOM والأحداث", duration: "15:55", videoId: "XQsX-lWjkmI", desc: "التحكم في عناصر الصفحة والتفاعل مع المستخدم عبر JavaScript." },
                { id: "wd7", title: "مكتبة React.js من الصفر", duration: "22:40", videoId: "h8BCNI_dWEI", desc: "بناء واجهات مستخدم تفاعلية حديثة باستخدام React.js." },
                { id: "wd8", title: "إنشاء API باستخدام Node.js", duration: "19:15", videoId: "GEiovaUGh_I", desc: "بناء خوادم ويب وواجهات برمجية باستخدام Node.js و Express." },
                { id: "wd9", title: "قواعد البيانات MongoDB للويب", duration: "17:30", videoId: "4yqu8YF29cU", desc: "تخزين واسترجاع البيانات باستخدام MongoDB و Mongoose." },
                { id: "wd10", title: "نشر المواقع على الإنترنت Deployment", duration: "12:45", videoId: "b61WP5yCtSM", desc: "رفع ونشر مشروعك على الإنترنت باستخدام أدوات حديثة." }
            ]
        }]
    },
    cybersecurity: {
        title: "الأمن السيبراني",
        storageKey: "cybersec_course_progress",
        curriculum: [{
            moduleTitle: "الوحدة الأولى: أساسيات الأمن السيبراني",
            lessons: [
                { id: "cs1", title: "مقدمة في الأمن السيبراني وأهميته", duration: "11:20", videoId: "sMHzfigUxz4", desc: "فهم أهمية الأمن السيبراني في العصر الرقمي والتهديدات الحالية." },
                { id: "cs2", title: "أنواع الهجمات السيبرانية الشائعة", duration: "15:40", videoId: "A31bxOyj5mk", desc: "التعرف على هجمات التصيد والبرمجيات الخبيثة وهجمات DDoS." },
                { id: "cs3", title: "أساسيات التشفير Cryptography", duration: "18:30", videoId: "PpsEaqJV_A0", desc: "فهم مبادئ التشفير المتماثل وغير المتماثل وتطبيقاتها." },
                { id: "cs4", title: "أمن الشبكات وجدران الحماية", duration: "14:55", videoId: "ecCuyq-Wpjc", desc: "حماية الشبكات باستخدام Firewall و IDS/IPS." },
                { id: "cs5", title: "اختبار الاختراق Penetration Testing", duration: "20:15", videoId: "1z0ULvg_pW8", desc: "أدوات ومنهجيات اختبار الاختراق الأخلاقي." },
                { id: "cs6", title: "أمن تطبيقات الويب OWASP", duration: "16:40", videoId: "27r4Bzuj5NQ", desc: "حماية تطبيقات الويب من ثغرات OWASP Top 10." },
                { id: "cs7", title: "التحقيق الرقمي Digital Forensics", duration: "13:25", videoId: "hExRDVZHhig", desc: "أساسيات التحقيق الجنائي الرقمي وتتبع الأدلة الإلكترونية." },
                { id: "cs8", title: "أمن الأنظمة والسيرفرات", duration: "17:50", videoId: "Uz-RTurph3c", desc: "تأمين أنظمة التشغيل والخوادم ضد الاختراقات." },
                { id: "cs9", title: "إدارة المخاطر الأمنية", duration: "12:30", videoId: "QKfk7YFILws", desc: "تقييم وإدارة المخاطر الأمنية في المؤسسات." },
                { id: "cs10", title: "شهادات الأمن السيبراني وخارطة الطريق", duration: "10:45", videoId: "rv3QK2UquxM", desc: "دليلك لشهادات CEH و CompTIA Security+ و CISSP." }
            ]
        }]
    },
    mobile: {
        title: "تطوير تطبيقات الموبايل",
        storageKey: "mobile_course_progress",
        curriculum: [{
            moduleTitle: "الوحدة الأولى: بناء تطبيقات الهاتف",
            lessons: [
                { id: "mb1", title: "مقدمة في تطوير تطبيقات الموبايل", duration: "10:30", videoId: "9ndH9Qo05F4", desc: "نظرة عامة على منصات تطوير التطبيقات المختلفة." },
                { id: "mb2", title: "أساسيات Flutter و Dart", duration: "16:20", videoId: "FMSOoWQR92I", desc: "تعلم إطار عمل Flutter ولغة Dart لبناء تطبيقات متعددة المنصات." },
                { id: "mb3", title: "بناء واجهات مستخدم Widgets", duration: "14:45", videoId: "3uBCZOGbUIA", desc: "تصميم واجهات مستخدم جذابة باستخدام Widgets في Flutter." },
                { id: "mb4", title: "إدارة الحالة State Management", duration: "18:10", videoId: "NU_IdBZq1qc", desc: "إدارة حالة التطبيق باستخدام Provider و Riverpod." },
                { id: "mb5", title: "التنقل والتوجيه Navigation", duration: "12:30", videoId: "a-uNI6ADrL0", desc: "إنشاء شاشات متعددة والتنقل بينها بسلاسة." },
                { id: "mb6", title: "الاتصال بالـ API والبيانات", duration: "15:55", videoId: "lui_SjvGl2I", desc: "جلب وعرض البيانات من الإنترنت في تطبيقك." },
                { id: "mb7", title: "التخزين المحلي SQLite", duration: "13:40", videoId: "C6Rl3nGIqIM", desc: "حفظ البيانات محلياً في الهاتف باستخدام SQLite." },
                { id: "mb8", title: "الإشعارات Push Notifications", duration: "11:25", videoId: "lox_MKNB1OE", desc: "إرسال واستقبال الإشعارات في تطبيقات الموبايل." },
                { id: "mb9", title: "نشر التطبيق على Google Play", duration: "16:50", videoId: "YdzcQUbSbQ4", desc: "خطوات نشر تطبيقك على متجر جوجل بلاي." },
                { id: "mb10", title: "نشر التطبيق على App Store", duration: "14:15", videoId: "BW2S_C5S7_k", desc: "خطوات نشر تطبيقك على متجر آبل ستور." }
            ]
        }]
    },
    database: {
        title: "قواعد البيانات الاحترافية",
        storageKey: "database_course_progress",
        curriculum: [{
            moduleTitle: "الوحدة الأولى: إتقان قواعد البيانات",
            lessons: [
                { id: "db1", title: "مقدمة في قواعد البيانات وأنواعها", duration: "12:30", videoId: "Q_AcOkuLxGo", desc: "فهم مفهوم قواعد البيانات العلائقية وغير العلائقية." },
                { id: "db2", title: "تصميم قواعد البيانات ER Diagram", duration: "16:45", videoId: "6QAELgirvjs", desc: "رسم مخططات الكيانات والعلاقات لتصميم قاعدة بيانات احترافية." },
                { id: "db3", title: "أساسيات SQL وأوامر الاستعلام", duration: "18:20", videoId: "Z-5QVutAEW4", desc: "كتابة استعلامات SELECT, INSERT, UPDATE, DELETE." },
                { id: "db4", title: "الاستعلامات المتقدمة JOIN", duration: "15:10", videoId: "K24lUqcT0Ms", desc: "ربط الجداول باستخدام أنواع JOIN المختلفة." },
                { id: "db5", title: "الفهارس والأداء Indexing", duration: "13:40", videoId: "eKuNnpWhm7c", desc: "تحسين أداء قواعد البيانات باستخدام الفهارس." },
                { id: "db6", title: "الإجراءات المخزنة Stored Procedures", duration: "14:55", videoId: "XQsX-lWjkmI", desc: "كتابة إجراءات مخزنة لأتمتة العمليات المعقدة." },
                { id: "db7", title: "MySQL من الصفر للاحتراف", duration: "20:30", videoId: "h8BCNI_dWEI", desc: "تثبيت وإدارة قاعدة بيانات MySQL بشكل عملي." },
                { id: "db8", title: "PostgreSQL والميزات المتقدمة", duration: "17:15", videoId: "GEiovaUGh_I", desc: "استخدام PostgreSQL وميزاتها المتقدمة في المشاريع." },
                { id: "db9", title: "MongoDB وقواعد البيانات NoSQL", duration: "15:40", videoId: "4yqu8YF29cU", desc: "التعامل مع قواعد البيانات غير العلائقية MongoDB." },
                { id: "db10", title: "النسخ الاحتياطي والأمان Database Security", duration: "11:25", videoId: "b61WP5yCtSM", desc: "حماية قواعد البيانات والنسخ الاحتياطي والاسترجاع." }
            ]
        }]
    },
    cloud: {
        title: "الحوسبة السحابية",
        storageKey: "cloud_course_progress",
        curriculum: [{
            moduleTitle: "الوحدة الأولى: أساسيات الحوسبة السحابية",
            lessons: [
                { id: "cl1", title: "ما هي الحوسبة السحابية Cloud Computing", duration: "11:20", videoId: "aircAruvnKk", desc: "فهم مفهوم السحابة وأنواع الخدمات IaaS, PaaS, SaaS." },
                { id: "cl2", title: "مقدمة في AWS Amazon Web Services", duration: "17:40", videoId: "mJeNghZXtMo", desc: "استكشاف خدمات أمازون السحابية الأساسية." },
                { id: "cl3", title: "Microsoft Azure للمبتدئين", duration: "15:30", videoId: "0QczhVg5HaI", desc: "التعرف على منصة مايكروسوفت أزور وخدماتها." },
                { id: "cl4", title: "Google Cloud Platform", duration: "14:55", videoId: "6M5VXKLf4D4", desc: "استكشاف منصة جوجل السحابية وأدواتها." },
                { id: "cl5", title: "الخوادم الافتراضية Virtual Machines", duration: "16:20", videoId: "CMrHM8a3hqw", desc: "إنشاء وإدارة الخوادم الافتراضية في السحابة." },
                { id: "cl6", title: "التخزين السحابي Storage Solutions", duration: "12:45", videoId: "OcycT1Jwsns", desc: "حلول التخزين السحابي S3, Blob Storage, Cloud Storage." },
                { id: "cl7", title: "الشبكات السحابية VPC", duration: "18:10", videoId: "s_LmC-ynqGM", desc: "إعداد الشبكات الافتراضية الخاصة في السحابة." },
                { id: "cl8", title: "Serverless Computing بدون خوادم", duration: "13:35", videoId: "UwsrzCVZAb8", desc: "بناء تطبيقات بدون إدارة خوادم باستخدام Lambda و Functions." },
                { id: "cl9", title: "Docker والحاويات في السحابة", duration: "20:00", videoId: "tPYj3fFJGjk", desc: "استخدام Docker لنشر التطبيقات في بيئة سحابية." },
                { id: "cl10", title: "شهادة AWS وخارطة الطريق", duration: "10:50", videoId: "JMUxmLyrhSk", desc: "التحضير لشهادة AWS Cloud Practitioner." }
            ]
        }]
    },
    datascience: {
        title: "علم البيانات والتحليل",
        storageKey: "datascience_course_progress",
        curriculum: [{
            moduleTitle: "الوحدة الأولى: أساسيات علم البيانات",
            lessons: [
                { id: "ds1", title: "مقدمة في علم البيانات Data Science", duration: "13:30", videoId: "9ndH9Qo05F4", desc: "ما هو علم البيانات ولماذا هو المجال الأكثر طلباً في العالم." },
                { id: "ds2", title: "Python لعلم البيانات", duration: "18:20", videoId: "FMSOoWQR92I", desc: "أساسيات بايثون المطلوبة لتحليل البيانات." },
                { id: "ds3", title: "مكتبة Pandas لمعالجة البيانات", duration: "16:45", videoId: "3uBCZOGbUIA", desc: "تحميل وتنظيف ومعالجة البيانات باستخدام Pandas." },
                { id: "ds4", title: "التحليل الإحصائي Statistics", duration: "15:10", videoId: "NU_IdBZq1qc", desc: "المفاهيم الإحصائية الأساسية لفهم البيانات." },
                { id: "ds5", title: "تصور البيانات Matplotlib و Seaborn", duration: "14:40", videoId: "a-uNI6ADrL0", desc: "رسم المخططات والرسوم البيانية لفهم البيانات بصرياً." },
                { id: "ds6", title: "التعلم الآلي Machine Learning", duration: "20:30", videoId: "lui_SjvGl2I", desc: "مقدمة في خوارزميات التعلم الآلي وتطبيقاتها." },
                { id: "ds7", title: "مكتبة Scikit-Learn للتعلم الآلي", duration: "17:15", videoId: "C6Rl3nGIqIM", desc: "بناء نماذج تعلم آلي عملية باستخدام Scikit-Learn." },
                { id: "ds8", title: "تنظيف البيانات Data Cleaning", duration: "12:50", videoId: "lox_MKNB1OE", desc: "تقنيات تنظيف البيانات المفقودة والمكررة والشاذة." },
                { id: "ds9", title: "مشروع تحليل بيانات متكامل", duration: "22:00", videoId: "YdzcQUbSbQ4", desc: "مشروع عملي شامل لتحليل مجموعة بيانات حقيقية." },
                { id: "ds10", title: "خارطة طريق عالم البيانات", duration: "11:25", videoId: "BW2S_C5S7_k", desc: "الخطة الكاملة لتصبح عالم بيانات محترف." }
            ]
        }]
    },
    linux: {
        title: "إدارة نظام لينكس",
        storageKey: "linux_course_progress",
        curriculum: [{
            moduleTitle: "الوحدة الأولى: إتقان نظام لينكس",
            lessons: [
                { id: "lx1", title: "مقدمة في نظام لينكس وتوزيعاته", duration: "12:30", videoId: "Q_AcOkuLxGo", desc: "تعرف على نظام لينكس وأشهر التوزيعات Ubuntu, CentOS, Kali." },
                { id: "lx2", title: "تثبيت لينكس وإعداد البيئة", duration: "15:40", videoId: "6QAELgirvjs", desc: "تثبيت أوبونتو بجانب ويندوز أو على جهاز افتراضي." },
                { id: "lx3", title: "أوامر الطرفية الأساسية Terminal", duration: "18:20", videoId: "Z-5QVutAEW4", desc: "إتقان أوامر ls, cd, cp, mv, rm, mkdir وغيرها." },
                { id: "lx4", title: "إدارة الملفات والصلاحيات Permissions", duration: "14:55", videoId: "K24lUqcT0Ms", desc: "فهم نظام صلاحيات الملفات chmod, chown, chgrp." },
                { id: "lx5", title: "إدارة المستخدمين والمجموعات", duration: "11:40", videoId: "eKuNnpWhm7c", desc: "إنشاء وإدارة حسابات المستخدمين والمجموعات." },
                { id: "lx6", title: "إدارة الحزم والبرامج apt/yum", duration: "13:25", videoId: "XQsX-lWjkmI", desc: "تثبيت وتحديث وإزالة البرامج في لينكس." },
                { id: "lx7", title: "Bash Scripting أتمتة المهام", duration: "20:30", videoId: "h8BCNI_dWEI", desc: "كتابة سكربتات Bash لأتمتة المهام اليومية." },
                { id: "lx8", title: "إدارة الشبكات في لينكس", duration: "16:15", videoId: "GEiovaUGh_I", desc: "إعداد الشبكات وحل مشاكل الاتصال في لينكس." },
                { id: "lx9", title: "إعداد خادم ويب Apache/Nginx", duration: "17:50", videoId: "4yqu8YF29cU", desc: "تثبيت وإعداد خوادم الويب على لينكس." },
                { id: "lx10", title: "شهادة LPIC وخارطة الطريق", duration: "10:45", videoId: "b61WP5yCtSM", desc: "التحضير لشهادة Linux LPIC-1 الاحترافية." }
            ]
        }]
    },
    python: {
        title: "برمجة بايثون الشاملة",
        storageKey: "python_course_progress",
        curriculum: [{
            moduleTitle: "الوحدة الأولى: إتقان لغة بايثون",
            lessons: [
                { id: "py1", title: "لماذا بايثون؟ وتثبيت بيئة العمل", duration: "10:30", videoId: "aircAruvnKk", desc: "أهمية لغة بايثون وتثبيت Python و VS Code." },
                { id: "py2", title: "المتغيرات وأنواع البيانات في بايثون", duration: "14:20", videoId: "mJeNghZXtMo", desc: "فهم المتغيرات و strings, int, float, bool, list." },
                { id: "py3", title: "الشروط والحلقات التكرارية", duration: "16:45", videoId: "0QczhVg5HaI", desc: "if/elif/else و for/while loops بالتفصيل." },
                { id: "py4", title: "الدوال Functions في بايثون", duration: "13:10", videoId: "6M5VXKLf4D4", desc: "إنشاء واستدعاء الدوال ومفهوم Parameters و Return." },
                { id: "py5", title: "القوائم والقواميس Lists & Dicts", duration: "15:30", videoId: "CMrHM8a3hqw", desc: "هياكل البيانات الأساسية في بايثون وتطبيقاتها." },
                { id: "py6", title: "البرمجة كائنية التوجه OOP", duration: "18:40", videoId: "OcycT1Jwsns", desc: "Classes, Objects, Inheritance, Polymorphism في بايثون." },
                { id: "py7", title: "التعامل مع الملفات File I/O", duration: "11:25", videoId: "s_LmC-ynqGM", desc: "قراءة وكتابة الملفات النصية و CSV و JSON." },
                { id: "py8", title: "معالجة الأخطاء Try/Except", duration: "12:50", videoId: "UwsrzCVZAb8", desc: "التعامل مع الأخطاء البرمجية بطريقة احترافية." },
                { id: "py9", title: "مكتبات بايثون الأساسية", duration: "17:15", videoId: "tPYj3fFJGjk", desc: "استخدام os, sys, datetime, random, math وغيرها." },
                { id: "py10", title: "مشروع بايثون متكامل", duration: "22:00", videoId: "JMUxmLyrhSk", desc: "بناء مشروع عملي شامل من الصفر باستخدام بايثون." }
            ]
        }]
    },
    uiux: {
        title: "تصميم واجهات المستخدم UI/UX",
        storageKey: "uiux_course_progress",
        curriculum: [{
            moduleTitle: "الوحدة الأولى: أساسيات التصميم الاحترافي",
            lessons: [
                { id: "ux1", title: "مقدمة في تصميم UI/UX", duration: "11:30", videoId: "sMHzfigUxz4", desc: "الفرق بين UI و UX وأهمية كل منهما." },
                { id: "ux2", title: "مبادئ التصميم المرئي", duration: "14:20", videoId: "A31bxOyj5mk", desc: "الألوان والخطوط والتباعد والتسلسل الهرمي البصري." },
                { id: "ux3", title: "أساسيات Figma من الصفر", duration: "18:45", videoId: "PpsEaqJV_A0", desc: "تعلم أداة Figma لتصميم الواجهات الاحترافية." },
                { id: "ux4", title: "أبحاث المستخدم User Research", duration: "13:10", videoId: "ecCuyq-Wpjc", desc: "فهم احتياجات المستخدمين وتحليل سلوكهم." },
                { id: "ux5", title: "إنشاء Wireframes والنماذج الأولية", duration: "15:40", videoId: "1z0ULvg_pW8", desc: "رسم الهياكل الأولية للواجهات قبل التصميم النهائي." },
                { id: "ux6", title: "تصميم تطبيقات الموبايل", duration: "16:55", videoId: "27r4Bzuj5NQ", desc: "تصميم واجهات تطبيقات iOS و Android باحترافية." },
                { id: "ux7", title: "أنظمة التصميم Design Systems", duration: "14:25", videoId: "hExRDVZHhig", desc: "بناء نظام تصميم موحد للمشاريع الكبيرة." },
                { id: "ux8", title: "الأنيميشن والتفاعل Micro-interactions", duration: "12:30", videoId: "Uz-RTurph3c", desc: "إضافة حركات تفاعلية تحسن تجربة المستخدم." },
                { id: "ux9", title: "اختبار قابلية الاستخدام Usability Testing", duration: "11:45", videoId: "QKfk7YFILws", desc: "اختبار التصميم مع المستخدمين الحقيقيين وتحسينه." },
                { id: "ux10", title: "بناء Portfolio احترافي", duration: "13:15", videoId: "rv3QK2UquxM", desc: "إنشاء معرض أعمال احترافي يجذب أصحاب العمل." }
            ]
        }]
    },
    devops: {
        title: "DevOps والأتمتة",
        storageKey: "devops_course_progress",
        curriculum: [{
            moduleTitle: "الوحدة الأولى: أساسيات DevOps",
            lessons: [
                { id: "do1", title: "ما هو DevOps ولماذا هو مهم", duration: "12:30", videoId: "9ndH9Qo05F4", desc: "فهم فلسفة DevOps ودورها في تسريع تطوير البرمجيات." },
                { id: "do2", title: "نظام التحكم بالإصدارات Git", duration: "16:20", videoId: "FMSOoWQR92I", desc: "إتقان Git و GitHub لإدارة الكود المصدري." },
                { id: "do3", title: "Docker والحاويات من الصفر", duration: "20:45", videoId: "3uBCZOGbUIA", desc: "بناء وتشغيل التطبيقات داخل حاويات Docker." },
                { id: "do4", title: "Kubernetes لإدارة الحاويات", duration: "18:10", videoId: "NU_IdBZq1qc", desc: "نشر وإدارة التطبيقات على نطاق واسع مع K8s." },
                { id: "do5", title: "CI/CD Pipeline التكامل المستمر", duration: "15:30", videoId: "a-uNI6ADrL0", desc: "بناء خطوط أنابيب التكامل والنشر المستمر." },
                { id: "do6", title: "Jenkins لأتمتة البناء", duration: "14:40", videoId: "lui_SjvGl2I", desc: "استخدام Jenkins لأتمتة عمليات البناء والاختبار." },
                { id: "do7", title: "Terraform و Infrastructure as Code", duration: "17:25", videoId: "C6Rl3nGIqIM", desc: "إدارة البنية التحتية ككود باستخدام Terraform." },
                { id: "do8", title: "المراقبة Monitoring مع Prometheus", duration: "13:50", videoId: "lox_MKNB1OE", desc: "مراقبة أداء التطبيقات والخوادم في الوقت الحقيقي." },
                { id: "do9", title: "Ansible لأتمتة الإعدادات", duration: "15:15", videoId: "YdzcQUbSbQ4", desc: "أتمتة إعداد الخوادم والتطبيقات باستخدام Ansible." },
                { id: "do10", title: "خارطة طريق مهندس DevOps", duration: "11:30", videoId: "BW2S_C5S7_k", desc: "الخطة الشاملة لتصبح مهندس DevOps محترف." }
            ]
        }]
    }
};

// --- Select current course data ---
const courseData = allCourses[currentCourse] || allCourses.programming;
const courseCurriculum = courseData.curriculum;

// --- Update page title and header badge ---
document.title = courseData.title + " | ET3ALAMT";
const courseTitleBadge = document.querySelector('.nav-course-title-badge span');
if (courseTitleBadge) courseTitleBadge.textContent = courseData.title;

// --- 3. Cumulative Exams Data ---
const quizzesData = [
    {
        id: "quiz1",
        title: "الاختبار 1: المفاهيم الأساسية للبرمجة والكمبيوتر",
        reqCount: 5,
        questions: [
            { q: "ما هي وظيفة المترجم (Compiler)؟", options: ["تحويل لغات البرمجة عالية المستوى إلى لغة الآلة الثنائية (Binary)", "تصميم الواجهات الرسومية للتطبيقات", "تشغيل الكمبيوتر والقطع المادية"], correct: 0 },
            { q: "أي مما يلي يعتبر وصفاً صحيحاً للمفهوم البرمجي 'الخوارزمية'؟", options: ["كتابة الكود بأي لغة برمجة", "سلسلة خطوات مرتبة ومنطقية لحل مشكلة معينة", "نوع من أنواع الذواكر الداخلية المؤقتة"], correct: 1 }
        ]
    },
    {
        id: "quiz2",
        title: "الاختبار 2: المتغيرات والعمليات الحسابية والبيانات",
        reqCount: 10,
        questions: [
            { q: "أي نوع بيانات نستخدم لتخزين رقم عشري بدقة عالية في C++؟", options: ["int", "double", "char"], correct: 1 },
            { q: "ما هي قيمة المتغير x بعد العملية التالية: x = 10 % 3؟", options: ["1", "3", "0"], correct: 0 }
        ]
    },
    {
        id: "quiz3",
        title: "الاختبار 3: الجمل الشرطية وحلقات التكرار (Loops)",
        reqCount: 15,
        questions: [
            { q: "متى تتوقف حلقة التكرار while(x < 5) عن العمل؟", options: ["عندما تصبح x تساوي 5 أو أكثر", "عندما تكون x أصغر من 5", "لا تتوقف أبداً وتظل تدور"], correct: 0 },
            { q: "ما هو العامل المنطق الممثل لعملية 'الربط الثنائي' (AND) حيث يجب تحقق كلا الشرطين؟", options: ["||", "&&", "!"], correct: 1 }
        ]
    },
    {
        id: "quiz4",
        title: "الاختبار 4: المصفوفات والدوال والمفاهيم الهيكلية",
        reqCount: 20,
        questions: [
            { q: "إذا كانت المصفوفة arr تحتوي على 5 عناصر، ما هو مؤشر (Index) العنصر الأخير فيها؟", options: ["4", "5", "0"], correct: 0 },
            { q: "ما هي الكلمة المفتاحية المستخدمة في تعريف دالة لا تعيد أي قيمة؟", options: ["int", "void", "return"], correct: 1 }
        ]
    },
    {
        id: "quiz5",
        title: "الاختبار 5: البرمجة الموجهة للكائنات (OOP)",
        reqCount: 25,
        questions: [
            { q: "أي مفهوم برمي يصف قدرة الكائن على اتخاذ سلوكيات ووظائف متعددة حسب السياق؟", options: ["تعدد الأشكال Polymorphism", "الوراثة Inheritance", "التغليف Encapsulation"], correct: 0 }
        ]
    },
    {
        id: "quiz6",
        title: "الاختبار 6: الشامل ومحرك التطوير المتكامل",
        reqCount: 30,
        questions: [
            { q: "ما هي وظيفة الأداة الشهيرة Git؟", options: ["إدارة إصدارات المشاريع وتتبع التعديلات والتعاون البرمجي", "تشغيل قواعد البيانات الضخمة وتنسيقها", "ترجمة كود C++ تلقائياً إلى لغة ويب"], correct: 0 }
        ]
    }
];

// --- 4. Player UI Logic ---
function initCoursePlayer() {
    const playlistContainer = document.getElementById('playlist-container');
    const iframe = document.getElementById('main-video-iframe');
    const lessonTitleEl = document.getElementById('lesson-title-display');
    const lessonDescEl = document.getElementById('lesson-reason-display');
    const lessonNumEl = document.getElementById('lesson-number-display');
    
    const progressText = document.getElementById('sidebar-progress-text');
    const progressValue = document.getElementById('sidebar-progress-ring');
    const btnMarkWatched = document.getElementById('btn-mark-watched');
    
    if (!playlistContainer) return;
    
    // Total lessons count
    let totalLessons = 0;
    courseCurriculum.forEach(mod => totalLessons += mod.lessons.length);
    
    // Retrieve progress from LocalStorage (each course has its own key)
    let savedProgress = JSON.parse(localStorage.getItem(courseData.storageKey)) || {};
    
    const firstLessonId = courseCurriculum[0]?.lessons[0]?.id || 'v1';
    let activeLessonId = firstLessonId;

    // Render Playlist Accordion Modules
    playlistContainer.innerHTML = '';
    
    courseCurriculum.forEach((mod, modIndex) => {
        const modDiv = document.createElement('div');
        modDiv.className = `module ${modIndex === 0 ? 'active' : ''}`;
        
        const modHeader = document.createElement('div');
        modHeader.className = 'module-header';
        modHeader.innerHTML = `
            <div class="module-title-wrap">
                <h4>${mod.moduleTitle}</h4>
                <div class="module-meta">${mod.lessons.length} دروس</div>
            </div>
            <div class="module-toggle">
                <i data-lucide="chevron-down"></i>
            </div>
        `;
        
        modHeader.addEventListener('click', () => {
            modDiv.classList.toggle('active');
        });
        
        const modLessons = document.createElement('div');
        modLessons.className = 'module-lessons';
        
        mod.lessons.forEach((lesson, lessonIndex) => {
            const isFirst = modIndex === 0 && lessonIndex === 0;
            const isCompleted = !!savedProgress[lesson.id];
            
            const lessonItem = document.createElement('div');
            lessonItem.className = `lesson-item ${isFirst ? 'active' : ''}`;
            lessonItem.dataset.id = lesson.id;
            lessonItem.dataset.vid = lesson.videoId;
            
            lessonItem.innerHTML = `
                <div class="lesson-status" onclick="event.stopPropagation()">
                    <label class="custom-checkbox-wrap">
                        <input type="checkbox" class="custom-checkbox" id="check-${lesson.id}" ${isCompleted ? 'checked' : ''}>
                        <span class="checkbox-icon"><i data-lucide="check"></i></span>
                    </label>
                </div>
                <div class="lesson-info">
                    <h5>${lessonIndex + 1}. ${lesson.title}</h5>
                    <div class="lesson-duration">
                        <i data-lucide="clock"></i> ${lesson.duration}
                    </div>
                </div>
            `;
            
            // Video Change Event
            lessonItem.addEventListener('click', () => {
                document.querySelectorAll('.lesson-item').forEach(el => el.classList.remove('active'));
                lessonItem.classList.add('active');
                
                activeLessonId = lesson.id;
                
                // Update iframe
                iframe.src = `https://www.youtube.com/embed/${lesson.videoId}?autoplay=1&rel=0`;
                
                // Hide video placeholder if visible
                const placeholder = document.getElementById('video-placeholder');
                if (placeholder) placeholder.classList.add('hidden');
                
                // Update Details Tab
                if (lessonTitleEl) lessonTitleEl.textContent = lesson.title;
                if (lessonDescEl) lessonDescEl.textContent = lesson.desc;
                if (lessonNumEl) lessonNumEl.textContent = `الدرس ${lessonIndex + 1 <= 9 ? '0' + (lessonIndex + 1) : lessonIndex + 1}`;
                
                // Update complete button status
                updateMarkWatchedButton(!!savedProgress[lesson.id]);
            });
            
            // Checkbox Event
            const checkbox = lessonItem.querySelector(`#check-${lesson.id}`);
            checkbox.addEventListener('change', (e) => {
                savedProgress[lesson.id] = e.target.checked;
                localStorage.setItem(courseData.storageKey, JSON.stringify(savedProgress));
                updateProgress();
                
                if (lesson.id === activeLessonId) {
                    updateMarkWatchedButton(e.target.checked);
                }
            });
            
            modLessons.appendChild(lessonItem);
            
            if (isFirst) {
                activeLessonId = lesson.id;
                iframe.src = `https://www.youtube.com/embed/${lesson.videoId}?autoplay=1&rel=0`;
                if (lessonTitleEl) lessonTitleEl.textContent = lesson.title;
                if (lessonDescEl) lessonDescEl.textContent = lesson.desc;
                if (lessonNumEl) lessonNumEl.textContent = "الدرس 01";
                
                const placeholder = document.getElementById('video-placeholder');
                if (placeholder) placeholder.classList.add('hidden');
            }
        });
        
        modDiv.appendChild(modHeader);
        modDiv.appendChild(modLessons);
        playlistContainer.appendChild(modDiv);
    });
    
    // Compile Lucide icons after rendering dynamic playlist structure
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Generate 30 Day Plan self-study grid
    const studyPlanGrid = document.getElementById('study-plan-grid');
    if (studyPlanGrid) {
        studyPlanGrid.innerHTML = '';
        let dayCounter = 1;
        courseCurriculum.forEach(mod => {
            mod.lessons.forEach(lesson => {
                const dayCard = document.createElement('div');
                dayCard.className = `study-day-card ${savedProgress[lesson.id] ? 'completed' : ''}`;
                dayCard.id = `plan-day-${lesson.id}`;
                dayCard.innerHTML = `
                    <span class="day-num">يوم ${dayCounter}</span>
                    <span class="day-status-label">${savedProgress[lesson.id] ? 'مكتمل ✓' : 'قيد الدراسة'}</span>
                `;
                
                // Click Day card to navigate to lesson
                dayCard.addEventListener('click', () => {
                    const lessonEl = document.querySelector(`.lesson-item[data-id="${lesson.id}"]`);
                    if (lessonEl) {
                        const parentModule = lessonEl.closest('.module');
                        if (parentModule && !parentModule.classList.contains('active')) {
                            parentModule.classList.add('active');
                        }
                        lessonEl.click();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                });
                
                studyPlanGrid.appendChild(dayCard);
                dayCounter++;
            });
        });
    }
    
    function updateStudyPlanCards(progress) {
        courseCurriculum.forEach(mod => {
            mod.lessons.forEach(lesson => {
                const dayCard = document.getElementById(`plan-day-${lesson.id}`);
                if (dayCard) {
                    const isComp = !!progress[lesson.id];
                    if (isComp) {
                        dayCard.classList.add('completed');
                        dayCard.querySelector('.day-status-label').textContent = 'مكتمل ✓';
                    } else {
                        dayCard.classList.remove('completed');
                        dayCard.querySelector('.day-status-label').textContent = 'قيد الدراسة';
                    }
                }
            });
        });
    }

    // Toggle button state handler
    function updateMarkWatchedButton(isCompleted) {
        if (!btnMarkWatched) return;
        const span = btnMarkWatched.querySelector('span');
        if (isCompleted) {
            btnMarkWatched.classList.add('completed');
            if (span) span.textContent = 'مكتمل ✓';
            if (btnMarkWatched.querySelector('.btn-icon')) {
                btnMarkWatched.querySelector('.btn-icon').setAttribute('data-lucide', 'check-circle-2');
            }
        } else {
            btnMarkWatched.classList.remove('completed');
            if (span) span.textContent = 'تحديد كمكتمل';
            if (btnMarkWatched.querySelector('.btn-icon')) {
                btnMarkWatched.querySelector('.btn-icon').setAttribute('data-lucide', 'check-circle');
            }
        }
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }

    // Connect mark-watched button click handler
    if (btnMarkWatched) {
        btnMarkWatched.addEventListener('click', () => {
            if (!activeLessonId) return;
            const isCompleted = !savedProgress[activeLessonId];
            savedProgress[activeLessonId] = isCompleted;
            localStorage.setItem(courseData.storageKey, JSON.stringify(savedProgress));
            
            const checkbox = document.getElementById(`check-${activeLessonId}`);
            if (checkbox) checkbox.checked = isCompleted;
            
            updateProgress();
            updateMarkWatchedButton(isCompleted);
        });
    }
    
    // Progress calculation
    function updateProgress() {
        const completedCount = Object.values(savedProgress).filter(v => v).length;
        const percentage = Math.round((completedCount / totalLessons) * 100);
        
        if (progressText) {
            progressText.textContent = `${percentage}%`;
        }
        
        // Update SVG Circle (circumference = 251.2 for radius 40)
        if (progressValue) {
            const offset = 251.2 - (251.2 * percentage / 100);
            progressValue.style.strokeDashoffset = offset;
        }
        
        // Header percentage indicators
        const headerPercentEl = document.getElementById('header-progress-percent');
        if (headerPercentEl) {
            headerPercentEl.textContent = `${percentage}%`;
        }
        
        // Completed lessons count label
        const lessonsCountEl = document.getElementById('progress-lessons-count');
        if (lessonsCountEl) {
            lessonsCountEl.textContent = `أنجزت ${completedCount} من ${totalLessons} درساً`;
        }
        
        // Linear mini progress bar width
        const miniProgressBarEl = document.getElementById('sidebar-progress-bar');
        if (miniProgressBarEl) {
            miniProgressBarEl.style.width = `${percentage}%`;
        }
        
        // Live updates for 30 day plan day status badges
        updateStudyPlanCards(savedProgress);
        
        // Render exams list based on current completed count
        renderExamsList(completedCount);
    }
    
    // Exam List Renderer & Locking Logic
    function renderExamsList(completedCount) {
        const examsContainer = document.getElementById('exams-list-container');
        if (!examsContainer) return;
        
        examsContainer.innerHTML = '';
        
        quizzesData.forEach((quiz, index) => {
            const isUnlocked = completedCount >= quiz.reqCount;
            const examCard = document.createElement('div');
            examCard.className = `exam-card ${isUnlocked ? 'unlocked' : 'locked'}`;
            
            examCard.innerHTML = `
                <div class="exam-info-stack">
                    <span class="exam-tag">${isUnlocked ? 'جاهز للاختبار' : 'مغلق'}</span>
                    <h4>${quiz.title}</h4>
                    <p class="exam-unlock-req">يتطلب إنجاز ${quiz.reqCount} دروس (تقدمك الحالي: ${completedCount}/${quiz.reqCount})</p>
                </div>
                <div>
                    ${isUnlocked 
                        ? `<button class="exam-action-btn start-btn" data-quiz-index="${index}">ابدأ الاختبار</button>`
                        : `<button class="exam-action-btn locked-btn" disabled><i data-lucide="lock" class="btn-icon"></i> مغلق</button>`
                    }
                </div>
            `;
            
            examsContainer.appendChild(examCard);
        });
        
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
        
        // Start buttons event listeners
        examsContainer.querySelectorAll('.start-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const quizIndex = parseInt(btn.getAttribute('data-quiz-index'));
                openQuizModal(quizIndex);
            });
        });
    }

    // Modal Quiz Popup Controls
    const examModal = document.getElementById('exam-modal');
    const modalCloseBtn = document.getElementById('btn-close-modal');
    const modalExamTitle = document.getElementById('modal-exam-title');
    const modalQuizBody = document.getElementById('modal-quiz-body');
    const btnSubmitQuiz = document.getElementById('btn-submit-quiz');
    
    let currentQuizIndex = null;
    
    function openQuizModal(quizIndex) {
        currentQuizIndex = quizIndex;
        const quiz = quizzesData[quizIndex];
        
        if (modalExamTitle) modalExamTitle.textContent = quiz.title;
        if (modalQuizBody) {
            modalQuizBody.innerHTML = '';
            
            quiz.questions.forEach((q, qIndex) => {
                const qBlock = document.createElement('div');
                qBlock.className = 'quiz-q-block';
                
                let optionsHTML = '';
                q.options.forEach((opt, optIndex) => {
                    optionsHTML += `
                        <label class="quiz-opt-label">
                            <input type="radio" name="q-${qIndex}" value="${optIndex}">
                            <span>${opt}</span>
                        </label>
                    `;
                });
                
                qBlock.innerHTML = `
                    <div class="quiz-q-text">${qIndex + 1}. ${q.q}</div>
                    <div class="quiz-options">
                        ${optionsHTML}
                    </div>
                `;
                modalQuizBody.appendChild(qBlock);
            });
        }
        
        if (examModal) examModal.classList.add('active');
    }
    
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            if (examModal) examModal.classList.remove('active');
        });
    }
    
    if (btnSubmitQuiz) {
        btnSubmitQuiz.addEventListener('click', () => {
            if (currentQuizIndex === null) return;
            const quiz = quizzesData[currentQuizIndex];
            let score = 0;
            let answeredAll = true;
            
            quiz.questions.forEach((q, qIndex) => {
                const selected = document.querySelector(`input[name="q-${qIndex}"]:checked`);
                if (!selected) {
                    answeredAll = false;
                } else if (parseInt(selected.value) === q.correct) {
                    score++;
                }
            });
            
            if (!answeredAll) {
                alert('يرجى الإجابة عن جميع الأسئلة قبل تقديم الاختبار.');
                return;
            }
            
            if (score === quiz.questions.length) {
                alert(`مبروك! لقد اجتزت الاختبار بنجاح وحصلت على درجة كاملة ${score}/${quiz.questions.length} 🎉`);
            } else {
                alert(`لقد حصلت على ${score}/${quiz.questions.length}. حاول مرة أخرى لتحقيق الدرجة الكاملة.`);
            }
            if (examModal) examModal.classList.remove('active');
        });
    }
    
    // Initialize Progress
    updateProgress();
    updateMarkWatchedButton(!!savedProgress[activeLessonId]);
    
    // Tabs Logic
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.tab;
            
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            const panel = document.getElementById('tab-panel-' + targetId);
            if (panel) panel.classList.add('active');
        });
    });
}
