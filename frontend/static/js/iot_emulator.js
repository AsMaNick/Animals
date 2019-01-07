var vue_app = new Vue({
	el: '.table',
	data: {
		pets: [],
	}
});

function loadPets() {
	axios
		.get('http://127.0.0.1:8000/api/pets/')
		.then(response => {
			vue_app.pets = response.data;
		});
}

loadPets();

function addLeadingZeros(s, cnt) {
	s = s.toString();
	while (s.length < cnt) {
		s = '0' + s;
	}
	return s;
}

function getDateTime() {
	var cur = new Date();
	res = '' + cur.getFullYear() + '-' + addLeadingZeros(cur.getMonth() + 1, 2) + '-' + addLeadingZeros(cur.getDate(), 2) + 'T';
	res += addLeadingZeros(cur.getHours(), 2) + ':' + addLeadingZeros(cur.getMinutes(), 2) + ':' + addLeadingZeros(cur.getSeconds(), 2) + 'Z';
	return res;
}

function uploadData() {
	var headers = {'Content-Type': 'application/json'};
	for (var pet of vue_app.pets) {
		var id = pet.id;
		var temperature = document.getElementById("temperature_" + id.toString()).value;
		var pulse = document.getElementById("pulse_" + id.toString()).value;
		var data = {
			'temperature': temperature,
			'pulse': pulse,
			'timestamp': getDateTime()
		};
		console.log(data);
		axios
			.post('http://127.0.0.1:8000/api/pets/' + id.toString() + '/logs/', JSON.stringify(data), {
																					headers: headers
																				})
			.then(response => {
				console.log(response.data);
			});
	}
}

setInterval(function() {
	uploadData();
}, 10000);