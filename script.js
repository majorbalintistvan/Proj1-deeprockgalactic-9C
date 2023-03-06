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
//Fegyvertár
function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more1");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Lenyitás"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Vissacsukás"; 
    moreText.style.display = "inline";
  }
}
function myFunction2() {
  var dots = document.getElementById("dots2");
  var moreText = document.getElementById("more2");
  var btnText = document.getElementById("myBtn2");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Lenyitás"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Vissacsukás"; 
    moreText.style.display = "inline";
  }
}
function myFunction3() {
  var dots = document.getElementById("dots3");
  var moreText = document.getElementById("more3");
  var btnText = document.getElementById("myBtn3");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Lenyitás"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Vissacsukás"; 
    moreText.style.display = "inline";
  }
}
function myFunction4() {
  var dots = document.getElementById("dots4");
  var moreText = document.getElementById("more4");
  var btnText = document.getElementById("myBtn4");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Lenyitás"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Vissacsukás"; 
    moreText.style.display = "inline";
  }
}
function myFunction5() {
  var dots = document.getElementById("dots5");
  var moreText = document.getElementById("more5");
  var btnText = document.getElementById("myBtn5");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Lenyitás"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Vissacsukás"; 
    moreText.style.display = "inline";
  }
}
function myFunction6() {
  var dots = document.getElementById("dots6");
  var moreText = document.getElementById("more6");
  var btnText = document.getElementById("myBtn6");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Lenyitás"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Vissacsukás"; 
    moreText.style.display = "inline";
  }
}
function myFunction7() {
  var dots = document.getElementById("dots7");
  var moreText = document.getElementById("more7");
  var btnText = document.getElementById("myBtn7");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Lenyitás"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Vissacsukás"; 
    moreText.style.display = "inline";
  }
}
function myFunction8() {
  var dots = document.getElementById("dots8");
  var moreText = document.getElementById("more8");
  var btnText = document.getElementById("myBtn8");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Lenyitás"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Vissacsukás"; 
    moreText.style.display = "inline";
  }
}
function myFunction9() {
  var dots = document.getElementById("dots9");
  var moreText = document.getElementById("more9");
  var btnText = document.getElementById("myBtn9");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Lenyitás"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Vissacsukás"; 
    moreText.style.display = "inline";
  }
}
function myFunction10() {
  var dots = document.getElementById("dots10");
  var moreText = document.getElementById("more10");
  var btnText = document.getElementById("myBtn10");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Lenyitás"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Vissacsukás"; 
    moreText.style.display = "inline";
  }
}function myFunction11() {
  var dots = document.getElementById("dots11");
  var moreText = document.getElementById("more11");
  var btnText = document.getElementById("myBtn11");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Lenyitás"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Vissacsukás"; 
    moreText.style.display = "inline";
  }
}function myFunction12() {
  var dots = document.getElementById("dots12");
  var moreText = document.getElementById("more12");
  var btnText = document.getElementById("myBtn12");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Lenyitás"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Vissacsukás"; 
    moreText.style.display = "inline";
  }
}function myFunction13() {
  var dots = document.getElementById("dots13");
  var moreText = document.getElementById("more13");
  var btnText = document.getElementById("myBtn13");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Lenyitás"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Vissacsukás"; 
    moreText.style.display = "inline";
  }
}
function myFunction14() {
  var dots = document.getElementById("dots14");
  var moreText = document.getElementById("more14");
  var btnText = document.getElementById("myBtn14");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Lenyitás"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Vissacsukás"; 
    moreText.style.display = "inline";
  }
}
function myFunction15() {
  var dots = document.getElementById("dots15");
  var moreText = document.getElementById("more15");
  var btnText = document.getElementById("myBtn15");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Lenyitás"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Vissacsukás"; 
    moreText.style.display = "inline";
  }
}
function myFunction16() {
  var dots = document.getElementById("dots16");
  var moreText = document.getElementById("more16");
  var btnText = document.getElementById("myBtn16");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Lenyitás"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Vissacsukás"; 
    moreText.style.display = "inline";
  }
}
function myFunction17() {
  var dots = document.getElementById("dots17");
  var moreText = document.getElementById("more17");
  var btnText = document.getElementById("myBtn17");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Lenyitás"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Vissacsukás"; 
    moreText.style.display = "inline";
  }
}
function myFunction18() {
  var dots = document.getElementById("dots18");
  var moreText = document.getElementById("more18");
  var btnText = document.getElementById("myBtn18");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Lenyitás"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Vissacsukás"; 
    moreText.style.display = "inline";
  }
}
function myFunction19() {
  var dots = document.getElementById("dots19");
  var moreText = document.getElementById("more19");
  var btnText = document.getElementById("myBtn19");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Lenyitás"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Vissacsukás"; 
    moreText.style.display = "inline";
  }
}
function myFunction20() {
  var dots = document.getElementById("dots20");
  var moreText = document.getElementById("more20");
  var btnText = document.getElementById("myBtn20");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Lenyitás"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Vissacsukás"; 
    moreText.style.display = "inline";
  }
}
function myFunction21() {
  var dots = document.getElementById("dots21");
  var moreText = document.getElementById("more21");
  var btnText = document.getElementById("myBtn21");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Lenyitás"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Vissacsukás"; 
    moreText.style.display = "inline";
  }
}function myFunction22() {
  var dots = document.getElementById("dots22");
  var moreText = document.getElementById("more22");
  var btnText = document.getElementById("myBtn22");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Lenyitás"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Vissacsukás"; 
    moreText.style.display = "inline";
  }
}function myFunction23() {
  var dots = document.getElementById("dots23");
  var moreText = document.getElementById("more23");
  var btnText = document.getElementById("myBtn23");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Lenyitás"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Vissacsukás"; 
    moreText.style.display = "inline";
  }
}
function myFunction24() {
  var dots = document.getElementById("dots24");
  var moreText = document.getElementById("more24");
  var btnText = document.getElementById("myBtn24");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Lenyitás"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Vissacsukás"; 
    moreText.style.display = "inline";
  }
}
function myFunction25() {
  var dots = document.getElementById("dots25");
  var moreText = document.getElementById("more25");
  var btnText = document.getElementById("myBtn25");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Lenyitás"; 
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Vissacsukás"; 
    moreText.style.display = "inline";
  }
}