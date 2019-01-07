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

function translateUkr(kind) {
	words = {
		'Собака': 'Dog',
		'Кішка': 'Cat',
		'Чоловіча': 'Male',
		'Жіноча': 'Female',
	}
	if (kind in words) {
		return words[kind];
	}
	return kind;
}

function rawHref() {
	var href = window.location.href;
	if (href.indexOf('#') == -1) {
		return href;
	}
	return href.substr(0, href.indexOf('#'));
}

function loadPet(fill_form) {
	var client = getClient();
	vue_app.pet_id = parseInt(getHrefInfo());
	var headers = { 'accept-language': getLanguage()};
	if (client) {
		axios
			.get('http://127.0.0.1:8000/api/pets/' + getHrefInfo(), 
				 {
					 headers: headers
				 })
			.then(response => {
				vue_app.pet = response.data;
				if (fill_form) {
					document.getElementsByName('name')[0].value = vue_app.pet.name;
					document.getElementsByName('kind')[0].value = vue_app.pet.kind;
					document.getElementsByName('description')[0].value = vue_app.pet.description;
					document.getElementsByName('birthday')[0].value = vue_app.pet.birthday;
					document.getElementsByName('gender')[0].value = vue_app.pet.gender;
					document.getElementsByName('breed')[0].value = vue_app.pet.breed;
				}
			});
	}
}