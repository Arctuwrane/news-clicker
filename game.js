let newspapers = 0;
let totalNewspapersEarned = 0;
let manualNewspapersEarned = 0;
let totalNewspaperClicks = 0;
let activePlayTimeMs = 0;
let newsPerClick = 1;
let newsPerSecond = 0;
let buyAmount = 1;
let isResetting = false;

let goldStampSpawnRemainingMs = 0;
let activeGoldBuffs = [];
let activeGoldStampEl = null;
let goldStampAnimInterval = null;
let stormSpawnInterval = null;

function hasUpgrade(id) {
  return clickUpgrades.some(u => u.id === id && u.purchased === true) ||
         paperboyUpgrades.some(u => u.id === id && u.purchased === true) ||
         kioskUpgrades.some(u => u.id === id && u.purchased === true) ||
         truckUpgrades.some(u => u.id === id && u.purchased === true) ||
         pressUpgrades.some(u => u.id === id && u.purchased === true) ||
         millUpgrades.some(u => u.id === id && u.purchased === true) ||
         hubUpgrades.some(u => u.id === id && u.purchased === true) ||
         networkUpgrades.some(u => u.id === id && u.purchased === true) ||
         wardenclyffeUpgrades.some(u => u.id === id && u.purchased === true);
}

function getBuildingCount(id) {
  const target = buildings.find(b => b.id === id);
  return target ? target.count : 0;
}

function isUpgradeUnlocked(upg) {
  if (upg.requiresUpgrade && !hasUpgrade(upg.requiresUpgrade)) return false;
  if (Array.isArray(upg.requiresUpgrades) && !upg.requiresUpgrades.every(id => hasUpgrade(id))) return false;
  return true;
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

function getEffectiveMillNps() {
  const millBuilding = buildings.find(b => b.id === 'mill');
  let rate = millBuilding.baseNps;
  const purchasedMillCount = millUpgrades.filter(u => u.purchased).length;
  rate *= Math.pow(2, purchasedMillCount);
  return rate;
}

function getEffectiveHubNps() {
  const hubBuilding = buildings.find(b => b.id === 'hub');
  let rate = hubBuilding.baseNps;
  const purchasedHubCount = hubUpgrades.filter(u => u.purchased).length;
  rate *= Math.pow(2, purchasedHubCount);
  return rate;
}

function getEffectiveNetworkNps() {
  const networkBuilding = buildings.find(b => b.id === 'network');
  let rate = networkBuilding.baseNps;
  const purchasedNetworkCount = networkUpgrades.filter(u => u.purchased).length;
  rate *= Math.pow(2, purchasedNetworkCount);
  return rate;
}

function getEffectiveWardenclyffeNps() {
  const wardenclyffeBuilding = buildings.find(b => b.id === 'wardenclyffe');
  let rate = wardenclyffeBuilding.baseNps;
  const purchasedMultiplierCount = wardenclyffeUpgrades.filter(u => u.purchased && !u.noMultiplier).length;
  rate *= Math.pow(2, purchasedMultiplierCount);
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

  activeGoldBuffs.forEach(buff => {
    if (buff.type === 'click') npc *= buff.multiplier;
  });
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
    } else if (b.id === 'mill') {
      b.nps = getEffectiveMillNps();
    } else if (b.id === 'hub') {
      b.nps = getEffectiveHubNps();
    } else if (b.id === 'network') {
      b.nps = getEffectiveNetworkNps();
    } else if (b.id === 'wardenclyffe') {
      b.nps = getEffectiveWardenclyffeNps();
    } else {
      b.nps = b.baseNps;
    }
  });

  let baseTotalNps = buildings.reduce((total, b) => total + (b.nps * b.count), 0);
  activeGoldBuffs.forEach(buff => {
    if (buff.type === 'nps') baseTotalNps *= buff.multiplier;
  });
  newsPerSecond = baseTotalNps;
}

function rollNextGoldStampDelayMs() {
  const grp = Math.floor(Math.random() * 21) + 1;
  let seconds;
  if (grp <= 18) {
    seconds = Math.floor(Math.random() * (540 - 140 + 1)) + 140;
  } else if (grp === 19) {
    seconds = Math.floor(Math.random() * (750 - 541 + 1)) + 541;
  } else if (grp === 20) {
    seconds = Math.floor(Math.random() * (139 - 45 + 1)) + 45;
  } else {
    seconds = Math.floor(Math.random() * (44 - 20 + 1)) + 20;
  }
  return seconds * 1000;
}

function addGoldBuff(id, label, type, multiplier, durationSec, bg, textColor) {
  const totalMs = durationSec * 1000;
  const existing = activeGoldBuffs.find(b => b.id === id);
  if (existing) {
    existing.remainingMs = totalMs;
    existing.totalMs = totalMs;
  } else {
    activeGoldBuffs.push({
      id,
      label,
      type,
      multiplier,
      remainingMs: totalMs,
      totalMs,
      bg,
      textColor
    });
  }
  recalculateStats();
  updateUI();
}

function startStampStorm() {
  if (stormSpawnInterval) clearInterval(stormSpawnInterval);
  addGoldBuff('media_storm', 'Media Storm', 'storm', 1, 7, '#666666', '#ffffff');
  const stormEndTime = performance.now() + 7000;

  stormSpawnInterval = setInterval(() => {
    if (document.hidden) return;
    if (performance.now() >= stormEndTime) {
      clearInterval(stormSpawnInterval);
      stormSpawnInterval = null;
      return;
    }

    const stormStamp = document.createElement('div');
    stormStamp.className = 'gold-stamp storm-stamp';
    const x = 60 + Math.random() * (window.innerWidth - 120);
    const y = 70 + Math.random() * (window.innerHeight - 140);
    stormStamp.style.left = `${x}px`;
    stormStamp.style.top = `${y}px`;

    const lifeTimeout = setTimeout(() => {
      stormStamp.remove();
    }, 1800);

    stormStamp.onclick = (e) => {
      e.stopPropagation();
      clearTimeout(lifeTimeout);
      stormStamp.remove();
      const reward = newsPerSecond * 60;
      newspapers += reward;
      totalNewspapersEarned += reward;
      updateUI();
    };

    document.body.appendChild(stormStamp);
  }, 220);
}

function triggerGoldStampAbility() {
  const roll = Math.random() * 100;

  if (roll < 40) {
    addGoldBuff('media_circus', 'Media Circus x7', 'nps', 7, 77, '#ff0000', '#ffd700');
    showGoldStampBanner({
      title: 'Media Circus!',
      subtitle: 'x7 Newspaper Production!',
      bg: '#ff0000',
      textColor: '#ffd700',
      borderColor: '#000000'
    });
  } else if (roll < 83) {
    const gain = Math.min(newspapers * 3, newsPerSecond * 540);
    newspapers += gain;
    totalNewspapersEarned += gain;
    showGoldStampBanner({
      title: 'BIG SCOOP!',
      subtitle: `You gained some newspapers! (+${formatNumber(gain)})`,
      bg: '#f8c8dc',
      textColor: '#000000',
      borderColor: '#000000'
    });
  } else if (roll < 88) {
    addGoldBuff('paparazzi', 'Paparazzi x77', 'click', 77, 13, '#000000', '#ffffff');
    showGoldStampBanner({
      title: 'PAPARAZZI!',
      subtitle: 'x77 Click Power!',
      bg: '#000000',
      textColor: '#ffffff',
      borderColor: '#ffffff'
    });
  } else if (roll < 93) {
    startStampStorm();
    showGoldStampBanner({
      title: 'MEDIA STORM!!!',
      subtitle: 'STAMPS EVERYWHERE!!!!',
      bg: '#666666',
      textColor: '#ffffff',
      borderColor: '#ffffff'
    });
  } else if (roll < 98) {
    const gain = Math.min(newspapers * 10, newsPerSecond * 1800);
    newspapers += gain;
    totalNewspapersEarned += gain;
    showGoldStampBanner({
      title: 'JACKPOT!!!',
      subtitle: `YOU GAINED A FORTUNE OF NEWSPAPERS! (+${formatNumber(gain)})`,
      bg: '#c9a600',
      textColor: '#000000',
      borderColor: '#000000'
    });
  } else if (roll < 99) {
    addGoldBuff('antique_find', 'Antique Find x777', 'click', 777, 7, '#662d00', '#ffffff');
    showGoldStampBanner({
      title: 'ANTIQUE FIND!!!',
      subtitle: 'x777 CLICK POWER!',
      bg: '#662d00',
      textColor: '#ffffff',
      borderColor: '#000000'
    });
  } else {
    addGoldBuff('brainwash', 'Brainwash x21', 'nps', 21, 77, '#00b31e', '#000000');
    showGoldStampBanner({
      title: 'BRAINWASH!!!',
      subtitle: 'x21 NEWSPAPER PRODUCTION!',
      bg: '#00b31e',
      textColor: '#000000',
      borderColor: '#000000'
    });
  }

  updateUI();
  saveGame();
}

function removeActiveGoldStamp() {
  if (goldStampAnimInterval) {
    clearInterval(goldStampAnimInterval);
    goldStampAnimInterval = null;
  }
  if (activeGoldStampEl) {
    activeGoldStampEl.remove();
    activeGoldStampEl = null;
  }
}

function spawnGoldStamp() {
  goldStampSpawnRemainingMs = rollNextGoldStampDelayMs();
  removeActiveGoldStamp();

  const stamp = document.createElement('div');
  stamp.className = 'gold-stamp';

  const buildingsTab = document.getElementById('tab-buildings');
  const diameter = buildingsTab ? Math.max(32, buildingsTab.offsetHeight) : 38;
  stamp.style.width = `${diameter}px`;
  stamp.style.height = `${diameter}px`;

  const margin = diameter + 24;
  const x = margin + Math.random() * Math.max(60, window.innerWidth - margin * 2);
  const y = margin + 40 + Math.random() * Math.max(60, window.innerHeight - margin * 2 - 40);
  stamp.style.left = `${x}px`;
  stamp.style.top = `${y}px`;

  const lifetimeMs = (1.5 + Math.random() * 6.5) * 1000;
  const exitDurationMs = Math.min(650, lifetimeMs * 0.35);
  const growsHugeAtEnd = Math.random() < 0.5;

  let elapsedMs = 0;
  let ghost = Math.floor(Math.random() * 61) + 30;
  let ghostChangeCooldown = 400 + Math.random() * 800;
  let pulsePhase = Math.random() * Math.PI * 2;

  stamp.style.opacity = (100 - ghost) / 100;
  document.body.appendChild(stamp);
  activeGoldStampEl = stamp;

  stamp.onclick = (e) => {
    e.stopPropagation();
    removeActiveGoldStamp();
    triggerGoldStampAbility();
  };

  goldStampAnimInterval = setInterval(() => {
    if (document.hidden) return;
    elapsedMs += 50;
    ghostChangeCooldown -= 50;

    if (ghostChangeCooldown <= 0) {
      ghost = Math.floor(Math.random() * 61) + 30;
      ghostChangeCooldown = 400 + Math.random() * 900;
    }

    const remainingMs = lifetimeMs - elapsedMs;
    if (remainingMs <= 0) {
      removeActiveGoldStamp();
      return;
    }

    let scale = 1;
    let opacity = (100 - ghost) / 100;

    if (remainingMs <= exitDurationMs) {
      const t = 1 - (remainingMs / exitDurationMs);
      if (growsHugeAtEnd) {
        scale = 1 + t * 2.8;
      } else {
        scale = Math.max(0.02, 1 - t);
      }
      opacity *= (1 - t);
    } else {
      pulsePhase += 0.22;
      scale = 1 + Math.sin(pulsePhase) * 0.16;
    }

    stamp.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(3)})`;
    stamp.style.opacity = Math.max(0, opacity).toFixed(2);
  }, 50);
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
  activeGoldBuffs = [];
  removeActiveGoldStamp();
  if (stormSpawnInterval) {
    clearInterval(stormSpawnInterval);
    stormSpawnInterval = null;
  }
  goldStampSpawnRemainingMs = rollNextGoldStampDelayMs();
  if (typeof russianSatellitesCount !== 'undefined') {
    russianSatellitesCount = 30;
  }

  buildings.forEach(b => {
    b.count = 0;
    b.nps = b.baseNps;
  });

  clickUpgrades.forEach(u => { u.purchased = false; });
  paperboyUpgrades.forEach(u => { u.purchased = false; });
  kioskUpgrades.forEach(u => { u.purchased = false; });
  truckUpgrades.forEach(u => { u.purchased = false; });
  pressUpgrades.forEach(u => { u.purchased = false; });
  millUpgrades.forEach(u => { u.purchased = false; });
  hubUpgrades.forEach(u => { u.purchased = false; });
  networkUpgrades.forEach(u => { u.purchased = false; });
  wardenclyffeUpgrades.forEach(u => { u.purchased = false; });
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
    goldStampSpawnRemainingMs,
    russianSatellitesCount: typeof russianSatellitesCount !== 'undefined' ? russianSatellitesCount : 30,
    buildings: buildings.map(b => ({ id: b.id, count: b.count })),
    purchasedClickUpgrades: clickUpgrades.filter(u => u.purchased).map(u => u.id),
    purchasedPaperboyUpgrades: paperboyUpgrades.filter(u => u.purchased).map(u => u.id),
    purchasedKioskUpgrades: kioskUpgrades.filter(u => u.purchased).map(u => u.id),
    purchasedTruckUpgrades: truckUpgrades.filter(u => u.purchased).map(u => u.id),
    purchasedPressUpgrades: pressUpgrades.filter(u => u.purchased).map(u => u.id),
    purchasedMillUpgrades: millUpgrades.filter(u => u.purchased).map(u => u.id),
    purchasedHubUpgrades: hubUpgrades.filter(u => u.purchased).map(u => u.id),
    purchasedNetworkUpgrades: networkUpgrades.filter(u => u.purchased).map(u => u.id),
    purchasedWardenclyffeUpgrades: wardenclyffeUpgrades.filter(u => u.purchased).map(u => u.id)
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
    if (typeof data.goldStampSpawnRemainingMs === 'number' && data.goldStampSpawnRemainingMs > 0) {
      goldStampSpawnRemainingMs = data.goldStampSpawnRemainingMs;
    } else {
      goldStampSpawnRemainingMs = rollNextGoldStampDelayMs();
    }
    if (typeof data.russianSatellitesCount === 'number' && typeof russianSatellitesCount !== 'undefined') {
      russianSatellitesCount = Math.min(380855, Math.max(30, data.russianSatellitesCount));
    }

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

    if (Array.isArray(data.purchasedMillUpgrades)) {
      data.purchasedMillUpgrades.forEach(id => {
        const target = millUpgrades.find(u => u.id === id);
        if (target) target.purchased = true;
      });
    }

    if (Array.isArray(data.purchasedHubUpgrades)) {
      data.purchasedHubUpgrades.forEach(id => {
        const target = hubUpgrades.find(u => u.id === id);
        if (target) target.purchased = true;
      });
    }

    if (Array.isArray(data.purchasedNetworkUpgrades)) {
      data.purchasedNetworkUpgrades.forEach(id => {
        const target = networkUpgrades.find(u => u.id === id);
        if (target) target.purchased = true;
      });
    }

    if (Array.isArray(data.purchasedWardenclyffeUpgrades)) {
      data.purchasedWardenclyffeUpgrades.forEach(id => {
        const target = wardenclyffeUpgrades.find(u => u.id === id);
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
  if (b.requiresUpgrade && !hasUpgrade(b.requiresUpgrade)) return;

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
  else if (chain === 'mill') list = millUpgrades;
  else if (chain === 'hub') list = hubUpgrades;
  else if (chain === 'network') list = networkUpgrades;
  else if (chain === 'wardenclyffe') list = wardenclyffeUpgrades;

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

    if (activeGoldBuffs.length > 0) {
      activeGoldBuffs.forEach(b => { b.remainingMs -= 100; });
      const beforeCount = activeGoldBuffs.length;
      activeGoldBuffs = activeGoldBuffs.filter(b => b.remainingMs > 0);
      if (activeGoldBuffs.length !== beforeCount) {
        recalculateStats();
      }
    }

    goldStampSpawnRemainingMs -= 100;
    if (goldStampSpawnRemainingMs <= 0) {
      spawnGoldStamp();
    }
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

window.addEventListener('beforeunload', saveGame);
