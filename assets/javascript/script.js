//Stored HTML Elements Declarations
var myQuizStart = document.querySelector("#quiz-start");
var myQuestion = document.querySelector("#display-question");
var myQuizEnd = document.querySelector("#quiz-end");
var myHighScore = document.querySelector("#highscore");
console.log(myQuizStart);

//Functions
function addToElement(myElementType, myElementToAppend, myText){
    var myTempElement = document.createElement(myElementType)
    myTempElement.textContent = myText;
    myElementToAppend.appendChild(myTempElement);
    return;
}

function startQuiz(){
    addToElement("h1", myQuizStart, "Alvin's Javascript Quiz!");
    addToElement("p", myQuizStart, "Try to answer code related questions within the time limit!");
    addToElement("button", myQuizStart, "Start!");
}

startQuiz();