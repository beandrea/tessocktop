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

var questionEl = $("#question");
var optionListEl = $("#option-list");
var questionResultEl = $("#question-result");
var timerEl = $("#timer");
var body = document.body;

var questionIndex = 0;
var correctCount = 0;
var time = 10;
var intervalId;

function endQuiz() {
    clearInterval(intervalId);

    body.innerHTML = "Game over, You scored " + correctCount;
    setTimeout(showHighScore, 2);
}

function showHighScore() {
    var inputGp = $("div");
    inputGp.setAttribute("class", "input-group mb-3");
    body.append(inputGp);

    var prepend = $("div");
    prepend.setAttribute("class", "input-group-prepend");
    inputGp.append(prepend);

    var inputGpTxt = $("span");
    inputGpTxt.setAttribute("class", "input-group-text");
    inputGpTxt.setAttribute("id", "inputGroup-sizing-default");
    inputGpTxt.text("Enter your initials: ");
    prepend.append(inputGpTxt);

    var inputBox = $("input");
    inputBox.setAttribute("type", "text");
    inputBox.setAttribute("class", "form-control");
    inputGp.append(inputBox);

    var btnDiv = $("div");
    btnDiv.setAttribute("class", "input-group-append");
    inputGp.append(btnDiv);

    var btnClass = $("button");
    btnClass.setAttribute("class", "btn btn-outline-secondary");
    btnClass.setAttribute("type", "button");
    btnClass.setAttribute("id", "button-addon2");
    btnClass.text("Submit");
    btnDiv.append(btnClass);

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

    var contentUL = $("ul");
    contentUL.setAttribute("class", "text-center");

    for (var i = 0; i < high_scores.length; i++) {
        var contentLI = $("li");
        contentLI.setAttribute("class", "text-left m-0-auto");
        contentLI.text("Name: " + high_scores[i].name + " Score: " + high_scores[i].score);
        contentUL.append(contentLI);
    }

    document.body.append(contentUL);
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
    questionEl.text(questions[questionIndex].question);

    optionListEl.innerHTML = "";
    questionResultEl.innerHTML = "";

    var choices = questions[questionIndex].choices;
    var choicesLenth = choices.length;

    for (var i = 0; i < choicesLenth; i++) {
        var questionListItem = $("li");
        questionListItem.setAttribute("class", "list-group-item");
        questionListItem.text(choices[i]);
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