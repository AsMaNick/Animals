function loadPets() {
	var client = getClient();
	var headers = { 'accept-language': getLanguage()};
	if (client) {
		axios
			.get('http://127.0.0.1:8000/api/clients/' + client.id.toString() + '/pets/', 
				 {
					 headers: headers
				 })
			.then(response => {
				vue_app.pets = response.data;
			});
	}
}

function loadUsers() {
	var client = getClient();
	var headers = { 'accept-language': getLanguage()};
	var only_friends = '';
	if (getHrefInfo() == 'friends') {
		only_friends += client.id.toString() + '/friends/';
		vue_app.only_friends_type = 1;
	}
	if (client) {
		axios
			.get('http://127.0.0.1:8000/api/clients/' + only_friends, 
				 {
					 headers: headers
				 })
			.then(response => {
				vue_app.users = response.data;
			});
	}
}

loadPets();
loadUsers();