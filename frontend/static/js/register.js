function set_error(error_name, text) {
	document.getElementById(error_name + '_error').innerHTML = text;
	if (text == '') {
		document.getElementById(error_name + '_div').className = 'col-sm-10';
	} else {
		document.getElementById(error_name + '_div').className = 'col-sm-10 has-error';
	}
}

function clear_errors() {
	set_error('username', '');
	set_error('name', '');
	set_error('surname', '');
	set_error('password', '');
	set_error('repeat_password', '');
	set_error('address', '');
}

function register() {
	clear_errors();
	var username = document.getElementsByName('username')[0].value;
	var name = document.getElementsByName('name')[0].value;
	var surname = document.getElementsByName('surname')[0].value;
	var password = document.getElementsByName('password')[0].value;
	if (password == '') {
		set_error('password', getLocalMessage(['This field may not be blank.', 'Це поле обов\'язкове.']));
		return;
	}
	var repeat_password = document.getElementsByName('repeat_password')[0].value;
	if (password != repeat_password) {
		set_error('repeat_password', getLocalMessage(['Passwords don\'t match', 'Паролі не співпадають']));
		return;
	}
	var address = document.getElementsByName('address')[0].value;
	console.log(username, password, repeat_password, address);
	var headers = { 'accept-language': getLanguage()};
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
				//break;
			}
		} else if (response.status == 201) {
			window.location.href += '/../login.html';
		}
	});
}