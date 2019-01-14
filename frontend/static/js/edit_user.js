function clear_errors() {
	set_error('name', '');
	set_error('surname', '');
	set_error('address', '');
}

function edit_user() {
	clear_errors();
	var name = document.getElementsByName('name')[0].value;
	var surname = document.getElementsByName('surname')[0].value;
	var address = document.getElementsByName('address')[0].value;
	if (name == '') {
		set_error('name', getLocalMessage(['This field may not be blank.', 'Це поле обов\'язкове.']));
		return;
	}
	if (surname == '') {
		set_error('surname', getLocalMessage(['This field may not be blank.', 'Це поле обов\'язкове.']));
		return;
	}
	photos = document.getElementsByName('photo')[0].files;
	var form_data = new FormData();
	form_data.append('name', name);
	form_data.append('surname', surname);
	form_data.append('address', address);
	if (photos.length > 0) {
		form_data.append('avatar', photos[0]);
	}
	getGeolocation(address)
		.then(response => {
			var geolocation = response;
			for (var attr in geolocation) {
				form_data.append(attr, geolocation[attr]);
			}
			var client_id = getClient().id;
			var headers = { 'accept-language': getLanguage(), 'Content-Type': 'Multipart/Form-data'};
			axios.patch(vue_app.DOMAIN + '/api/clients/' + client_id.toString() + '/', form_data,
																						{
																							headers: headers
																						})
				.then(response => { 
					console.log(response);
					if (response.status == 201) {
						window.location.href = rawHref() + '/../viewuser.html' + link_delimiter + client_id.toString();
					} else {
					}
				});
		});
}

function initEdit() {
	vue_app.add_edit_type = 1;
	loadClient(1);
}

initEdit();