# js_Pop_Quiz

## Description

In this project I wanted to put my knowledge of javascript to the test, by creating a test. I set up a simple HTML to display information on the screen and styled it with CSS. Once the start button is click the javascript file takes over and displays a question and list some options for the user to choose. At the end you can submit your score and track how well you've done.

Here is a screenshot of a quiz in progress:
![Screenshot](./images/jsQuizRun.png)

Here is a screenshot of the score board:
![Screenshot](./images/jsQuizScores.png)

Here is a snippet of code from the project that displays scores from the local storage. With this I was able to pull all local data and display it to the screen. I grabed the properties from the objects in the array and created a li and displayed it to the screen by appending it to the the ul on the page.

```javascript
//looping through the LS to display on page
    var played = JSON.parse(localStorage.getItem("PlayedArray"));

    for (var i = 0; i < played.length; i++) {
        // var temp = played[i];
        var li = document.createElement("li");
        li.textContent = played[i].initials + " " + played[i].savedScore;
        cleanUl.appendChild(li);
    }

```
Here is the function I used to dispaly the questions and four options. The first thing I did was make sure the radio buttons were deselected for the next set of questions. After that I use global variables to keep track of which question to display and the options that go with the question.

```javascript
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
```


## Installation

No installation required. Simply go to github page.

Here is the link to see how I built the webpage with HTML, CSS, and javasript.

[Github Repo](https://github.com/johnfrom209/js_Pop_Quiz)

[Deployed Page](https://johnfrom209.github.io/js_Pop_Quiz/)

## Usage

By going to the deployed page link, you can try out your knowledge about javascript on my quiz. Start by clicking on the "Start" button. Once you click the start button an event listener will start a timer. Then the js file grabs the first question and the options that come with the quesion. Clicking the submit button will compare the value of the selected answer and increase or decrease the score depending if you were right or wrong. After that another question is displayed on the screen until there are none left or you run out of time. At the end, you can submit your score to be saved on your local storage, which gets displayed after initials are submitted. On the score screen there is a button to refresch the page and start the quiz over. 

## Credits

NA

## Contact Me

[Linkedin](https://www.linkedin.com/in/johnfrom209/)

[View my Github Repo](https://github.com/johnfrom209)

## License

Refer to the license in the Github repo.
