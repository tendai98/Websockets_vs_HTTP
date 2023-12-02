// Get canvas element
const ctx = document.getElementById('profileChart').getContext('2d');
const data = []
const labels = []


const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Update Analysis Profile',
            data: data,
            borderColor: 'blue',
            fill: false
        }]
    },
    options: {
        responsive: true,
        title: {
            display: true,
            text: 'Line Graph of DeltaY Over Time'
        },
        scales: {
            xAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Time'
                }
            }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'DeltaY'
                }
            }]
        }
    }
});


function updateChart(deltaTimeDataPoints){
    
    const YAxisLabels = [];

    for (let i = 0; i < MAX_SAMPLE_COUNT; i++) {
        YAxisLabels.push(i);
    }

    myChart.data.labels = YAxisLabels
    myChart.data.datasets[0].data = deltaTimeDataPoints
    myChart.update()
}
