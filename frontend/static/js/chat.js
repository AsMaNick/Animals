function messagesToTheEnd() {
	var elem = document.getElementById("message_box");
	elem.scrollTop = elem.scrollHeight;
}

function loadChats() {
	var client = getClient();
	var headers = { 'accept-language': getLanguage()};
	if (client) {
		axios
			.get('http://127.0.0.1:8000/api/clients/' + client.id.toString() + '/chats/', 
				 {
					 headers: headers
				 })
			.then(response => {
				vue_app.chats = response.data;
				for (var i = 0; i < vue_app.chats.length; ++i) {
					if (vue_app.chats[i].second_user_full.username == client.username) {
						vue_app.chats[i].first_user_full = [vue_app.chats[i].second_user_full, vue_app.chats[i].second_user_full = vue_app.chats[i].first_user_full][0];
					}
					vue_app.chats[i]['last_message'] = vue_app.chats[i].messages[vue_app.chats[i].messages.length - 1];
				}
			});
	}
}

messagesToTheEnd();
loadChats();