let end;
let start;

let minimum;
let maximum;
let average;

let index = 1;

const limit = 3000; // 3 seconds in milliseconds

let results = [];

var chart = Highcharts.chart('chart', {
  title: {
    text: 'Results'
  },
  subtitle: {
    text: 'Subtitle text'
  },
  yAxis: {
    text: 'Time interval in seconds'
  },
  xAxis: {
    tickInterval: 1
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle'
  },
  plotOptions: {
    series: {
      label: {
        connectorAllowed: false
      },
      pointStart: 0
    }
  },
  series: [{
    name: 'Attempts',
    data: []
  }],
  responsive: {
    rules: [{
      condition: {
        maxWidth: 500
      },
      chartOptions: {
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom'
        }
      }
    }]
  }
});


function newAttempt() {
  if (button.innerHTML == "Start") {
    button.innerHTML = "Stop";
    start = Date.now();
  } else {
    button.innerHTML = "Start";
    end = Date.now();
    let timeElapsed = (end - start);
    
    let difference = Math.abs(limit - timeElapsed);
    console.log(difference + " ------------------ ");

    switch(true) {
        case (difference == 0):
            console.log("green " + difference);
            break;
        case (0 < difference && difference < 200):
            console.log("blue " + difference);
            break;
        case (200 < difference && difference < 500):
            console.log("yellow " + difference);
            break;
        case (difference >= 500):
            console.log("red " + difference);
            break;
        default:
            console.log("red " + difference);
            break;
    }

    chart.series[0].addPoint([index, difference / 1000]);

    document.getElementById('resultTableBody').append("<tr><th scope='row'>" + index + "</th><td>" + start + "</td><td>" + end + "</td><td>" + difference + "</td></tr>");

    results.push(difference);

    if (difference < minimum) {
      minimum = difference;
    }

    if (difference > maximum) {
      maximum = difference;
    }

    let sum;

    for (var i = 0; i < results.length; i++) {
      sum += i;
    }

    average = sum / index;

    $("#totalInfo").text("Min: " + minimum + " - Max: " + maximum + " - Average: " + average);

    index += 1;
  }
}