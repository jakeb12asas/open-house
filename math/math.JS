document.addEventListener('DOMContentLoaded', () => {
  // ---------------------- NUMBERS LAB ----------------------
  const numDisplay = document.getElementById('numDisplay');
  const numResult = document.getElementById('numResult');
  let currentNumber = parseInt(numDisplay.textContent);

  function updateNumber() {
    numDisplay.textContent = currentNumber;
    numResult.textContent = `Square: ${currentNumber**2}, Cube: ${currentNumber**3}, ${currentNumber % 2 === 0 ? 'Even' : 'Odd'}`;
  }

  document.getElementById('numInc').addEventListener('click', () => { currentNumber++; updateNumber(); });
  document.getElementById('numDec').addEventListener('click', () => { currentNumber--; updateNumber(); });

  updateNumber();

  // ---------------------- GRAPH ----------------------
  const graphCanvas = document.getElementById('graphCanvas');
  const ctx = graphCanvas.getContext('2d');
  const plotBtn = document.getElementById('plotBtn');
  const equationInput = document.getElementById('equation');

  function plotGraph() {
    ctx.clearRect(0, 0, graphCanvas.width, graphCanvas.height);

    // Draw axes
    ctx.strokeStyle = 'rgba(255,214,0,0.4)';
    ctx.beginPath();
    ctx.moveTo(0, graphCanvas.height/2);
    ctx.lineTo(graphCanvas.width, graphCanvas.height/2);
    ctx.moveTo(graphCanvas.width/2, 0);
    ctx.lineTo(graphCanvas.width/2, graphCanvas.height);
    ctx.stroke();

    // Draw function
    ctx.strokeStyle = '#ffd60a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const scale = 20; // pixels per unit
    const funcStr = equationInput.value.replaceAll('^', '**');
    for (let px = 0; px <= graphCanvas.width; px++) {
      const x = (px - graphCanvas.width/2)/scale;
      let y = 0;
      try { y = eval(funcStr.replaceAll('x', `(${x})`)); } catch { y = 0; }
      const py = graphCanvas.height/2 - y*scale;
      if(px===0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }

  plotBtn.addEventListener('click', plotGraph);
  plotGraph();

  // ---------------------- FRUIT QUIZ ----------------------
  const quizData = [
    { question: '🍎 + 🍎 = 6<br>🍎 + 🍌 = 8<br>🍌 + 🍌 = 10<br>What is 🍎?', options: [2,3,4,5], answer: 3 },
    { question: '🍊 + 🍊 + 🍊 = 15<br>🍊 + 🍉 = 10<br>🍉 = ?', options: [4,5,6,7], answer: 5 },
    { question: '🍇 * 2 = 10<br>🍇 - 🍓 = 2<br>🍓 = ?', options: [3,4,5,6], answer: 3 },
  ];

  const quizQuestion = document.getElementById('quizQuestion');
  const quizOptions = document.getElementById('quizOptions');
  const quizResult = document.getElementById('quizResult');
  let currentQuizIndex = 0;

  function loadQuiz() {
    quizResult.textContent = '';
    const q = quizData[currentQuizIndex];
    quizQuestion.innerHTML = q.question; // use innerHTML for line breaks
    quizOptions.innerHTML = '';
    q.options.forEach(opt => {
      const btn = document.createElement('button');
      btn.textContent = opt;
      btn.className = 'quiz-btn';
      btn.addEventListener('click', () => checkAnswer(opt));
      quizOptions.appendChild(btn);
    });
  }

  function checkAnswer(selected) {
    const correct = quizData[currentQuizIndex].answer;
    quizResult.textContent = selected === correct ? '✅ Correct!' : `❌ Wrong! Answer: ${correct}`;
    currentQuizIndex = (currentQuizIndex + 1) % quizData.length;
    setTimeout(loadQuiz, 1500);
  }

  loadQuiz();

  // ---------------------- WORDLE ----------------------
  const wordleInput = document.getElementById('wordleInput');
  const wordleBtn = document.getElementById('wordleBtn');
  const newGameBtn = document.getElementById('newGameBtn');
  const wordleGrid = document.getElementById('wordleGrid');
  const wordleMsg = document.getElementById('wordleMsg');
  const attemptCountSpan = document.getElementById('attemptCount');

  let secretWord = '';
  let attempts = 0;

  function newWordleGame() {
    secretWord = String(Math.floor(100 + Math.random()*900)); // random 3-digit number
    attempts = 0;
    attemptCountSpan.textContent = attempts;
    wordleGrid.innerHTML = '';
    wordleMsg.textContent = '';
    wordleInput.disabled = false;
    wordleInput.value = '';
  }

  function checkWordleGuess() {
    const guess = wordleInput.value;
    if(guess.length !== 3) { alert('Enter a 3-digit number'); return; }

    const row = document.createElement('div');
    row.className = 'wordle-row';

    for(let i=0;i<3;i++){
      const cell = document.createElement('div');
      cell.className = 'wordle-cell';
      cell.textContent = guess[i];

      if(guess[i] === secretWord[i]) cell.classList.add('correct');
      else if(secretWord.includes(guess[i])) cell.classList.add('present');
      else cell.classList.add('wrong');

      row.appendChild(cell);
    }

    wordleGrid.appendChild(row);
    attempts++;
    attemptCountSpan.textContent = attempts;
    wordleInput.value = '';

    if(guess === secretWord){
      wordleMsg.textContent = '🎉 You guessed it!';
      wordleInput.disabled = true;
    } else if(attempts >= 6){
      wordleMsg.textContent = `💀 Game Over! Number was ${secretWord}`;
      wordleInput.disabled = true;
    }
  }

  wordleBtn.addEventListener('click', checkWordleGuess);
  wordleInput.addEventListener('keyup', e => { if(e.key === 'Enter') checkWordleGuess(); });
  newGameBtn.addEventListener('click', newWordleGame);

  newWordleGame(); // start the game
});
