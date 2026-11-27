let currentTab = 'press';
let bannerTimeout = null;

function setBuyAmount(amount) {
  buyAmount = amount;
  [1, 10, 100].forEach(n => {
    const btn = document.getElementById(`bulk-${n}`);
    if (btn) btn.classList.toggle('active', n === amount);
  });
  updateUI();
}

function switchTab(tabName) {
  currentTab = tabName;

  document.getElementById('view-press').classList.remove('active');
  document.getElementById('view-buildings').classList.remove('active');
  document.getElementById('view-stats').classList.remove('active');
  document.getElementById('tab-press').classList.remove('active');
  document.getElementById('tab-buildings').classList.remove('active');
  document.getElementById('tab-stats').classList.remove('active');

  document.getElementById('view-' + tabName).classList.add('active');
  document.getElementById('tab-' + tabName).classList.add('active');

  if (tabName === 'stats') {
    renderPurchasedUpgrades();
    updateStatsUI();
  } else {
    renderUpgradesSidebar();
    updateUI();
  }
}

function showGoldStampBanner({ title, subtitle, bg, textColor, borderColor }) {
  let banner = document.getElementById('gold-stamp-banner');
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'gold-stamp-banner';
    document.body.appendChild(banner);
  }

  banner.style.backgroundColor = bg;
  banner.style.color = textColor;
  banner.style.borderTop = `4px solid ${borderColor}`;
  banner.style.borderBottom = `4px solid ${borderColor}`;

  banner.innerHTML = `
    <div class="banner-title">${title}</div>
    <div class="banner-sub">${subtitle}</div>
  `;

  banner.style.display = 'block';
  banner.style.animation = 'none';
  void banner.offsetWidth;
  banner.style.animation = 'banner-pop 0.22s ease-out';

  if (bannerTimeout) clearTimeout(bannerTimeout);
  bannerTimeout = setTimeout(() => {
    banner.style.display = 'none';
  }, 3200);
}

function updateBuffsUI() {
  let bar = document.getElementById('active-buffs-bar');
  if (!bar) {
    const statsBar = document.querySelector('.stats-bar');
    if (!statsBar) return;
    bar = document.createElement('div');
    bar.id = 'active-buffs-bar';
    statsBar.appendChild(bar);
  }

  if (typeof activeGoldBuffs === 'undefined' || !Array.isArray(activeGoldBuffs) || activeGoldBuffs.length === 0) {
    bar.innerHTML = '';
    return;
  }

  bar.innerHTML = activeGoldBuffs.map(b => {
    const secs = Math.ceil(b.remainingMs / 1000);
    return `<span class="buff-pill" style="background:${b.bg}; color:${b.textColor};">${b.label} (${secs}s)</span>`;
  }).join('');
}

function renderPurchasedUpgrades() {
  if (currentTab !== 'stats') return;
  const sidebar = document.getElementById('upgrades-sidebar');
  if (!sidebar) return;

  const allPurchased = [
    ...clickUpgrades.filter(u => u.purchased).map(u => ({ ...u, category: 'Click Upgrade' })),
    ...paperboyUpgrades.filter(u => u.purchased).map(u => ({ ...u, category: 'Paperboy Upgrade' })),
    ...kioskUpgrades.filter(u => u.purchased).map(u => ({ ...u, category: 'Corner Kiosk Upgrade' })),
    ...truckUpgrades.filter(u => u.purchased).map(u => ({ ...u, category: 'Cargo Truck Upgrade' })),
    ...pressUpgrades.filter(u => u.purchased).map(u => ({ ...u, category: 'Printing Press Upgrade' })),
    ...millUpgrades.filter(u => u.purchased).map(u => ({ ...u, category: 'Paper Mill Upgrade' })),
    ...hubUpgrades.filter(u => u.purchased).map(u => ({ ...u, category: 'Distribution Hub Upgrade' })),
    ...networkUpgrades.filter(u => u.purchased).map(u => ({ ...u, category: 'Global News Network Upgrade' })),
    ...wardenclyffeUpgrades.filter(u => u.purchased).map(u => ({ ...u, category: 'Wardenclyffe Upgrade' }))
  ];

  let html = `<div class="sidebar-section-title" style="font-weight: bold; margin-bottom: 10px;">Purchased Upgrades (${allPurchased.length})</div>`;

  if (allPurchased.length === 0) {
    html += '<div class="all-bought-msg">No upgrades purchased yet.</div>';
  } else {
    html += allPurchased.map(upg => `
      <div class="purchased-upgrade-item">
        <div class="u-category">${upg.category}</div>
        <div class="u-header">${upg.name}</div>
        <div class="u-cost">Cost: ${formatNumber(upg.cost)}</div>
        <div class="u-desc">${upg.description}</div>
        <div class="u-quote">${upg.quote}</div>
      </div>
    `).join('');
  }

  sidebar.innerHTML = html;
}

function updateStatsUI() {
  const totalUpgrades =
    clickUpgrades.length +
    paperboyUpgrades.length +
    kioskUpgrades.length +
    truckUpgrades.length +
    pressUpgrades.length +
    millUpgrades.length +
    hubUpgrades.length +
    networkUpgrades.length +
    wardenclyffeUpgrades.length;

  const boughtUpgrades =
    clickUpgrades.filter(u => u.purchased).length +
    paperboyUpgrades.filter(u => u.purchased).length +
    kioskUpgrades.filter(u => u.purchased).length +
    truckUpgrades.filter(u => u.purchased).length +
    pressUpgrades.filter(u => u.purchased).length +
    millUpgrades.filter(u => u.purchased).length +
    hubUpgrades.filter(u => u.purchased).length +
    networkUpgrades.filter(u => u.purchased).length +
    wardenclyffeUpgrades.filter(u => u.purchased).length;

  const totalBuildings = buildings.reduce((sum, b) => sum + b.count, 0);

  document.getElementById('stat-all-time-news').innerText = formatNumber(totalNewspapersEarned);
  document.getElementById('stat-manual-news').innerText = formatNumber(manualNewspapersEarned);
  document.getElementById('stat-upgrades-bought').innerText = `${boughtUpgrades} / ${totalUpgrades}`;
  document.getElementById('stat-buildings-bought').innerText = totalBuildings.toLocaleString();
  document.getElementById('stat-run-age').innerText = formatDuration(activePlayTimeMs);
  document.getElementById('stat-clicks').innerText = totalNewspaperClicks.toLocaleString();
}

function triggerSquish() {
  const wrapper = document.getElementById('newspaper-wrapper');
  wrapper.classList.remove('squish');
  void wrapper.offsetWidth;
  wrapper.classList.add('squish');
}

function spawnNewspaperClone() {
  const btn = document.getElementById('newspaper-btn');
  const rect = btn.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  const clone = document.createElement('div');
  clone.className = 'newspaper-clone';
  clone.innerHTML = NEWSPAPER_SVG;

  let x = centerX;
  let y = centerY;
  const vx = (Math.random() - 0.5) * 7;
  let vy = -11 - Math.random() * 4;
  const gravity = 0.65;
  let rotation = (Math.random() - 0.5) * 20;
  const vRot = (Math.random() - 0.5) * 10;

  let ghost = 60;
  let fadingOut = false;

  clone.style.left = `${x}px`;
  clone.style.top = `${y}px`;
  clone.style.opacity = (100 - ghost) / 100;
  clone.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;

  document.body.appendChild(clone);

  const cloneTimer = setInterval(() => {
    x += vx;
    vy += gravity;
    y += vy;
    rotation += vRot;

    const halfSize = 32;
    const touchedEdge =
      x - halfSize <= 0 ||
      x + halfSize >= window.innerWidth ||
      y - halfSize <= 0 ||
      y + halfSize >= window.innerHeight;

    if (touchedEdge) {
      fadingOut = true;
    }

    if (fadingOut) {
      ghost += 8;
      if (ghost >= 100) {
        clearInterval(cloneTimer);
        clone.remove();
        return;
      }
    }

    clone.style.left = `${x}px`;
    clone.style.top = `${y}px`;
    clone.style.opacity = (100 - ghost) / 100;
    clone.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
  }, 10);
}

function getWardenclyffeLockLabel(upg) {
  if (upg.id === 'ai_supercore') {
    const missing = [];
    if (!hasUpgrade('space_science')) missing.push('Space Science');
    if (!hasUpgrade('self_improving_ai')) missing.push('Self-Improving AI');
    return `Locked — Buy ${missing.join(' & ')} first`;
  }
  return 'Locked — Buy Space Science first';
}

function renderUpgradesSidebar() {
  if (currentTab === 'stats') {
    renderPurchasedUpgrades();
    return;
  }

  const sidebar = document.getElementById('upgrades-sidebar');
  const nextClickIndex = clickUpgrades.findIndex(u => !u.purchased);
  const nextPaperboyIndex = paperboyUpgrades.findIndex(u => !u.purchased);
  const nextKioskIndex = kioskUpgrades.findIndex(u => !u.purchased);
  const nextTruckIndex = truckUpgrades.findIndex(u => !u.purchased);
  const nextPressIndex = pressUpgrades.findIndex(u => !u.purchased);
  const nextMillIndex = millUpgrades.findIndex(u => !u.purchased);
  const nextHubIndex = hubUpgrades.findIndex(u => !u.purchased);
  const nextNetworkIndex = networkUpgrades.findIndex(u => !u.purchased);
  const nextWardenclyffeIndex = wardenclyffeUpgrades.findIndex(u => !u.purchased);

  const hasPaperboy = getBuildingCount('paperboy') > 0;
  const hasKiosk = getBuildingCount('kiosk') > 0;
  const hasTruck = getBuildingCount('truck') > 0;
  const hasPress = getBuildingCount('press') > 0;
  const hasMill = getBuildingCount('mill') > 0;
  const hasHub = getBuildingCount('hub') > 0;
  const hasNetwork = getBuildingCount('network') > 0;
  const hasWardenclyffe = getBuildingCount('wardenclyffe') > 0;

  let wardenclyffeHtml = '';
  if (hasWardenclyffe && nextWardenclyffeIndex !== -1) {
    const upg = wardenclyffeUpgrades[nextWardenclyffeIndex];
    const unlocked = isUpgradeUnlocked(upg);
    wardenclyffeHtml = `
      <div class="upgrade-card" id="active-wardenclyffe-upgrade" onclick="buyUpgrade('wardenclyffe', ${nextWardenclyffeIndex})">
        <div class="u-category">Wardenclyffe Upgrade</div>
        <div class="u-header">${unlocked ? upg.name : '🔒 ' + upg.name}</div>
        <div class="u-cost">${unlocked ? 'Cost: ' + formatNumber(upg.cost) : getWardenclyffeLockLabel(upg)}</div>
        <div class="u-desc">${upg.description}</div>
        <div class="u-quote">${upg.quote}</div>
      </div>
    `;
  }

  let html = '';

  // Priority: Space Science jumps to the highest slot in queue as soon as Wardenclyffe is bought
  const isWardenclyffePriority =
    hasWardenclyffe &&
    nextWardenclyffeIndex !== -1 &&
    wardenclyffeUpgrades[nextWardenclyffeIndex].priority;

  if (isWardenclyffePriority) {
    html += wardenclyffeHtml;
  }

  if (nextClickIndex !== -1) {
    const upg = clickUpgrades[nextClickIndex];
    html += `
      <div class="upgrade-card" id="active-click-upgrade" onclick="buyUpgrade('click', ${nextClickIndex})">
        <div class="u-category">Click Upgrade</div>
        <div class="u-header">${upg.name}</div>
        <div class="u-cost">Cost: ${formatNumber(upg.cost)}</div>
        <div class="u-desc">${upg.description}</div>
        <div class="u-quote">${upg.quote}</div>
      </div>
    `;
  }

  if (hasPaperboy && nextPaperboyIndex !== -1) {
    const upg = paperboyUpgrades[nextPaperboyIndex];
    html += `
      <div class="upgrade-card" id="active-paperboy-upgrade" onclick="buyUpgrade('paperboy', ${nextPaperboyIndex})">
        <div class="u-category">Paperboy Upgrade</div>
        <div class="u-header">${upg.name}</div>
        <div class="u-cost">Cost: ${formatNumber(upg.cost)}</div>
        <div class="u-desc">${upg.description}</div>
        <div class="u-quote">${upg.quote}</div>
      </div>
    `;
  }

  if (hasKiosk && nextKioskIndex !== -1) {
    const upg = kioskUpgrades[nextKioskIndex];
    const unlocked = isUpgradeUnlocked(upg);
    html += `
      <div class="upgrade-card" id="active-kiosk-upgrade" onclick="buyUpgrade('kiosk', ${nextKioskIndex})">
        <div class="u-category">Corner Kiosk Upgrade</div>
        <div class="u-header">${unlocked ? upg.name : '🔒 ' + upg.name}</div>
        <div class="u-cost">${unlocked ? 'Cost: ' + formatNumber(upg.cost) : 'Locked — Buy Supreme Intellect first'}</div>
        <div class="u-desc">${upg.description}</div>
        <div class="u-quote">${upg.quote}</div>
      </div>
    `;
  }

  if (hasTruck && nextTruckIndex !== -1) {
    const upg = truckUpgrades[nextTruckIndex];
    html += `
      <div class="upgrade-card" id="active-truck-upgrade" onclick="buyUpgrade('truck', ${nextTruckIndex})">
        <div class="u-category">Cargo Truck Upgrade</div>
        <div class="u-header">${upg.name}</div>
        <div class="u-cost">Cost: ${formatNumber(upg.cost)}</div>
        <div class="u-desc">${upg.description}</div>
        <div class="u-quote">${upg.quote}</div>
      </div>
    `;
  }

  if (hasPress && nextPressIndex !== -1) {
    const upg = pressUpgrades[nextPressIndex];
    html += `
      <div class="upgrade-card" id="active-press-upgrade" onclick="buyUpgrade('press', ${nextPressIndex})">
        <div class="u-category">Printing Press Upgrade</div>
        <div class="u-header">${upg.name}</div>
        <div class="u-cost">Cost: ${formatNumber(upg.cost)}</div>
        <div class="u-desc">${upg.description}</div>
        <div class="u-quote">${upg.quote}</div>
      </div>
    `;
  }

  if (hasMill && nextMillIndex !== -1) {
    const upg = millUpgrades[nextMillIndex];
    html += `
      <div class="upgrade-card" id="active-mill-upgrade" onclick="buyUpgrade('mill', ${nextMillIndex})">
        <div class="u-category">Paper Mill Upgrade</div>
        <div class="u-header">${upg.name}</div>
        <div class="u-cost">Cost: ${formatNumber(upg.cost)}</div>
        <div class="u-desc">${upg.description}</div>
        <div class="u-quote">${upg.quote}</div>
      </div>
    `;
  }

  if (hasHub && nextHubIndex !== -1) {
    const upg = hubUpgrades[nextHubIndex];
    html += `
      <div class="upgrade-card" id="active-hub-upgrade" onclick="buyUpgrade('hub', ${nextHubIndex})">
        <div class="u-category">Distribution Hub Upgrade</div>
        <div class="u-header">${upg.name}</div>
        <div class="u-cost">Cost: ${formatNumber(upg.cost)}</div>
        <div class="u-desc">${upg.description}</div>
        <div class="u-quote">${upg.quote}</div>
      </div>
    `;
  }

  if (hasNetwork && nextNetworkIndex !== -1) {
    const upg = networkUpgrades[nextNetworkIndex];
    const unlocked = isUpgradeUnlocked(upg);
    html += `
      <div class="upgrade-card" id="active-network-upgrade" onclick="buyUpgrade('network', ${nextNetworkIndex})">
        <div class="u-category">Global News Network Upgrade</div>
        <div class="u-header">${unlocked ? upg.name : '🔒 ' + upg.name}</div>
        <div class="u-cost">${unlocked ? 'Cost: ' + formatNumber(upg.cost) : 'Locked — Buy The Infinity Engine first'}</div>
        <div class="u-desc">${upg.description}</div>
        <div class="u-quote">${upg.quote}</div>
      </div>
    `;
  }

  if (!isWardenclyffePriority) {
    html += wardenclyffeHtml;
  }

  if (
    nextClickIndex === -1 &&
    nextPaperboyIndex === -1 &&
    nextKioskIndex === -1 &&
    nextTruckIndex === -1 &&
    nextPressIndex === -1 &&
    nextMillIndex === -1 &&
    nextHubIndex === -1 &&
    nextNetworkIndex === -1 &&
    nextWardenclyffeIndex === -1
  ) {
    html = '<div class="all-bought-msg">All upgrades purchased!</div>';
  }

  sidebar.innerHTML = html;
}

function initBuildingsUI() {
  const container = document.getElementById('buildings-container');
  container.innerHTML = buildings.map((b, index) => `
    <div class="building-card" id="b-card-${index}" onclick="buyBuilding(${index})">
      <div class="b-info">
        <h3 id="b-name-${index}">${b.name}</h3>
        ${b.quote ? `<div class="b-quote" id="b-quote-${index}">${b.quote}</div>` : ''}
        <p>Cost: <span id="b-cost-${index}">${formatNumber(b.baseCost)}</span> | +<span id="b-rate-${index}">${formatRate(b.baseNps)}</span> n/s</p>
      </div>
      <div class="b-owned" id="b-count-${index}">0</div>
    </div>
  `).join('');
}

function updateUI() {
  document.getElementById('newspapers').innerText = formatNumber(newspapers);
  document.getElementById('npc').innerText = formatRate(newsPerClick);
  document.getElementById('nps').innerText = formatRate(newsPerSecond);
  updateBuffsUI();

  buildings.forEach((b, index) => {
    const card = document.getElementById(`b-card-${index}`);
    const singleCost = getBuildingCost(b);
    const cost = getBulkBuildingCost(b, buyAmount);
    const nameEl = document.getElementById(`b-name-${index}`);
    const quoteEl = document.getElementById(`b-quote-${index}`);
    const costEl = document.getElementById(`b-cost-${index}`);
    const rateEl = document.getElementById(`b-rate-${index}`);
    const countEl = document.getElementById(`b-count-${index}`);

    const lockedByUpgrade = b.requiresUpgrade && !hasUpgrade(b.requiresUpgrade);
    const isMystery = lockedByUpgrade || (b.count === 0 && (newspapers * 2) < singleCost);

    if (isMystery) {
      card.classList.add('mystery');
      card.classList.remove('disabled');
      nameEl.innerText = '???';
      if (quoteEl) quoteEl.innerText = '???';
      costEl.innerText = '???';
      rateEl.innerText = '???';
      countEl.innerText = '?';
    } else {
      card.classList.remove('mystery');
      nameEl.innerText = buyAmount > 1 ? `${b.name} (x${buyAmount})` : b.name;
      if (quoteEl && b.quote) quoteEl.innerText = b.quote;
      costEl.innerText = formatNumber(cost);
      rateEl.innerText = formatRate(b.nps);
      countEl.innerText = b.count;

      if (newspapers >= cost) {
        card.classList.remove('disabled');
      } else {
        card.classList.add('disabled');
      }
    }
  });

  if (currentTab !== 'stats') {
    const nextClickUpg = clickUpgrades.find(u => !u.purchased);
    const clickCard = document.getElementById('active-click-upgrade');
    if (nextClickUpg && clickCard) {
      clickCard.classList.toggle('disabled', newspapers < nextClickUpg.cost || !isUpgradeUnlocked(nextClickUpg));
    }

    const nextPaperboyUpg = paperboyUpgrades.find(u => !u.purchased);
    const paperboyCard = document.getElementById('active-paperboy-upgrade');
    if (nextPaperboyUpg && paperboyCard) {
      paperboyCard.classList.toggle('disabled', newspapers < nextPaperboyUpg.cost || !isUpgradeUnlocked(nextPaperboyUpg));
    }

    const nextKioskUpg = kioskUpgrades.find(u => !u.purchased);
    const kioskCard = document.getElementById('active-kiosk-upgrade');
    if (nextKioskUpg && kioskCard) {
      kioskCard.classList.toggle('disabled', newspapers < nextKioskUpg.cost || !isUpgradeUnlocked(nextKioskUpg));
    }

    const nextTruckUpg = truckUpgrades.find(u => !u.purchased);
    const truckCard = document.getElementById('active-truck-upgrade');
    if (nextTruckUpg && truckCard) {
      truckCard.classList.toggle('disabled', newspapers < nextTruckUpg.cost || !isUpgradeUnlocked(nextTruckUpg));
    }

    const nextPressUpg = pressUpgrades.find(u => !u.purchased);
    const pressCard = document.getElementById('active-press-upgrade');
    if (nextPressUpg && pressCard) {
      pressCard.classList.toggle('disabled', newspapers < nextPressUpg.cost || !isUpgradeUnlocked(nextPressUpg));
    }

    const nextMillUpg = millUpgrades.find(u => !u.purchased);
    const millCard = document.getElementById('active-mill-upgrade');
    if (nextMillUpg && millCard) {
      millCard.classList.toggle('disabled', newspapers < nextMillUpg.cost || !isUpgradeUnlocked(nextMillUpg));
    }

    const nextHubUpg = hubUpgrades.find(u => !u.purchased);
    const hubCard = document.getElementById('active-hub-upgrade');
    if (nextHubUpg && hubCard) {
      hubCard.classList.toggle('disabled', newspapers < nextHubUpg.cost || !isUpgradeUnlocked(nextHubUpg));
    }

    const nextNetworkUpg = networkUpgrades.find(u => !u.purchased);
    const networkCard = document.getElementById('active-network-upgrade');
    if (nextNetworkUpg && networkCard) {
      networkCard.classList.toggle('disabled', newspapers < nextNetworkUpg.cost || !isUpgradeUnlocked(nextNetworkUpg));
    }

    const nextWardenclyffeUpg = wardenclyffeUpgrades.find(u => !u.purchased);
    const wardenclyffeCard = document.getElementById('active-wardenclyffe-upgrade');
    if (nextWardenclyffeUpg && wardenclyffeCard) {
      wardenclyffeCard.classList.toggle('disabled', newspapers < nextWardenclyffeUpg.cost || !isUpgradeUnlocked(nextWardenclyffeUpg));
    }
  }

  if (currentTab === 'stats') {
    updateStatsUI();
  }
}
