﻿var link_delimiter = '?';

function setLanguageFlag(language) {
	document.getElementById('language_flag').src = './static/img/' + language + '-flag.png';
}

function initLanguage() {
	if (localStorage.getItem('language') === null) {
		localStorage['language'] = 'en';
	}
	setLanguageFlag(localStorage['language']);
}

initLanguage();

function getLanguageId(language) {
	if (language == 'en') {
		return 0;
	}
	return 1;
}

function getLanguage() {
	if (localStorage.getItem('language') === null) {
		return 'en';
	}
	return localStorage.getItem('language');
}

