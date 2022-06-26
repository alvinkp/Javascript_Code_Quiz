//-------------------------------------- Global Variables ---------------------------------------------------------------------

//Audio files
// var audioBtnError = 
// var audioBtnSuccess =

//Stored HTML Elements Declarations
var myQuizContainer = document.querySelector("#quiz");
var myTimer = document.querySelector(".timer");
var timeRemaining = 120;
var pauseTimer = false;
var answerAttempt = false;
var myFirstTPoint;
var mySecondTPoint;


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
{question:"An ' else if ' statement is used to: ", answer1: "specify a new condition to test, if the first condition is false", answer2:"to specify many alternative blocks of code to be executed", answer3:"Check if an integer is greater than 10", answer4:"Check if a user enters a name in a form", correct:"specify a new condition to test, if the first condition is false"}
];

// ************************************** from W3DOCS: https://www.w3docs.com/snippets/javascript/how-to-randomize-shuffle-a-javascript-array.html
function shuffleArray(array) {
    var curId = array.length;
    // There remain elements to shuffle
    while (0 !== curId) {
      // Pick a remaining element
      var randId = Math.floor(Math.random() * curId);
      curId -= 1;
      // Swap it with the current element.
      var tmp = array[curId];
      array[curId] = array[randId];
      array[randId] = tmp;
    }
    return array;
  }

//-------------------------------------------- Functions -----------------------------------------------------------------------

// Prep questions Array
function setupTempArray(){
    var tempArray = JSON.parse(JSON.stringify(myQAArray));
    shuffleArray(tempArray);
    return tempArray;
}

// Store shuffled array
var myTempQAArray = setupTempArray();

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

//Event Delegate for myQuizContainer
myQuizContainer.onclick = function(event) {
    var answerBtn = event.target;

    if (!answerAttempt) {
        if (answerBtn.id === "correct") {
            console.log("Correct answer chosen");
            answerAttempt = true;
            answerBtn.setAttribute('class', 'expand');
            correctAnswer();
        } else if (answerBtn.id === "wrong") {
            console.log("Wrong Answer!");
            answerAttempt = true;
            wrongAnswer();
            answerBtn.setAttribute('class', 'shake');
            shakeTimer(answerBtn);
        } else {
            return;
        }
    }
    return;
}

// Handle Shake animation
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
    return;
  }


// Timer for button shake
function stopButtonShake(buttonToShake){
    buttonToShake.classList.remove('shake');
    return;
}

// Deduct time for incorrect answers
function wrongAnswer(){
    timeRemaining -= 5;
    if(timeRemaining === 0 || timeRemaining < 0){
    endOfQuizScreen(false);
    } else {
    myTimer.children[0].textContent = "Time left: " + timeRemaining;
    answerAttempt = false;
    }
}

// Next Question for Choosing a Correct answer
function correctAnswer(){
    if(myTempQAArray.length === 0){
        console.log("array has " + myTempQAArray.length + "questions left")
        var delay = 1;
        var delayTimer = setInterval(function() {
        delay--;
            if (delay === 0){
            clearInterval(delayTimer);
            pauseTimer = true;
            endOfQuizScreen(true);
            }
        }, 1000);
    } else {
        pauseTimer = true;
        var delay = 1;
        var delayTimer = setInterval(function() {
        delay--;
            if (delay === 0){
            clearInterval(delayTimer);
            generateQuestion();
            pauseTimer = false;
            startQuizTimer();
            answerAttempt = false;
            }
        }, 1000);
    }
}

// Change timer background color
function changeTimerColor(color){
    if(color === "green"){
        myTimer.setAttribute("class", "change-color-green");
    } else if(color === "yellow") {
        myTimer.classList.remove('change-color-green');
        myTimer.setAttribute("class", "change-color-yellow");
    } else {
        myTimer.classList.remove('change-color-yellow');
        myTimer.setAttribute("class" ,"change-color-red")
    }
}

// Set transition points for timer colors
function setTPoints(){
    myFirstTPoint = Math.floor(timeRemaining * .66);
    console.log(myFirstTPoint);
    mySecondTPoint = Math.floor(timeRemaining * .33);
    console.log(mySecondTPoint);
    return;
}

// Timer for Quiz
function startQuizTimer(){
    myTimer.classList.remove('hidden');
    myTimer.children[0].textContent = "Time left: " + timeRemaining;
    var quizTimer = setInterval(function() {
    timeRemaining--;
    
    if(pauseTimer){
        clearInterval(quizTimer);
    }else {
        if(timeRemaining === 0 || timeRemaining < 0){
            clearInterval(quizTimer);
            console.log("Time's UP!");
            var delay = 1;
            var delayTimer = setInterval(function() {
            delay--;
            if (delay === 0){
            clearInterval(delayTimer);
            endOfQuizScreen(false);
            }
        }, 1000);

        }else {
            myTimer.children[0].textContent = "Time left: " + timeRemaining;
            if(timeRemaining > myFirstTPoint){
                changeTimerColor("green");
            } else if (timeRemaining > mySecondTPoint){
                changeTimerColor("yellow");
            } else if(timeRemaining < mySecondTPoint){
                changeTimerColor("red");
            }
        }
    }
}, 1000);
return;
}


// Removes question and answers object from myTempQAArray
function removeQuestionFromArray(arrayToEdit){
    arrayToEdit.shift();
}

// assign "correct" or "wrong" id's to buttons
function flagCorrectButton(){
    var myButtons = document.querySelectorAll("button");
    for(var i = 0; i < myButtons.length; i++){
        if(myButtons[i].textContent === myTempQAArray[0].correct){
            myButtons[i].setAttribute("id", "correct");
        }else{
            myButtons[i].setAttribute("id", "wrong");
        }
    }
    removeQuestionFromArray(myTempQAArray);
    console.log(myTempQAArray.length);
    return;
}


// Generate the Question and Display it on the page along with the Answer Buttons
function generateQuestion(){
    removeElements(myQuizContainer);
    addToElement("h1", myQuizContainer, myTempQAArray[0].question);
    var answersArray = [myTempQAArray[0].answer1, myTempQAArray[0].answer2, myTempQAArray[0].answer3, myTempQAArray[0].answer4];
    for(var i = 0; i < 4; i++){
        addToElement("button", myQuizContainer, answersArray[i]);
    }
    flagCorrectButton();
    return;
}

// Start timer and generate first question
function startQuiz(){
    generateQuestion();
    setTPoints();
    myTimer.setAttribute("class", "change-color-green");
    pauseTimer = false;
    startQuizTimer();
}

// Create the start screen for the quiz
function createQuiz(){
    addToElement("h1", myQuizContainer, "Alvin's Javascript Quiz!");
    addToElement("p", myQuizContainer, "Try to answer code related questions within the time limit!");
    addToElement("button", myQuizContainer, "Start!");
    myQuizContainer.lastElementChild.setAttribute("id", "ignore");
    myQuizContainer.lastElementChild.setAttribute('onclick', 'startQuiz()');
    return;
}

// Resets the quiz if the player wants to try again
function resetQuiz(){
    removeElements(myQuizContainer);
    myTempQAArray = setupTempArray();
    myTimer.setAttribute('class', 'hidden');
    timeRemaining = 120;
    answerAttempt = false;
    myTimer.setAttribute("class", "hidden");
    createQuiz();
}

// add High Score to local storage
function addToHS(button){
console.log("Posted to Local Storage");
button.setAttribute('class', 'expand');
document.querySelector("#hs-form").remove();
addToElement("button", myQuizContainer, "Play Again");
myQuizContainer.lastElementChild.setAttribute("id", "ignore");
myQuizContainer.lastElementChild.setAttribute('onclick', 'resetQuiz()');
}

// Show form for highscore
function CreateHighscoreForm(){
    addToElement("div", myQuizContainer,"");
    var myDiv = myQuizContainer.lastElementChild;
    myDiv.setAttribute("id", "hs-form");
    addToElement("form", myDiv, "Enter your name here: ");
    var myForm = myQuizContainer.lastElementChild;
    myForm.setAttribute("method", "get");
    addToElement("input", myForm, "");
    addToElement("button", myForm, "Submit");
    myFormButton = myForm.lastElementChild;
    myFormButton.setAttribute("onclick", "addToHS(myFormButton)");
}

// End of Quiz Screen
function endOfQuizScreen(finishedInTime){
    removeElements(myQuizContainer);

    if(finishedInTime){
        addToElement("h1", myQuizContainer, "Congratulations! You've finished the Quiz!");
        addToElement("p", myQuizContainer, "Here's how you did!");
        addToElement("p", myQuizContainer, timeRemaining);
        CreateHighscoreForm();
        
    } else {
        myTimer.setAttribute('class', 'hidden');
        addToElement("h1", myQuizContainer, "You ran out of time!");
        addToElement("p", myQuizContainer, "Study hard and try again!");
        addToElement("button", myQuizContainer, "Play Again");
        myQuizContainer.lastElementChild.setAttribute("id", "ignore");
        myQuizContainer.lastElementChild.setAttribute('onclick', 'resetQuiz()');
    }
    return;
}


// Setup the quiz
createQuiz();