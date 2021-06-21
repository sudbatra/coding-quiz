var highScore = document.querySelector("#highScore");
var clear = document.querySelector("#clear");
var mainPage = document.querySelector("#mainPage");

// To clear the Highscore Board

clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

// To load score from the  main JS
var totalScore = localStorage.getItem("totalScore");
totalScore = JSON.parse(totalScore);
console.log(totalScore)

if (totalScore !== null){
    
    for (i =0; i <totalScore.length; i++){
        var nameList = document.createElement("li");
        
        nameList.textContent = totalScore[i].name+ " " + totalScore[i].score;
        highScore.appendChild(nameList);
    }
}