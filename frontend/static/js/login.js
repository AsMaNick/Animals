function set_error(error_name, text) {
	document.getElementsByName(error_name + '_error')[0].innerHTML = text;
}

function clear_errors() {
	set_error('password', '');
}

function login() {
	clear_errors();
	var username = document.getElementsByName('username')[0].value;
	var password = document.getElementsByName('password')[0].value;
	axios.post('http://127.0.0.1:8000/api/check_client/', JSON.stringify({'username': username,
																	 'password': password}))
	.then(response => { 
		console.log(response);
		if (response.status == 200 && response.data.ok) {
			localStorage['client'] = JSON.stringify(response.data.client);
			window.location.href += '/../home.html';
		} else {
			set_error('password', 'Incorrect username or password');
		}
	});
}