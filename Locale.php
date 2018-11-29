<?php

class Locale {
	private $defaultLocaleCode = "enUS";
	private $defaultLocale;
	private $locale;
	private $localeCode;

	function __construct($locales, $localeCode) {
		$this->defaultLocale = $locales[$this->defaultLocaleCode];
		if (!empty($locales[$localeCode])) {
			$this->locale = $locales[$localeCode];
			$this->localeCode = $localeCode;
		} else {
			$this->locale = $defaultLocale;
			$this->localeCode = $this->defaultLocaleCode;
		}
	}

	function get($key) {
		return $this->locale[$key] ?? $this->defaultLocale[$key] ?? strtoupper($key);
	}

	function getCode() {
		return $this->localeCode;
	}
}
