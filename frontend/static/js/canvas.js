function reloadData() {
	var headers = { 'accept-language': getLanguage()};
	axios
		.get(vue_app.DOMAIN + '/api/pets/' + getHrefInfo() + '/logs/', 
			 {
				 headers: headers
			 })
		.then(response => {
			var temperatures = [];
			var pulses = [];
			for (var log of response.data) {
				var date = new Date(log.timestamp);
				temperatures.push({
					x: date, 
					y: log.temperature
				});
				pulses.push({
					x: date, 
					y: log.pulse
				});
			}
			vue_app.$refs.lineChart.reloadPlot(temperatures, pulses);
			timeout_id = setTimeout(function() {
				//reloadData();
			}, 10000000);
		});
}

var timeout_id = setTimeout(function() {
	reloadData();
}, 100);