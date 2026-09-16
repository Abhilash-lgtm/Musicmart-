import localData from '../../data/data.json';
import api from './api';

// Cached catalog fallback
let cachedProducts = localData?.products || [];

/**
 * Fetch latest products from json-server, falling back to local dataset
 */
export const getCatalogProducts = async () => {
  try {
    const res = await api.get('/products');
    if (res.data && Array.isArray(res.data) && res.data.length > 0) {
      cachedProducts = res.data;
      return res.data;
    }
  } catch {
    // Silently fall back to cached dataset
  }
  return cachedProducts;
};

/**
 * Parses user text to extract price limit if specified (e.g. "under $1000", "< 500", "below 2000")
 */
const extractMaxPrice = (text) => {
  const match = text.match(/(?:under|below|less than|max|budget of|\$|<)\s*\$?(\d+(?:\.\d+)?)/i);
  if (match && match[1]) {
    return parseFloat(match[1]);
  }
  return null;
};

/**
 * Core AI Assistant Response Generator
 */
export const generateAIResponse = async (userMessage, conversationHistory = []) => {
  const query = userMessage.toLowerCase().trim();
  const products = await getCatalogProducts();

  // Check if Gemini API Key is available in environment
  const geminiKey = import.meta.env?.VITE_GEMINI_API_KEY;
  if (geminiKey) {
    try {
      const geminiResponse = await callGeminiAPI(userMessage, conversationHistory, products, geminiKey);
      if (geminiResponse) return geminiResponse;
    } catch (e) {
      console.warn('Gemini API call failed, using built-in MusicMart AI engine:', e);
    }
  }

  // Built-in intelligent MusicMart AI Domain Engine
  return generateLocalDomainResponse(query, products);
};

/**
 * Intelligent MusicMart Domain Heuristic AI Engine
 */
function generateLocalDomainResponse(query, products) {
  const maxPrice = extractMaxPrice(query);
  const isBeginner = /beginner|starter|first|start|learn|newbie|amateur|cheap|entry/i.test(query);
  const isPro = /pro|professional|flagship|studio grade|expert|master|stage|advanced/i.test(query);
  const isDeals = /deal|deals|discount|discounts|sale|promo|cheap|save|bargain/i.test(query);
  const isTrackOrder = /track|order|shipping|delivery|status|where is my/i.test(query);
  const isPolicy = /return|refund|warranty|guarantee|policy/i.test(query);
  const isGreeting = /^(hi|hello|hey|greetings|hola|howdy|sup|good morning|good evening|yo)\b/i.test(query);

  // 1. Order Tracking Query
  if (isTrackOrder) {
    return {
      text: "📦 **Order Tracking & Shipping**\n\nYou can easily track your order in real-time! Head over to our **[Track Order](/track-order)** page and enter your **Order ID** (found in your confirmation email or profile).\n\nWe provide standard express delivery (3–5 business days) with insured fragile instrument handling.",
      recommendedProducts: [],
      followUpSuggestions: [
        "Go to Track Order page",
        "What is your return policy?",
        "Show today's best deals"
      ]
    };
  }

  // 2. Return / Warranty Policy Query
  if (isPolicy) {
    return {
      text: "🛡️ **MusicMart Protection & Warranty**\n\n• **30-Day Hassle-Free Returns**: If you are not 100% in love with your sound, return it within 30 days.\n• **2-Year Warranty**: All instruments and studio gear include our comprehensive MusicMart warranty covering electronic and structural defects.\n• **Setup Inspection**: Every guitar and keyboard undergoes a professional technician setup before dispatch.",
      recommendedProducts: [],
      followUpSuggestions: [
        "Recommend a beginner guitar",
        "Best microphones for podcasting",
        "Show current deals"
      ]
    };
  }

  // 3. Simple Greeting
  if (isGreeting && query.length < 15) {
    return {
      text: "👋 **Hello there! I'm your MusicMart AI Gear Advisor.**\n\nI can help you find the perfect musical instrument, compare specs, hunt for the biggest discounts, or build your dream studio setup.\n\nWhat kind of music or gear are you looking for today?",
      recommendedProducts: products.slice(0, 3),
      followUpSuggestions: [
        "🎸 Recommend a beginner guitar",
        "🎹 Best keyboard under $1000",
        "🎙️ Top microphones for vocals",
        "🔥 Show today's biggest discounts"
      ]
    };
  }

  // 4. Best Deals & Discounts
  if (isDeals) {
    const discounted = [...products]
      .filter((p) => p.discount && p.discount > 0)
      .sort((a, b) => (b.discount || 0) - (a.discount || 0))
      .slice(0, 3);

    return {
      text: "🔥 **Top MusicMart Deals & Discounts Right Now!**\n\nHere are our highest-discounted premium instruments currently on sale. Grab them before stock runs out!",
      recommendedProducts: discounted,
      followUpSuggestions: [
        "Show acoustic guitars",
        "Keyboards under $1000",
        "Drum kits on sale"
      ]
    };
  }

  // 5. Category Detection
  let targetCategory = null;
  if (/guitar|strat|tele|bass|fender|gibson|taylor|prs|ibanez|acoustic|electric/i.test(query)) {
    targetCategory = 'guitars';
  } else if (/keyboard|piano|synth|synthesizer|nord|roland|korg|moog|keys|weighted/i.test(query)) {
    targetCategory = 'keyboards';
  } else if (/drum|drums|cajon|percussion|cymbals|snare|dw|pearl/i.test(query)) {
    targetCategory = 'drums';
  } else if (/mic|microphone|audio|interface|vocal|studio|podcast|recording|apollo|shure|neumann/i.test(query)) {
    targetCategory = 'audio';
  } else if (/wind|sax|saxophone|trumpet|flute|brass|horn/i.test(query)) {
    targetCategory = 'wind';
  }

  // Filter products by category if identified
  let matched = targetCategory 
    ? products.filter((p) => p.category?.toLowerCase() === targetCategory)
    : [...products];

  // Specific keyword filtering
  if (/acoustic/i.test(query)) {
    const acoustic = matched.filter((p) => /acoustic/i.test(p.title) || /acoustic/i.test(p.description));
    if (acoustic.length > 0) matched = acoustic;
  } else if (/electric/i.test(query)) {
    const electric = matched.filter((p) => /electric/i.test(p.title) || /electric/i.test(p.description));
    if (electric.length > 0) matched = electric;
  } else if (/bass/i.test(query)) {
    const bass = matched.filter((p) => /bass/i.test(p.title) || /bass/i.test(p.description));
    if (bass.length > 0) matched = bass;
  }

  // Microphone specific
  if (/podcast|stream|broadcast/i.test(query)) {
    const podcastMics = matched.filter((p) => /sm7b|podcast|broadcast|shure/i.test(p.title + p.description));
    if (podcastMics.length > 0) matched = podcastMics;
  }

  // Price filtering
  if (maxPrice !== null) {
    const underBudget = matched.filter((p) => p.price <= maxPrice);
    if (underBudget.length > 0) {
      matched = underBudget;
    }
  }

  // Sort by beginner (price ascending) or pro (rating/price descending)
  if (isBeginner) {
    matched.sort((a, b) => a.price - b.price);
  } else if (isPro) {
    matched.sort((a, b) => b.price - a.price);
  } else {
    // Default sort by rating
    matched.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  }

  const topPicks = matched.slice(0, 3);

  // Generate customized advice based on context
  if (targetCategory === 'guitars') {
    if (isBeginner) {
      return {
        text: "🎸 **Great choice to start learning!**\n\nFor beginners, comfort, fret ease, and stable tuning are everything. Here are our most comfortable and versatile guitars to build your musical foundation without finger fatigue:",
        recommendedProducts: topPicks,
        followUpSuggestions: [
          "Do you have acoustic guitars?",
          "Show electric guitars",
          "What accessories do I need with a guitar?"
        ]
      };
    }
    return {
      text: "🎸 **Here are our top rated Guitars & Basses:**\n\nFrom legendary Fender and Gibson tones to premium Taylor acoustics and PRS masterpieces, these instruments deliver sublime playability and stage-ready resonance.",
      recommendedProducts: topPicks,
      followUpSuggestions: [
        "Show guitars under $2000",
        "What are the best bass guitars?",
        "Show current deals"
      ]
    };
  }

  if (targetCategory === 'keyboards') {
    const hasWeighted = /weighted|hammer/i.test(query);
    const hasSynth = /synth|analog/i.test(query);

    let advice = "🎹 **Top Keyboards & Synthesizers:**\n\nWhether you need concert-grade hammer-action weighted keys for classical piano or rich analog subtractive filters for production, here are our best recommendations:";
    if (hasWeighted) {
      advice = "🎹 **Weighted Keybeds & Stage Pianos:**\n\nIf you want authentic piano feel with escapement and triple sensors, these instruments offer concert-grand response:";
    } else if (hasSynth) {
      advice = "🎛️ **Analog & Hybrid Synthesizers:**\n\nFor sound design, fat basslines, and lush leads, explore these legendary Moog and Korg analog synths:";
    }

    return {
      text: advice,
      recommendedProducts: topPicks,
      followUpSuggestions: [
        "Keyboards with 88 weighted keys",
        "Best synths for electronic music",
        "Keyboards under $1000"
      ]
    };
  }

  if (targetCategory === 'audio') {
    return {
      text: "🎙️ **Studio & Vocal Recording Gear:**\n\nClean preamps and pristine capsule articulation make all the difference. Check out our gold-standard microphones and high-fidelity audio interfaces for professional podcasting, voiceover, and music production:",
      recommendedProducts: topPicks,
      followUpSuggestions: [
        "Best mic for singing & vocals",
        "Best mic for podcasting & streaming",
        "Show audio interfaces"
      ]
    };
  }

  if (targetCategory === 'drums') {
    return {
      text: "🥁 **Drums & Percussion Gear:**\n\nLooking for dynamic acoustic punch or quiet practice mesh pads? Here are top-tier drum kits and percussion instruments tailored for great response and durability:",
      recommendedProducts: topPicks,
      followUpSuggestions: [
        "Electronic drum kits for home",
        "Acoustic drum shell packs",
        "Show cajons and percussion"
      ]
    };
  }

  // Fallback: search term match or general smart recommendation
  const searchResults = products.filter((p) => {
    const blob = `${p.title} ${p.brand} ${p.description} ${p.category}`.toLowerCase();
    return query.split(' ').some((word) => word.length > 2 && blob.includes(word));
  });

  if (searchResults.length > 0) {
    return {
      text: `🎵 **I found ${searchResults.length} great match${searchResults.length > 1 ? 'es' : ''} for "${query}":**\n\nCheck out these popular options from our catalog:`,
      recommendedProducts: searchResults.slice(0, 3),
      followUpSuggestions: [
        "Show guitars",
        "Show keyboards",
        "Show today's deals"
      ]
    };
  }

  // Generic helpful response
  return {
    text: "🎶 **I'm here to help you find the right music gear!**\n\nYou can ask me about:\n• **Guitars & Basses** (Fender, Gibson, Taylor, PRS)\n• **Keyboards & Synths** (Nord, Roland, Moog, Korg)\n• **Studio Microphones & Interfaces** (Neumann, Shure, Apollo)\n• **Drums & Percussion** (Roland V-Drums, DW, Pearl)\n• **Budget & Discounts** (e.g., *'Best gear under $1000'*)",
    recommendedProducts: products.slice(0, 3),
    followUpSuggestions: [
      "🎸 Best guitars for beginners",
      "🎹 88-key weighted keyboards",
      "🎙️ Microphones for vocals",
      "🔥 Show best deals"
    ]
  };
}

/**
 * Optional Google Gemini API integration when VITE_GEMINI_API_KEY is configured
 */
async function callGeminiAPI(userMessage, conversationHistory, products, apiKey) {
  const catalogSummary = products.map(p => `- [ID:${p.id}] ${p.title} (${p.brand}) - $${p.price}, Category: ${p.category}, Rating: ${p.rating}`).join('\n');
  
  const systemPrompt = `You are the friendly, expert AI Shopping Assistant for MusicMart, an online musical instrument store.
Catalog products:
${catalogSummary}

Rules:
1. Provide enthusiastic, concise, musical advice.
2. Recommend specific products from the catalog if relevant. Mention their ID like [PRODUCT_ID:x] so we can show a card.
3. Keep responses helpful and under 3 paragraphs.
`;

  const messages = [
    { role: 'user', parts: [{ text: `${systemPrompt}\nUser says: ${userMessage}` }] }
  ];

  const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: messages })
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`);
  }

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  
  // Extract mentioned product IDs
  const idMatches = [...rawText.matchAll(/\[PRODUCT_ID:(\d+)\]/g)].map(m => m[1]);
  const cleanText = rawText.replace(/\[PRODUCT_ID:\d+\]/g, '').trim();

  let recommendedProducts = [];
  if (idMatches.length > 0) {
    recommendedProducts = products.filter(p => idMatches.includes(String(p.id)));
  }

  return {
    text: cleanText,
    recommendedProducts: recommendedProducts.slice(0, 3),
    followUpSuggestions: [
      "Show beginner options",
      "Best deals right now",
      "Studio microphones"
    ]
  };
}
