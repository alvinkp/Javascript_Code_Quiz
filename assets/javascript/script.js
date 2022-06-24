//Stored HTML Elements Declarations
var myQuizStart = document.querySelector("#quiz-start");
var myQuestion = document.querySelector("#display-question");
var myQuizEnd = document.querySelector("#quiz-end");
var myHighScore = document.querySelector("#highscore");

// Question and Answer Object Array
var myQAArray = [
{question:"How do you print to the console?", answer1: "console.log", answer2:"print:", answer3:"console.print", answer4:"print.console", correct: "console.log"}, 
{question:"A boolean is a variable that: ", answer1: "Returns True or False", answer2:"Returns a random number", answer3:"Returns the length of an array", answer4:"Returns an image size", correct: "Returns True or False"},
{question:"Which one of the following is not a Javascript Data Type?", answer1: "Object", answer2:"Undefined", answer3:"HTML", answer4:"String", correct:"HTML"},
{question:"Which company developed Javascript?", answer1: "Microsoft", answer2:"Java Inc.", answer3:"Apple", answer4:"Netscape", correct:"Netscape"},
{question:"What is 'this' keyword in Javascript?", answer1: "An alternate to 'that' keyword", answer2:"It refers to the object from where it was called", answer3:"It returns the result of a math function", answer4:"It refers to the variable that is most important in your code", correct:"It refers to the object from where it was called"},
{question:"Which is NOT a type of Javascript pop up box?", answer1: "Alert", answer2:"Pop", answer3:"Confirm", answer4:"Prompt", correct:"Pop"},
];

//Functions
function addToElement(myElementType, myElementToAppend, myText){
    var myTempElement = document.createElement(myElementType)
    myTempElement.textContent = myText;
    myElementToAppend.appendChild(myTempElement);
    return;
}

function removeElements(myElementToClear){
    var numElements = myElementToClear.children.length;
    for(var i = 0; i < numElements; i++){
        myElementToClear.children[0].remove();
    }
    return;
}

myQuizStart.onclick = function(event) {
    var answerBtn = event.target;
    if(answerBtn.className === "ignore"){
        return;
    }
    else if(answerBtn.className === "correct"){
        console.log("Correct answer chosen");
    }else{
        console.log("Wrong Answer!");
    }
}

function flagCorrectButton(index){
    var myButtons = document.querySelectorAll("button");
    for(var i = 0; i < myButtons.length; i++){
        if(myButtons[i].textContent === myQAArray[index].correct){
            myButtons[i].setAttribute("class", "correct");
        }
    }
    return;
}

function generateQuestion(myQAIndex){
    removeElements(myQuizStart);
    console.log(myQAArray[myQAIndex].question);
    addToElement("h1", myQuizStart, myQAArray[myQAIndex].question);
    var answersArray = [myQAArray[myQAIndex].answer1, myQAArray[myQAIndex].answer2, myQAArray[myQAIndex].answer3, myQAArray[myQAIndex].answer4];
    for(var i = 0; i < 4; i++){
        addToElement("button", myQuizStart, answersArray[i]);
    }
    flagCorrectButton(myQAIndex);
    return;
}

function createQuiz(){
    addToElement("h1", myQuizStart, "Alvin's Javascript Quiz!");
    addToElement("p", myQuizStart, "Try to answer code related questions within the time limit!");
    addToElement("button", myQuizStart, "Start!");
    myQuizStart.lastElementChild.setAttribute("class", "ignore");
    myQuizStart.lastElementChild.setAttribute('onclick', 'generateQuestion(Math.floor(Math.random() * myQAArray.length))');
    return;
}


// Setup main section
createQuiz();