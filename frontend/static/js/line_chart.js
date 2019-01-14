var line_chart_component = Vue.component('line-chart', {
  extends: VueChartJs.Scatter,
 
  methods: {
	  reloadPlot: function(temperatures, pulses, animation_time) {
		  this.renderChart({
			  datasets: [{
				showLine: true,
				label: vue_app.literals.temperature[vue_app.language_id],
				
				fill: false,
				borderColor: '#f87979',
				backgroundColor: '#f87979',
				data: temperatures
			  },
			  {
				showLine: true,
				label: vue_app.literals.pulse[vue_app.language_id],
				fill: false,
				borderColor: '#7acbf9',
				backgroundColor: '#7acbf9',
				data: pulses
			  }]
			}, {
				responsive: true, 
				maintainAspectRatio: false, 
				scales: {
					xAxes: [{
						type: 'time',
						time: {
							displayFormats: {
								quarter: 'MMM YYYY'
							}
						},
					}]
				},
				animation: {
					duration: animation_time
				}
			})
	  }
  }  
})