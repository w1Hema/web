import urllib.request, re
url = 'https://www.youtube.com/playlist?list=PLDoPjvoNmBAx8xKvAXpb6f0Urj98Xo7zg'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode()
ids = re.findall(r'"videoId":"([^"]+)"', html)
# Remove duplicates while preserving order
unique_ids = list(dict.fromkeys(ids))
# Ignore some internal IDs if they are not actual videos in the playlist. Typically the playlist videos appear multiple times, but this is fine.
print(unique_ids[:35])
