import urllib.request, re
url = 'https://www.youtube.com/results?search_query=elzero+web+school+c%2B%2B'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode()
ids = re.findall(r'"videoId":"([^"]+)"', html)
print(list(dict.fromkeys(ids))[:30])
