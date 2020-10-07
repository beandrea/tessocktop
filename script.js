var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts",
    },
    {
        question:
            "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses",
    },
];

var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");

var questionIndex = 0;
var correctCount = 0;
var time = 10;
var intervalId;

function endQuiz() {
    clearInterval(intervalId);
    var body = document.body;
    body.innerHTML = "Game over, You scored " + correctCount;
    setTimeout(showHighScore, 2);
}

/*
<div class="input-group mb-3">
  <div class="input-group-prepend">
    <span class="input-group-text" id="inputGroup-sizing-default">Default</span>
  </div>
  <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
</div>

*/
function showHighScore() {
    var inputGp = document.createElement("div");
    inputGp.setAttribute("class", "input-group mb-3");
    document.body.appendChild(inputGp);

    var prepend = document.createElement("div");
    prepend.setAttribute("class", "input-group-prepend");
    inputGp.appendChild(prepend);

    var inputGpTxt = document.createElement("span");
    inputGpTxt.setAttribute("class", "input-group-text");
    inputGpTxt.setAttribute("id", "inputGroup-sizing-default");
    inputGpTxt.textContent = "Enter your initials: ";
    prepend.appendChild(inputGpTxt);

    var inputBox = document.createElement("input");
    inputBox.setAttribute("type", "text");
    inputBox.setAttribute("class", "form-control");
    inputGp.appendChild(inputBox);

    inputBox.addEventListener("input", function (e) {
        
    });

    var high_scores = localStorage.getItem("scores");

    if (!high_scores) {
        high_scores = [];
    } else {
        high_scores = JSON.parse(high_scores);
    }

    high_scores.push({ name: name, score: correctCount });

    localStorage.setItem("scores", JSON.stringify(high_scores));

    high_scores.sort(function (a, b) {
        return b.score - a.score;
    });

    var contentUL = document.createElement("ul");

    for (var i = 0; i < high_scores.length; i++) {
        var contentLI = document.createElement("li");
        contentLI.textContent =
            "Name: " + high_scores[i].name + " Score: " + high_scores[i].score;
        contentUL.appendChild(contentLI);
    }

    document.body.appendChild(contentUL);
}

function updateTime() {
    time--;
    timerEl.textContent = time;
    if (time <= 0) {
        endQuiz();
    }
}

function renderQuestion() {

    if (time == 0) {
        updateTime();
        return;
    }

    intervalId = setInterval(updateTime, 1000);
    questionEl.textContent = questions[questionIndex].question;

    optionListEl.innerHTML = "";
    questionResultEl.innerHTML = "";

    var choices = questions[questionIndex].choices;
    var choicesLenth = choices.length;

    for (var i = 0; i < choicesLenth; i++) {
        var questionListItem = document.createElement("li");
        questionListItem.setAttribute("class", "list-group-item");
        questionListItem.textContent = choices[i];
        optionListEl.append(questionListItem);
    }
}

function nextQuestion() {
    questionIndex++;
    if (questionIndex === questions.length) {
        time = 0;
    }
    renderQuestion();
}

function checkAnswer(event) {
    clearInterval(intervalId);
    if (event.target.matches("li")) {
        var answer = event.target.textContent;
        if (answer === questions[questionIndex].answer) {
            questionResultEl.textContent = "Correct";
            correctCount++;
        } else {
            questionResultEl.textContent = "Incorrect";
            time = time - 2;
            timerEl.textContent = time;
        }
    }
    setTimeout(nextQuestion, 2000);
}

renderQuestion();
optionListEl.addEventListener("click", checkAnswer);