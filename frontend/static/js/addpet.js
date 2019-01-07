function clear_errors() {
	set_error('name', '');
	set_error('birthday', '');
	set_error('breed', '');
}

function addpet() {
	clear_errors();
	var name = document.getElementsByName('name')[0].value;
	if (name == '') {
		set_error('name', getLocalMessage(['This field may not be blank.', 'Це поле обов\'язкове.']));
		return;
	}
	var kind = document.getElementsByName('kind')[0].value;
	kind = translateUkr(kind);
	var description = document.getElementsByName('description')[0].value;
	var birthday = document.getElementsByName('birthday')[0].value;
	var gender = document.getElementsByName('gender')[0].value;
	gender = translateUkr(gender);
	var breed = document.getElementsByName('breed')[0].value;
	if (birthday == '') {
		set_error('birthday', 'This field may not be blank.');
		return;
	}
	
	if (birthday == '') {
		set_error('birthday', 'This field may not be blank.');
		return;
	}
	photos = document.getElementsByName('photo')[0].files;
	var form_data = new FormData();
	form_data.append('name', name);
	form_data.append('kind', kind);
	form_data.append('gender', gender);
	form_data.append('breed', breed);
	form_data.append('birthday', birthday);
	form_data.append('description', description);
	if (photos.length > 0) {
		form_data.append('avatar', photos[0]);
	}
	var client_id = JSON.parse(localStorage['client']).id.toString();
	form_data.append('owner', client_id);
	var pet_id = vue_app.pet_id;
	var headers = { 'accept-language': getLanguage(), 'Content-Type': 'Multipart/Form-data'};
	if (vue_app.add_edit_type == 0) { // Create new pet
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
	} else { // Edit old pet {
		axios.put('http://127.0.0.1:8000/api/pets/' + pet_id.toString() + '/', form_data,
																				{
																					headers: headers
																				})
		.then(response => { 
			console.log(response);
			if (response.status == 201) {
				window.location.href = rawHref() + '/../viewpet.html#' + pet_id.toString();
			} else {
			}
		});
	}
}

function initAddEdit() {
	if (getHrefInfo() == '') {
		vue_app.add_edit_type = 0;
	} else {
		vue_app.add_edit_type = 1;
		loadPet(1);
	}
}

initAddEdit();