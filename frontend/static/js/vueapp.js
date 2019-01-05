var vue_app = new Vue({
	el: '#vueapp',
	data: {
		language_id: getLanguageId(getLanguage()),
		literals: {
			languages: ['english', 'українська'],
			sign_up: ['Sign Up', 'Зареєструватися'],
			login: ['Login', 'Увійти'],
			
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
		},
	}
});