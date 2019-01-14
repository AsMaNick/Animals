var line_chart_component = Vue.component('line-chart', {
  extends: VueChartJs.Scatter,
 
  methods: {
	  reloadPlot: function(temperatures, pulses, animation_time) {
		  this.renderChart({
			  datasets: [{
				showLine: true,
				label: 'Temperature',
				
				fill: false,
				borderColor: '#f87979',
				backgroundColor: '#f87979',
				data: temperatures
			  },
			  {
				showLine: true,
				label: 'Pulse',
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