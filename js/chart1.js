const xmlhttp = new XMLHttpRequest();
const url = 'http://api.worldbank.org/v2/country/ke/indicator/NY.GDP.MKTP.CD?date=2000:2021&format=json';
xmlhttp.open('GET', url, true);
xmlhttp.send();
// The second part takes the expected data for the x and y-axis if the connection to the data is successful.
var Labels = [];
var DataPoints = [];
var myChart = [];
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        const dataPoints = JSON.parse(this.responseText);
        const labelsDate = dataPoints[1].map(
            function (index) {
                return index.date;
            });
        const labelsValues = dataPoints[1].map(
            function (index) {
                return index.value;
            });
const ctx = document.getElementById('myChart').getContext('2d');
Labels = labelsDate;
DataPoints = labelsValues;
const config = {
    type: 'line',
    data: {
        labels: Labels,
        datasets: [{
            label: 'GDP in USD',
            data: DataPoints,
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
  };
  myChart = new Chart(ctx, config);
 } 
}

function filterData() {
    const Years2 = [...Labels];
    const startYear = document.getElementById("startYear");
    const endYear = document.getElementById("endYear");
    const indexStartDate = Years2.indexOf(startYear.value);
    const indexEndDate = Years2.indexOf(endYear.value);
    const filterYears = Years2.slice(indexEndDate,indexStartDate+1);
    myChart.config.data.labels = filterYears;
    myChart.update();
}