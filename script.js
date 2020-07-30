function Quiz(questions) {
    this.score = 75;
    this.questions = questions;
    this.questionIndex = 0;
}
 
Quiz.prototype.getQuestionIndex = function() {
    return this.questions[this.questionIndex];
}
 
Quiz.prototype.guess = function(answer) {
    if(this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score = this.score + 10;
    } else {
        this.score = this.score - 10;
    }
 
    this.questionIndex++;
}
 
Quiz.prototype.isEnded = function() {
    return this.questionIndex === this.questions.length;
}
 
 
function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
 
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}

// var timer = setInterval(populate, 1000);
 
function populate() {
    if(quiz.isEnded() || quiz.score == 0) {
        showScores();
    }
    else {
        document.getElementById("timer").value = quiz.score;
        quiz.score--;
        // show question
        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;
 
        // show options
        var choices = quiz.getQuestionIndex().choices;
        for(var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }
 
        showProgress();
    }
};
 
function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function() {
        quiz.guess(guess);
        populate();
    }
};
 
 
function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};
 
function showScores() {
    // var createTextBox = document.createElement('INPUT');
    // createTextBox.type='text';
    // document.body.appendChild(createTextBox);
    // document.getElementById('userName').style.visibility = "visible"
    clearInterval(timer);
    document.getElementById("timer").value = "";
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += 'Name: <input id="userName" type="text"/>';
    gameOverHTML += '<button id="submit" onclick="submit()">Submit</button>';
    gameOverHTML += "Your scores: " + quiz.score;
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

function submit() {
    var user = document.getElementById('userName').value;
    storeHighscore(user, quiz.score);
}


function storeHighscore(name, score) {
    console.log("storeHigh")
    var highScores = "";
    if (localStorage.getItem("highscore") !== null) {
        highScores = localStorage.getItem("highscore");
        console.log(highScores);
        highScores = highScores + `,${name}=${score.toString()}`;
    } else {
        highScores = highScores + `${name}=${score.toString()}`;
    }
    localStorage.setItem("highscore", highScores);
    window.location.href = "highscore.html";
}
 
// create questions here
var questions = [
    new Question("Hyper Text Markup Language Stand For?", ["JavaScript", "XHTML","CSS", "HTML"], "HTML"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery","Django", "NodeJS"], "Django"),
    new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("Webdevtrick.com is about..", ["Web Design", "Graphic Design", "SEO & Development", "All"], "All")
];
 
// create quiz
var quiz = new Quiz(questions);
 
// display quiz
var timer = setInterval(populate, 1000);
