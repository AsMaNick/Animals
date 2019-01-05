var app = new Vue({
  el: '#app',
  data() {
	return {
	  client: JSON.parse(localStorage['client'])
	};
  }
});

var app2 = new Vue({
  el: '#pets',
  data: {
	pets: [],
	title: 'My pets'
  },
  mounted() {
	axios
	  .get('http://127.0.0.1:8000/api/clients/' + JSON.parse(localStorage['client']).id.toString() + '/pets/')
	  .then(response => {
		this.pets = response.data;
	  });
  },
  methods: {
    show_pet: function (event) {
      //console.log(this);
      //console.log(event.target.name);
    }
  }
});

function logout() {
	localStorage.removeItem('client');
	window.location.href += '/../base.html';
}