Reveal.initialize();


// Method for debugging purposes only - Remember to comment this on release.
//Reveal.slide(12);


Reveal.configure({
	keyboard: {
		8: function() { Reveal.slide( 0 ) },
	}
})



function exec1()
{
	var ctx = document.getElementById('graph1').getContext('2d');
	var chart = new Chart(ctx, {
	    // The type of chart we want to create
	    type: 'pie',

	    // The data for our dataset
	    data: {
	        labels: ["Si", "No"],
	        datasets: [{
	            label: "My First dataset",
	            backgroundColor: ['rgb(198, 79, 67)','rgb(248, 246, 196)'],
	            borderColor: 'rgb(198, 79, 67)',
	            data: [70,30],
	        }]
	    },

	    // Configuration options go here
	    options: {}
	});
}

function exec2()
{
	var ctx = document.getElementById('graph2').getContext('2d');
	var lineChart = new Chart(ctx, {
	  type: 'line',
	  data: {
	    labels: ["Nivel 1", "Nivel 2", "Nivel 3", "Nivel 4", "Nivel 5", "Nivel 6", "Nivel 7", "Nivel 8", "Nivel 9", "Nivel 10", "Nivel 11"],
	    datasets: [
	      {
	        label: "Flujo",
	        data: [2,4,6,8,8,9,10,10,12,13,11],
	        backgroundColor: ['rgba(198, 79, 67, 0.2)'],
	        borderColor: 'rgb(198, 79, 67)',
	      }
	    ]
	  },
	  options: {
		legend: {
			labels: {
				fontColor: "white"
			}
		}
	  }
	}
	);
}

Reveal.addEventListener( 'graph1start', function() {
    exec1();
} );

Reveal.addEventListener( 'graph2start', function() {
    exec2();
} );


