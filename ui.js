let currentTab = 'press';

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

function renderPurchasedUpgrades() {
  const sidebar = document.getElementById('upgrades-sidebar');
  if (!sidebar) return;

  const allPurchased = [
    ...clickUpgrades.filter(u => u.purchased).map(u => ({ ...u, category: 'Click Upgrade' })),
    ...paperboyUpgrades.filter(u => u.purchased).map(u => ({ ...u, category: 'Paperboy Upgrade' })),
    ...kioskUpgrades.filter(u => u.purchased).map(u => ({ ...u, category: 'Corner Kiosk Upgrade' })),
    ...truckUpgrades.filter(u => u.purchased).map(u => ({ ...u, category: 'Cargo Truck Upgrade' }))
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
  const totalUpgrades = clickUpgrades.length + paperboyUpgrades.length + kioskUpgrades.length + truckUpgrades.length;
  const boughtUpgrades =
    clickUpgrades.filter(u => u.purchased).length +
    paperboyUpgrades.filter(u => u.purchased).length +
    kioskUpgrades.filter(u => u.purchased).length +
    truckUpgrades.filter(u => u.purchased).length;

  const totalBuildings = buildings.reduce((sum, b) => sum + b.count, 0);

  document.getElementById('stat-all-time-news').innerText = formatNumber(totalNewspapersEarned);
  document.getElementById('stat-manual-news').innerText = formatNumber(manualNewspapersEarned);
  document.getElementById('stat-upgrades-bought').innerText = `${boughtUpgrades} / ${totalUpgrades}`;
  document.getElementById('stat-buildings-bought').innerText = totalBuildings.toLocaleString();
  document.getElementById('stat-run-age').innerText = formatDuration(Date.now() - runStartTime);
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

  const hasPaperboy = getBuildingCount('paperboy') > 0;
  const hasKiosk = getBuildingCount('kiosk') > 0;
  const hasTruck = getBuildingCount('truck') > 0;

  let html = '';

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

  if (nextClickIndex === -1 && nextPaperboyIndex === -1 && nextKioskIndex === -1 && nextTruckIndex === -1) {
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

  buildings.forEach((b, index) => {
    const cost = getBuildingCost(b);
    const card = document.getElementById(`b-card-${index}`);
    const nameEl = document.getElementById(`b-name-${index}`);
    const costEl = document.getElementById(`b-cost-${index}`);
    const rateEl = document.getElementById(`b-rate-${index}`);
    const countEl = document.getElementById(`b-count-${index}`);

    const isMystery = b.count === 0 && (newspapers * 2) < cost;

    if (isMystery) {
      card.classList.add('mystery');
      card.classList.remove('disabled');
      nameEl.innerText = '???';
      costEl.innerText = '???';
      rateEl.innerText = '???';
      countEl.innerText = '?';
    } else {
      card.classList.remove('mystery');
      nameEl.innerText = b.name;
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
  }

  if (currentTab === 'stats') {
    updateStatsUI();
  }
}
