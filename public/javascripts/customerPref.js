document.addEventListener("DOMContentLoaded", () => {
    const chartContainer = document.getElementById("mostBookedServicesChart");

    // Initialize chart
    let mostBookedServicesChart;

    // Fetch and render most booked services
    const fetchAndRenderMostBookedServices = async () => {
        try {
            const response = await fetch("/bookings/most-booked");
            const data = await response.json();

            const labels = data.map((item) => item._id); // Service names
            const values = data.map((item) => item.count); // Booking counts

            // If chart exists, destroy and recreate with new data
            if (mostBookedServicesChart) mostBookedServicesChart.destroy();

            mostBookedServicesChart = new Chart(chartContainer, {
                type: "pie",  // Change chart type to 'pie'
                data: {
                    labels,
                    datasets: [
                        {
                            label: "Most Booked Services",
                            data: values,
                            backgroundColor: [
                                "rgba(75, 192, 192, 0.2)",
                                "rgba(255, 99, 132, 0.2)",
                                "rgba(54, 162, 235, 0.2)",
                                "rgba(255, 159, 64, 0.2)",
                                "rgba(153, 102, 255, 0.2)",
                                "rgba(255, 159, 64, 0.2)",
                            ], // Colors for the slices
                            borderColor: [
                                "rgba(75, 192, 192, 1)",
                                "rgba(255, 99, 132, 1)",
                                "rgba(54, 162, 235, 1)",
                                "rgba(255, 159, 64, 1)",
                                "rgba(153, 102, 255, 1)",
                                "rgba(255, 159, 64, 1)",
                            ], // Border colors for the slices
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (tooltipItem) {
                                    return `Bookings: ${tooltipItem.raw}`;
                                },
                            },
                        },
                        legend: {
                            position: "top",  // Position the legend at the top of the chart
                        },
                        title: {
                            display: true,  // Display the title
                            text: "Most Booked Services",  // Set the title text
                            font: {
                                size: 18,  // Adjust the title font size
                                weight: 'bold',  // Make the title bold
                            },
                            padding: {
                                top: 20,  // Add space above the title
                                bottom: 20,  // Add space below the title
                            },
                        },
                    },
                    layout: {
                        padding: {
                            bottom: 30,  // Add space at the bottom of the chart (adjust as needed)
                        },
                    },
                },
            });
        } catch (error) {
            console.error("Error fetching most booked services:", error);
        }
    };

    // Initial load
    fetchAndRenderMostBookedServices();
});
