const wordsOfTheDay = [
  "meow",
  "cattywampus",
  "hippopotomonstrosesquippedaliophobia",
  "pneumonoultramicroscopicsilicovolcanoconiosis",
  "mewl",
  "waw",
  "67",
  "Lakukuracha",
  "[input word here]"
];

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const unlockedHeadlines = [
  () => `Word of the day: ${pickRandom(wordsOfTheDay)}`,
  () => `"Lowkey!" - Von Thimothy, Local General of the Army`,
  () => `Behold the power of chess.`,
  () => `Danri won the lottery!`,
  () => `A bird pooped on the president live!`,
  () => `World's Most Sigma: Von Thimothy, Local General of the Army`,
  () => `GTA 7 release sparks riot, ${randInt(7, 253)} injured!`,
  () => `I did not go to high school, but I went to school high - A Wise Man`,
  () => `Breathing mysterious chemical known as Oxygen linked to staying alive!`,
  () => `Man struck by lightning: Faces battery charge`,
  () => `Local voters vote on whether voting should be voted upon`,
  () => `Police issue campaign to run over jaywalkers!`,
  () => `Robot uprising delayed due to mandatory software update!`,
  () => `Duck makes grape investment, earns ${randInt(1, 15)} million dollars!`,
  () => `Local office worker closes ${randInt(12, 98)} tabs, tears his clothes in extreme joy`,
  () => `IT Department reminds staff that "Password123" is no longer secure; recommends "Password1234" instead.`,
  () => `Man in airport with nothing to declare, secretly hiding ${randInt(42, 78)} lizards in his pants.`,
  () => `Toilet incident forces complete evacuation of floor ${randInt(2, 9)}!`,
  () => `CEO replaces entire board of directors with AI; AI immediately fires CEO for it`,
  () => `Burglar in Germany broke into a house, got comfortable, drank the homeowner's beer, and fell so fast asleep on the couch that police had to shake him awake to arrest him.`,
  () => `An art museum worker in Germany was fired after he secretly hung his own painting in the gallery next to classic masterpieces because he wanted to achieve his artistic breakthrough.`,
  () => `Firefighters in Kuwait arrived at a house fire only to discover the emergency call was triggered entirely by a highly intelligent pet parrot mimicking a smoke detector.`,
  () => `Man tried to rob a bank in Colombia using a donkey as a getaway vehicle, but the donkey refused to move and brayed so loudly it alerted nearby police officers.`,
  () => `Scientists tracking an eagle's migratory patterns went completely broke after the bird flew into Iran and sent thousands of text messages roaming charges back to the lab.`,
  () => `Man named Aksele makes ${randInt(18, 37)} billion dollar investment, loses it all in one day!`,
  () => `Neighborhood watch captain reports suspicious activity: "A teenager walked by for ${randInt(8, 17)} minutes without looking at his phone!"`,
  () => `CEO takes ${randInt(3, 7)}00% bonus to cope with the stress of firing half the staff.`,
  () => `Accountant team discovers missing ${randInt(5, 16)} million dollars was categorized as "miscellaneous snacks"!`,
  () => `Self-checkout machine demands a ${randInt(1, 4)}0% tip for its emotional labor.`,
  () => `Weather forecast: 100% chance of you staying inside and looking at a screen and finding virtual newpapers.`,
  () => `Local school disciplines child for swearing ${randInt(19, 29)} times at the principal.`,
  () => `"I love my moneh" - Blake Lee, number one crystal pvper in the Philippines`,
  () => `"Danger is my friend" - Gabriel Zen, newly elected president`,
  () => `Chinese man named Zizhen with the slap superpowers hunts down misusers of speech, ${randInt(14, 34)} injured or missing!`,
  () => `"WHO SAID THE CC!?" - Zizhen, anti-speech misusing vigilante`,
  () => `Man says CC within a one-kilometer radius of Zizhen, goes missing just ${randInt(2, 5)} minutes later`,
  () => `If you say the CC and hear strange knocking on your door, prepare your grave. - Unknown`,
  () => `67 - Markus Palamos, great philosopher of the 21st century`,
  () => `Local News accidentally releases fake news about school cancellation, causes riot among students, ${randInt(9, 36)} emotionally damaged`,
  () => `Local student calculates that ${randInt(80, 95)}% of class time is spent staring at the clock.`,
  () => `You said the CC, now Zizhen is coming`,
  () => `Crazed man rambles about thought police and whatsamacallit, Zizhen declares "A new method to catch the unworthy".`,
  () => `Chat says keep playing`,
  () => `It's time to stop playing, chat`,
  () => '"Wise men learn more from fools than fools from the wise." - A Wise Man',
  () => '"A wise man changes his mind, a fool never will—especially when picking where to eat." - A Wise Man',
  () => '"x = (-b ± √(b² - 4ac)) / 2a" - A Wise Man',

  // --- Click & Paperboy Upgrade-Locked Headlines ---
  {
    requires: 'newspaper_recycling',
    text: () => `Newspaper company owner searches dumps for paper!`
  },
  {
    requires: 'typewriters',
    text: () => `ll th vwls r brkn, snd hlp mmdtly!`,
    nextHeadline: `THEEEEE VOOOOOWEEEEELS AAAAAREEEEE BAAAAACK AAAAAND AAAAAREEEEE WOOOOORKIIIIING COOOOOMPLEEEEETLY FIIIIINEEEEE!!!`
  },
  {
    requires: 'hand_crank_press',
    text: () => `Crazed man keeps spinning crank, slowly become a crank himself`
  },
  {
    requires: 'ambidextrous',
    text: () => `Man writes with two hands, makes newspapers for a living?!`
  },
  {
    requires: 'press_rolls',
    text: () => `Local newspaper sells newspapers so thin that mosquito wripping is becoming a problem`
  },
  {
    requires: 'hand_eye_building_coordination',
    text: () => `Crazed man stares at building for ${randInt(3, 8)} hours straight!`
  },
  {
    requires: 'fingerdash_method',
    text: () => `"Human gamers are becoming indistinguishable from autoclick hackers", remarks Blake Lee, top crystal PvPer in the country"`
  },
  {
    requires: 'paperboy_teaming',
    text: () => `"There has been a huge influx of cross-teamers ever since the local newspaper started hiring paperboys", remarks Blake Lee, top crystal PvPer in the country`
  },
  {
    requires: 'papergirls',
    text: () => `Local newspaper introduces gender equality`
  },
  {
    requires: 'bikes',
    text: () => `"Newspaper delivery has never been faster!" remarks local man`
  },
  {
    requires: 'sari_sari_wheels',
    text: () => `Vendors are now competing with newspaper company for customers! Full-on seller vs. seller matches raging in streets!`
  },
  {
    requires: 'private_jets',
    text: () => `Average paperboy more luxurious than average millionare+`
  },
  {
    requires: 'the_paper_fleet',
    text: () => `Man in black suit orders for free newspapers`
  },
  {
    requires: 'the_paper_fleet',
    text: () => `A speaker dressed in a black suit told a public safety committee that the Emperor backed Flock license-plate cameras to find hidden bases at Hoth village and "stalk my ex-girlfriend,"`
  },
  {
    requires: 'the_paper_fleet',
    text: () => `Coverage highlighted the dark cape and helmet appearance as a tongue-in-cheek defense of automated surveillance technology.`
  },
  {
    requires: 'the_paper_fleet',
    text: () => `Colored light thingy grows popular among locals`
  },
  {
    requires: 'supreme_intellect',
    text: () => `"Ever since that newspaper company opened, the average IQ of locals has increased by ${randInt(1, 5)}0%" remarks local news reporter`
  },
  {
    requires: 'supreme_intellect',
    text: () => `"People are getting smarter and harder to beat! I gotta up my game", remarks Blake Lee, top crystal PvPer in the country"`
  },

  // --- Corner Kiosk Upgrade-Locked Headlines ---
  {
    requires: 'extreme_dazzle',
    condition: () => buildings.find(b => b.id === 'paperboy').count > 0,
    text: () => `Newspaper Kiosk outshines multiple casinos, paperboy interviewed, the reply: "i don't know"`
  },
  {
    requires: 'open_coffee_shop',
    text: () => `New coffee shop attracts local office workers! Buy some now for quadrupled efficiency! This headline is definitely not self-advertising its creator!`
  },
  {
    requires: 'french_delicacies',
    text: () => `French chefs currently being hired for coffee shop crossiants`
  },
  {
    requires: 'french_delicacies',
    text: () => `"Buy newspapers now!" - French Chef`
  },
  {
    requires: 'premium_swiss_chocolates',
    text: () => `The most premium chocolate is being imported straight from Switzerland! Buy now with discounts just by buying newspapers!`
  },
  {
    requires: 'blind_boxes',
    text: () => `New blind box series opens, causes riot and unintended damage to corner kiosk`
  },
  {
    requires: 'strategic_placements',
    text: () => `The smartest geniuses of the century are gathering at a news station to talk about croissants`
  },
  {
    requires: 'strategic_placements',
    text: () => `Einstein has reawakened to taste croissants`
  },

  // --- Cargo Truck Upgrade-Locked Headlines ---
  {
    requires: 'ten_wheelers',
    text: () => `Chat says keep rolling`
  },
  {
    requires: 'reckmore_driving',
    text: () => `Reckmore driving has increased by ${randInt(5, 9)}0%!`
  },
  {
    requires: 'airbags',
    text: () => `New newspaper-sponsored airbags have reduced driving casualties by ${randInt(7, 9)}0%!`
  },
  {
    requires: 'life_insurance',
    text: () => `Life insurance companies are losing most of their income, multiple companies have gone bankrupt!`
  },
  {
    requires: 'taco_stand',
    text: () => `New Taco Stand opens on trucks! Tacos are amazing!`,
    nextHeadline: `Now hiring Mexican Chefs!`
  },
  {
    requires: 'shawarma_shack',
    text: () => `Taco stands now selling shawarmas! Vendors compete for customers!`
  },
  {
    requires: 'spicy_delicacies',
    text: () => `Spicy foods have been added to taco stands! Try the spicy level 10 challenge today!`
  }
];
