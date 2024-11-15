var ctx = document.getElementById('appointmentChart').getContext('2d');
var appointmentChart = new Chart(ctx, {
    type: 'bar', 
    data: {
        labels: ['Pending', 'Approved', 'Completed', 'Cancelled'], 
        datasets: [{
            label: 'Number of Appointments',
            data: [8, 15, 20, 5], 
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)', 
                'rgba(54, 162, 235, 0.2)', 
                'rgba(75, 192, 192, 0.2)', 
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)', 
                'rgba(54, 162, 235, 1)', 
                'rgba(75, 192, 192, 1)', 
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false, // Disable aspect ratio preservation for container resizing
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
