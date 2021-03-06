﻿if (!line_chart_component) {
	var line_chart_component = Vue.component('line-chart', {
	})
}

var vue_app = new Vue({
	el: '#vueapp',
	data: {
		DOMAIN: 'https://bigbag.pythonanywhere.com',
		pet: null,
		pet_id: null,
		pets: [],
		users: [],
		client: getClient(),
		view_client: null,
		view_client_pets_list: null,
		is_i: null,
		language_id: getLanguageId(getLanguage()),
		add_edit_type: 0,
		add_remove_friend_type: 0,
		only_friends_type: 0,
		menu_item_classes: ['active', ''],
		chats: null,
		current_chat: 0,
		
		literals: {
			languages: ['english', 'українська'],
			sign_up: ['Sign Up', 'Зареєструватися'],
			login: ['Login', 'Увійти'],
			logout: ['Logout', 'Вийти'],
			
			registration: ['Registration', 'Реєстрація'],
			
			username: ['Username', 'Ім\'я користувача'],
			name: ['First name', 'Ім\'я'],
			surname: ['Second name', 'Прізвище'],
			password: ['Password', 'Пароль'],
			repeat_password: ['Repeat password', 'Підтвердіть пароль'],
			address: ['Address', 'Адреса'],
			
			username_placeholder: ['Enter username', 'Введіть ім\'я користувача'],
			name_placeholder: ['Enter your first name', 'Введіть ваше ім\'я'],
			surname_placeholder: ['Enter your second name', 'Введіть ваше прізвище'],
			password_placeholder: ['Enter your password', 'Введіть ваш пароль'],
			repeat_password_placeholder: ['Enter your password again', 'Повторіть ваш пароль'],
			address_placeholder: ['Enter your Address', 'Введіть вашу адресу'],
			
			my_pets: ['My pets', 'Мої домашні тварини'],
			my_friends: ['My friends', 'Мої друзі'],
			messages: ['Messages', 'Повідомлення'],
			users: ['Users', 'Користувачі'],
			shops: ['Shops', 'Магазини'],
			
			add_new_pet: ['Add new pet', 'Додати нову домашню тваринку'],
			addedit_new_pet: [['Add new pet', 'Додати нову домашню тваринку'], ['Edit information', 'Редагувати інформацію']],
			addedit_new_pet_short: [['Add', 'Додати'], ['Edit', 'Редагувати']],
			
			alias: ['Alias', 'Кличка'],
			kind: ['Kind', 'Вид'],
			birthday: ['Birthday', 'День народження'],
			photo: ['Photo', 'Фотографія'],
			description: ['Description', 'Особливі звички'],
			dog: ['Dog', 'Собака'],
			cat: ['Cat', 'Кішка'],
			alias_placeholder: ['Enter alias of your pet', 'Введіть кличку вашого улюбленця'],
			description_placeholder: ['Enter description of your pet', 'Введіть особливі звички вашого улюбленця'],
			breed_placeholder: ['Enter breed of your pet', 'Введіть породу вашого улюбленця'],
			
			gender: ['Gender', 'Стать'],
			breed: ['Breed', 'Порода'],
			male: ['Male', 'Чоловіча'],
			female: ['Female', 'Жіноча'],
			
			personal_info: ['Personal information', 'Особиста інформація'],
			edit: ['Edit', 'Редагувати'],
			
			temperature: ['Temperature', 'Температура'],
			pulse: ['Pulse', 'Пульс'],
			
			registration_date: ['Registration date', 'Дата реєстрації'],
			full_name: ['Full name', 'Повне ім\'я'],
			pets: ['Pets', 'Домашні тварини'],
			write_message: ['Write message', 'Написати повідомлення'],
			add_to_friends: [['Add to friends', 'Долучити до друзів'], ['Remove from friends', 'Видалити з друзів']],
			you: ['You', 'Ви'],
			no_messages: ['No messages yet...', 'Ще немає жодного повідомлення...'],
			search_on_map: ['Search on map', 'Пошук на карті'],
		},
	},
	methods: {
		getCurrentChatMessages: function() {
			if (!this.chats) {
				return null;
			}
			var current_chat_pos = -1;
			for (var i = 0; i < this.chats.length; ++i) {
				if (this.chats[i].id == this.current_chat) {
					current_chat_pos = i;
					break;
				}
			}
			if (0 <= current_chat_pos && current_chat_pos < this.chats.length) {
				return this.chats[current_chat_pos].messages;
			}				
			return null;
		},
		
		isActive: function(chat) {
			if (chat.id == this.current_chat) {
				return 'active_chat';
			}
			return '';
		},
		
		isSender: function(message) {
			return this.client.id == message.from_user_full.id;
		},
		
		getShortMessage: function(message) {
			if (!message || !message.message) {
				return this.literals.no_messages[this.language_id];
			}
			var s = '';
			if (this.isSender(message)) {
				s += this.literals.you[this.language_id] + ': ';
			}
			
			for (var i = 0; i < message.message.length; ++i) {
				if (message.message[i] == '\n' || message.message[i] == '\t') {
					s += ' ';
				} else {
					s += message.message[i];
				}
			}
			var max_length = 45;
			if (s.length > max_length) {
				s = s.substr(0, max_length - 3) + '...';
			}
			return s;
		},
		
		getShortTimestamp: function(message) {
			if (message) {
				return message.timestamp.substr(0, 10);
			}
			return '';
		},
		
		getLongTimestamp: function(message) {
			return message.timestamp.substr(11, 8) + ' | ' + this.getShortTimestamp(message);
		},
		
		getTypeMessage1: function(message) {
			if (this.isSender(message)) {
				return 'incoming_msg';
			}
			return 'outcoming_msg';
		},
		
		getTypeMessage2: function(message) {
			if (this.isSender(message)) {
				return 'received_msg';
			}
			return 'outgoing_msg';
		},
		
		getTypeMessage3: function(message) {
			if (this.isSender(message)) {
				return 'received_withd_msg';
			}
			return 'sent_msg';
		},
		
		getImgTypeMessage: function(message) {
			if (this.isSender(message)) {
				return 'incoming_msg_img';
			}
			return 'outgoing_msg_img';
		},
		
		getDisplayUser: function(user) {
			var system_id = 16;
			if (user.id == system_id) {
				return 'none';
			}
			return 'default';
		}
	},
	components: {'line-chart': line_chart_component}
});