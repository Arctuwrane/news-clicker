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
