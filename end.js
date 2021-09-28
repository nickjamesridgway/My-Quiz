const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []
const MAX_HIGH_SCORES = 5

finalScore.innerText = mostRecentScore

// Save high score function
saveHighScore = e => {
  e.preventDefault()

  // Highscore and initals
  const score = {
    score: mostRecentScore,
    name: username.value
  }

  // The five highest score games
  highScores.push(score)

  highScores.sort((a,b) => {
    return b.score - a.score
  })

  highScores.splice(5)

  // After the score is saved to local storage, the page redirects to home
  localStorage.setItem('highScores', JSON.stringify(highScores))
  window.location.assign('index.html')
}