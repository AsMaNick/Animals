var kharkiv = {
	lat: 50.0065934, 
	lng: 36.2345583
}

var map;
var last_infowindow = null;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: kharkiv,
		zoom: 8
	});
	
	var headers = { 'accept-language': getLanguage()};
	axios
		.get(vue_app.DOMAIN + '/api/clients/', 
			 {
				 headers: headers
			 })
		.then(response => {
			for (var user of response.data) {
				if (user.lat !== null && user.lng != null) {
					var marker = new google.maps.Marker({
						position: {
							lat: user.lat,
							lng: user.lng
						}, 
						map: map,
						label: ['', 'M'][(user.id == getClient().id) ? 1 : 0]
					});
					var contentString = '<a href="./viewuser.html?{0}"> <img src="{1}{2}" class="img-circle pet_small_photo"> </a>'.format(user.id, vue_app.DOMAIN, user.avatar) +
						'<a href="./viewuser.html?{0}"> {1} {2} </a>'.format(user.id, user.name, user.surname);

					var infowindow = new google.maps.InfoWindow({
						content: contentString
					});
					
					marker.infowindow = infowindow;

					//finally call the explicit infowindow object
					marker.addListener('click', function() {
						if (last_infowindow) {
							last_infowindow.close();
						}
						last_infowindow = this.infowindow;
						return this.infowindow.open(map, this);
					})
				}
			}
		});
}