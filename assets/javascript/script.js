//Stored HTML Elements Declarations
var myQuizStart = document.querySelector("#quiz-start");
var myQuestion = document.querySelector("#display-question");
var myQuizEnd = document.querySelector("#quiz-end");
var myHighScore = document.querySelector("#highscore");

//Stored Questions
var myQuestions = [
    "How do you print to the console?", 
    "A boolean is a variable that: "];

var myAnswers = [
    {A:"console.log", B:"print:", C:"console.print", D:"print.console"},
    {A: "Returns True or False", B:"Returns a random number", C:"Returns the length of an array", D:"Returns an image size"}];

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
}

function createQuiz(){
    addToElement("h1", myQuizStart, "Alvin's Javascript Quiz!");
    addToElement("p", myQuizStart, "Try to answer code related questions within the time limit!");
    addToElement("button", myQuizStart, "Start!");
    myQuizStart.lastElementChild.setAttribute('onclick', 'generateQuestion(0)');
    return;
}

function generateQuestion(myQAIndex){
    removeElements(myQuizStart);
    addToElement("h1", myQuizStart, myQuestions[myQAIndex]);
    var answersArray = Object.values(myAnswers[myQAIndex]);
    console.log(answersArray);
    for(var i = 0; i<4; i++){
        addToElement("button", myQuizStart, answersArray[i]);
}
return;
}

// Setup main section
createQuiz();

