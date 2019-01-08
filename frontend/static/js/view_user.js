function loadPetsClient(client_id) {
	var headers = { 'accept-language': getLanguage()};
	axios
		.get('http://127.0.0.1:8000/api/clients/' + client_id.toString() + '/pets/', 
			 {
				 headers: headers
			 })
		.then(response => {
			vue_app.pets = response.data;
			if (vue_app.pets.length == 0) {
				vue_app.view_client_pets_list = ['This user doesn\'t have pets yet', 'У цього користувача ще немає домашніх тварин'];
			} else {
				vue_app.view_client_pets_list = '';
				for (var i = 0; i < vue_app.pets.length; ++i) {
					if (i) {
						vue_app.view_client_pets_list += ', ';
					}
					vue_app.view_client_pets_list += vue_app.pets[i].name;
				}
				vue_app.view_client_pets_list = [vue_app.view_client_pets_list, vue_app.view_client_pets_list];
			}
		});
}

loadPetsClient(getHrefInfo());