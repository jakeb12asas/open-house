// Load leaderboard from localStorage
let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

// Add last score if available
let lastScore = localStorage.getItem("lastScore");
let difficulty = localStorage.getItem("difficulty");
let playerName = localStorage.getItem("playerName") || "Player";

if (lastScore) {
    leaderboard.push({ name: playerName, score: parseInt(lastScore), difficulty: difficulty });
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    localStorage.removeItem("lastScore");
}

// Sort descending by score
leaderboard.sort((a,b) => b.score - a.score);

// Populate table
let tbody = document.getElementById("leaderboardTable").querySelector("tbody");
tbody.innerHTML = "";

leaderboard.forEach((entry, index) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
        <td>${index + 1}</td>
        <td>${entry.name}</td>
        <td>${entry.score}</td>
        <td>${entry.difficulty}</td>
    `;
    tbody.appendChild(tr);
});

// Clear leaderboard
function clearLeaderboard() {
    if (confirm("Are you sure you want to clear the leaderboard?")) {
        localStorage.removeItem("leaderboard");
        tbody.innerHTML = "";
    }
}
