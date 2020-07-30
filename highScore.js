function displayHighscore() {
    var highscores = localStorage.getItem('highscore');
    console.log(highscores);
    var userScores = highscores.split(",");
    var html = "<h1>Result</h1>";
    userScores.forEach(userScore => {
        var user = userScore.split("=")[0];
        var score = userScore.split("=")[1];
        html += `Name: ${user} Score: ${score} <br>`;
    })
    
    var element = document.getElementById("highscores");
    element.innerHTML = html;

    document.getElementById("table").value = highscores;
}

function clearHighscores() {
    localStorage.clear();
    location.reload();
}

displayHighscore();
