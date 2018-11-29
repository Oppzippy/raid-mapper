import sys
import _get_classes as get_classes
import subprocess

locales = [
	{
		'region': 'eu',
		'locale': 'deDE'
	},
	{
		'region': 'us',
		'locale': 'enUS'
	},
	{
		'region': 'eu',
		'locale': 'enGB'
	},
	{
		'region': 'eu',
		'locale': 'frFR'
	},
	{
		'region': 'us',
		'locale': 'esMX',
	},
	{
		'region': 'eu',
		'locale': 'esES'
	},
	{
		'region': 'eu',
		'locale': 'itIT'
	},
	{
		'region': 'us',
		'locale': 'ptBR'
	},
	{
		'region': 'eu',
		'locale': 'ptPT'
	},
	{
		'region': 'eu',
		'locale': 'ruRU'
	},
	{
		'region': 'kr',
		'locale': 'krKR'
	},
#	{
#		'region': 'ch',
#		'locale': 'zhCN'
#	},
#	{
#		'region': 'ch',
#		'locale': 'zhTW'
#	},
]

for locale in locales:
	content = "<?php $LOCALE['{}'] = ['classes' => [".format(locale['locale'])
	content += get_classes.fetch(sys.argv[1], locale['region'], locale['locale'])
	content += "],"
	content += "];"
	f = open(locale['locale'] + '.php', 'wb')
	f.write(content.encode('utf-8'))
	f.close()

locales_php = open('Locales.php', 'w')
locales_php.write("<?php $LOCALE = [];")
for locale in locales:
	locales_php.write("require_once('{}.php');".format(locale['locale']))

locales_php.close()