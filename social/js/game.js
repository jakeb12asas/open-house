// Get selected difficulty and player name
let difficulty = localStorage.getItem("difficulty") || "Easy";
let playerName = localStorage.getItem("playerName") || "Player";

// Filter landmarks by difficulty
let pool = landmarks.filter(l => l.difficulty === difficulty);

// Shuffle the pool
pool = shuffle(pool);

// Take up to 10 questions
let questions = pool.slice(0, 10);

let current = 0;
let score = 0;

// Load a question
function loadQuestion() {
    let q = questions[current];

    // Set image
    document.getElementById("landmarkImage").src = q.image;

    // Generate options
    let options = generateOptions(q.name, q.type);

    for (let i = 0; i < 4; i++) {
        let btn = document.getElementById("btn" + i);
        btn.innerText = options[i];

        btn.onclick = function () {
            checkAnswer(options[i]);
        }
    }

    document.getElementById("score").innerText = "Score: " + score;
}

// Generate 4 options
function generateOptions(correct, type) {
    let options = [correct];

    // Hard mode: pick same type distractors
    let similarPool = landmarks.filter(l => l.type === type && l.name !== correct);
    
    // Copy of similar pool to avoid duplicates
    let tempPool = [...similarPool];

    while (options.length < 4) {
        let random;

        if (difficulty === "Hard" && tempPool.length > 0) {
            // Pick from remaining similar landmarks
            let index = Math.floor(Math.random() * tempPool.length);
            random = tempPool[index].name;
            tempPool.splice(index, 1); // remove from pool
        } else {
            // Pick any landmark if not enough similar
            random = landmarks[Math.floor(Math.random() * landmarks.length)].name;
        }

        if (!options.includes(random)) options.push(random);
    }

    return shuffle(options);
}


// Check answer with feedback
function checkAnswer(answer) {
    const feedback = document.getElementById("feedback");

    if (answer === questions[current].name) {
        score += 100;
        feedback.innerText = "✅ Correct!";
        feedback.style.color = "#4CAF50";
    } else {
        feedback.innerText = "❌ Wrong!";
        feedback.style.color = "#F44336";
    }

    document.getElementById("score").innerText = score;

    setTimeout(() => {
        feedback.innerText = "";
        current++;

        if (current >= questions.length) {
            localStorage.setItem("lastScore", score);
            window.location.href = "leaderboard.html";
            return;
        }

        loadQuestion();
    }, 800);
}

// Shuffle helper
function shuffle(array) {
    let currentIndex = array.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

// Start game on window load
window.onload = loadQuestion;
