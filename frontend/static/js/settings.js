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

function changeLanguage(language) {
	setLanguageFlag(language);
	localStorage['language'] = language;
	header_nav_bar_app.language_id = getLanguageId(language);
}

var header_nav_bar_app = new Vue({
	el: '#header_nav_bar',
	data: {
		language_id: getLanguageId(localStorage['language']),
		literals: {
			languages: ['english', 'українська'],
			sign_up: ['Sign Up', 'Зареєструватися'],
			login: ['Login', 'Увійти'],
		}
	}
});