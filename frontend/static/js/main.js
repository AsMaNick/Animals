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
	if (client) {
		axios
			.get('http://127.0.0.1:8000/api/clients/', 
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