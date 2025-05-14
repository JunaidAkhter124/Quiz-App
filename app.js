var questions = [];
var quesElement = document.getElementById("ques");
var option1 = document.getElementById("opt1");
var option2 = document.getElementById("opt2");
var option3 = document.getElementById("opt3");
var index = 0;
var score = 0;
var timer = document.getElementById("timer");
var min = 1;
var sec = 59;

function startQuiz() {
  
  firebase.database().ref('questions').once('value').then(function(snapshot) {
    questions = snapshot.val();
    if (!questions || questions.length === 0) {
      var cardBody = document.querySelector('.card-body');
      cardBody.innerHTML = '<div class="alert alert-danger">No questions found in the database.</div>';
      return;
    }
    index = 0;
    score = 0;
    min = 1;
    sec = 59;
    nextQuestion();
  }).catch(function(error) {
    var cardBody = document.querySelector('.card-body');
    cardBody.innerHTML = '<div class="alert alert-danger">Failed to load questions from Firebase.<br>' + error + '</div>';
  });
}

setInterval(function () {
  timer.innerHTML = `${min} : ${sec}`;
  sec--;
  if (sec < 0) {
    min--;
    sec = 59;
    if (min < 0) {
      min = 1;
      sec = 59;
      nextQuestion();
    }
  }
}, 100);

function nextQuestion() {
  min = 1;
  sec = 59;
  var nextBtn = document.getElementById("btn");
  var allOptions = document.getElementsByTagName("input");
  for (var i = 0; i < allOptions.length; i++) {
    if (allOptions[i].checked) {
      allOptions[i].checked = false;
      var selectedValue = allOptions[i].value;
      var selectedOption = questions[index - 1][`option${selectedValue}`];
      var correctAnswer = questions[index - 1]["corrAnswer"];
      if (selectedOption === correctAnswer) {
        score++;
      }
    }
  }
  nextBtn.disabled = true;
  if (index > questions.length - 1) {
    var percentageScore = ((score / questions.length) * 100).toFixed(2);
    var cardBody = document.querySelector(".card-body");
    cardBody.innerHTML = "";
    var scoreH2 = document.createElement("h2");
    scoreH2.textContent = "Quiz Finished!";
    scoreH2.className = "card-title text-success";
    var scoreP = document.createElement("p");
    scoreP.className = "card-text lead";
    scoreP.textContent = "Your score is: " + percentageScore + "% (" + score + " out of " + questions.length + ")";
    cardBody.appendChild(scoreH2);
    cardBody.appendChild(scoreP);
  } else {
    quesElement.innerText = questions[index].question;
    option1.innerText = questions[index].option1;
    option2.innerText = questions[index].option2;
    option3.innerText = questions[index].option3;
    index++;
  }
}

function clicked() {
  var nextBtn = document.getElementById("btn");
  nextBtn.disabled = false;
}
