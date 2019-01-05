function set_error(error_name, text) {
	document.getElementsByName(error_name + '_error')[0].innerHTML = text;
}

function clear_errors() {
	set_error('name', '');
	set_error('kind', '');
	set_error('birthday', '');
	set_error('description', '');
}

function addpet() {
	clear_errors();
	var name = document.getElementsByName('name')[0].value;
	if (name == '') {
		set_error('name', 'This field may not be blank.');
		return;
	}
	var kind = document.getElementsByName('kind')[0].value;
	var description = document.getElementsByName('description')[0].value;
	var birthday = document.getElementsByName('birthday')[0].value;
	if (birthday == '') {
		set_error('birthday', 'This field may not be blank.');
		return;
	}
	var client_id = JSON.parse(localStorage['client']).id.toString();
	var headers = { 'accept-language': 'ua'};
	axios.post('http://127.0.0.1:8000/api/clients/' + client_id + '/pets/', JSON.stringify({'name': name,
																						   'kind': kind,
																						   'birthday': birthday,
																						   'description': description}),
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