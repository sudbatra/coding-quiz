var timeLeft = document.querySelector("#timeLeft");
var timer = document.querySelector("#startTime");
var questionsList = document.querySelector("#questionsList");
var wrapper = document.querySelector("#wrapper");
var score = 0;
var questionsIndex = 0; 

//Time and the deductions 
var presentTime = 51;
var holdInterval = 0;
var penalty = 10;

var optionsUl = document.createElement("ul");

var questions = [
    {
        title: "Commonly used Data types DO NOT include",
        options: ["Strings", "Booleans", "Alerts", "Numbers"],
        answer: "String"
    },
    {
        title: "Condition in an If/Else statement enclosed with",
        options: ["Quotes", "Curly Brackets", "Paranthesis", "Square Brackets"],
        answer: "Parenthesis"
    },
    {
        title: "Array in a JavaScript can be used to store",
        options: ["Numbers & Strings", "Other Arrays", "Booleans", "All of the above"],
        answer: "All of the above"
    },
    {
        title: "String valued must be enclosed within _____ when being assigned to variables",
        options: ["Commas", "Curly Brackets", "Quotes", "Parantheses"],
        answer: "Quotes"
    },
    {
        title: "A very useful tool during development and debugging for printing content to the debuger is:",
        options: ["Java Script", "Terminal Bash", "For Loops", "Console.log"],
        answer: "Console.log"
    }
];

timer.addEventListener("click", function(){
    if (holdInterval ===0){
        holdInterval = setInterval(function(){
            presentTime--;
            timeRemaining.textContent = presentTime;

            if (presentTime <= 0){
                clearInterval(holdInterval);
                completeQuiz();
                timeRemaining.textContent = "Whoops! You rant out of time."
            }
        }, 1000);
    }
    wrapper.style.display = "none";
    render(questionsIndex);
});

function render(questionsIndex){
    questionsList.innerHTML="";
    questionsList.className = "quiz-question";
    optionsUl.innerHTML = "";
    
        var userQuestions = questions[questionsIndex].title;
        var userChoices = questions[questionsIndex].options;
        questionsList.textContent = userQuestions;
    
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.className = "list-item";
        listItem.textContent = newItem;
        optionsUl.append(listItem);
       // questions.appendChild(optionsUl);
      //  optionsUl.appendChild(listItem);
        listItem.addEventListener("click", (check));
        
    })

    questionsList.append(optionsUl)

}
function check(event){
    var tomatoes = event.target;
    
    if (tomatoes.matches("li")) {
        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        if (tomatoes.textContent == questions[questionsIndex].answer){
            score++;
            createDiv.textContent = "Wrong answer!";
        }
    }

    questionsIndex++;

    if (questionsIndex >= questions.length){
        completeQuiz();
        //createDiv.textContent = "Your score is: " + score;
    }
    else{
        render(questionsIndex);
    }
    questionsList.appendChild(createDiv);
}


function completeQuiz(){
    questionsList.innerHTML="";
    timeRemaining.innerHTML = "";

    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsList.appendChild(createP);
    if (presentTime >= 0) {
        var timeLeft = presentTime;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your Final Score Is: " + timeLeft;

        questionsList.append(createP2);
    }

    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your name";
    

    questionsList.appendChild(createLabel);

    var addInput = document.createElement("input");
    addInput.setAttribute("type", "text");
    addInput.setAttribute("id", "name");
    addInput.textContent = "";

    questionsList.appendChild(addInput);

    var subInput = document.createElement("button");
    subInput.setAttribute("type", "submit");
    subInput.setAttribute("id", "Submit");
    subInput.textContent = "Submit";

    questionsList.appendChild(subInput);

  


    subInput.addEventListener("click", function () {
        var name = addInput.value;

        if (name === null) {

            alert("Nothing was added");

        } else {
            var finalScore = {
                name: name,
                score: presentTime
            }
            console.log(finalScore);
            var totalScore = localStorage.getItem("totalScore");
            if (totalScore === null) {
                totalScore = [];
            } else {
                totalScore = JSON.parse(totalScore);
            }

            // [{}, {}, {}]
            totalScore.push(finalScore);
            var newScore = JSON.stringify(totalScore);
            localStorage.setItem("totalScore", newScore);
            window.location.replace("high-score.html");
        }
    });
}
