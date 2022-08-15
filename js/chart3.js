const xmlhttp2 = new XMLHttpRequest();
const url = 'https://api.worldbank.org/v2/country/ke/indicator/NY.GDP.MKTP.CD?date=2000:2021&format=json';
xmlhttp2.open('GET', url2, true);
xmlhttp2.send();
var Labels2 = [];
var DataPoints = [];
var myChart2 = [];
// The second part takes the expected data for the x and y-axis if the connection to the data is successful.
xmlhttp2.onreadystatechange = function () {
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
const ctx2 = document.getElementById('myChart2').getContext('2d');
Labels2 = labelsDate;
DataPoints = labelsValues;
const config = {
    type: 'line',
    data: {
        labels: Labels2,
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
myChart2 = new Chart(ctx2, config);
 } 
}

function filterData2() {
    const Years3 = [...Labels2];
    const startYear2 = document.getElementById("startYear2");
    const endYear2 = document.getElementById("endYear2");
    const indexStartDate2 = Years3.indexOf(startYear2.value);
    const indexEndDate2 = Years3.indexOf(endYear2.value);
    const filterYears2 = Years3.slice(indexEndDate2,indexStartDate2+1);
    myChart2.config.data.labels = filterYears2;
    myChart2.update();
}