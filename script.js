let end;
let start;

let minimum = 0;
let maximum = 0;
let sum = 0;
let average;

let index = 1;

const limit = 3000; // 3 seconds in milliseconds

let results = [];

var chart = Highcharts.chart('chart', {
  title: {
    text: 'Results'
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
  },
  credits: {
    enabled: false
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

    switch(true) {
        case (difference == 0):
            $("#button").removeClass("btn-danger");
            $("#button").removeClass("btn-warning");
            $("#button").removeClass("btn-primary");
            $("#button").addClass("btn-success");
            break;
        case (0 < difference && difference < 200):
            $("#button").removeClass("btn-danger");
            $("#button").removeClass("btn-warning");
            $("#button").addClass("btn-primary");
            $("#button").removeClass("btn-success");
            break;
        case (200 < difference && difference < 500):
            $("#button").removeClass("btn-danger");
            $("#button").addClass("btn-warning");
            $("#button").removeClass("btn-primary");
            $("#button").removeClass("btn-success");
            break;
        case (difference >= 500):
            $("#button").addClass("btn-danger");
            $("#button").removeClass("btn-warning");
            $("#button").removeClass("btn-primary");
            $("#button").removeClass("btn-success");
            break;
        default:
            $("#button").addClass("btn-danger");
            $("#button").removeClass("btn-warning");
            $("#button").removeClass("btn-primary");
            $("#button").removeClass("btn-success");
            break;
    }

    chart.series[0].addPoint([index, difference / 1000]);

    let startTime = new Date(start).toString();
    let endTime = new Date(end).toString();

    $("#resultTableBody").append("<tr><th scope='row'>" + index + "</th><td>" + startTime + "</td><td>" + endTime + "</td><td>" + difference + " ms</td></tr>");

    results.push(difference);

    if (difference < minimum || minimum == 0) {
      minimum = difference;
    }

    if (difference > maximum || maximum == 0) {
      maximum = difference;
    }

    sum += difference;

    average = sum / index;

    $("#totalInfo").text("Min: " + minimum / 1000 + " - Max: " + maximum / 1000 + " - Average: " + average / 1000 + " - Total Attempts: " + index);

    $("#resultTarget").text("Difference: " + difference + " ms")

    index += 1;
  }
}