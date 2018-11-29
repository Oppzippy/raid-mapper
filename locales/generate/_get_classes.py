import requests

def fetch(token, region, locale):
	url = 'https://{region}.api.blizzard.com/wow/data/character/classes?locale={locale}&access_token={token}'
	if region == "cn":
		url = 'https://gateway.battlenet.com.cn/wow/data/character/classes?locale={locale}&access_token={token}'
	url = url.format(region=region, locale=locale, token=token)

	classes = requests.get(url).json()
	out = ""
	for c in classes['classes']:
		out += u"{} => '{}',".format(str(c['id']), c['name'])
	return out