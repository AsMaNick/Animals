var last_scroll_height = -1;

function messagesToTheEnd() {
	var elem = document.getElementById("message_box");
	if (last_scroll_height != elem.scrollHeight) {
		elem.scrollTop = elem.scrollHeight;
		last_scroll_height = elem.scrollHeight;
	}
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
				setTimeout(function() { messagesToTheEnd(); }, 100);
			});
	}
}

function sendMessage() {
	var message = document.getElementById('message_text').value;
	var headers = { 'accept-language': getLanguage()};
	var data = {
		'from_user': getClient().id,
		'message': message
	}
	axios
		.post('http://127.0.0.1:8000/api/chats/' + vue_app.chats[vue_app.current_chat].id + '/messages/', data,
			 {
				 headers: headers
			 })
		.then(response => {
			document.getElementById('message_text').value = '';
			loadChats();
		});
}

function changeChat(chat_id) {
	for (var i = 0; i < vue_app.chats.length; ++i) {
		if (vue_app.chats[i].id == chat_id) {
			vue_app.current_chat = i;
			setTimeout(function() { messagesToTheEnd(); }, 100);
			break;
		}
	}
}

loadChats();
setInterval(function() { loadChats(); }, 2000);