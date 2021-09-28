var question = document.querySelector('#question')
var choices = Array.from(document.querySelectorAll('.choice-text'))
var progressText = document.querySelector('#progressText')
var scoreText = document.querySelector('#score')
var timerItself = document.querySelector('#app')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

var FULL_DASH_ARRAY = 283;
var WARNING_THRESHOLD = 10;
var ALERT_THRESHOLD = 5;

var COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

// Set the timer
var TIME_LIMIT = 60;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

// The questions themselves
let questions = [
    { 
      question: 'What is a method?',
      choice1: 'A funciton within a function',
      choice2: 'A Cascading Style Sheet',
      choice3: 'HTML',
      choice4: 'A Flex Box',
      answer: 1,
    },
    { 
      question: 'What does CSS stand for?',
      choice1: 'Cascading Standard System',
      choice2: 'Cascading Structure Set',
      choice3: 'Cascading Style Sheets',
      choice4: 'Clear Symbol System',
      answer: 3,
    },
    { 
      question: 'What is a scope?',
      choice1: 'A bug',
      choice2: 'A feature in HTML',
      choice3: 'Defines where a certain variable is accessible.',
      choice4: 'Clears a function',
      answer: 3,
    },
    { 
      question: 'What is an SSH key?',
      choice1: 'A Source Shell key',
      choice2: 'A Secure Shell Key',
      choice3: 'A Super Shell Key',
      choice4: 'A Super Saiyan Key',
      answer: 2,
    },
    { 
      question: 'What container expands or shrink items to fill available free space?',
      choice1: 'A Grow Box',
      choice2: 'A Check Box',
      choice3: 'A Flex Box',
      choice4: 'CSS',
      answer: 3,
    },
  ]

  // The points
  var SCORE_POINTS = 20
  var MAX_QUESTIONS = 5

 
  startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
  }

  // Set Score
  getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
      // Save score to local storage
      localStorage.setItem('mostRecentScore', score)
      // Game Over
      return window.location.assign('end.html')
    }

    // Show progress throughout quiz
    questionCounter++
    progressText.innerText = `Question\n${questionCounter} of ${MAX_QUESTIONS}`

    // Randomize question order
    var questionsIndex = Math.floor(Math.random() * availableQuestions.length)

    // Keep track of what questions
    currentQuestion = availableQuestions[questionsIndex]
    // Display
    question.innerText = currentQuestion.question

    // Keep track of what answer is chosen 
    choices.forEach(choice => {
      var number = choice.dataset['number']
      choice.innerText = currentQuestion['choice' + number]
    })

    // Adjusts the array as each question is used up
    availableQuestions.splice(questionsIndex, 1)

    // Allow answers to be chosen once the quiz starts
    acceptingAnswers = true
  }

  choices.forEach(choice => {
    choice.addEventListener('click', e => {
      if(!acceptingAnswers) return
      
      acceptingAnswers = false
      var selectedChoice = e.target
      var selectedAnswer = selectedChoice.dataset['number']

 
      let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

      if(classToApply === 'correct') {
        incrementScore(SCORE_POINTS)
      }
      
      if(classToApply === 'incorrect' && timeLeft > 5) {
        timePassed += 5;
      } else if (classToApply === 'incorrect' && timeLeft <= 5) {
        onTimesUp();
      }
      
      selectedChoice.parentElement.classList.add(classToApply)

      
      setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply)
        getNewQuestion()
      }, 1000)
  })

  incrementScore = num => {
    score +=num
    scoreText.innerText = score
  }

});

  startGame()


// Call the function that starts the timer
startTimer();



function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    if (timeLeft === 0) {
      onTimesUp();
    }
    if (timeLeft > -1) {
    timerItself.textContent = timeLeft + " seconds left.";
    };
     if (timeLeft === 0) {
      timerItself.textContent = "Time's up!";
      };
    document.getElementById("base-timer-label").innerHTML = formatTime(
      timeLeft
    );
    setRemainingPathColor(timeLeft);
  }, 1000);
}

// Reset the timer
function onTimesUp() {
  clearInterval(timerInterval);
  localStorage.setItem('mostRecentScore', score);
  acceptingAnswers = false;
  return window.location.assign('end.html')
}


