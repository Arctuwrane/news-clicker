let newspapers = 0;
let totalNewspapersEarned = 0;
let manualNewspapersEarned = 0;
let totalNewspaperClicks = 0;
let activePlayTimeMs = 0;
let newsPerClick = 1;
let newsPerSecond = 0;
let buyAmount = 1;
let isResetting = false;

function hasUpgrade(id) {
  return clickUpgrades.some(u => u.id === id && u.purchased === true) ||
         paperboyUpgrades.some(u => u.id === id && u.purchased === true) ||
         kioskUpgrades.some(u => u.id === id && u.purchased === true) ||
         truckUpgrades.some(u => u.id === id && u.purchased === true) ||
         pressUpgrades.some(u => u.id === id && u.purchased === true);
}

function getBuildingCount(id) {
  const target = buildings.find(b => b.id === id);
  return target ? target.count : 0;
}

function isUpgradeUnlocked(upg) {
  if (!upg.requiresUpgrade) return true;
  return hasUpgrade(upg.requiresUpgrade);
}

function getEffectivePaperboyNps() {
  const paperboyBuilding = buildings.find(b => b.id === 'paperboy');
  let rate = paperboyBuilding.baseNps;

  if (hasUpgrade('papergirls')) rate *= 2;
  if (hasUpgrade('satchels')) rate *= 2;
  if (hasUpgrade('wagons')) rate *= 2.5;
  if (hasUpgrade('sari_sari_wheels')) rate *= 5;
  if (hasUpgrade('paperboy_teaming')) {
    rate *= (1 + paperboyBuilding.count * 0.01);
  }

  if (hasUpgrade('bikes')) {
    let bikePower = 0.1;
    if (hasUpgrade('cars')) bikePower = 0.5;
    if (hasUpgrade('private_jets')) bikePower = 5;
    if (hasUpgrade('the_paper_fleet')) bikePower = 100;
    if (hasUpgrade('perfect_vision_training')) bikePower = 2000;
    if (hasUpgrade('supreme_intellect')) bikePower = 40000;

    const includePaperboys = hasUpgrade('the_paper_fleet');
    const eligibleBuildings = buildings.reduce((sum, b) => {
      if (!includePaperboys && b.id === 'paperboy') return sum;
      return sum + b.count;
    }, 0);

    rate += eligibleBuildings * bikePower;
  }

  return rate;
}

function getEffectiveKioskNps() {
  const kioskBuilding = buildings.find(b => b.id === 'kiosk');
  let rate = kioskBuilding.baseNps;
  const purchasedKioskCount = kioskUpgrades.filter(u => u.purchased).length;
  rate *= Math.pow(2, purchasedKioskCount);
  return rate;
}

function getEffectiveTruckNps() {
  const truckBuilding = buildings.find(b => b.id === 'truck');
  let rate = truckBuilding.baseNps;
  const purchasedTruckCount = truckUpgrades.filter(u => u.purchased).length;
  rate *= Math.pow(2, purchasedTruckCount);
  return rate;
}

function getEffectivePressNps() {
  const pressBuilding = buildings.find(b => b.id === 'press');
  let rate = pressBuilding.baseNps;
  const purchasedPressCount = pressUpgrades.filter(u => u.purchased).length;
  rate *= Math.pow(2, purchasedPressCount);
  return rate;
}

function recalculateStats() {
  let npc = 1;
  if (hasUpgrade('low_volume_inking')) npc += 0.5;
  if (hasUpgrade('newspaper_recycling')) npc += 1;
  if (hasUpgrade('typewriters')) npc += 1.5;

  if (hasUpgrade('hand_crank_press')) npc *= 2;
  if (hasUpgrade('ambidextrous')) npc *= 2;
  if (hasUpgrade('press_rolls')) npc *= 2;

  if (hasUpgrade('news_overload')) npc = 200;

  if (hasUpgrade('hand_eye_building_coordination')) {
    const includePaperboys = hasUpgrade('paperboy_teaming');
    const eligibleBuildings = buildings.reduce((sum, b) => {
      if (!includePaperboys && b.id === 'paperboy') return sum;
      return sum + b.count;
    }, 0);
    npc += eligibleBuildings * 0.1;
  }

  if (hasUpgrade('fingerdash_method')) npc *= 5;
  newsPerClick = npc;

  buildings.forEach(b => {
    if (b.id === 'paperboy') {
      b.nps = getEffectivePaperboyNps();
    } else if (b.id === 'kiosk') {
      b.nps = getEffectiveKioskNps();
    } else if (b.id === 'truck') {
      b.nps = getEffectiveTruckNps();
    } else if (b.id === 'press') {
      b.nps = getEffectivePressNps();
    } else {
      b.nps = b.baseNps;
    }
  });

  newsPerSecond = buildings.reduce((total, b) => total + (b.nps * b.count), 0);
}

function resetGameStateToDefaults() {
  newspapers = 0;
  totalNewspapersEarned = 0;
  manualNewspapersEarned = 0;
  totalNewspaperClicks = 0;
  activePlayTimeMs = 0;
  newsPerClick = 1;
  newsPerSecond = 0;
  forcedNextHeadline = null;

  buildings.forEach(b => {
    b.count = 0;
    b.nps = b.baseNps;
  });

  clickUpgrades.forEach(u => { u.purchased = false; });
  paperboyUpgrades.forEach(u => { u.purchased = false; });
  kioskUpgrades.forEach(u => { u.purchased = false; });
  truckUpgrades.forEach(u => { u.purchased = false; });
  pressUpgrades.forEach(u => { u.purchased = false; });
}

function saveGame() {
  if (isResetting) return;
  const saveData = {
    newspapers,
    totalNewspapersEarned,
    manualNewspapersEarned,
    totalNewspaperClicks,
    activePlayTimeMs,
    newsPerClick,
    buildings: buildings.map(b => ({ id: b.id, count: b.count })),
    purchasedClickUpgrades: clickUpgrades.filter(u => u.purchased).map(u => u.id),
    purchasedPaperboyUpgrades: paperboyUpgrades.filter(u => u.purchased).map(u => u.id),
    purchasedKioskUpgrades: kioskUpgrades.filter(u => u.purchased).map(u => u.id),
    purchasedTruckUpgrades: truckUpgrades.filter(u => u.purchased).map(u => u.id),
    purchasedPressUpgrades: pressUpgrades.filter(u => u.purchased).map(u => u.id)
  };
  localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));

  const statusEl = document.getElementById('save-status');
  if (statusEl) {
    statusEl.innerText = 'Game saved';
    setTimeout(() => {
      if (statusEl) statusEl.innerText = 'Autosave active';
    }, 1200);
  }
}

function loadGame() {
  resetGameStateToDefaults();
  const raw = localStorage.getItem(SAVE_KEY);
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    if (typeof data.newspapers === 'number') newspapers = data.newspapers;
    if (typeof data.totalNewspapersEarned === 'number') totalNewspapersEarned = data.totalNewspapersEarned;
    if (typeof data.manualNewspapersEarned === 'number') manualNewspapersEarned = data.manualNewspapersEarned;
    if (typeof data.totalNewspaperClicks === 'number') totalNewspaperClicks = data.totalNewspaperClicks;
    if (typeof data.activePlayTimeMs === 'number') activePlayTimeMs = data.activePlayTimeMs;

    if (Array.isArray(data.buildings)) {
      data.buildings.forEach(savedB => {
        const target = buildings.find(b => b.id === savedB.id);
        if (target && typeof savedB.count === 'number') {
          target.count = savedB.count;
        }
      });
    }

    const savedClicks = data.purchasedClickUpgrades || data.purchasedUpgrades || [];
    if (Array.isArray(savedClicks)) {
      savedClicks.forEach(id => {
        const target = clickUpgrades.find(u => u.id === id);
        if (target) target.purchased = true;
      });
    }

    if (Array.isArray(data.purchasedPaperboyUpgrades)) {
      data.purchasedPaperboyUpgrades.forEach(id => {
        const target = paperboyUpgrades.find(u => u.id === id);
        if (target) target.purchased = true;
      });
    }

    if (Array.isArray(data.purchasedKioskUpgrades)) {
      data.purchasedKioskUpgrades.forEach(id => {
        const target = kioskUpgrades.find(u => u.id === id);
        if (target) target.purchased = true;
      });
    }

    if (Array.isArray(data.purchasedTruckUpgrades)) {
      data.purchasedTruckUpgrades.forEach(id => {
        const target = truckUpgrades.find(u => u.id === id);
        if (target) target.purchased = true;
      });
    }

    if (Array.isArray(data.purchasedPressUpgrades)) {
      data.purchasedPressUpgrades.forEach(id => {
        const target = pressUpgrades.find(u => u.id === id);
        if (target) target.purchased = true;
      });
    }

    recalculateStats();
    checkTickerUnlock();
  } catch (e) {
    console.error('Failed to load save:', e);
  }
}

function hardReset() {
  if (!confirm('Do you want to delete your save?')) return;
  if (!confirm('Are you sure?')) return;

  const sureScore = prompt('How sure are you? Answer 1 to 10');
  if (sureScore === null || sureScore.trim() !== '10') return;

  if (!confirm('Still want to do it?')) return;
  if (!confirm('This is your last warning. There is no going back now.')) return;

  isResetting = true;
  resetGameStateToDefaults();
  localStorage.removeItem(SAVE_KEY);
  location.reload();
}

function printNewspaper() {
  newspapers += newsPerClick;
  totalNewspapersEarned += newsPerClick;
  manualNewspapersEarned += newsPerClick;
  totalNewspaperClicks += 1;
  triggerSquish();
  spawnNewspaperClone();
  checkTickerUnlock();
  updateUI();
}

function buyBuilding(index) {
  const b = buildings[index];
  const cost = getBulkBuildingCost(b, buyAmount);
  if (newspapers >= cost) {
    newspapers -= cost;
    b.count += buyAmount;
    recalculateStats();
    renderUpgradesSidebar();
    updateUI();
    saveGame();
  }
}

function buyUpgrade(chain, index) {
  let list;
  if (chain === 'click') list = clickUpgrades;
  else if (chain === 'paperboy') list = paperboyUpgrades;
  else if (chain === 'kiosk') list = kioskUpgrades;
  else if (chain === 'truck') list = truckUpgrades;
  else if (chain === 'press') list = pressUpgrades;

  const upg = list[index];
  if (!upg || upg.purchased || !isUpgradeUnlocked(upg)) return;
  if (newspapers >= upg.cost) {
    newspapers -= upg.cost;
    upg.purchased = true;
    recalculateStats();
    renderUpgradesSidebar();
    updateUI();
    saveGame();
  }
}

const newspaperBtnEl = document.getElementById('newspaper-btn');
const startTime = performance.now();

function animateNewspaper(now) {
  const timer = (now - startTime) / 1000;
  const wave = Math.sin((timer * 180) * (Math.PI / 180));
  newspaperBtnEl.style.transform = `translateY(${-wave * 14}px) rotate(${wave * 10}deg)`;
  requestAnimationFrame(animateNewspaper);
}
requestAnimationFrame(animateNewspaper);

document.getElementById('version-badge').innerText = GAME_VERSION;
initBuildingsUI();
loadGame();
recalculateStats();
renderUpgradesSidebar();
updateUI();
startTickerTimer();

setInterval(() => {
  if (!document.hidden) {
    activePlayTimeMs += 100;
  }
  const earnedThisTick = newsPerSecond / 10;
  newspapers += earnedThisTick;
  totalNewspapersEarned += earnedThisTick;
  checkTickerUnlock();
  updateUI();
}, 100);

setInterval(() => {
  saveGame();
}, 5000);

window.addEventListener('keydown', (e) => {
  if (e.key.toLowerCase() === 'c') {
    const amount = 1000000000000; // 1 trillion
    newspapers += amount;
    totalNewspapersEarned += amount;
    checkTickerUnlock();
    updateUI();
  }
});

window.addEventListener('beforeunload', saveGame);
