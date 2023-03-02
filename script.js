//Kvíz
let timeLeft = document.querySelector(".time-left");
let quizContainer = document.getElementById("container");
let nextBtn = document.getElementById("next-button");
let countOfQuestion = document.querySelector(".number-of-question");
let displayContainer = document.getElementById("display-container");
let scoreContainer = document.querySelector(".score-container");
let restart = document.getElementById("restart");
let userScore = document.getElementById("user-score");
let startScreen = document.querySelector(".start-screen");
let startButton = document.getElementById("start-button");
let questionCount;
let scoreCount = 0;
let count = 25;
let countdown;

const quizArray = [
  {
    id: "0",
    question: "Melyik küldetés célja a morkit bányászás",
    options: ["Helyszíni finomítás", "Bányászati Expedíció", "Kíséret", "Kitermelés"],
    correct: "Bányászati Expedíció",
  },
  {
    id: "1",
    question: "Melyik törpének van lángszórója?",
    options: ["Felderítő", "Lövész", "Fúrós", "Mérnök"],
    correct: "Fúrós",
  },
  {
    id: "2",
    question: "Hányszor szenvedhet maradandó sérülést Doretta?",
    options: ["2", "4", "5", "3"],
    correct: "2",
  },
  {
    id: "3",
    question: "Melyik küldetés célja a morkit finomítás?",
    options: ["Helyszíni finomítás", "Bányászati Expedíció", "Kíséret", "Kitermelés"],
    correct: "Helyszíni finomítás",
  },
  {
    id: "4",
    question: "Melyik törpének van csali gránátja?",
    options: ["Felderítő","Mérnök","Lövész","Fúrós"],
    correct: "Mérnök",
  },
  {
    id: "5",
    question: "Melyik fegyvernek van másodlagos tüzelési módja?",
    options: ["Lead storm", "LOK-1", "Deepcore GK2", "Cryo ágyú"],
    correct: "LOK-1",
  },
  {
    id: "6",
    question: "Melyik törpnek vörös a szakála?",
    options: ["Fúrós", "Mérnök", "Lövész", "Felderítő"],
    correct: "Felderítő",
  },
  {
    id: "7",
    question: "A Kitermelés küldetés végén hány percig kell túlélned?",
    options: ["2", "1 és fél", "Semeddig", "1"],
    correct: "2",
  },
  {
    id: "8",
    question: "Melyik küldetés célja az Ommorán-szívkő begyűjtése?",
    options: ["Kiiktatás", "Ipari szabotázs", "Kíséret", "Kitermelés"],
    correct: "Kíséret",
  },
  {
    id: "9",
    question: "Hogy hívják az ipari szabotázs küldetésen a főellenséget?",
    options: ["Pusztító", "Karl","Nemezis", "Gondviselő"],
    correct: "Gondviselő",
  },
];

restart.addEventListener("click", () => {
  initial();
  displayContainer.classList.remove("hide");
  scoreContainer.classList.add("hide");
});

nextBtn.addEventListener(
  "click",
  (displayNext = () => {

    questionCount += 1;

    if (questionCount == quizArray.length) {
      //hide question container and display score
      displayContainer.classList.add("hide");
      scoreContainer.classList.remove("hide");
      
      userScore.innerHTML =
        "Az eredményed " + scoreCount + "/" + questionCount;
    } else {
      
      countOfQuestion.innerHTML =
        questionCount + 1 + " of " + quizArray.length + " Question";
      
      quizDisplay(questionCount);
      count = 25;
      clearInterval(countdown);
      timerDisplay();
    }
  })
);

const timerDisplay = () => {
  countdown = setInterval(() => {
    count--;
    timeLeft.innerHTML = `${count}s`;
    if (count == 0) {
      clearInterval(countdown);
      displayNext();
    }
  }, 1000);
};

const quizDisplay = (questionCount) => {
  let quizCards = document.querySelectorAll(".container-mid");
  
  quizCards.forEach((card) => {
    card.classList.add("hide");
  });

  quizCards[questionCount].classList.remove("hide");
};

function quizCreator() {
  
  quizArray.sort(() => Math.random() - 0.5);
  
  for (let i of quizArray) {
    
    i.options.sort(() => Math.random() - 0.5);
    
    let div = document.createElement("div");
    div.classList.add("container-mid", "hide");
    
    countOfQuestion.innerHTML = 1 + " of " + quizArray.length + " Question";
    
    let question_DIV = document.createElement("p");
    question_DIV.classList.add("question");
    question_DIV.innerHTML = i.question;
    div.appendChild(question_DIV);
    
    div.innerHTML += `
    <button class="option-div" onclick="checker(this)">${i.options[0]}</button>
     <button class="option-div" onclick="checker(this)">${i.options[1]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[2]}</button>
      <button class="option-div" onclick="checker(this)">${i.options[3]}</button>
    `;
    quizContainer.appendChild(div);
  }
}

function checker(userOption) {
  let userSolution = userOption.innerText;
  let question =
    document.getElementsByClassName("container-mid")[questionCount];
  let options = question.querySelectorAll(".option-div");

  if (userSolution === quizArray[questionCount].correct) {
    userOption.classList.add("correct");
    scoreCount++;
  } else {
    userOption.classList.add("incorrect");
    
    options.forEach((element) => {
      if (element.innerText == quizArray[questionCount].correct) {
        element.classList.add("correct");
      }
    });
  }

  clearInterval(countdown);
  
  options.forEach((element) => {
    element.disabled = true;
  });
}

function initial() {
  quizContainer.innerHTML = "";
  questionCount = 0;
  scoreCount = 0;
  count = 25;
  clearInterval(countdown);
  timerDisplay();
  quizCreator();
  quizDisplay(questionCount);
}

startButton.addEventListener("click", () => {
  startScreen.classList.add("hide");
  displayContainer.classList.remove("hide");
  initial();
});

window.onload = () => {
  startScreen.classList.remove("hide");
  displayContainer.classList.add("hide");
};