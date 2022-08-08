const xmlhttp = new XMLHttpRequest();
const url = 'http://api.worldbank.org/v2/country/ke/indicator/NY.GDP.MKTP.CD?date=2000:2021&format=json';
xmlhttp.open('GET', url, true);
xmlhttp.send();
// The second part takes the expected data for the x and y-axis if the connection to the data is successful.
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        const dataPoints = JSON.parse(this.responseText);
        const labelsDate = dataPoints[1].map(
            function (index) {
                return index.date
            });
        const labelsValues = dataPoints[1].map(
            function (index) {
                return index.value;
            });
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labelsDate,
        datasets: [{
            label: 'GDP in USD',
            data: labelsValues,
            backgroundColor: "#ff335e",
            fill: true
        }]
    },
    options: {
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Years'
                }
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'GDP Amount (in US Dollars)'
                }
            }
        }
    }
  });
 } 
}