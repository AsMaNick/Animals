function clear_errors() {
	set_error('password', '');
}

function login() {
	clear_errors();
	var username = document.getElementsByName('username')[0].value;
	var password = document.getElementsByName('password')[0].value;
	axios.post(vue_app.DOMAIN + '/api/check_client/', JSON.stringify({'username': username,
																	 'password': password}))
	.then(response => { 
		console.log(response);
		if (response.status == 200 && response.data.ok) {
			localStorage['client'] = JSON.stringify(response.data.client);
			window.location.href += '/../home.html';
		} else {
			set_error('password', getLocalMessage(['Incorrect username or password', 'Неправильне ім\'я користувача або пароль']));
		}
	});
}