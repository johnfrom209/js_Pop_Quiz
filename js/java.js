//array of objects with properties of question, a-d, and correct
const quizArray = [
    {
        question: 'This is the first question?',
        a: 'oihynhlk',
        b: 'aaaa',
        c: 'iiii',
        correct: 'iiii'
    }]

//start btn on html
var startBtn = document.getElementById("btnStart");
//timer on html
var timer = document.getElementById("timer");
//question on html
var question = document.getElementById("question");
//all 4 of the options
const aText = document.getElementById("aText")
const bText = document.getElementById("dText")
const cText = document.getElementById("bText")
const dText = document.getElementById("cText")
//score tracker
var score = 0;
//index for array
var indexQuiz = 0;
//is game started
var gameStarted = false;
//what did the user select
var userAnswer = 0;
//on click start quiz and start timer
startBtn.addEventListener("click", () => {

    //if fresh load call countdown
    if (!gameStarted) {
        //start timer
        countdown();
    }

    if (userAnswer !== 0) {
        getUserAnswer();
    }

    //submit and grab next question
    loadQuiz();
});
//create an array of questions with multiple choice
//radio button because checkbox will not be right 
//submit at the bottom
//display question and options to page
//if user chooses wrong decrease timer
//optional: give a shake or maybe a red highlight
//else move to next question
//repeat until end of quiz
//save score

function countdown() {
    timer = 60;
    var timerInterval = setInterval(function () {
        //sub timer by 1 each interval
        timer -= 1;
        //set the new display in html
        timer.textContent = timer;
        //check if time is equal to zero
        if (timer <= 0) {
            timer.textContent = "Game is Over";
            //TODO: 
            //save to LS asking for initials
        }
        //win condition
        else if (indexQuiz === quizArray.length) {
            timer.textContent = "Game is Over";
            //TODO: 
            //save to LS asking for initials
        }

    }, 1000);///1 sec interval
}//end countdown

function loadQuiz() {
    //deselect radio

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

