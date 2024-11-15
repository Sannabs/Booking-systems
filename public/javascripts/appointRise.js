var ctx = document.getElementById('bookingLineGraph').getContext('2d');
var bookingLineGraph = new Chart(ctx, {
    type: 'line', // Line chart to show rise and fall over time
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Example: Months of the year
        datasets: [{
            label: 'Bookings Over Time',
            data: [15, 25, 30, 20, 40, 35, 50, 45, 60, 55, 65, 70], // Example data: Number of bookings per month
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)', // Line color
            tension: 0.1, // Smooth line
            borderWidth: 2,
        }]
    },
    options: {
        responsive: true, // Ensures responsiveness
        maintainAspectRatio: false, // Allows resizing to fit container
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Months' // X-axis represents months
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Bookings' // Y-axis represents number of bookings
                },
                beginAtZero: true // Start Y-axis from 0
            }
        },
        plugins: {
            tooltip: {
                mode: 'index',
                intersect: false,
            },
            legend: {
                position: 'top',
            },
        },
    }
});
