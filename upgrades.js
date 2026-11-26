const clickUpgrades = [
  {
    id: 'low_volume_inking',
    name: 'Low-Volume Inking',
    cost: 250,
    description: '+0.5 Newspapers/click (applied before multipliers)',
    quote: '"Less ink for one word, and now you can use the extra ink to write the other side"',
    purchased: false
  },
  {
    id: 'newspaper_recycling',
    name: 'Newspaper Recycling',
    cost: 800,
    description: '+1 Newspaper/click (applied before multipliers)',
    quote: '"Old news is better than no news"',
    purchased: false
  },
  {
    id: 'typewriters',
    name: 'Typewriters',
    cost: 1950,
    description: '+1.5 Newspapers/click (applied before multipliers)',
    quote: '"Instead of using your own ugly handwriting, this invention makes life more efficient and beautiful."',
    purchased: false
  },
  {
    id: 'hand_crank_press',
    name: 'Hand-Crank Press',
    cost: 8350,
    description: 'x2 Newspapers/click',
    quote: '"Until you break!"',
    purchased: false
  },
  {
    id: 'ambidextrous',
    name: 'Ambidextrous',
    cost: 30000,
    description: 'x2 Newspapers/click',
    quote: '"Two hands are better than one."',
    purchased: false
  },
  {
    id: 'press_rolls',
    name: 'Press Rolls',
    cost: 100000,
    description: 'x2 Newspapers/click',
    quote: '"They see me rolling, they see me reading. (ok that was corny)"',
    purchased: false
  },
  {
    id: 'news_overload',
    name: 'News Overload',
    cost: 450000,
    description: 'Set Newspapers/click to 200',
    quote: '"MAXIMUM OVERDRIVEEEEEE"',
    purchased: false
  },
  {
    id: 'hand_eye_building_coordination',
    name: 'Hand-Eye-Building Coordination',
    cost: 700000,
    description: '+0.1 Newspapers/click per non-paperboy building (applied after multipliers)',
    quote: '"Learn from things you made yourself"',
    purchased: false
  },
  {
    id: 'fingerdash_method',
    name: 'Fingerdash Method',
    cost: 1500000,
    description: 'x5 Newspapers/click',
    quote: '"Faster than Pizza Delivery"',
    purchased: false
  },
  {
    id: 'paperboy_teaming',
    name: 'Paperboy Teaming',
    cost: 1500000,
    description: 'Paperboys count toward Hand-Eye-Building Coordination, and each paperboy boosts paperboy speed by 1%',
    quote: '"Hey! No cross-teaming! This is solos for a reason!"',
    purchased: false
  }
];

const paperboyUpgrades = [
  {
    id: 'papergirls',
    name: 'Papergirls',
    cost: 300,
    description: 'x2 Paperboy NPS',
    quote: '"This is a job for all"',
    purchased: false
  },
  {
    id: 'satchels',
    name: 'Satchels',
    cost: 1500,
    description: 'x2 Paperboy NPS',
    quote: '"These low-quality high-quantity bags are amazing!"',
    purchased: false
  },
  {
    id: 'wagons',
    name: 'Wagons',
    cost: 12500,
    description: 'x2.5 Paperboy NPS',
    quote: '"Red plastic never has held this much paper! It overflows the increased costs!"',
    purchased: false
  },
  {
    id: 'bikes',
    name: 'Bikes',
    cost: 230000,
    description: 'Every non-paperboy building increases Paperboy NPS by +0.1 (applied after multipliers)',
    quote: '"FASTER FASTER FASTER"',
    purchased: false
  },
  {
    id: 'sari_sari_wheels',
    name: 'Sari-Sari Store on Wheels',
    cost: 3600000,
    description: 'x5 Paperboy NPS',
    quote: '"Philippine Vendors on wheels! I love PH"',
    purchased: false
  },
  {
    id: 'cars',
    name: 'Cars',
    cost: 16000000,
    description: 'Increases the "Bikes" power from 0.1 to 0.5',
    quote: '"Keep rollin, rollin, rollin, roll\'n"',
    purchased: false
  },
  {
    id: 'private_jets',
    name: 'Private Jets',
    cost: 180000000,
    description: 'Increases the "Bikes" power from 0.5 to 5',
    quote: '"First class seating for first class people"',
    purchased: false
  },
  {
    id: 'the_paper_fleet',
    name: 'The Paper Fleet',
    cost: 2600000000,
    description: 'Paperboys now count toward the Bikes upgrade, and "Bikes" power increases from 5 to 100',
    quote: '"My Lord, the Fleet has moved out of bikespeed. Com-scan has detected an energy field protecting an area of the sixth corner kiosk of the Hoth village."',
    purchased: false
  },
  {
    id: 'perfect_vision_training',
    name: 'Perfect Vision Training',
    cost: 25000000000,
    description: '"Bikes" power increased from 100 to 2,000',
    quote: '"True Accuracy is measured by intellect, not speed"',
    purchased: false
  },
  {
    id: 'supreme_intellect',
    name: 'Supreme Intellect',
    cost: 300000000000,
    description: '"Bikes" power increased from 2,000 to 40,000',
    quote: '"These dudes are smarter than Einstein atp"',
    purchased: false
  }
];

const kioskUpgrades = [
  {
    id: 'neon_news_sign',
    name: 'Neon News Sign',
    cost: 1200,
    description: 'x2 Corner Kiosk NPS',
    quote: '"It reads: Beautiful things make beautiful customers! Buy newspapers now!"',
    purchased: false
  },
  {
    id: 'extreme_dazzle',
    name: 'Extreme Dazzle',
    cost: 6000,
    description: 'x2 Corner Kiosk NPS',
    quote: '"It\'s the brightest thing in town!"',
    purchased: false
  },
  {
    id: 'weatherproof_awnings',
    name: 'Weatherproof Awnings',
    cost: 60000,
    description: 'x2 Corner Kiosk NPS',
    quote: '"Dry everyday, every time!"',
    purchased: false
  },
  {
    id: 'open_coffee_shop',
    name: 'Open Coffee Shop',
    cost: 600000,
    description: 'x2 Corner Kiosk NPS',
    quote: '"Even iPad kids and parents will stop by for delicious treats!"',
    purchased: false
  },
  {
    id: 'customizations',
    name: 'Customizations',
    cost: 6000000,
    description: 'x2 Corner Kiosk NPS',
    quote: '"Extra Whipped cream, 5 shots, candy coats, chocolate syrup, chocolate shavings, and a biscuit on top"',
    purchased: false
  },
  {
    id: 'manipulated_discounts',
    name: 'Manipulated Discounts',
    cost: 60000000,
    description: 'x2 Corner Kiosk NPS',
    quote: '"Buy ten newspapers for a coffee discount coupon!"',
    purchased: false
  },
  {
    id: 'french_delicacies',
    name: 'French Delicacies',
    cost: 6000000000,
    description: 'x2 Corner Kiosk NPS',
    quote: '"Des croissants avec votre café, monsieur?"',
    purchased: false
  },
  {
    id: 'premium_swiss_chocolates',
    name: 'Premium Swiss Chocolates',
    cost: 600000000000,
    description: 'x2 Corner Kiosk NPS',
    quote: '"Premium-Schokolade direkt aus der Schweiz!"',
    purchased: false
  },
  {
    id: 'blind_boxes',
    name: 'Blind Boxes',
    cost: 6000000000000,
    description: 'x2 Corner Kiosk NPS',
    quote: '"Don\'t underestimate these tiny things; they will cause riots if not handled properly!"',
    purchased: false
  },
  {
    id: 'strategic_placements',
    name: 'Strategic Placements',
    cost: 600000000000000,
    requiresUpgrade: 'supreme_intellect',
    description: 'x2 Corner Kiosk NPS (Requires Supreme Intellect)',
    quote: '"This is the final step to conquering the street! Our greatest minds have pinpointed the exact place to set up shop."',
    purchased: false
  }
];

const truckUpgrades = [
  {
    id: 'ten_wheelers',
    name: '10-wheelers',
    cost: 13000,
    description: 'Cargo Trucks are twice as efficient.',
    quote: '“Woah. That’s heavy.”',
    purchased: false
  },
  {
    id: 'reckmore_driving',
    name: 'Reckmore Driving',
    cost: 65000,
    description: 'Cargo Trucks are twice as efficient.',
    quote: '“What’s the opposite of less? More.”',
    purchased: false
  },
  {
    id: 'airbags',
    name: 'Airbags',
    cost: 650000,
    description: 'Cargo Trucks are twice as efficient.',
    quote: '“Reckmore driving casualties reduced by 50%!”',
    purchased: false
  },
  {
    id: 'life_insurance',
    name: 'Life Insurance',
    cost: 6500000,
    description: 'Cargo Trucks are twice as efficient.',
    quote: '“Even the souls grant income!”',
    purchased: false
  },
  {
    id: 'air_conditioners',
    name: 'Air Conditioners',
    cost: 65000000,
    description: 'Cargo Trucks are twice as efficient.',
    quote: '“Cool engines make cool people”',
    purchased: false
  },
  {
    id: 'built_in_printing_press',
    name: 'Built-in Printing Press',
    cost: 650000000,
    description: 'Cargo Trucks are twice as efficient.',
    quote: '“No need to restock!”',
    purchased: false
  },
  {
    id: 'taco_stand',
    name: 'Taco Stand',
    cost: 6500000000,
    description: 'Cargo Trucks are twice as efficient.',
    quote: '“¡Oferta de martes de tacos! ¡Compra periódicos con tus tacos!”',
    purchased: false
  },
  {
    id: 'taco_topping_selection',
    name: 'Taco Topping Selection',
    cost: 650000000000,
    description: 'Cargo Trucks are twice as efficient.',
    quote: '“Extra Cheese? Yes. Extra Beef? Yes. Garlic Sauce? Absolutely!”',
    purchased: false
  },
  {
    id: 'shawarma_shack',
    name: 'Shawarma Shack',
    cost: 65000000000000,
    description: 'Cargo Trucks are twice as efficient.',
    quote: '“Beef and Cheese is life”',
    purchased: false
  },
  {
    id: 'spicy_delicacies',
    name: 'Spicy Delicacies',
    cost: 6500000000000000,
    description: 'Cargo Trucks are twice as efficient.',
    quote: '“HOT HOT HOT”',
    purchased: false
  }
];

const pressUpgrades = [
  {
    id: 'coupons',
    name: 'Coupons',
    cost: 150000,
    description: 'x2 Printing Press NPS',
    quote: '"Workers get coupons to buy in kiosks! More newspapers sold!"',
    purchased: false
  },
  {
    id: 'conveyor_belts',
    name: 'Conveyor Belts',
    cost: 750000,
    description: 'x2 Printing Press NPS',
    quote: '"Sturdier than your dad\'s"',
    purchased: false
  },
  {
    id: 'antislack_policy',
    name: 'Antislack Policy',
    cost: 7500000,
    description: 'x2 Printing Press NPS',
    quote: '"Slackers will pay with forced labor"',
    purchased: false
  },
  {
    id: 'katana_process',
    name: 'Katana Process',
    cost: 75000000,
    description: 'x2 Printing Press NPS',
    quote: '"Papers are cut so fine one paper becomes two"',
    purchased: false
  },
  {
    id: '48_hour_days',
    name: '48-hour days',
    cost: 750000000,
    description: 'x2 Printing Press NPS',
    quote: '"Same free time, same rest time, double the work"',
    purchased: false
  },
  {
    id: 'robtics',
    name: 'Robtics',
    cost: 7500000000,
    description: 'x2 Printing Press NPS',
    quote: '"Replace all the entire workforce with robots: no more breaks, no more family issues, and full compliance!"',
    purchased: false
  },
  {
    id: 'self_improving_ai',
    name: 'Self-improving AI',
    cost: 75000000000,
    description: 'x2 Printing Press NPS',
    quote: '"Requires 48-hour supervision: any missing code can cause this thing to take over the world!"',
    purchased: false
  },
  {
    id: 'volunteer_foundation',
    name: '"Volunteer" Foundation',
    cost: 7500000000000,
    description: 'x2 Printing Press NPS',
    quote: '"If you can\'t do it well, do it for free"',
    purchased: false
  },
  {
    id: 'gear_downsizing',
    name: 'Gear Downsizing',
    cost: 750000000000000,
    description: 'x2 Printing Press NPS',
    quote: '"Factories inside factories inside factories"',
    purchased: false
  },
 {
    id: 'infinity_engine',
    name: 'Infinity Engine',
    cost: 75000000000000000,
    description: 'x2 Printing Press NPS',
    quote: '"Downsize terrabytes infinitely! Millions of terrabytes combined in one cubic millimeter! Downsize Everything! Downsize Workers! Downsize Newspapers and resize them later! Fill the world with newspapers!"',
    purchased: false
  }
];

const millUpgrades = [
  {
    id: 'loggers',
    name: 'Loggers',
    cost: 1400000,
    description: 'x2 Paper Mill NPS',
    quote: '"Chop until you drop!"',
    purchased: false
  },
  {
    id: 'replanting',
    name: 'Replanting',
    cost: 7000000,
    description: 'x2 Paper Mill NPS',
    quote: '"An ancient technique"',
    purchased: false
  },
  {
    id: 'diamond_axes',
    name: 'Diamond Axes',
    cost: 70000000,
    description: 'x2 Paper Mill NPS',
    quote: '"Made straight from rare deepslate diamond ore guarded by ferocious spiders"',
    purchased: false
  },
  {
    id: 'laser_cutters',
    name: 'Laser Cutters',
    cost: 700000000,
    description: 'x2 Paper Mill NPS',
    quote: '"Laser technology made useful!"',
    purchased: false
  },
  {
    id: 'mass_deforesters',
    name: 'Mass Deforesters',
    cost: 7000000000,
    description: 'x2 Paper Mill NPS',
    quote: '"The Lorax would certainly not approve of this."',
    purchased: false
  },
  {
    id: 'russian_forests',
    name: 'Russian Forests',
    cost: 70000000000,
    description: 'x2 Paper Mill NPS',
    quote: '"Millions of hectares free to wipe to dust for your empire!"',
    purchased: false
  },
  {
    id: 'genetic_engineering',
    name: 'Genetic Engineering',
    cost: 700000000000,
    description: 'x2 Paper Mill NPS',
    quote: '"Using advanced gene-editing, you can now permanently double tree growth speed!"',
    purchased: false
  },
  {
    id: 'shotgun_sequencing',
    name: 'Shotgun Sequencing',
    cost: 70000000000000,
    description: 'x2 Paper Mill NPS',
    quote: '"Attacking genes has never sounded this good"',
    purchased: false
  },
  {
    id: 'hybrids',
    name: 'Hybrids',
    cost: 7000000000000000,
    description: 'x2 Paper Mill NPS',
    quote: '"Infuse two fast-breeding species into one"',
    purchased: false
  },
  {
    id: 'sweet_deals',
    name: 'Sweet Deals',
    cost: 700000000000000000,
    description: 'x2 Paper Mill NPS',
    quote: '"A country for 7 quadrillion newspapers? Sure! I\'ll buy 100!"',
    purchased: false
  }
];

const hubUpgrades = [
  {
    id: 'government_ties',
    name: 'Government Ties',
    cost: 16000000,
    description: 'x2 Distribution Hub NPS',
    quote: '"Everybody loves newspapers!"',
    purchased: false
  },
  {
    id: 'subscriptions',
    name: 'Subscriptions',
    cost: 80000000,
    description: 'x2 Distribution Hub NPS',
    quote: '"Never miss a single issue!"',
    purchased: false
  },
  {
    id: 'drone_mail',
    name: 'Drone Mail',
    cost: 800000000,
    description: 'x2 Distribution Hub NPS',
    quote: '"Delivered to your doorstep!"',
    purchased: false
  },
  {
    id: 'advertising',
    name: 'Advertising',
    cost: 8000000000,
    description: 'x2 Distribution Hub NPS',
    quote: '"A world filled with news"',
    purchased: false
  },
  {
    id: 'russian_landowning',
    name: 'Russian Landowning',
    cost: 80000000000,
    description: 'x2 Distribution Hub NPS',
    quote: '"To fill with countless exchange hub"',
    purchased: false
  },
  {
    id: 'trends',
    name: 'Trends',
    cost: 800000000000,
    description: 'x2 Distribution Hub NPS',
    quote: '"News is trending!"',
    purchased: false
  },
  {
    id: 'personalized_newspapers',
    name: 'Personalized Newspapers',
    cost: 8000000000000,
    description: 'x2 Distribution Hub NPS',
    quote: '"Everything imprtant to you: The latest brainrots, the most popular games, and the world chess championships"',
    purchased: false
  },
  {
    id: 'politics',
    name: 'Politics',
    cost: 800000000000000,
    description: 'x2 Distribution Hub NPS',
    quote: '"Vote for newspapers!"',
    purchased: false
  },
  {
    id: 'memes',
    name: 'Memes',
    cost: 80000000000000000,
    description: 'x2 Distribution Hub NPS',
    quote: '"meow meow meow meow"',
    purchased: false
  },
  {
    id: 'underground_hubs',
    name: 'Underground Hubs',
    cost: 8000000000000000000,
    description: 'x2 Distribution Hub NPS',
    quote: '"Take the underworld by storm!"',
    purchased: false
  }
];

const networkUpgrades = [
  {
    id: 'copy_paste',
    name: 'Copy-paste',
    cost: 210000000,
    description: 'x2 Global News Network NPS',
    quote: '"Ctrl A, Ctrl C, and finally Ctrl V."',
    purchased: false
  },
  {
    id: 'chatboxes',
    name: 'Chatboxes',
    cost: 1500000000,
    description: 'x2 Global News Network NPS',
    quote: '"Interaction beyond the classroom"',
    purchased: false
  },
  {
    id: 'doomscrollables',
    name: 'Doomscrollables',
    cost: 15000000000,
    description: 'x2 Global News Network NPS',
    quote: '"Look, it\'s a cat video!"',
    purchased: false
  },
  {
    id: 'paywalls',
    name: 'Paywalls',
    cost: 150000000000,
    description: 'x2 Global News Network NPS',
    quote: '"Ye must pay to see premium exquisites"',
    purchased: false
  },
  {
    id: 'searchbar',
    name: 'Searchbar',
    cost: 1500000000000,
    description: 'x2 Global News Network NPS',
    quote: '"Find anything and everything with one word"',
    purchased: false
  },
  {
    id: 'emojis',
    name: 'Emojis',
    cost: 15000000000000,
    description: 'x2 Global News Network NPS',
    quote: '"We offer π 😊🐈🐱"',
    purchased: false
  },
  {
    id: 'interactive_games',
    name: 'Interactive Games',
    cost: 150000000000000,
    description: 'x2 Global News Network NPS',
    quote: '"Only wise men know that three glass blocks, 3 pieces of quartz from hell, and three slabs of wood create a daylight detector"',
    purchased: false
  },
  {
    id: 'online_pets',
    name: 'Online Pets',
    cost: 15000000000000000,
    description: 'x2 Global News Network NPS',
    quote: '"You\'ll never see to what extent these pieces of code addict people"',
    purchased: false
  },
  {
    id: 'web_browser_conversion',
    name: 'Web Browser Conversion',
    cost: 1500000000000000000,
    description: 'x2 Global News Network NPS',
    quote: '"Just like microsoft, stick all the headlines on the screen as soon as the browser is opened!"',
    purchased: false
  },
  {
    id: 'engine_compatible',
    name: 'Engine-Compatible',
    cost: 150000000000000000000,
    requiresUpgrade: 'the_infinity_engine',
    description: 'x2 Global News Network NPS',
    quote: '"Now the possibilities are limitless!"',
    purchased: false
  }
];
