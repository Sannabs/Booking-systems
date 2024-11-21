document.addEventListener("DOMContentLoaded", () => {
    const chartContainer = document.getElementById("bookingTrendChart");
    const periodSelector = document.getElementById("trendPeriod");

    // Initialize chart
    let bookingTrendChart;

    const fetchAndRenderData = async (period = "daily") => {
        try {
            const response = await fetch(`/bookings/trends?period=${period}`);
            const data = await response.json();

            const labels = data.map((item) => item._id);
            const values = data.map((item) => item.totalBookings);

            // If chart exists, destroy and recreate with new data
            if (bookingTrendChart) bookingTrendChart.destroy();

            bookingTrendChart = new Chart(chartContainer, {
                type: "line",
                data: {
                    labels,
                    datasets: [
                        {
                            label: `Booking Trends (${period})`,
                            data: values,
                            backgroundColor: "rgba(54, 162, 235, 0.2)",
                            borderColor: "rgba(54, 162, 235, 1)",
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    responsive: true,
                    scales: {
                        x: { 
                            title: { display: true, text: "Timeframe" },
                            ticks: { autoSkip: true, maxTicksLimit: 20 },
                        },
                        y: { title: { display: true, text: "Bookings" } },
                    },
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (tooltipItem) {
                                    return `Bookings: ${tooltipItem.raw}`;
                                }
                            }
                        }
                    },
                    interaction: {
                        mode: "nearest",
                        axis: "x",
                        intersect: false
                    }
                },
            });
        } catch (error) {
            console.error("Error fetching trends:", error);
        }
    };

    // Event listener for period change
    periodSelector.addEventListener("change", (e) => {
        fetchAndRenderData(e.target.value);
    });

    // Initial load
    fetchAndRenderData();
});
