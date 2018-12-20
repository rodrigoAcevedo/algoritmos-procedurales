Reveal.initialize();


// Method for debugging purposes only - Remember to comment this on release.
Reveal.slide(10);

/*
Reveal.configure({
	keyboard: {
		8: function() { Reveal.slide( 0 ) },
	}
})
*/


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
	            backgroundColor: ['rgb(255, 0, 0)','rgb(0, 0, 255)'],
	            borderColor: 'rgb(255, 99, 132)',
	            data: [70,30],
	        }]
	    },

	    // Configuration options go here
	    options: {}
	});
}

Reveal.addEventListener( 'graph1start', function() {
    exec1();
} );

