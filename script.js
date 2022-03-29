let end;
let start;

let attempts = [];

const limit = 3000; // 3 seconds in milliseconds

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

    attempt = document.createElement("li");
    text = document.createTextNode(difference);
    attempt.appendChild(text);

    document.getElementById('resultsList').appendChild(attempt);


    //attempts.push({'timeAttempted': start, 'result': timeElapsed});
  }
}