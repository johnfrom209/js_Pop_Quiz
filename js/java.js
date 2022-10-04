//create an array of questions with multiple choice
//radio button because checkbox will not be right 
//submit at the bottom
//display question and options to page
//if user chooses wrong decrease timer
//optional: give a shake or maybe a red highlight
//else move to next question
//repeat until end of quiz
//save score
// save this block for convient addition to the array of objects
// {
//     question: '',
//     a: '',
//     b: '',
//     c: '',
//     d: '',
//     correct: ''
// },


//array of objects with properties of question, a-d, and correct
const quizArray = [
    {
        question: 'What is javascript most used for?',
        a: 'Baking',
        b: 'Exercise',
        c: 'Note Taking',
        d: 'Dynamic WebPages',
        correct: 'd'
    },
    {
        question: 'When was javascript created?',
        a: '2000',
        b: '1995',
        c: '1700',
        d: '1990',
        correct: 'b'
    },
    {
        question: 'Who invented javascript?',
        a: 'Brendan Elch',
        b: 'Tom Hardy',
        c: 'Brendan Fraser',
        d: 'Grace Hopper',
        correct: 'a'
    },
    {
        question: 'How many days did it take to create javascript?',
        a: '1',
        b: '45',
        c: '10',
        d: '100',
        correct: 'c'
    },
    {
        question: 'Where does javascript run?',
        a: 'Track',
        b: 'Matrix',
        c: 'Server side',
        d: 'Client side',
        correct: 'd'
    },
    {
        question: 'Which is not a javascript dynamic capability?',
        a: 'Runtime Object Construction',
        b: 'Variable Parameter Lists',
        c: 'Function Variables',
        d: 'Hotspot Orient Junction',
        correct: 'd'
    },
    {
        question: 'How do you access the local storage?',
        a: 'localStorage.get()',
        b: 'localStorage.getItem()',
        c: 'localStorage.pull()',
        d: 'localStorage()',
        correct: 'b'
    },
    {
        question: 'How do you get document element by id?',
        a: 'document.getElementById("str")',
        b: 'doc.getEleId(str)',
        c: 'document.querySelectorAll(str)',
        d: 'document.querySelector(str)',
        correct: 'a'
    },
    {
        question: 'Which of these changes the text on the html?',
        a: 'ele.setAttribute(str)',
        b: 'ele = str',
        c: 'ele.setText = str',
        d: 'ele.textContent = str',
        correct: 'd'
    },
    {
        question: 'What does === check in JS?',
        a: 'Checks if two operands are equal',
        b: 'Checks if two operands are false',
        c: 'checks if two operands are equal in type and value',
        d: 'Sets the variables equal to each other',
        correct: 'c'
    },
]

//start btn on html
var startBtn = document.getElementById("btnStart");
//timer on html
var timer = document.getElementById("timer");
//question on html
var question = document.getElementById("question");
//all 4 of the options
const aText = document.getElementById("aText");
const bText = document.getElementById("dText");
const cText = document.getElementById("bText");
const dText = document.getElementById("cText");
//grabbing all class of options on the page
const answerEls = document.querySelectorAll(".options");
//the ul html
var cleanUl = document.getElementById("listed");
//grab the submit with id "submitScore"
let formUSubmit;
//score tracker
var score = 0;
//index for array
var indexQuiz = 0;
//is game started
var gameStarted = false;
//what did the user select
var userAnswer = undefined;
var timeRemaining = 0;

//on click start quiz and start timer
startBtn.addEventListener("click", () => {

    //if fresh load call countdown
    if (!gameStarted) {
        //start timer
        countdown();
        gameStarted = true;
        //submit and grab next question
        loadQuiz();
        //hide start btn
        // startBtn.setAttribute("hidden")

        startBtn.textContent = "Submit";
    }
    else {

        userAnswer = getUserAnswer();

        //just need to skip the first click 
        if (userAnswer) {
            userAnswer = getUserAnswer();
            //is set to undefined 
            if (userAnswer) {
                if (userAnswer === quizArray[indexQuiz].correct) {
                    score++;
                    var feedback = document.getElementById("feedback");
                    feedback.removeAttribute("hidden")
                    feedback.textContent = "Correct!"
                }
                else {
                    var feedback = document.getElementById("feedback");
                    feedback.removeAttribute("hidden")
                    feedback.textContent = "Wrong!"
                    //call the wrong function to lower time
                    userWrong();
                }

                //inc indexQuiz
                indexQuiz++;
                //checking if there are questions left in the array
                if (indexQuiz < quizArray.length) {
                    //loads next question
                    loadQuiz();
                }
                else {
                    //display score and ask for user initials
                    question.textContent = "All done";
                    //set start btn to reload page
                    startBtn.setAttribute("click", "location.reload()");
                }
            }
        }
    }

    //deselect radio on load
    userAnswer = deselectAnswer;

});

function countdown() {
    timeRemaining = 60;
    var timerInterval = setInterval(function () {
        //sub timer by 1 each interval
        timeRemaining -= 1;
        //set the new display in html
        timer.textContent = timeRemaining;
        //check if time is less than or equal to zero
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            timer.textContent = score + "/" + quizArray.length;
            //save to LS asking for initials
            askUser();
            //reset gamestarted
            gameStarted = false;
            //set start btn to reload page
            startBtn.removeAttribute("id");
            // startBtn.hidden = false;
            startBtn.textContent = "Reload"
            startBtn.setAttribute("onclick", "location.reload()");
        }
        //win condition
        else if (indexQuiz === quizArray.length) {
            clearInterval(timerInterval);
            timer.textContent = score + "/" + quizArray.length;
            // startBtn.hidden = false;
            startBtn.setAttribute("onclick", "location.reload()");
            startBtn.textContent = "Reload"
            //save to LS asking for initials
            askUser();
            //reset gameStarted
            gameStarted = false;
        }

    }, 1000);///1 sec interval
}//end countdown

function loadQuiz() {
    //deselect radio
    deselectAnswer();

    //grabs the object at index
    const displayedQuiz = quizArray[indexQuiz];
    //displays the question
    question.innerText = displayedQuiz.question;

    //possible to display randomly with caurosel  
    //sets the options 
    aText.innerText = displayedQuiz.a;
    cText.innerText = displayedQuiz.b;
    dText.innerText = displayedQuiz.c;
    bText.innerText = displayedQuiz.d;

}

//a function to get the id from the page if a radio is checked
function getUserAnswer() {
    let tempAnswer = undefined;

    //looping through all the .answer on the page
    answerEls.forEach(answerEl => {
        //if a radiobox is check return that id
        if (answerEl.checked) {
            tempAnswer = answerEl.id;
        }
    });
    return tempAnswer;
}

//a function to remove the check off the page
function deselectAnswer() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}

function userWrong() {

    timeRemaining -= 10;
    timer.textContent = timeRemaining;
    //maybe look into some feedback effect
    //like change border red and clock red for a sec
}

function saveToLS() {
    //debugger
    //create array for object with prop of initials and score
    var playedArray = [];
    //grab score from the form
    var user = document.getElementById("submitScore").value;

    //check if initials is filled
    if (user === "" || user === null) {
        question.textContent = "Enter your initials"
    }
    else {
        //create an object with properties to hold the user initials and score
        var listedScore = {
            initials: user,
            savedScore: score
        }
        if (JSON.parse(localStorage.getItem("PlayedArray")) === null) {
            playedArray.push(listedScore);
        }
        else {
            //pulling the LS saves
            playedArray = JSON.parse(localStorage.getItem("PlayedArray"));
            //push the new listedScore var
            playedArray.push(listedScore);
        }
        //saves to LocalStorage
        localStorage.setItem("PlayedArray", JSON.stringify(playedArray));
        loadFromLS();
    }
}

function loadFromLS() {
    //clear li
    cleanUl.textContent = "";

    question.textContent = "Here are the scores"
    //load LS

    //looping through the LS to display on page
    var played = JSON.parse(localStorage.getItem("PlayedArray"));
    console.log(played);
    for (var i = 0; i < played.length; i++) {
        // var temp = played[i];
        var li = document.createElement("li");
        li.textContent = played[i].initials + " " + played[i].savedScore;
        cleanUl.appendChild(li);
    }

    //replace the start to reload the page
    startBtn.setAttribute("click", "location.reload()");
}

function askUser() {
    //clear the display
    //cleanUl = document.getElementById("listed");
    cleanUl.textContent = "";
    question.textContent = "Save your score with your initials."

    //input ask for initials
    var userInitials = document.createElement("input");
    userInitials.setAttribute("type", "text");
    userInitials.setAttribute("class", "submit");
    userInitials.setAttribute("id", "submitScore");
    //create submit for form
    var formSubmit = document.createElement("input");
    formSubmit.setAttribute("type", "submit");
    formSubmit.setAttribute("value", "Submit Score");
    formSubmit.setAttribute("onclick", "saveToLS()")
    // formSubmit.setAttribute("id", "submitScore");

    cleanUl.appendChild(userInitials);
    cleanUl.appendChild(formSubmit);

    // formUSubmit = document.getElementById("submitScore");

}
