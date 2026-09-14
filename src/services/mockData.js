// Initial mock data used for fallback and local testing

export const initialMockData = {
  categories: [
    { id: 'guitars', name: 'Guitars & Basses', itemCount: 6 },
    { id: 'keyboards', name: 'Keyboards & Synths', itemCount: 4 },
    { id: 'drums', name: 'Drums & Percussion', itemCount: 4 },
    { id: 'audio', name: 'Studio & Microphones', itemCount: 5 },
    { id: 'wind', name: 'Wind Instruments', itemCount: 3 },
  ],

  products: [
    // GUITARS & BASSES
    {
      id: '1',
      title: 'Fender American Ultra Stratocaster',
      brand: 'Fender',
      category: 'guitars',
      price: 2199.99,
      originalPrice: 2399.99,
      stock: 8,
      discount: 8,
      rating: 4.9,
      reviewsCount: 142,
      image: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800&auto=format&fit=crop&q=80',
      ],
      description: 'Flagship electric guitar engineered for high-performance players, featuring Ultra Noiseless Vintage pickups, modern D-profile maple neck, and sculpted body contours.',
      youtubeUrl: 'https://www.youtube.com/watch?v=Nff_DmsC_gE',
      specs: {
        'Body Material': 'Select Alder',
        'Neck Profile': 'Modern D',
        'Fingerboard': 'Rosewood (10" to 14" Compound Radius)',
        'Pickups': 'Ultra Noiseless Hot Strat Single-Coils',
        'Frets': '22 Medium Jumbo',
        'Bridge': '2-Point Deluxe Synchronized Tremolo',
      },
    },

    {
      id: '2',
      title: 'Gibson Les Paul Standard 60s',
      brand: 'Gibson',
      category: 'guitars',
      price: 2799.0,
      originalPrice: 2999.0,
      stock: 5,
      discount: 7,
      rating: 4.9,
      reviewsCount: 98,
      image: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=800&auto=format&fit=crop&q=80',
      ],
      description: 'Timeless classic solid-body electric guitar with AA figured maple top, 60s SlimTaper mahogany neck, and Burstbucker 61 pickups capturing authentic vintage rock and blues tone.',
      youtubeUrl: 'https://www.youtube.com/watch?v=s0n_V3e1Y1s',
      specs: {
        'Top Wood': 'AA Figured Maple',
        'Body Material': 'Solid Mahogany',
        'Neck Profile': 'SlimTaper',
        'Pickups': '60s Burstbucker Lead & Rhythm',
        'Bridge': 'ABR-1 Tune-O-Matic with Aluminum Stop Bar',
        'Scale Length': '24.75"',
      },
    },

    {
      id: '3',
      title: 'Taylor 814ce Grand Auditorium Acoustic',
      brand: 'Taylor',
      category: 'guitars',
      price: 3499.0,
      originalPrice: 3899.0,
      stock: 4,
      discount: 10,
      rating: 5.0,
      reviewsCount: 76,
      image: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=800&auto=format&fit=crop&q=80',
      ],
      description: 'Flagship acoustic-electric guitar featuring solid Indian Rosewood back and sides, Sitka spruce top, revolutionary V-Class bracing, and Expression System 2 onboard electronics.',
      youtubeUrl: 'https://www.youtube.com/watch?v=hUfD9uW_50w',
      specs: {
        'Top Wood': 'Solid Sitka Spruce',
        'Back & Sides': 'Solid Indian Rosewood',
        'Bracing': 'V-Class Architecture',
        'Electronics': 'Taylor Expression System 2 (ES2)',
        'Cutaway': 'Venetian Cutaway',
        'Finish': 'Gloss 3.5-mil Ultra-Thin',
      },
    },

    {
      id: '4',
      title: 'PRS Custom 24 10-Top',
      brand: 'PRS Guitars',
      category: 'guitars',
      price: 3299.99,
      originalPrice: 3599.99,
      stock: 6,
      discount: 8,
      rating: 4.9,
      reviewsCount: 65,
      image: 'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1516924962500-2b4b3b99ea02?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=800&auto=format&fit=crop&q=80',
      ],
      description: 'The quintessential PRS electric guitar with carved figured maple 10-top, mahogany body, Pattern Thin neck, and versatile 85/15 pickups with 5-way blade switching.',
      youtubeUrl: 'https://www.youtube.com/watch?v=B7bZpT0LzYw',
      specs: {
        'Top Wood': 'Carved Figured Maple 10-Top',
        'Body Wood': 'Mahogany',
        'Neck Shape': 'Pattern Thin',
        'Pickups': 'PRS 85/15 Treble & Bass',
        'Tuners': 'PRS Phase III Locking',
        'Frets': '24',
      },
    },

    {
      id: '5',
      title: 'Fender American Professional II Precision Bass',
      brand: 'Fender',
      category: 'guitars',
      price: 1699.99,
      originalPrice: 1849.99,
      stock: 9,
      discount: 8,
      rating: 4.8,
      reviewsCount: 88,
      image: 'https://images.unsplash.com/photo-1558098329-a11cff621064?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1558098329-a11cff621064?w=800&auto=format&fit=crop&q=80',
      ],
      description: 'Iconic 4-string electric bass delivering punchy, foundation-shaking low end with V-Mod II split single-coil precision pickups and sculpted neck heel.',
      youtubeUrl: 'https://www.youtube.com/watch?v=Vl3rE_lqXvE',
      specs: {
        'Body Material': 'Alder',
        'Neck Profile': '1963 "C" Profile',
        'Pickup': 'V-Mod II Split Single-Coil P Bass',
        'Bridge': '4-Saddle HiMass Vintage',
        'Scale Length': '34" Long Scale',
      },
    },

    {
      id: '6',
      title: 'Ibanez Prestige RG5120M Polar Lights',
      brand: 'Ibanez',
      category: 'guitars',
      price: 1999.99,
      originalPrice: 2199.99,
      stock: 7,
      discount: 9,
      rating: 4.8,
      reviewsCount: 54,
      image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80',
      ],
      description: 'High-precision Japanese-crafted electric guitar equipped with Fishman Fluence Modern active humbuckers, Lo-Pro Edge tremolo, and lightning-fast Super Wizard HP neck.',
      youtubeUrl: 'https://www.youtube.com/watch?v=3g_uX9XJt_E',
      specs: {
        'Neck': 'Super Wizard HP 5pc Maple/Wenge',
        'Body': 'Ash Top / African Mahogany Body',
        'Pickups': 'Fishman Fluence Modern Humbuckers',
        'Tremolo': 'Lo-Pro Edge Double Locking',
        'Frets': '24 Jumbo Stainless Steel with Prestige Edge Treatment',
      },
    },

    // KEYBOARDS & SYNTHS
    {
      id: '8',
      title: 'Nord Stage 4 88 Stage Keyboard',
      brand: 'Nord',
      category: 'keyboards',
      price: 3899.0,
      originalPrice: 4199.0,
      stock: 3,
      discount: 7,
      rating: 4.9,
      reviewsCount: 89,
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80',
      ],
      description: 'The premier live performance keyboard featuring Triple Sensor hammer-action keybed, dedicated Piano, Organ, and Wave 2 Synth sections with physical drawbars and complete per-layer effects.',
      youtubeUrl: 'https://www.youtube.com/watch?v=t_u_K4bX_l0',
      specs: {
        'Keybed': '88-Key Triple Sensor Hammer Action',
        'Sections': 'Piano, Organ (B3/Vox/Farfisa), Wave 2 Synth Engine',
        'Memory': '2GB Piano Library, 1GB Sample Library',
        'Drawbars': 'Physical Drawbars with LED Indicators',
        'Effects': 'Independent Reverb, Delay, Modulation per Section',
      },
    },

    {
      id: '9',
      title: 'Roland Fantom-08 Music Workstation',
      brand: 'Roland',
      category: 'keyboards',
      price: 1999.99,
      originalPrice: 2199.99,
      stock: 6,
      discount: 9,
      rating: 4.8,
      reviewsCount: 63,
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=80',
      ],
      description: 'Streamlined modern creative synthesizer workstation with 88 weighted keys, ZEN-Core synthesis, acoustic SuperNATURAL pianos, 16 RGB sampler pads, and seamless DAW audio interfacing.',
      youtubeUrl: 'https://www.youtube.com/watch?v=YwV6u_aT_bI',
      specs: {
        'Keys': '88-Key PHA-4 Standard Escapement Keybed',
        'Sound Engines': 'ZEN-Core, SuperNATURAL Acoustic & Electric Piano',
        'Sequencer': '16-Track Polyphonic Clip-Based Sequencer',
        'Sampler': '16 RGB Pads with Live Sampling',
        'Audio Interface': '24-Bit / 96 kHz Stereo USB Audio Interface',
      },
    },

    {
      id: '10',
      title: 'Moog Subsequent 37 Analog Synthesizer',
      brand: 'Moog',
      category: 'keyboards',
      price: 1799.0,
      originalPrice: 1999.0,
      stock: 5,
      discount: 10,
      rating: 4.9,
      reviewsCount: 112,
      image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80',
      ],
      description: 'Paraphonic dual-oscillator analog synthesizer with multidrive ladder filter, 37 semi-weighted keys with aftertouch, duo mode capability, and 256 programmable presets.',
      youtubeUrl: 'https://www.youtube.com/watch?v=2Iu_N_j5JkQ',
      specs: {
        'Sound Engine': '100% Discrete Analog',
        'Keys': '37 Semi-Weighted with Aftertouch',
        'Filter': 'Classic Moog Ladder Filter (6/12/18/24 dB/Oct)',
        'Presets': '256 Locations (16 Banks x 16 Presets)',
        'Modulation': '2 Programmable Modulation Busses',
      },
    },

    {
      id: '11',
      title: 'Korg Minilogue XD Polyphonic Hybrid Synth',
      brand: 'Korg',
      category: 'keyboards',
      price: 649.99,
      originalPrice: 729.99,
      stock: 14,
      discount: 11,
      rating: 4.8,
      reviewsCount: 156,
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80',
      ],
      description: 'Next-generation 4-voice polyphonic analog synthesizer with open digital multi-engine, 16-step motion sequencer, microtuning, and 32-bit digital effects processor.',
      youtubeUrl: 'https://www.youtube.com/watch?v=p4f_L0k9J2I',
      specs: {
        'Polyphony': '4 Voices',
        'Keys': '37 Slim-Key Velocity-Sensitive',
        'Oscillators': '2 Analog VCOs + 1 Digital Multi-Engine (Noise/VPM/User)',
        'Effects': 'Modulation, Delay, and Reverb',
        'Sequencer': '16-Step Polyphonic Motion Sequencer',
      },
    },

    // DRUMS & PERCUSSION
    {
      id: '12',
      title: 'Roland V-Drums TD-27KV2 Electronic Kit',
      brand: 'Roland',
      category: 'drums',
      price: 2999.99,
      originalPrice: 3399.99,
      stock: 5,
      discount: 12,
      rating: 4.9,
      reviewsCount: 47,
      image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&auto=format&fit=crop&q=80',
        'https://images.unsplash.com/photo-1543443374-b6fe10a6ab7b?w=800&auto=format&fit=crop&q=80',
      ],
      description: 'Professional mid-level V-Drums kit featuring state-of-the-art digital snare, ride, and hi-hat pads powered by the TD-27 sound module with Prismatic Sound Modeling.',
      youtubeUrl: 'https://www.youtube.com/watch?v=q6g_k1j3rW0',
      specs: {
        'Module': 'Roland TD-27 with PureAcoustic Ambience',
        'Snare': 'PD-140DS Digital 14" Mesh Snare',
        'Hi-Hat': 'VH-14D Digital 14" Optical Hi-Hat',
        'Ride': 'CY-18DR Digital 18" Multi-Sensor Ride',
        'Pads': 'Multi-Ply Mesh Heads with Tunable Tension',
      },
    },

    {
      id: '13',
      title: 'DW Collector\'s Series Pure Maple 5-Piece Shell Pack',
      brand: 'DW Drums',
      category: 'drums',
      price: 3499.0,
      originalPrice: 3899.0,
      stock: 3,
      discount: 10,
      rating: 5.0,
      reviewsCount: 38,
      image: 'https://images.unsplash.com/photo-1543443374-b6fe10a6ab7b?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1543443374-b6fe10a6ab7b?w=800&auto=format&fit=crop&q=80',
      ],
      description: 'Handcrafted North American hard rock maple drum shell pack with specialized SSC grain orientation, True-Pitch 50 tuning tension rods, and Collector\'s series chrome hardware.',
      youtubeUrl: 'https://www.youtube.com/watch?v=m7p_q8s5XwE',
      specs: {
        'Shell Material': '100% North American Hard Rock Maple',
        'Configuration': '10" & 12" Rack Toms, 16" Floor Tom, 22" Bass Drum, 14" Snare',
        'Bearing Edges': '45-Degree Precision Hand-Cut Edges',
        'Hoops': 'True-Hoop Triple-Flanged Chrome Hoops',
      },
    },

    {
      id: '14',
      title: 'Pearl Masters Maple Complete 4-Piece Shell Pack',
      brand: 'Pearl',
      category: 'drums',
      price: 1899.0,
      originalPrice: 2099.0,
      stock: 7,
      discount: 10,
      rating: 4.8,
      reviewsCount: 62,
      image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&auto=format&fit=crop&q=80',
      ],
      description: 'Cross-laminated EvenPly-Six North American maple shell pack tuned for touring musicians and studio recording seeking focused warm punch and projection.',
      youtubeUrl: 'https://www.youtube.com/watch?v=d_kS8R7xU9Y',
      specs: {
        'Shell Construction': '6-ply 5.4mm 100% Maple EvenPly',
        'Configuration': '10" & 12" Toms, 16" Floor Tom, 22" Kick Drum',
        'Mounting System': 'OptiMount Suspension System',
        'Hoops': 'SuperHoop II 2.3mm Steel Triple-Flanged',
      },
    },

    {
      id: '15',
      title: 'Meinl Percussion Professional Birch Cajon',
      brand: 'Meinl',
      category: 'drums',
      price: 199.99,
      originalPrice: 229.99,
      stock: 22,
      discount: 13,
      rating: 4.7,
      reviewsCount: 118,
      image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&auto=format&fit=crop&q=80',
      ],
      description: 'Handmade acoustic cajon crafted with resonant Baltic birch frontplate and body, dual internal snare wires, rounded corners, and padded non-slip top seating surface.',
      youtubeUrl: 'https://www.youtube.com/watch?v=7X5r_8aY_vE',
      specs: {
        'Body': 'Baltic Birch (Betula pendula)',
        'Frontplate': 'Siam Oak with Matte Satin Finish',
        'Snares': 'Dual Internal Fixed Steel Snare Wires',
        'Feet': 'Anti-Vibration Rubber Base Feet',
      },
    },

    // STUDIO & MICROPHONES
    {
      id: '16',
      title: 'Neumann U 87 Ai Large-Diaphragm Studio Condenser',
      brand: 'Neumann',
      category: 'audio',
      price: 3695.0,
      originalPrice: 3995.0,
      stock: 4,
      discount: 8,
      rating: 5.0,
      reviewsCount: 84,
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80',
      ],
      description: 'The definitive gold standard large-diaphragm condenser studio vocal microphone worldwide, featuring dual-diaphragm capsule and omnidirectional, cardioid, and figure-8 switchable patterns.',
      youtubeUrl: 'https://www.youtube.com/watch?v=p7W2tqO9nC0',
      specs: {
        'Capsule': 'K 67 Dual-Diaphragm Pressure Gradient Transducer',
        'Polar Patterns': 'Cardioid, Omnidirectional, Figure-8',
        'Frequency Range': '20 Hz - 20,000 Hz',
        'Max SPL': '127 dB SPL (117 dB without -10dB pad)',
        'Impedance': '200 Ohms Rated',
      },
    },

    {
      id: '17',
      title: 'Shure SM7B Cardioid Dynamic Studio Vocal Mic',
      brand: 'Shure',
      category: 'audio',
      price: 399.0,
      originalPrice: 459.0,
      stock: 28,
      discount: 13,
      rating: 4.9,
      reviewsCount: 382,
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80',
      ],
      description: 'Legendary broadcast, podcast, and studio vocal microphone with smooth, flat, wide-range frequency response, air-suspension shock isolation, and internal electromagnetic hum shielding.',
      youtubeUrl: 'https://www.youtube.com/watch?v=aG3mP9nL1xY',
      specs: {
        'Cartridge Type': 'Dynamic (Moving Coil)',
        'Polar Pattern': 'Cardioid Uniform with Frequency',
        'Frequency Response': '50 Hz - 20,000 Hz',
        'Controls': 'Bass Roll-Off and Mid-Range Presence Boost Switches',
        'Output Connector': '3-Pin Professional Audio XLR Male',
      },
    },

    {
      id: '18',
      title: 'Universal Audio Apollo Twin X Duo Heritage Edition',
      brand: 'Universal Audio',
      category: 'audio',
      price: 999.0,
      originalPrice: 1099.0,
      stock: 11,
      discount: 9,
      rating: 4.9,
      reviewsCount: 145,
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80',
      ],
      description: 'Desktop 10 x 6 Thunderbolt 3 audio interface with elite-class 24-bit/192 kHz audio conversion, two Unison-enabled mic preamps, and DUO Core real-time UAD plugin DSP processing.',
      youtubeUrl: 'https://www.youtube.com/watch?v=c8N4uY1E9k0',
      specs: {
        'Connectivity': 'Thunderbolt 3 (Bus-powered compatible)',
        'Audio Conversion': '24-Bit / 192 kHz Elite-Class Converters',
        'Preamps': '2 Unison-Enabled Preamps with Classic Emulations',
        'DSP Processing': 'DUO Core Realtime UAD Processing',
        'Dynamic Range': '127 dB D/A Dynamic Range',
      },
    },

    {
      id: '19',
      title: 'Yamaha HS8 Active Nearfield Studio Monitor Pair',
      brand: 'Yamaha',
      category: 'audio',
      price: 799.98,
      originalPrice: 879.98,
      stock: 12,
      discount: 9,
      rating: 4.9,
      reviewsCount: 210,
      image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80',
      ],
      description: 'Industry benchmark 2-way bass-reflex bi-amplified nearfield active studio monitors featuring 8-inch cone woofer and 1-inch dome tweeter delivering uncompromised acoustic fidelity.',
      youtubeUrl: 'https://www.youtube.com/watch?v=fD6v0E4c6Z8',
      specs: {
        'Low-Frequency Driver': '8" Cone Woofer (75W)',
        'High-Frequency Driver': '1" Dome Tweeter (45W)',
        'Total Output Power': '120W Bi-Amp Architecture',
        'Frequency Response': '38 Hz - 30,000 Hz',
        'Room Controls': 'Room Control and High Trim Frequency Response Switches',
      },
    },

    {
      id: '20',
      title: 'Sennheiser HD 650 Open-Back Reference Headphones',
      brand: 'Sennheiser',
      category: 'audio',
      price: 399.95,
      originalPrice: 449.95,
      stock: 18,
      discount: 11,
      rating: 4.9,
      reviewsCount: 189,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      ],
      description: 'Audiophile-grade open-back dynamic reference headphones engineered for mixing, mastering, and critical audio evaluation with hand-selected matched acoustic driver elements.',
      youtubeUrl: 'https://www.youtube.com/watch?v=K1pW-u6j8R4',
      specs: {
        'Transducer Principle': 'Dynamic, Open-Back',
        'Nominal Impedance': '300 Ohms',
        'Frequency Response': '10 Hz - 41,000 Hz',
        'Total Harmonic Distortion': '< 0.05%',
        'Cable': 'Detachable Oxygen-Free Copper (OFC) Cable (3m)',
      },
    },

    // WIND INSTRUMENTS
    {
      id: '21',
      title: 'Yamaha YAS-62III Professional Alto Saxophone',
      brand: 'Yamaha',
      category: 'wind',
      price: 3779.0,
      originalPrice: 4100.0,
      stock: 4,
      discount: 8,
      rating: 4.9,
      reviewsCount: 52,
      image: 'https://images.unsplash.com/photo-1525994886773-080587e161c2?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1525994886773-080587e161c2?w=800&auto=format&fit=crop&q=80',
      ],
      description: 'Modern classic professional alto saxophone featuring 62-style neck for rapid acoustic response, integrated key posts, and hand-engraved bell for warm rich tone.',
      youtubeUrl: 'https://www.youtube.com/watch?v=l4jB_vX5F5E',
      specs: {
        'Key': 'Eb',
        'Bell': 'One-Piece Hand-Engraved Yellow Brass',
        'Neck': '62-Style Professional Neck',
        'Pads': 'Waterproof Leather with Nylon Resonators',
        'Finish': 'Gold Lacquer Body & Keys',
      },
    },

    {
      id: '22',
      title: 'Bach Stradivarius 180S37 Bb Trumpet',
      brand: 'Vincent Bach',
      category: 'wind',
      price: 3399.0,
      originalPrice: 3699.0,
      stock: 5,
      discount: 8,
      rating: 4.8,
      reviewsCount: 44,
      image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=80',
      ],
      description: 'The premier orchestral and jazz trumpet worldwide, featuring one-piece hand-hammered #37 yellow brass bell, Monel metal pistons, and brilliant silver-plated finish.',
      youtubeUrl: 'https://www.youtube.com/watch?v=4dO8fF9Z6YQ',
      specs: {
        'Key': 'Bb',
        'Bore': '.459" Medium-Large Bore',
        'Bell': '#37 One-Piece Hand-Hammered Yellow Brass',
        'Pistons': 'Monel Metal Hand-Lapped Pistons',
        'Finish': 'Brilliant Silver Plate',
      },
    },

    {
      id: '23',
      title: 'Yamaha YFL-382 Intermediate Open-Hole Flute',
      brand: 'Yamaha',
      category: 'wind',
      price: 1485.0,
      originalPrice: 1650.0,
      stock: 9,
      discount: 10,
      rating: 4.8,
      reviewsCount: 67,
      image: 'https://images.unsplash.com/photo-1525994886773-080587e161c2?w=800&auto=format&fit=crop&q=80',
      images: [
        'https://images.unsplash.com/photo-1525994886773-080587e161c2?w=800&auto=format&fit=crop&q=80',
      ],
      description: 'Sterling silver headjoint open-hole flute designed to help advancing musicians cultivate expressive tonal nuance, dynamic projection, and clean articulation.',
      specs: {
        'Headjoint': 'Solid Sterling Silver CY-Cut Headjoint',
        'Keys': 'Open-Hole (French Model) In-Line G',
        'Body & Footjoint': 'Nickel Silver with Silver Plating',
        'Mechanism': 'Pointed Key Arms with Split-E',
        'Key': 'C with Low C Footjoint',
      },
    },
  ],

  orders: [
    {
      id: 'ORD-1001',
      userId: '2',
      customerName: 'Alex Johnson',
      customerEmail: 'alex@example.com',

      items: [
        {
          productId: '1',
          title: 'Fender American Ultra Stratocaster',
          price: 2199.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=800&auto=format&fit=crop&q=80',
        },
      ],

      subtotal: 2199.99,
      tax: 175.99,
      shipping: 0,
      total: 2375.98,

      status: 'Shipped',
      trackingNumber: 'MM-TRK-1001001',
      carrier: 'FedEx Express',

      createdAt: '2026-08-28T14:30:00.000Z',

      shippingAddress: {
        name: 'Alex Johnson',
        street: '742 Evergreen Terrace',
        city: 'Seattle',
        state: 'WA',
        zipCode: '98101',
        country: 'United States',
      },
    },
  ],

  users: [
    {
      id: '1',
      name: 'Bojja',
      email: 'musicmart123@gmail.com',
      password: 'password123',
      role: 'admin',
      phone: '+91 778956123',
      avatar: '',
      createdAt: '2026-01-10T10:00:00.000Z',
    },

    {
      id: '2',
      name: 'Abhilash',
      email: 'abhilash456@gmail.com',
      password: 'password456',
      role: 'customer',
      phone: '+91 778956123',
      avatar: '',
      address: '742 Evergreen Terrace, Seattle, WA 98101, United States',
      createdAt: '2026-02-15T12:00:00.000Z',
    },
  ],
};

// Current catalog schema version. Bump this to automatically refresh browser cache.
export const DATA_VERSION = 'v2.2';

// Helper to initialize and synchronize local storage
export const initLocalData = () => {
  if (typeof localStorage === 'undefined') return;

  const savedVersion = localStorage.getItem('mm_data_version');
  const needsRefresh = savedVersion !== DATA_VERSION;

  if (needsRefresh || !localStorage.getItem('mm_products')) {
    localStorage.setItem(
      'mm_products',
      JSON.stringify(initialMockData.products)
    );
    localStorage.setItem(
      'mm_categories',
      JSON.stringify(initialMockData.categories)
    );
    localStorage.setItem(
      'mm_orders',
      JSON.stringify(initialMockData.orders)
    );
    if (!localStorage.getItem('mm_users')) {
      localStorage.setItem(
        'mm_users',
        JSON.stringify(initialMockData.users)
      );
    }
    localStorage.setItem('mm_data_version', DATA_VERSION);
  }

  // Explicit safeguard: ensure removed product 7 (Yamaha Montage 8) is never kept in localStorage
  try {
    const raw = localStorage.getItem('mm_products');
    if (raw) {
      const prods = JSON.parse(raw);
      if (prods.some((p) => String(p.id) === '7' || p.title?.includes('Montage'))) {
        localStorage.setItem(
          'mm_products',
          JSON.stringify(prods.filter((p) => String(p.id) !== '7' && !p.title?.includes('Montage')))
        );
      }
    }
  } catch {
    // ignore
  }
};

// Initialize local data immediately on module import
initLocalData();