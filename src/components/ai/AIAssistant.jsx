import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  Sparkles, 
  Send, 
  X, 
  RotateCcw, 
  ShoppingBag, 
  Check, 
  Star,
  ExternalLink,
  Music
} from 'lucide-react';
import { CartContext } from '../../context/CartContext';
import { generateAIResponse } from '../../services/aiService';
import '../../styles/aiAssistant.css';

const INITIAL_MESSAGE = {
  id: 'init-1',
  sender: 'assistant',
  text: "👋 **Hi! I'm MusicMart AI, your personal musical gear specialist.**\n\nLooking for an instrument, studio setup, or discounts? Tell me what you want to play, your favorite genre, or your budget!",
  recommendedProducts: [],
  followUpSuggestions: [
    "🎸 Beginner guitars",
    "🎹 Keyboards under $1000",
    "🎙️ Studio microphones",
    "🥁 Electronic drums",
    "🔥 Today's best deals"
  ],
  time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
};

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [addedItems, setAddedItems] = useState({});

  const { addToCart } = useContext(CartContext);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to latest message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping, isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSendMessage = async (textToSend) => {
    const text = typeof textToSend === 'string' ? textToSend : inputValue;
    if (!text.trim()) return;

    setHasInteracted(true);
    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (typeof textToSend !== 'string') {
      setInputValue('');
    }
    setIsTyping(true);

    try {
      // Simulate realistic conversational processing pause
      const [aiResult] = await Promise.all([
        generateAIResponse(text.trim(), messages),
        new Promise((resolve) => setTimeout(resolve, 600))
      ]);

      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: aiResult.text,
        recommendedProducts: aiResult.recommendedProducts || [],
        followUpSuggestions: aiResult.followUpSuggestions || [],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: "🎶 I encountered a brief pause tuning my instruments. How else can I help you find gear?",
        recommendedProducts: [],
        followUpSuggestions: ["Show guitars", "Show keyboards", "Show today's deals"],
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleAddToCart = (product) => {
    addToCart(product, 1);
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const handleResetChat = () => {
    setMessages([{
      ...INITIAL_MESSAGE,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);
  };

  // Convert simple markdown styling (*bold*, bullet points, linebreaks)
  const renderFormattedText = (text) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      if (!line.trim()) return <div key={idx} style={{ height: '6px' }} />;
      
      // Bold markdown formatting
      const parts = line.split(/(\*\*.*?\*\*)/g).map((chunk, cIdx) => {
        if (chunk.startsWith('**') && chunk.endsWith('**')) {
          return <strong key={cIdx}>{chunk.slice(2, -2)}</strong>;
        }
        return chunk;
      });

      return <p key={idx}>{parts}</p>;
    });
  };

  return (
    <>
      {/* Floating Action Launcher Button */}
      <button
        className="ai-launcher-btn"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open AI Shopping Assistant"
        title="MusicMart AI Assistant"
      >
        {isOpen ? <X size={26} /> : <Bot size={28} />}
        {!isOpen && !hasInteracted && (
          <div className="ai-launcher-badge">
            <Sparkles size={14} color="#f59e0b" />
            <span>Ask MusicMart AI</span>
          </div>
        )}
      </button>

      {/* Expandable Chat Window */}
      {isOpen && (
        <div className="ai-chat-window" role="dialog" aria-modal="true">
          {/* Header */}
          <div className="ai-chat-header">
            <div className="ai-header-left">
              <div className="ai-avatar-wrapper">
                <Music size={20} />
                <span className="ai-status-indicator" title="Online & Ready" />
              </div>
              <div className="ai-header-info">
                <h4>
                  MusicMart AI <span className="ai-header-tag">Advisor</span>
                </h4>
                <p>Instrument & Studio Specialist</p>
              </div>
            </div>

            <div className="ai-header-actions">
              <button
                className="ai-icon-btn"
                onClick={handleResetChat}
                title="Restart conversation"
                aria-label="Restart conversation"
              >
                <RotateCcw size={15} />
              </button>
              <button
                className="ai-icon-btn"
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
              >
                <X size={17} />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="ai-messages-container">
            {messages.map((msg) => (
              <div key={msg.id} className={`ai-message-row ${msg.sender}`}>
                {msg.sender === 'assistant' && (
                  <div className="ai-msg-avatar">
                    <Bot size={18} />
                  </div>
                )}

                <div className="ai-message-bubble">
                  <div className="ai-msg-text">
                    {renderFormattedText(msg.text)}
                  </div>

                  {/* Product Recommendation Cards */}
                  {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                    <div className="ai-products-grid">
                      {msg.recommendedProducts.map((prod) => (
                        <div key={prod.id} className="ai-product-card">
                          <img
                            src={prod.image}
                            alt={prod.title}
                            className="ai-product-thumb"
                            loading="lazy"
                          />
                          <div className="ai-product-details">
                            <span className="ai-product-brand">{prod.brand}</span>
                            <h5 className="ai-product-title" title={prod.title}>
                              {prod.title}
                            </h5>
                            <div className="ai-product-pricing">
                              <span>${Number(prod.price).toLocaleString()}</span>
                              {prod.originalPrice && prod.originalPrice > prod.price && (
                                <span className="original-price">
                                  ${Number(prod.originalPrice).toLocaleString()}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="ai-product-card-actions">
                            <Link
                              to={`/product/${prod.id}`}
                              className="ai-view-btn"
                              title="View details"
                              onClick={() => setIsOpen(false)}
                            >
                              View
                            </Link>
                            <button
                              className={`ai-add-cart-btn ${addedItems[prod.id] ? 'added' : ''}`}
                              onClick={() => handleAddToCart(prod)}
                              title="Add to Shopping Cart"
                            >
                              {addedItems[prod.id] ? (
                                <>
                                  <Check size={12} />
                                  <span>Added</span>
                                </>
                              ) : (
                                <>
                                  <ShoppingBag size={12} />
                                  <span>Add</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Suggestion Chips */}
                  {msg.followUpSuggestions && msg.followUpSuggestions.length > 0 && (
                    <div className="ai-suggestions-row">
                      {msg.followUpSuggestions.map((suggestion, sIdx) => (
                        <button
                          key={sIdx}
                          className="ai-suggestion-pill"
                          onClick={() => handleSendMessage(suggestion)}
                        >
                          <Sparkles size={11} />
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}

                  <span className="ai-msg-time">{msg.time}</span>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="ai-message-row assistant">
                <div className="ai-msg-avatar">
                  <Bot size={18} />
                </div>
                <div className="ai-typing-indicator">
                  <span className="ai-typing-dot" />
                  <span className="ai-typing-dot" />
                  <span className="ai-typing-dot" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Footer Input Area */}
          <div className="ai-chat-footer">
            <form
              className="ai-input-form"
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
            >
              <input
                ref={inputRef}
                type="text"
                className="ai-chat-input"
                placeholder="Ask about guitars, keyboards, budget..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isTyping}
              />
              <button
                type="submit"
                className="ai-send-btn"
                disabled={!inputValue.trim() || isTyping}
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </form>
            <div className="ai-footer-note">
              MusicMart Smart Assistant • Live Catalog Recommendations
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
