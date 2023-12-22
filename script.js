const questions = [
    {
        question: "Who is Prime Minister of Bharat?",
        answer: [
            {text: "The one who asked this question", correct: false},
            {text: "You", correct: false},
            {text: "Narendra Modi", correct: true},
            {text: "Joe biden", correct: false},
        ]
    },
    {
        question: "Who is first Home Minister of Bharat?",
        answer: [
            {text: "The one who asked this question", correct: false},
            {text: "You", correct: false},
            {text: "Sardar Vallabhai Patel", correct: true},
            {text: "Aamir khan", correct: false},
        ]
    },
    {
        question: "Who is richest man in Bharat",
        answer: [
            {text: "The one who asked this question", correct: false},
            {text: "Mukesh Ambani", correct: true},
            {text: "Joe Biden", correct: false},
            {text: "Aamir khan", correct: false},
        ]
    }
];

const quesElement = document.getElementById("question");
const ansBtn = document.getElementById("buttons");
const nextBtn = document.getElementById("next");

let currentIndex = 0;
let score = 0;

function start() {
    currentIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    display();
}

function display() {
    reset();
    let currentQ = questions[currentIndex];
    let queNum = currentIndex + 1;
    quesElement.innerHTML = queNum + ". " + currentQ.question;

    currentQ.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text
        button.classList.add("btn");
        ansBtn.appendChild(button);

        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAns);
    });
}

// function is made because as we move to the next question all the previous answers should be removed
function reset() {
    nextBtn.style.display = "none";
    while(ansBtn.firstChild) {
        ansBtn.removeChild(ansBtn.firstChild);
    }
}

function selectAns(e) {
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect) {
        selectBtn.classList.add("correct");
        score++;
    }
    else {
        selectBtn.classList.add("incorrect");
    }
    
    Array.from(ansBtn.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore() {
    reset();
    quesElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again";
    nextBtn.style.display = "block";
}

function handleNextBtn() {
    currentIndex++;
    if(currentIndex < questions.length) {
        display();
    }

    else {
        showScore();
    }
}

nextBtn.addEventListener("click", (e) => {
    if(currentIndex < questions.length) {
        handleNextBtn();    
    } 
    else {
        start();
    }
});



display();
