const GAME_TIME_IN_SECONDS = 10;
const NR_SECONDS_PER_MINUTE = 60;
const TIME_STEP_IN_MILLISECONDS = 1000;
const TIME_STEP_IN_SECONDS = 1;

let homeScoreEl = document.getElementById("home-score-el");
let guestScoreEl = document.getElementById("guest-score-el");
let homeScore1Btn = document.getElementById("score-1-home-btn");
let homeScore2Btn = document.getElementById("score-2-home-btn");
let homeScore3Btn = document.getElementById("score-3-home-btn");
let guestScore1Btn = document.getElementById("score-1-guest-btn");
let guestScore2Btn = document.getElementById("score-2-guest-btn");
let guestScore3Btn = document.getElementById("score-3-guest-btn");
let homeStats1El = document.getElementById("home-stats-1");
let homeStats2El = document.getElementById("home-stats-2");
let homeStats3El = document.getElementById("home-stats-3");
let guestStats1El = document.getElementById("guest-stats-1");
let guestStats2El = document.getElementById("guest-stats-2");
let guestStats3El = document.getElementById("guest-stats-3");
let gameTimeInSeconds = GAME_TIME_IN_SECONDS;
let countdown;
let timerMinutesEl = document.getElementById("timer-minutes");
let timerSecondsEl = document.getElementById("timer-seconds");
let newGameBtnEl = document.getElementById("new-game-btn");
let startBtnEl = document.getElementById("start-btn");
let pauseBtnEl = document.getElementById("pause-btn");
let resumeBtnEl = document.getElementById("resume-btn");
let homeEl = document.getElementById("home");
let guestEl = document.getElementById("guest");

let homeScore = 0;
let guestScore = 0;
let homeStats1 = 0;
let homeStats2 = 0;
let homeStats3 = 0;
let guestStats1 = 0;
let guestStats2 = 0;
let guestStats3 = 0;

function addOneHome() {
    homeScore = addOne(homeScore);
    renderCount(homeScoreEl, homeScore);
    homeStats1 = addOne(homeStats1);
    renderCount(homeStats1El, homeStats1);
}

function addTwoHome() {
    homeScore = addTwo(homeScore);
    renderCount(homeScoreEl, homeScore);
    homeStats2 = addOne(homeStats2);
    renderCount(homeStats2El, homeStats2);
}

function addThreeHome() {
    homeScore = addThree(homeScore);
    renderCount(homeScoreEl, homeScore);
    homeStats3 = addOne(homeStats3);
    renderCount(homeStats3El, homeStats3);
}

function addOneGuest() {
    guestScore = addOne(guestScore);
    renderCount(guestScoreEl, guestScore);
    guestStats1 = addOne(guestStats1);
    renderCount(guestStats1El, guestStats1);
}

function addTwoGuest() {
    guestScore = addTwo(guestScore);
    renderCount(guestScoreEl, guestScore);
    guestStats2 = addOne(guestStats2);
    renderCount(guestStats2El, guestStats2);
}

function addThreeGuest() {
    guestScore = addThree(guestScore);
    renderCount(guestScoreEl, guestScore);
    guestStats3 = addOne(guestStats3);
    renderCount(guestStats3El, guestStats3);
}

function renderCount(countEl, count) {
    countEl.textContent = count;
    applyScoreColors();
}

function addOne(count) {
    return count + 1;
}

function addTwo(count) {
    return count + 2;
}

function addThree(count) {
    return count + 3;
}

function disableScoreBtns() {
    homeScore1Btn.disabled = true;
    homeScore2Btn.disabled = true;
    homeScore3Btn.disabled = true;
    guestScore1Btn.disabled = true;
    guestScore2Btn.disabled = true;
    guestScore3Btn.disabled = true;
}

function enableScoreBtns() {
    homeScore1Btn.disabled = false;
    homeScore2Btn.disabled = false;
    homeScore3Btn.disabled = false;
    guestScore1Btn.disabled = false;
    guestScore2Btn.disabled = false;
    guestScore3Btn.disabled = false;
}

function startNewGame() {
    gameTimeInSeconds = GAME_TIME_IN_SECONDS;
    startBtnEl.disabled = false;
    initializeTimer();
    homeScore = 0;
    renderCount(homeScoreEl, homeScore);
    guestScore = 0;
    renderCount(guestScoreEl, guestScore);
    declareWinner();
    homeStats1 = 0;
    renderCount(homeStats1El, homeStats1);
    homeStats2 = 0;
    renderCount(homeStats2El, homeStats2);
    homeStats3 = 0;
    renderCount(homeStats3El, homeStats3);
    guestStats1 = 0;
    renderCount(guestStats1El, guestStats1);
    guestStats2 = 0;
    renderCount(guestStats2El, guestStats2);
    guestStats3 = 0;
    renderCount(guestStats3El, guestStats3);
    newGameBtnEl.disabled = true;
}

function initializeTimer() {
    calculateMinutes();
    calculateSeconds();
}

function calculateMinutes() {
    let gameTimeMinutes = Math.floor(gameTimeInSeconds / NR_SECONDS_PER_MINUTE);
    timerMinutesEl.textContent = (gameTimeMinutes).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}); //numberOfMinutes;
}

function calculateSeconds() {
    let gameTimeSeconds = gameTimeInSeconds % NR_SECONDS_PER_MINUTE;
    timerSecondsEl.textContent = (gameTimeSeconds).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}); //numberOfSeconds;
}

function countDown() {
    enableScoreBtns();
    startBtnEl.disabled = true;
    pauseBtnEl.disabled = false;
    countdown = setInterval(() => {
        gameTimeInSeconds -= TIME_STEP_IN_SECONDS;
        initializeTimer();
        if (gameTimeInSeconds === 0) {
          clearInterval(countdown);
          startBtnEl.disabled = true;
          pauseBtnEl.disabled = true;
          resumeBtnEl.disabled = true;
          newGameBtnEl.disabled = false;
          disableScoreBtns();
          declareWinner();
        }
      }, TIME_STEP_IN_MILLISECONDS);
}

function pauseCountDown() {
    disableScoreBtns();
    pauseBtnEl.disabled = true;
    resumeBtnEl.disabled = false;
    clearInterval(countdown);
}

function resumeCountDown() {
    enableScoreBtns();
    pauseBtnEl.disabled = false;
    resumeBtnEl.disabled = true;
    countDown();
}

function declareWinner() {
    if (homeScore > guestScore) {
        homeEl.style.borderColor = "#ffd700";
    } else if (homeScore < guestScore) {
        guestEl.style.borderColor = "#ffd700";
    } else {
        homeEl.style.borderColor = "transparent";
        guestEl.style.borderColor = "transparent";
    }
}

function applyScoreColors() {
    if (homeScore > guestScore) {
        homeScoreEl.style.textShadow = "2px 2px 2px #eeeeee";
        guestScoreEl.style.color = "#f94f6d";
        guestScoreEl.style.textShadow = "none";
    }
    if (guestScore > homeScore) {
        homeScoreEl.style.color = "#f94f6d";
        homeScoreEl.style.textShadow = "none";
        guestScoreEl.style.textShadow = "2px 2px 2px #eeeeee";
    }
    if (guestScore === homeScore) {
        homeScoreEl.style.color = "#f94f6d";
        homeScoreEl.style.textShadow = "none";
        guestScoreEl.style.color = "#f94f6d";
        guestScoreEl.style.textShadow = "none";
    }
    if (guestScore === 0 && homeScore === 0) {
        homeScoreEl.style.textShadow = "none";
        guestScoreEl.style.textShadow = "none";
    }
}
