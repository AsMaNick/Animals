var kharkiv = {
	lat: 50.0065934, 
	lng: 36.2345583
}

var map;

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: {
			lat: 50.0065934, 
			lng: 36.2345583
		},
		zoom: 8
	});
	
	var marker = new google.maps.Marker({position: kharkiv, map: map});
	
	var user = getClient();
	
	var contentString = '<a href="./viewuser.html?{0}"> <img src="{1}{2}" class="img-circle pet_small_photo"> </a>'.format(user.id, vue_app.DOMAIN, user.avatar) +
		'<a href="./viewuser.html?{0}"> {1} {2} </a>'.format(user.id, user.name, user.surname);

	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});
	
	marker.addListener('click', function() {
		infowindow.open(map, marker);
	});
}