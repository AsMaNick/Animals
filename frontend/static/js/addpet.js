function clear_errors() {
	set_error('name', '');
	set_error('birthday', '');
}

function translateKind(kind) {
	if (kind == 'Собака') {
		return 'Dog';
	} else if (kind == 'Кішка') {
		return 'Cat';
	}
	return kind;
}

function addpet() {
	clear_errors();
	var name = document.getElementsByName('name')[0].value;
	if (name == '') {
		set_error('name', getLocalMessage(['This field may not be blank.', 'Це поле обов\'язкове.']));
		return;
	}
	var kind = document.getElementsByName('kind')[0].value;
	kind = translateKind(kind);
	var description = document.getElementsByName('description')[0].value;
	var birthday = document.getElementsByName('birthday')[0].value;
	if (birthday == '') {
		set_error('birthday', 'This field may not be blank.');
		return;
	}
	photos = document.getElementsByName('photo')[0].files;
	var form_data = new FormData();
	form_data.append('name', name);
	form_data.append('kind', kind);
	form_data.append('birthday', birthday);
	form_data.append('description', description);
	if (photos.length > 0) {
		form_data.append('avatar', photos[0]);
	}
	var client_id = JSON.parse(localStorage['client']).id.toString();
	var headers = { 'accept-language': getLanguage(), 'Content-Type': 'multipart/form-data'};
	axios.post('http://127.0.0.1:8000/api/clients/' + client_id + '/pets/', form_data,
																			{
																				headers: headers
																			})
	.then(response => { 
		console.log(response);
		if (response.status == 201) {
			window.location.href += '/../mypets.html';
		} else {
		}
	});
}