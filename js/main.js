Reveal.initialize();


// Method for debugging purposes only - Remember to comment this on release.
Reveal.slide(11);

/*
Reveal.configure({
	keyboard: {
		8: function() { Reveal.slide( 0 ) },
	}
})
*/


function exec1()
{
	console.info("Titolog");
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

Reveal.addEventListener( 'graph1start', function() {
    exec1();
} );

