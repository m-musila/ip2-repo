// const coin[]
const per_day = document.getElementById("24hr");
const per_week = document.getElementById("week");
const per_month = document.getElementById("month");


// Fetch data from API
// const historic_url = `https://api.coingecko.com/api/v3/coins/${key}/market_chart?vs_currency=usd&days=${days}`;
// const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";


// let days = 7;
let id = "bitcoin"
let interval = "daily"

let new_prices=[]
var date;

function getTime(date, days){
  // var days ;
  let time =
      date.getHours() > 12
        ? `${date.getHours() - 12}:${date.getMinutes()} PM`
        : `${date.getHours()}:${date.getMinutes()} AM`;
    return days < 2 ? time : date.toLocaleDateString();
}


const day_url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=1&interval=hourly`;
const week_url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`;
const month_url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=weekly`;



async function getDayData() {

  const response = await fetch(day_url);
  const data = await response.json();

  const prices = data['prices'];

  for(let num=0; num<prices.length;num++){
    date = new Date(prices[num][0]);
    newDate = getTime(date, 1)
    new_prices.push([newDate,prices[num][1]])
    // console.log(date)

}
}

async function getWeekData() {

  const response = await fetch(week_url);
  const data = await response.json();

  const prices = data['prices'];

  for(let num=0; num<prices.length;num++){
    let date = new Date(prices[num][0]);
    newDate = getTime(date, 7)
    new_prices.push([newDate,prices[num][1]])
    // console.log(date)

}
}

async function getMonthData() {

  const response = await fetch(month_url);
  const data = await response.json();

  const prices = data['prices'];

  for(let num=0; num<prices.length;num++){
    let date = new Date(prices[num][0]);
    newDate = getTime(date, 30)
    new_prices.push([newDate,prices[num][1]])
    // console.log(date)

}


  }
 // console.log(new_prices);
  // let date = new Date(prices[num]);
  // function getTime(date) {
  //
  //   let time =
  //     date.getHours() > 12
  //       ? `${date.getHours() - 12}:${date.getMinutes()} PM`
  //       : `${date.getHours()}:${date.getMinutes()} AM`;
  //   return days === 1 ? time : date.toLocaleDateString();

  // }

  // const {key = data[0].id;
  // console.log(key);

  let day_labels=[]
  let day_values=[]

  let week_labels=[]
  let week_values=[]

  let month_labels=[]
  let month_values=[]

  function clearArray(){
    day_labels=[]
    day_values=[]
    week_labels=[]
    week_values=[]
    month_labels=[]
    month_values=[]
    new_prices = [];
  }

  per_week.addEventListener("click", () => {


    destroyChart();
    clearArray()
    hello(week_labels, week_values);

  })

  per_day.addEventListener("click", () => {

    destroyChart();
    clearArray()
    hello(day_labels, day_values);

  })

  per_month.addEventListener("click", () => {

    destroyChart();
    clearArray()
    hello(month_labels, month_values);

  })



hello()




async function getValuesDay(){

  await  getDayData();

  for(let i=0; i< new_prices.length;i++){
    // console.log(new_prices[i][0])
    day_labels.push(new_prices[i][0])
    day_values.push(new_prices[i][1])
  }

}

async function getValuesWeek(){

  await  getWeekData();

  for(let i=0; i< new_prices.length;i++){
    // console.log(new_prices[i][0])
    week_labels.push(new_prices[i][0])
    week_values.push(new_prices[i][1])
  }

}

async function getValuesMonth(){

  await  getMonthData();

  for(let i=0; i< new_prices.length;i++){
    // console.log(new_prices[i][0])
    month_labels.push(new_prices[i][0])
    month_values.push(new_prices[i][1])
  }

}





async function hello(labels, values){

  if (labels === undefined) {
    labels = day_labels;
    values = day_values;
  }

  if (labels === day_labels ) {
    await getValuesDay();

  } else if (labels === week_labels) {
    await getValuesWeek();
  } else {
    await getValuesMonth();
  }{

  }

  const data = {
      labels: labels,
      datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      data: values,
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
  };

  window.myChart = new Chart(
     document.getElementById('dayChart'),
     config
   );

}

function destroyChart() {
  myChart.destroy();
  // delete myChart;
}







        // data={
        //         labels: data.map((coin) => {
        //           let date = new Date(coin[0]);
        //           let time =
        //             date.getHours() > 12
        //               ? `${date.getHours() - 12}:${date.getMinutes()} PM`
        //               : `${date.getHours()}:${date.getMinutes()} AM`;
        //           return days === 1 ? time : date.toLocaleDateString();
        //         }),
        //
        //         datasets: [
        //           {
        //             data: historicData.map((coin) => coin[1]),
        //             label: `Price ( Past ${days} Days ) in ${currency}`,
        //             borderColor: "#EEBC1D",
        //           },
        //         ],
        //
        //     }
