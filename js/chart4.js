const xmlhttp3 = new XMLHttpRequest();
const url = 'https://api.worldbank.org/v2/country/ke/indicator/NY.GDP.MKTP.CD?date=2000:2021&format=json';
xmlhttp3.open('GET', url3, true);
xmlhttp3.send();
var Labels3 = [];
var DataPoints = [];
var myChart3 = [];
// The second part takes the expected data for the x and y-axis if the connection to the data is successful.
xmlhttp3.onreadystatechange = function () {
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
const ctx3 = document.getElementById('myChart3').getContext('2d');
Labels3 = labelsDate;
DataPoints = labelsValues;
const config = {
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
  };
myChart3 = new Chart(ctx3, config);
 } 
}

function filterData3() {
    const Years3 = [...Labels3];
    const startYear3 = document.getElementById("startYear3");
    const endYear3 = document.getElementById("endYear3");
    const indexStartDate3 = Years3.indexOf(startYear3.value);
    const indexEndDate3 = Years3.indexOf(endYear3.value);
    const filterYears3 = Years3.slice(indexEndDate3,indexStartDate3+1);
    myChart3.config.data.labels = filterYears3;
    myChart3.update();
}