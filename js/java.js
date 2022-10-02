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
        correct: 'Dynamic WebPages'
    },
    {
        question: 'When was javascript created?',
        a: '2000',
        b: '1995',
        c: '1700',
        d: '1990',
        correct: '1995'
    },
    {
        question: 'Who invented javascript?',
        a: 'Brendan Elch',
        b: 'Tom Hardy',
        c: 'Brendan Fraser',
        d: 'Grace Hopper',
        correct: 'Brendan Elch'
    },
    {
        question: 'How many days did it take to create javascript?',
        a: '1',
        b: '45',
        c: '10',
        d: '100',
        correct: '10'
    },
    {
        question: 'Where does javascript run?',
        a: 'Track',
        b: 'Matrix',
        c: 'Server side',
        d: 'Client side',
        correct: 'Client side'
    },
    {
        question: '',
        a: '',
        b: '',
        c: '',
        d: '',
        correct: ''
    },
    {
        question: '',
        a: '',
        b: '',
        c: '',
        d: '',
        correct: ''
    },
    {
        question: '',
        a: '',
        b: '',
        c: '',
        d: '',
        correct: ''
    },
    {
        question: '',
        a: '',
        b: '',
        c: '',
        d: '',
        correct: ''
    },
    {
        question: '',
        a: '',
        b: '',
        c: '',
        d: '',
        correct: ''
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
//grabbing all answer elements on the page
const answerEls = document.querySelectorAll(".answer");
//score tracker
var score = 0;
//index for array
var indexQuiz = 0;
//is game started
var gameStarted = false;
//what did the user select
var userAnswer = 0;
var timeRemaining = 0;
//on click start quiz and start timer
startBtn.addEventListener("click", () => {

    //if fresh load call countdown
    if (!gameStarted) {
        //start timer
        countdown();
        gameStarted = true;
    }
    //just need to skip the first click 
    if (userAnswer !== 0) {
        const tempAnswer = getUserAnswer();
        //is set to undefined 
        if (tempAnswer) {
            if (tempAnswer === quizArray[indexQuiz].correct) {
                score++;
            }
            else {
                //call the wrong function to lower time
                userWrong();
            }

            //inc indexQuiz
            indexQuiz++;
            //checking if there are questions left in the array
            if (indexQuiz < quizArray.length) {
                loadQuiz();
            }
            else {
                //display score and ask for user initials
            }
        }
    }

    //submit and grab next question
    loadQuiz();
});

function countdown() {
    timeRemaining = 10;
    var timerInterval = setInterval(function () {
        //sub timer by 1 each interval
        timeRemaining -= 1;
        //set the new display in html
        timer.textContent = timeRemaining;
        //check if time is equal to zero
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            timer.textContent = "Game is Over";
            //TODO: 
            //save to LS asking for initials
            //reset gamestarted
        }
        //win condition
        else if (indexQuiz === quizArray.length) {
            clearInterval(timerInterval);
            timer.textContent = "Game is Over";
            //TODO: 
            //save to LS asking for initials
            //reset gameStarted
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
    timeRemaining -= 15;
    timer.textContent = timeRemaining;
    //maybe look into some feedback effect
    //like change border red and clock red for a sec

}