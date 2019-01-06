function loadPet() {
	var client = getClient();
	var headers = { 'accept-language': getLanguage()};
	if (client) {
		axios
			.get('http://127.0.0.1:8000/api/pets/' + getHrefInfo(), 
				 {
					 headers: headers
				 })
			.then(response => {
				vue_app.pet = response.data;
			});
	}
}

loadPet();