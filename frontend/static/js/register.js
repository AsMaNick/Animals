function set_error(error_name, text) {
	document.getElementsByName(error_name + '_error')[0].innerHTML = text;
}

function clear_errors() {
	set_error('username', '');
	set_error('name', '');
	set_error('surname', '');
	set_error('password', '');
	set_error('password_repeat', '');
	set_error('address', '');
}

function register() {
	clear_errors();
	var username = document.getElementsByName('username')[0].value;
	var name = document.getElementsByName('name')[0].value;
	var surname = document.getElementsByName('surname')[0].value;
	var password = document.getElementsByName('password')[0].value;
	if (password == '') {
		set_error('password', 'This field may not be blank.');
		return;
	}
	var password_repeat = document.getElementsByName('password_repeat')[0].value;
	if (password != password_repeat) {
		set_error('password_repeat', 'Passwords don\'t match');
		return;
	}
	var address = document.getElementsByName('address')[0].value;
	console.log(username, password, password_repeat, address);
	var headers = { 'accept-language': 'ua' };
	//headers = {};
	axios.post('http://127.0.0.1:8000/api/clients/', JSON.stringify({'username': username,
																	 'name': name,
																	 'surname': surname,
																	 'password_hash': password,
																	 'address': address}), 
													 {
														 headers: headers
													 })
	.then(response => { 
		if (response.status == 200) {
			for (var field in response.data) {
				console.log(field, response.data[field]);
				set_error(field, response.data[field]);
				break;
			}
		} else if (response.status == 201) {
			window.location.href += '/../login.html';
		}
	});
}