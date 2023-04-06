let questioncount = document.querySelector(".count span");
let spans = document.querySelector(".spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let bullets = document.querySelector(".bullets");
let results = document.querySelector(".results");
// option
let currentIndex = 0;
let rightAnswers = 0;
let countdownInteval;

function getquestions() {
  let req = new XMLHttpRequest();
  req.open("GET", "./html_question.json", true);
  req.send();
  req.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObject = JSON.parse(this.responseText);
      let qcount = questionsObject.length;

      // bn3ml al bullets wel rkam al fo2
      createcountandbullets(qcount);

      // hn3ml al so2al we n7to
      addQuestionData(questionsObject[currentIndex], qcount);

      // clcick on submit
      submitButton.onclick = () => {
        let Ranswer = questionsObject[currentIndex].right_answer;

        // increase index
        currentIndex++;
        // check the answer
        checkAnswer(Ranswer, qcount);
        quizArea.innerHTML = " ";
        answersArea.innerHTML = " ";

        addQuestionData(questionsObject[currentIndex], qcount);

        // handel span bullets class
        handlebullets();

        // show results
        showResults(qcount);
      };
    }
  };
}
getquestions();

let createcountandbullets = function (num) {
  questioncount.innerHTML = num;

  // create spans bullets
  for (i = 0; i < num; i++) {
    let theBullet = document.createElement("span");
    if (i === 0) {
      theBullet.className = "on";
    }
    spans.appendChild(theBullet);
  }
};

function addQuestionData(obj, count) {
  if (currentIndex < count) {
    if (currentIndex < count) {
      // Create H2 Question Title
      let questionTitle = document.createElement("h2");

      // Create Question Text
      let questionText = document.createTextNode(obj["title"]);

      // Append Text To H2
      questionTitle.appendChild(questionText);

      // Append The H2 To The Quiz Area
      quizArea.appendChild(questionTitle);

      for (let i = 1; i <= 4; i++) {
        // create div
        let mydiv = document.createElement("div");
        mydiv.className = "answer";

        // create radio
        let radioInput = document.createElement("input");
        radioInput.name = "question";
        radioInput.type = "radio";
        radioInput.id = `answer_${i}`;
        radioInput.dataset.answer = obj[`answer_${i}`];
        if (i === 1) {
          radioInput.checked = true;
        }
        // create label
        let mylabel = document.createElement("label");
        mylabel.htmlFor = `answer_${i}`;
        let mylabeltext = document.createTextNode(obj[`answer_${i}`]);
        mylabel.appendChild(mylabeltext);

        mydiv.appendChild(radioInput);
        mydiv.appendChild(mylabel);
        answersArea.appendChild(mydiv);
      }
    }
  }
}

function checkAnswer(Ranswer, count) {
  let answers = document.getElementsByName("question");
  let thechoosenAnswer;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      thechoosenAnswer = answers[i].dataset.answer;
    }
  }
  console.log(`right ${Ranswer}`);
  console.log(`choosen ${thechoosenAnswer}`);

  if (Ranswer === thechoosenAnswer) {
    rightAnswers++;
    console.log("good answer");
  }
}
function handlebullets() {
  let bulletsSpans = document.querySelectorAll(".bullets .spans span");
  let arrayOfSpans = Array.from(bulletsSpans);
  arrayOfSpans.forEach((span, index) => {
    if (currentIndex === index) {
      span.className = "on";
    }
  });
}
function showResults(count) {
  let theResults;
  if (currentIndex === count) {
    quizArea.remove();
    answersArea.remove();
    submitButton.remove();
    bullets.remove();

    if (rightAnswers > count / 2 && rightAnswers < count) {
      theResults = `<span class='good'>Good</span>, ${rightAnswers} from ${count} is good`;
    } else if (rightAnswers === count) {
      theResults = `<span class='perfect'>perfect</span>, All is good`;
    } else {
      theResults = `<span class='bad'>bad</span>, ${rightAnswers} from ${count} `;
    }
    results.innerHTML = theResults;
  }
}
function countdown(duration, count) {
  if (currentIndex < count) {
    let minutes, secounds;
    countdownInteval = setInterval(function () {
      minutes = parseInt(duration / 60);
    }, 1000);
  }
}
