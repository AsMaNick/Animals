function set_error(error_name, text) {
	document.getElementById(error_name + '_error').innerHTML = text;
	if (text == '') {
		document.getElementById(error_name + '_div').className = 'col-sm-10';
	} else {
		document.getElementById(error_name + '_div').className = 'col-sm-10 has-error';
	}
}

function getLocalMessage(s) {
	return s[getLanguageId(getLanguage())];
}

function changeLanguage(language) {
	setLanguageFlag(language);
	localStorage['language'] = language;
	vue_app.language_id = getLanguageId(language);
}

function getClient() {
	return JSON.parse(localStorage.getItem('client'));
}

function checkLogin() {
	if (getClient() === null) {
		window.location.href += '/../base.html';
	}
}

function logout() {
	localStorage.removeItem('client');
	window.location.href += '/../base.html';
}

function getHrefInfo() {
	var s = window.location.href;
	var pos = s.indexOf('#');
	if (pos == -1) {
		return '';
	}
	return s.substr(pos + 1);
}