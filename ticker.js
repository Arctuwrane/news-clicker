let recentHeadlines = [];
const HEADLINE_COOLDOWN = 10;
let tickerUnlocked = false;
let isTickerPaused = false;
let tickerInterval = null;
let chessBonusAvailable = false;
let forcedNextHeadline = null;

function updateTicker(isManualSkip = false) {
  if (totalNewspapersEarned < 1000) return;
  if (isTickerPaused && !isManualSkip) return;

  const tickerBar = document.getElementById('ticker-bar');
  const tickerText = document.getElementById('ticker-text');

  chessBonusAvailable = false;
  tickerBar.classList.remove('chess-bonus');

  if (forcedNextHeadline) {
    tickerText.innerText = forcedNextHeadline;
    forcedNextHeadline = null;
    return;
  }

  const availablePool = unlockedHeadlines
    .map((entry, idx) => ({ entry, idx }))
    .filter(({ entry }) => {
      if (typeof entry === 'function') return true;
      if (entry.requires && !hasUpgrade(entry.requires)) return false;
      if (typeof entry.condition === 'function' && !entry.condition()) return false;
      return true;
    });

  if (availablePool.length === 0) return;

  const maxHistory = Math.min(HEADLINE_COOLDOWN, availablePool.length - 1);
  let chosen;
  let text;

  do {
    chosen = availablePool[Math.floor(Math.random() * availablePool.length)];
    text = typeof chosen.entry === 'function' ? chosen.entry() : chosen.entry.text();
  } while (
    (recentHeadlines.includes(chosen.idx) && availablePool.length > 1) ||
    (isManualSkip && text === "Behold the power of chess.")
  );

  recentHeadlines.push(chosen.idx);
  if (recentHeadlines.length > maxHistory) {
    recentHeadlines.shift();
  }

  tickerText.innerText = text;

  if (typeof chosen.entry === 'object' && chosen.entry.nextHeadline) {
    forcedNextHeadline = chosen.entry.nextHeadline;
  }

  if (!isManualSkip && text === "Behold the power of chess.") {
    chessBonusAvailable = true;
    tickerBar.classList.add('chess-bonus');
  }
}

function claimChessBonus() {
  if (!chessBonusAvailable) return;
  chessBonusAvailable = false;

  const bonus = (newsPerSecond * 15) + 15;
  newspapers += bonus;
  totalNewspapersEarned += bonus;

  const tickerBar = document.getElementById('ticker-bar');
  const tickerText = document.getElementById('ticker-text');
  tickerBar.classList.remove('chess-bonus');
  tickerText.innerText = `♟️ Chess bonus claimed: +${formatNumber(bonus)} newspapers!`;

  updateUI();
  saveGame();
}

function startTickerTimer() {
  if (tickerInterval) clearInterval(tickerInterval);
  tickerInterval = setInterval(() => {
    updateTicker(false);
  }, 5000);
}

function skipToNextNews() {
  if (totalNewspapersEarned < 1000) {
    document.getElementById('ticker-text').innerText = "Unlock full news at 1,000 total newspapers!";
    return;
  }
  updateTicker(true);
  startTickerTimer();
}

function checkTickerUnlock() {
  if (!tickerUnlocked && totalNewspapersEarned >= 1000) {
    tickerUnlocked = true;
    updateTicker(true);
    startTickerTimer();
  }
}

const tickerTextEl = document.getElementById('ticker-text');
tickerTextEl.addEventListener('click', claimChessBonus);
tickerTextEl.addEventListener('mousedown', () => { isTickerPaused = true; });
tickerTextEl.addEventListener('touchstart', () => { isTickerPaused = true; }, { passive: true });
window.addEventListener('mouseup', () => { isTickerPaused = false; });
window.addEventListener('touchend', () => { isTickerPaused = false; });
