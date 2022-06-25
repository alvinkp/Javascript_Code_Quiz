//-------------------------------------- Global Variables ---------------------------------------------------------------------

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
{question:"How do you add an item to the end of an array?", answer1: "array.addEnd(item)", answer2:"array.slice(item)", answer3:"array.unshift(item)", answer4:"array.push(item)", correct:"array.push(item)"},
{question:"Which of the following is not a feature of Javascript?", answer1: "Lightweight", answer2:"Complementary to HTML", answer3:"Statically Typed", answer4:"Open Source Cross-Platform", correct:"Statically Typed"},
{question:"What does the isNaN() function do?", answer1: "Adds two numbers together", answer2:"Checks if a value is a Number", answer3:"Checks if a value is bread", answer4:"Returns the Next Available Number", correct:"Checks if a value is a Number"},
{question:"An 'else if' statement is used to: ", answer1: "specify a new condition to test, if the first condition is false", answer2:"to specify many alternative blocks of code to be executed", answer3:"Check if an integer is greater than 10", answer4:"Check if a user enters a name in a form", correct:"specify a new condition to test, if the first condition is false"}
];

//-------------------------------------------- Functions -----------------------------------------------------------------------

//Creates and adds an element to an existing element in the document. (myElementType = html element you want to create ::string::, myElementToAppend = html element you want to attach the newly created element to ::string::, myText = the content you want to exist in the element that you created ::string::) 
function addToElement(myElementType, myElementToAppend, myText){
    var myTempElement = document.createElement(myElementType)
    myTempElement.textContent = myText;
    myElementToAppend.appendChild(myTempElement);
    return;
}

//Removes elements from a provided html element. (myElementToClear = parent html element that you want to remove it's children from ::string::)
function removeElements(myElementToClear){
    var numElements = myElementToClear.children.length;
    for(var i = 0; i < numElements; i++){
        myElementToClear.children[0].remove();
    }
    return;
}

//Event Delegate for myQuizStart
myQuizStart.onclick = function(event) {
    var answerBtn = event.target;

    if(answerBtn.id === "correct"){
        console.log("Correct answer chosen");
    }else if(answerBtn.id === "wrong"){
        console.log("Wrong Answer!");
        answerBtn.setAttribute('class', 'shake');
        shakeTimer(answerBtn);
    }else{
        return;
    }
    return;
}


function shakeTimer(targetButton) {
    var secondsLeft = 2;
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      secondsLeft--;
  
      if(secondsLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        // Calls function to create and append image
        stopButtonShake(targetButton);
      }
  
    }, 250);
  }


// Timer for button shake
function stopButtonShake(buttonToShake){
console.log("Shaking!")
buttonToShake.classList.remove('shake');
}

// 
function flagCorrectButton(index){
    var myButtons = document.querySelectorAll("button");
    for(var i = 0; i < myButtons.length; i++){
        if(myButtons[i].textContent === myQAArray[index].correct){
            myButtons[i].setAttribute("id", "correct");
        }else{
            myButtons[i].setAttribute("id", "wrong");
        }
    }
    return;
}

function generateQuestion(myQAIndex){
    removeElements(myQuizStart);
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
    myQuizStart.lastElementChild.setAttribute("id", "ignore");
    myQuizStart.lastElementChild.setAttribute('onclick', 'generateQuestion(Math.floor(Math.random() * myQAArray.length))');
    return;
}


// Setup main section
createQuiz();