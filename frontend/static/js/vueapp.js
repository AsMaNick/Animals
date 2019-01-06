var vue_app = new Vue({
	el: '#vueapp',
	data: {
		pet: null,
		pet_id: null,
		pets: [],
		client: getClient(),
		language_id: getLanguageId(getLanguage()),
		add_edit_type: 0,
		
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
			search: ['Search', 'Пошук'],
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
			edit: ['Edit', 'Редагувати']
		},
	}
});