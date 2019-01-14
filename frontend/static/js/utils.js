if (!String.prototype.format) {
	String.prototype.format = function() {
		var args = arguments;
		return this.replace(/{(\d+)}/g, function(match, number) { 
			return typeof args[number] != 'undefined' ? args[number] : match;
		});
	};
}

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
		window.location.href = rawHref(window.location.href) + '/../base.html';
	}
}

function logout() {
	localStorage.removeItem('client');
	window.location.href = rawHref(window.location.href) + '/../base.html';
}

function getHrefInfo() {
	var s = window.location.href;
	var pos = s.indexOf(link_delimiter);
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
	if (href.indexOf(link_delimiter) == -1) {
		return href;
	}
	return href.substr(0, href.indexOf(link_delimiter));
}

function loadPet(fill_form) {
	var client = getClient();
	vue_app.pet_id = parseInt(getHrefInfo());
	var headers = { 'accept-language': getLanguage()};
	if (client) {
		axios
			.get(vue_app.DOMAIN + '/api/pets/' + getHrefInfo(), 
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

function loadClient(fill_form) {
	var client = getClient();
	vue_app.pet_id = parseInt(getHrefInfo());
	var headers = { 'accept-language': getLanguage()};
	if (client) {
		axios
			.get(vue_app.DOMAIN + '/api/clients/' + getHrefInfo(), 
				 {
					 headers: headers
				 })
			.then(response => {
				vue_app.view_client = response.data;
				vue_app.view_client.registered = vue_app.view_client.registered.substr(0, 10);
				if (vue_app.view_client.id == vue_app.client.id) {
					vue_app.is_i = 1;
				} else {
					vue_app.is_i = 0;
				}
				
				if (fill_form) {
					document.getElementsByName('name')[0].value = vue_app.view_client.name;
					document.getElementsByName('surname')[0].value = vue_app.view_client.surname;
					document.getElementsByName('address')[0].value = vue_app.view_client.address;
				}
			});
	}
}

function getMin(a) {
	var res = a[0];
	for (var i = 1; i < a.length; ++i) {
		res = Math.min(res, a[i]);
	}
	return res;
}

function getMax(a) {
	var res = a[0];
	for (var i = 1; i < a.length; ++i) {
		res = Math.max(res, a[i]);
	}
	return res;
}

function getGeolocation(address) {
	console.log(address);
	if (address == "") {
		return new Promise(function(resolve, reject) {
				resolve({});
			});
	}
	return axios
		.get('https://maps.googleapis.com/maps/api/geocode/json?address={0}&key={1}'.format(address, vue_app.keyGoogleAPI))
		.then(response => {
			var geolocation = {};
			if (response.data.status == "OK" && response.data.results.length > 0) {
				var result = response.data.results[0];
				geolocation = result.geometry.location;
			}
			return geolocation;
		});
}