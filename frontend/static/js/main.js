function loadPets() {
	var client = getClient();
	if (client) {
		axios
			.get('http://127.0.0.1:8000/api/clients/' + getClient().id.toString() + '/pets/')
			.then(response => {
				vue_app.pets = response.data;
			});
	}
}

loadPets();