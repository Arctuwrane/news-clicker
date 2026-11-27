const SAVE_KEY = 'readTheNewsSave_v1';
const costMultiplier = 1.15;

const suffixes = [
  "", "",
  "million",
  "billion",
  "trillion",
  "quadrillion",
  "quintillion",
  "sextillion",
  "septillion",
  "octillion",
  "nonillion",
  "decillion",
  "undecillion",
  "duodecillion",
  "tredecillion",
  "quattuordecillion",
  "quindecillion",
  "sexdecillion",
  "septendecillion",
  "octodecillion",
  "novemdecillion"
];

const buildings = [
  { id: 'paperboy', name: 'Paperboy', baseNps: 0.1, nps: 0.1, baseCost: 20, count: 0 },
  { id: 'kiosk', name: 'Corner Kiosk', baseNps: 1, nps: 1, baseCost: 150, count: 0 },
  { id: 'truck', name: 'Cargo Truck', baseNps: 9, nps: 9, baseCost: 2250, count: 0 },
  { id: 'press', name: 'Printing Press', baseNps: 64, nps: 64, baseCost: 17535, count: 0 },
  { id: 'mill', name: 'Paper Mill', baseNps: 308, nps: 308, baseCost: 165000, count: 0 },
  { id: 'hub', name: 'Distribution Hub', baseNps: 1455, nps: 1455, baseCost: 1800000, count: 0 },
  { id: 'network', name: 'Global News Network', baseNps: 8325, nps: 8325, baseCost: 25000000, count: 0 },
  { id: 'wardenclyffe', name: 'Wardenclyffe', baseNps: 48500, nps: 48500, baseCost: 390000000, count: 0 },
  { id: 'university', name: 'University', quote: '"For some, knowledge is a bestseller"', requiresUpgrade: 'space_science', baseNps: 285000, nps: 285000, baseCost: 5500000000, count: 0 },
  { id: 'cloud_blimp', name: 'Cloud Blimp', quote: '"Drops newspapers from the sky!"', requiresUpgrade: 'space_science', baseNps: 1800000, nps: 1800000, baseCost: 85000000000, count: 0 },
  { id: 'spaceship', name: 'Spaceship', quote: '"To find those planets with wood and woodlike"', requiresUpgrade: 'space_science', baseNps: 8000000, nps: 8000000, baseCost: 730000000000, count: 0 },
  { id: 'planetary_factory', name: 'TA Planetary Paper Factory', quote: '"Totally Automated. With more gravity, paper gets squeezed more easily and efficiently!"', requiresUpgrade: 'space_science', baseNps: 50000000, nps: 50000000, baseCost: 9000000000000, count: 0 },
  { id: 'zerog_mining', name: 'Zero-G Mining Station', quote: '"Mine the wooden ores, an ore which functions just as well as paper"', requiresUpgrade: 'space_science', baseNps: 290000000, nps: 290000000, baseCost: 87000000000000, count: 0 },
  { id: 'colonized_planet', name: 'Colonized Planet', quote: '"Every world I land on, I own"', requiresUpgrade: 'space_science', baseNps: 1500000000, nps: 1500000000, baseCost: 955000000000000, count: 0 },
  { id: 'galactic_archive', name: 'Galactic Archive', quote: '"Once you see it you can\'t unsee it"', requiresUpgrade: 'space_science', baseNps: 18000000000, nps: 18000000000, baseCost: 20000000000000000, count: 0 },
  { id: 'warp_speeder', name: 'Warp Speeder', quote: '"Brings news from the future! WARNING: YOU CANNOT CHANGE YOUR FATE"', requiresUpgrade: 'space_science', baseNps: 170000000000, nps: 170000000000, baseCost: 350000000000000000, count: 0 },
  { id: 'wormhole', name: 'Wormhole', quote: '"Brings news from other worlds"', requiresUpgrade: 'space_science', baseNps: 1000000000000, nps: 1000000000000, baseCost: 9800000000000000000, count: 0 },
  { id: 'supercollider', name: 'Supercollider', quote: '"Makes new atoms and molecules; these will be commercial bestsellers!"', requiresUpgrade: 'space_science', baseNps: 12000000000000, nps: 12000000000000, baseCost: 500000000000000000000, count: 0 }
];

const NEWSPAPER_SVG = `
  <svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
    <rect x="26" y="24" width="80" height="82" rx="4" fill="#dcd4c3" stroke="#111" stroke-width="4.5"/>
    <rect x="14" y="14" width="80" height="84" rx="4" fill="#fffdf9" stroke="#111" stroke-width="4.5"/>
    <rect x="24" y="24" width="60" height="12" rx="2" fill="#111"/>
    <line x1="24" y1="42" x2="84" y2="42" stroke="#111" stroke-width="3"/>
    <rect x="24" y="49" width="28" height="24" rx="2" fill="#d5cbb8" stroke="#111" stroke-width="3"/>
    <line x1="59" y1="51" x2="84" y2="51" stroke="#111" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="59" y1="59" x2="84" y2="59" stroke="#111" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="59" y1="67" x2="84" y2="67" stroke="#111" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="59" y1="75" x2="78" y2="75" stroke="#111" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="24" y1="82" x2="84" y2="82" stroke="#111" stroke-width="3.5" stroke-linecap="round"/>
    <line x1="24" y1="89" x2="72" y2="89" stroke="#111" stroke-width="3.5" stroke-linecap="round"/>
  </svg>
`;

function formatNumber(num) {
  if (num < 1e6) {
    return Math.floor(num).toLocaleString();
  }
  const tier = Math.min(Math.floor(Math.log10(num) / 3), suffixes.length - 1);
  const scale = Math.pow(10, tier * 3);
  const scaled = num / scale;
  return `${scaled.toFixed(3)} ${suffixes[tier]}`;
}

function formatRate(num) {
  if (num < 1e6) {
    return Number(num.toFixed(1)).toLocaleString();
  }
  return formatNumber(num);
}

function formatDuration(ms) {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0 || days > 0) parts.push(`${hours}h`);
  if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes}m`);
  parts.push(`${seconds}s`);
  return parts.join(' ');
}

function getBuildingCost(b) {
  return Math.ceil(b.baseCost * Math.pow(costMultiplier, b.count));
}

function getBulkBuildingCost(b, amount) {
  if (amount === 1) return getBuildingCost(b);
  const firstCost = getBuildingCost(b);
  return Math.ceil(firstCost * (Math.pow(costMultiplier, amount) - 1) / (costMultiplier - 1));
}
