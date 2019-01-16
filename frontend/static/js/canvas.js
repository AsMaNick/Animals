function reloadData(animation_time) {
	if (!vue_app.$refs.lineChart) {
		return;
	}
	clearInterval(interval_reload_data);
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
			vue_app.$refs.lineChart.reloadPlot(temperatures, pulses, animation_time);
		});
}

var interval_reload_data = setInterval(function() { reloadData(1000); }, 50);