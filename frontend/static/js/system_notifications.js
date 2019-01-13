function getChatId(first_user, second_user) {
	var headers = { 'accept-language': 'en'};
	var data = {
		'second_user': second_user
	};
	return axios
		.post(vue_app.DOMAIN + '/api/clients/' + first_user + '/chats/', data,
			 {
				 headers: headers
			 })
		.then(response => {
			return response.data.chat_id;
		});
}

function notifyUser(user_id, message) {
	var headers = { 'accept-language': 'en'};
	var system_id = 16;
	var data = {
		'from_user': system_id,
		'message': message
	}
	return getChatId(system_id, user_id).then(chat_id => {
		axios
			.post(vue_app.DOMAIN + '/api/chats/' + chat_id.toString() + '/messages/', data,
				 {
					 headers: headers
				 })
			.then(response => {
			});
	});
}