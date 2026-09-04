// Initial mock data used for fallback and local testing
export const initialMockData = {
  categories: [
    { id: 'guitars', name: 'Guitars & Basses', itemCount: 28 },
    { id: 'keyboards', name: 'Keyboards & Pianos', itemCount: 19 },
    { id: 'drums', name: 'Drums & Percussion', itemCount: 14 },
    { id: 'audio', name: 'Studio & Microphones', itemCount: 22 },
    { id: 'wind', name: 'Wind & Brass', itemCount: 12 },
  ],
  products: [
    {
      id: '1',
      title: 'Fender American Professional II Stratocaster',
      brand: 'Fender',
      category: 'guitars',
      price: 1699.99,
      originalPrice: 1899.99,
      stock: 12,
      discount: 10,
      rating: 4.9,
      reviewsCount: 142,
      image: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=800&auto=format&fit=crop&q=80',
      description: 'The American Professional II Stratocaster draws from over sixty years of inspiration, innovation and evolution to meet the demands of today’s working player.',
      specs: {
        'Body Material': 'Alder',
        'Neck Shape': 'Deep "C"',
        'Pickups': 'V-Mod II Single-Coil Strat',
        'Bridge': '2-Point Synchronized Tremolo',
      },
    },
    {
      id: '2',
      title: 'Gibson Les Paul Standard 50s Goldtop',
      brand: 'Gibson',
      category: 'guitars',
      price: 2799.00,
      originalPrice: 2999.00,
      stock: 5,
      discount: 7,
      rating: 4.8,
      reviewsCount: 98,
      image: 'https://images.unsplash.com/photo-1564186763535-ebb21ef5277f?w=800&auto=format&fit=crop&q=80',
      description: 'The Les Paul Standard 50s returns to the classic design that made it relevant, played, and loved -- shaping sound across generations and genres of music.',
      specs: {
        'Body Material': 'Mahogany with Maple Top',
        'Neck': 'Vintage 50s Profile',
        'Pickups': 'BurstBucker 1 & BurstBucker 2',
      },
    },
    {
      id: '3',
      title: 'Nord Stage 3 88-Key Flagship Synthesizer',
      brand: 'Nord',
      category: 'keyboards',
      price: 4499.00,
      originalPrice: 4800.00,
      stock: 3,
      discount: 6,
      rating: 5.0,
      reviewsCount: 64,
      image: 'https://images.unsplash.com/photo-1520523839898-507127053c17?w=800&auto=format&fit=crop&q=80',
      description: 'The ultimate instrument for the gigging keyboardist, featuring the Nord Lead A1 Synth Engine with sample playback and Nord C2D organ.',
      specs: {
        'Keybed': '88-Key Hammer Action',
        'Engines': 'Piano, Organ, Synth',
        'Memory': '2GB Piano Library',
      },
    },
    {
      id: '4',
      title: 'Roland TD-27KV2 Electronic V-Drums Kit',
      brand: 'Roland',
      category: 'drums',
      price: 3499.99,
      originalPrice: 3799.99,
      stock: 4,
      discount: 8,
      rating: 4.9,
      reviewsCount: 38,
      image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7?w=800&auto=format&fit=crop&q=80',
      description: 'Mid-level V-Drums kit with flagship-class sound, digital snare, ride, and hi-hat pads for expressive acoustic-like realism.',
      specs: {
        'Sound Module': 'TD-27 with Prismatic Modeling',
        'Snare Pad': '14-inch Digital PD-140DS',
        'Connectivity': 'Bluetooth Audio, USB MIDI',
      },
    },
    {
      id: '5',
      title: 'Neumann U 87 Ai Large-Diaphragm Studio Condenser',
      brand: 'Neumann',
      category: 'audio',
      price: 3695.00,
      stock: 8,
      rating: 5.0,
      reviewsCount: 112,
      image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=800&auto=format&fit=crop&q=80',
      description: 'The gold standard in vocal recording studios worldwide. Renowned for its warm and well-balanced tone across all acoustic instruments.',
      specs: {
        'Polar Patterns': 'Omni, Cardioid, Figure-8',
        'Frequency Range': '20 Hz to 20 kHz',
        'Connector': 'XLR 3-Pin',
      },
    },
    {
      id: '6',
      title: 'Yamaha YAS-62III Professional Alto Saxophone',
      brand: 'Yamaha',
      category: 'wind',
      price: 3742.00,
      stock: 6,
      rating: 4.9,
      reviewsCount: 45,
      image: 'https://images.unsplash.com/photo-1525994886773-080587e161c2?w=800&auto=format&fit=crop&q=80',
      description: 'A modern classic used by leading professionals around the globe, offering free-blowing flexibility and rich tonal projection.',
      specs: {
        'Key': 'Eb with High F#',
        'Neck': '62 Style Neck',
        'Finish': 'Gold Lacquer',
      },
    },
  ],
  orders: [
    {
      id: 'ORD-9824',
      userId: '2',
      customerName: 'Alex Johnson',
      customerEmail: 'alex@example.com',
      items: [
        {
          productId: '1',
          title: 'Fender American Professional II Stratocaster',
          price: 1699.99,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1550291652-6ea9114a47b1?w=800&auto=format&fit=crop&q=80',
        },
      ],
      subtotal: 1699.99,
      tax: 136.00,
      shipping: 0.00,
      total: 1835.99,
      status: 'Shipped',
      trackingNumber: 'MM-TRK-7849102',
      carrier: 'FedEx Priority',
      createdAt: '2026-08-28T14:30:00.000Z',
      shippingAddress: {
        name: 'Alex Johnson',
        street: '742 Evergreen Terrace',
        city: 'Springfield',
        state: 'OR',
        zipCode: '97477',
        country: 'United States',
      },
    },
  ],
  users: [
    {
      id: '1',
      name: 'Admin Bojja',
      email: 'admin@musicmart.com',
      password: 'adminpassword123',
      role: 'admin',
      phone: '+1 (555) 019-2831',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
      createdAt: '2026-01-10T10:00:00.000Z',
    },
    {
      id: '2',
      name: 'Alex Johnson',
      email: 'alex@example.com',
      password: 'password123',
      role: 'customer',
      phone: '+1 (555) 392-1082',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80',
      address: '742 Evergreen Terrace, Springfield, OR',
      createdAt: '2026-02-15T12:00:00.000Z',
    },
  ],
};

// Helper to initialize local storage
export const initLocalData = () => {
  if (!localStorage.getItem('mm_products')) {
    localStorage.setItem('mm_products', JSON.stringify(initialMockData.products));
  }
  if (!localStorage.getItem('mm_categories')) {
    localStorage.setItem('mm_categories', JSON.stringify(initialMockData.categories));
  }
  if (!localStorage.getItem('mm_orders')) {
    localStorage.setItem('mm_orders', JSON.stringify(initialMockData.orders));
  }
  if (!localStorage.getItem('mm_users')) {
    localStorage.setItem('mm_users', JSON.stringify(initialMockData.users));
  }
};

initLocalData();
