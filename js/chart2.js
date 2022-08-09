const xmlhttp1 = new XMLHttpRequest();
const url1 = 'http://api.worldbank.org/v2/country/rw/indicator/NY.GDP.MKTP.CD?date=2000:2021&format=json';
xmlhttp1.open('GET', url1, true);
xmlhttp1.send();
var Labels1 = [];
var DataPoints = [];
var myChart1 = [];
// The second part takes the expected data for the x and y-axis if the connection to the data is successful.
xmlhttp1.onreadystatechange = function () {
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
const ctx1 = document.getElementById('myChart1').getContext('2d');
Labels1 = labelsDate;
DataPoints = labelsValues;
const config = {
    type: 'line',
    data: {
        labels: Labels1,
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
myChart1 = new Chart(ctx1, config);
 } 
}

function filterData1() {
    const Years3 = [...Labels1];
    const startYear1 = document.getElementById("startYear1");
    const endYear1 = document.getElementById("endYear1");
    const indexStartDate1 = Years3.indexOf(startYear1.value);
    const indexEndDate1 = Years3.indexOf(endYear1.value);
    const filterYears1 = Years3.slice(indexEndDate1,indexStartDate1+1);
    myChart1.config.data.labels = filterYears1;
    myChart1.update();
}