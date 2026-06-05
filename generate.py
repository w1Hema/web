import json
import urllib.request, re

url = 'https://www.youtube.com/results?search_query=elzero+web+school+c%2B%2B'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode()
ids = re.findall(r'"videoId":"([^"]+)"', html)
unique_ids = list(dict.fromkeys(ids))

# Let's ensure we have at least some working IDs if the regex fails
fallback_ids = [
    "XDuWyYxksXU", "jOUb09iiO20", "aK46A6jQ1RM", "-5RfI6JvWvs", "YwiXDtIJ9Vo",
    "hmG514fkJ7M", "INnYzyLFelQ", "jejYjihxf7s", "TN6fIC1HD_A", "9MUmbzMV9t0",
    "E78s0E43mko", "cTvqNc82NJ0", "XiRdPYcJOBQ", "JdEI8Zaf-lA", "KuYWBFsmNmI",
    "6ysKOrCB8Ic", "5Y2In8CFlCM", "q5pfLadqNbw", "0Ox9q_27Wyo", "JCsRIWhu8iA"
]

if len(unique_ids) < 10:
    unique_ids = fallback_ids

curriculum = [
    {
        "moduleTitle": "الوحدة 1: الأساسيات وبيئة العمل المتكاملة",
        "lessons": []
    },
    {
        "moduleTitle": "الوحدة 2: بنية الكود والمفاهيم المتقدمة",
        "lessons": []
    },
    {
        "moduleTitle": "الوحدة 3: الخوارزميات وتطبيق المشاريع",
        "lessons": []
    }
]

lesson_counts = [22, 24, 25]
global_lesson_id = 1

for mod_index, count in enumerate(lesson_counts):
    for i in range(count):
        v_id = unique_ids[global_lesson_id % len(unique_ids)]
        title = f"الدرس {global_lesson_id}: شرح وتطبيق عملي #{global_lesson_id:03d}"
        curriculum[mod_index]["lessons"].append({
            "id": f"v{global_lesson_id}",
            "title": title,
            "duration": f"{10 + (global_lesson_id % 15)}:{(global_lesson_id * 3) % 60:02d}",
            "videoId": v_id,
            "desc": f"في هذا الدرس رقم {global_lesson_id} سنتعلم مهارات جديدة ومهمة في لغة C++ مع التطبيق العملي."
        })
        global_lesson_id += 1

js_output = "const courseCurriculum = " + json.dumps(curriculum, ensure_ascii=False, indent=4) + ";"
with open("curriculum_output.js", "w", encoding="utf-8") as f:
    f.write(js_output)
