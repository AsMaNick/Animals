function loadPetsClient(client_id) {
	var headers = { 'accept-language': getLanguage()};
	axios
		.get(vue_app.DOMAIN + '/api/clients/' + client_id.toString() + '/pets/', 
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

function isOurFriend(client_id) {
	var headers = { 'accept-language': getLanguage()};
	axios
		.get(vue_app.DOMAIN + '/api/clients/' + getClient().id.toString() + '/friends/', 
			 {
				 headers: headers
			 })
		.then(response => {
			vue_app.add_remove_friend_type = 0;
			for (var friend of response.data) {
				
				if (client_id == friend.id) {
					vue_app.add_remove_friend_type = 1;
					break;
				}
			}
		});
}

loadPetsClient(getHrefInfo());
isOurFriend(getHrefInfo());

function addToFriends() {
	var headers = { 'accept-language': getLanguage()};
	var data = {
		'friend': parseInt(getHrefInfo())
	};
	axios
		.post(vue_app.DOMAIN + '/api/clients/' + getClient().id.toString() + '/friends/', data,
			 {
				 headers: headers
			 })
		.then(response => {
			vue_app.add_remove_friend_type ^= 1;
		});
}

function writeMessage() {
	var headers = { 'accept-language': getLanguage()};
	var second_user = parseInt(getHrefInfo());
	var data = {
		'second_user': second_user
	};
	axios
		.post(vue_app.DOMAIN + '/api/clients/' + getClient().id.toString() + '/chats/', data,
			 {
				 headers: headers
			 })
		.then(response => {
			if ('chat_id' in response.data) {
				window.location.href = rawHref() + '/../messages.html' + link_delimiter + response.data['chat_id'].toString();
			} else {
				console.log(response);
			}
		});
}