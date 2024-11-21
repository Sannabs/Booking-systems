    fetch('/bookings/booking-summary')
        .then(response => response.json())
        .then(data => {
            // Get the data for the bar chart
            const totalBookings = data.totalBookings;
            const totalPending = data.totalPending;
            const totalApproved = data.totalApproved;

            // Create the bar chart using Chart.js
            var ctx = document.getElementById('bookingBarChart').getContext('2d');
            var bookingBarChart = new Chart(ctx, {
                type: 'bar', // Bar chart
                data: {
                    labels: ['Total Bookings', 'Pending', 'Approved'], // Labels for the bars
                    datasets: [{
                        label: 'Bookings Analytics',
                        data: [totalBookings, totalPending, totalApproved], // The data for the bars
                        backgroundColor: [
                            'rgba(169, 169, 169, 0.5)', // Gray for total bookings
                            'rgba(255, 159, 64, 0.5)',  // Orange for pending bookings
                            'rgba(0, 200, 0, 0.5)'      // Green for approved bookings
                        ],
                        borderColor: [
                            'rgba(169, 169, 169, 1)', // Dark gray for total bookings border
                            'rgba(255, 159, 64, 1)',  // Dark orange for pending bookings border
                            'rgba(0, 128, 0, 1)'      // Dark green for approved bookings border
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Booking Categories' // Label for X-axis
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Count' // Label for Y-axis
                            },
                            beginAtZero: true // Ensure Y-axis starts from zero
                        }
                    },
                    plugins: {
                        tooltip: {
                            mode: 'index',
                            intersect: false,
                        },
                        legend: {
                            display: false, // Hide the legend if not needed
                        },
                    },
                }
            });
        })
        .catch(error => {
            console.error("Error fetching booking summary data:", error);
        });
