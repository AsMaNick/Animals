var last_scroll_height = -1;

function messagesToTheEnd() {
	var elem = document.getElementById("message_box");
	if (last_scroll_height != elem.scrollHeight) {
		elem.scrollTop = elem.scrollHeight;
		last_scroll_height = elem.scrollHeight;
	}
}

function compareChats(a, b) {
	var da = new Date(a.last_message.timestamp);
	var db = new Date(b.last_message.timestamp);
	return db.getTime() - da.getTime();
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
					if (vue_app.chats[i].messages.length > 0) {
						vue_app.chats[i]['last_message'] = vue_app.chats[i].messages[vue_app.chats[i].messages.length - 1];
					} else {
						vue_app.chats[i]['last_message'] = {
							'timestamp': vue_app.chats[i].created
						};
					}
				}
				vue_app.chats.sort(compareChats);
				if (last_scroll_height == -1) {
					if (getHrefInfo() != "") {
						for (var i = 0; i < vue_app.chats.length; ++i) {
							if (vue_app.chats[i].id == parseInt(getHrefInfo())) {
								vue_app.current_chat = vue_app.chats[i].id;
								break;
							}
						}
					} else if (vue_app.chats.length) {
						vue_app.current_chat = vue_app.chats[0].id;
					}
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
		.post('http://127.0.0.1:8000/api/chats/' + vue_app.current_chat + '/messages/', data,
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
			console.log(chat_id);
			vue_app.current_chat = chat_id;
			setTimeout(function() { messagesToTheEnd(); }, 100);
			break;
		}
	}
}

function keyUp(event) {
	if (event.keyCode === 13) {
		document.getElementById("send_message_img").click();
	}
}

loadChats();
setInterval(function() { loadChats(); }, 2000);