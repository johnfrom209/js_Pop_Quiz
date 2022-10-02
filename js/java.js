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
        question: 'How do you all a local storage variable?',
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
    timeRemaining = 60;
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