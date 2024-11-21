
    fetch('/bookings/analytics/data?period=daily') // Change this to 'weekly', 'monthly', etc. as needed
        .then(response => response.json())
        .then(data => {
            const labels = data.map(item => item._id); // X-axis labels (dates, weeks, etc.)
            const bookings = data.map(item => item.totalBookings); // Y-axis data (total bookings)

            var ctx = document.getElementById('bookingLineGraph').getContext('2d');
            var bookingLineGraph = new Chart(ctx, {
                type: 'line', // Line chart to show rise and fall over time
                data: {
                    labels: labels, // Dynamic labels based on the fetched data
                    datasets: [{
                        label: 'Rise and Fall in Booking',
                        data: bookings, // Dynamic data based on the fetched data
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
                                text: 'Time' // X-axis represents time (months, weeks, etc.)
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
        })
        .catch(error => {
            console.error("Error fetching analytics data:", error);
        });
