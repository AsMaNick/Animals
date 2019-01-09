function getChatId(first_user, second_user) {
	var headers = { 'accept-language': 'en'};
	return axios
		.get('http://127.0.0.1:8000/api/clients/' + first_user + '/chats/', 
			 {
				 headers: headers
			 })
		.then(response => {
			var chats = response.data;
			for (var chat of chats) {
				if (chat.first_user_full.id == second_user || chat.second_user_full.id == second_user) {
					return chat.id;
				}
			}
			return -1;
		});
}

function notifyUser(user_id, message) {
	var headers = { 'accept-language': 'en'};
	var system_id = 16;
	var data = {
		'from_user': system_id,
		'message': message
	}
	console.log(system_id);
	console.log(user_id);
	getChatId(system_id, user_id).then(chat_id => {
		console.log(chat_id);
		axios
			.post('http://127.0.0.1:8000/api/chats/' + chat_id.toString() + '/messages/', data,
				 {
					 headers: headers
				 })
			.then(response => {
			});
	});
}