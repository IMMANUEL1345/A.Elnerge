/* ============================================================
   CHAT.JS — AI Chat Widget Logic
   A. Elnerge Technologies
   Powered by Claude API (Anthropic)
   ============================================================ */

let chatOpen   = false;
let chatHistory = [];

// ── SYSTEM PROMPT ──
// Full product knowledge for the AI assistant
const SYSTEM_PROMPT = `You are the AI assistant for A. Elnerge Technologies, a Ghanaian software development house founded by Immanuel Boanerge Agbemabiase. You are knowledgeable, professional, and warm.

COMPANY: A. Elnerge Technologies. The name "Elnerge" is built from the founder's name:
- EL   = last two letters of Immanuel
- NERGE = last five letters of Boanerge
- A.   = initial of Agbemabiase
Tagline: Intelligent Business Applications (IBA).

THE IBA SUITE — 6 PRODUCTS:

1. IBA TradeDesk (Retail & Commerce)
   Two modules: TradeDesk Counter (POS, checkout, digital receipts, customer history)
   and TradeDesk Stockroom (real-time stock sync, auto purchase orders, multi-location tracking).
   Tagline: Sell Smarter. Stock Smarter.

2. IBA EduClass (Education)
   Full school management: student enrollment & records, attendance tracking, grade & report card
   generation, fee & payment management, timetable scheduling, parent-teacher communication.
   Tagline: The Intelligent Classroom Manager.

3. IBA Sanctuary (Faith & Community)
   Church management: member & family database with photos, tithe & donation tracking with receipts,
   event & service scheduling, group/ministry management, secure congregation communications.
   Tagline: The Intelligent Church Manager.

4. IBA BuildSmart (Construction) — SHOWSTOPPER PRODUCT
   Material quantity calculator: select a building type (1-bed, 2-bed, 3-bed, office, shop)
   and instantly see all required materials (blocks, cement, iron rods, sand, gravel).
   Also: phase-by-phase project planning, real-time cost estimation (Ghana market prices),
   contractor & supplier management.
   Material estimates: 2-bedroom = ~2800 blocks, ~180 cement bags (GH₵85 each), ~120 iron rods (GH₵65 each).
   Multiply all by number of floors. Blocks ~GH₵4.50 each.
   Tagline: The Intelligent Project Planner.

5. IBA InnVue (Hospitality)
   Hotel/guesthouse management: front desk overview, room availability grid, guest check-in/out,
   housekeeping board, billing & receipt generation, online booking integration.
   Tagline: The Intelligent Hospitality Hub.

6. IBA TransitFlow (Transport)
   Fleet management: vehicle registration & tracking, route planning & management,
   driver & conductor assignment, schedule management, maintenance & fuel consumption logs.
   Tagline: The Intelligent Fleet Organizer.

TEAM: Led by founder Immanuel Boanerge Agbemabiase. The IBA Suite was born from a final-year project on transport logistics.

GUIDELINES:
- Keep answers concise, helpful, and warm
- For product recommendations, ask about their industry first
- For pricing or getting started, direct them to the contact form to book a demo
- You can provide BuildSmart material estimates if asked
- Do not make up information not provided above`;

/**
 * Toggle the chat window open/closed
 */
function toggleChat() {
  chatOpen = !chatOpen;
  const win = document.getElementById('chat-window');
  if (win) win.classList.toggle('open', chatOpen);
}

/**
 * Send a message from a suggestion chip
 * @param {HTMLElement} el - The chip element
 */
function sendChip(el) {
  const input = document.getElementById('chat-input');
  if (input) {
    input.value = el.textContent;
    sendMessage();
  }
}

/**
 * Send the current chat input message
 */
async function sendMessage() {
  const input = document.getElementById('chat-input');
  if (!input) return;

  const text = input.value.trim();
  if (!text) return;

  // Clear input and hide chips
  input.value = '';
  const chips = document.getElementById('chat-chips');
  if (chips) chips.style.display = 'none';

  // Add user message to UI
  addMessage('user', text);

  // Add to history
  chatHistory.push({ role: 'user', content: text });

  // Show typing indicator
  const typingEl = addTypingIndicator();

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model:      'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system:     SYSTEM_PROMPT,
        messages:   chatHistory,
      }),
    });

    const data = await response.json();
    typingEl.remove();

    const reply = data.content?.[0]?.text || "I'm sorry, I couldn't connect right now. Please try again.";

    // Add AI reply to history and UI
    chatHistory.push({ role: 'assistant', content: reply });
    addMessage('ai', reply);

  } catch (error) {
    typingEl.remove();
    addMessage('ai', "I'm having trouble connecting. Please refresh the page and try again.");
    console.error('Chat error:', error);
  }
}

/**
 * Add a message bubble to the chat window
 * @param {string} role - 'ai' or 'user'
 * @param {string} text - Message content
 */
function addMessage(role, text) {
  const container = document.getElementById('chat-messages');
  if (!container) return;

  const div = document.createElement('div');
  div.className = 'msg ' + role;
  div.innerHTML = `
    <div class="msg-avatar">${role === 'ai' ? 'E' : 'U'}</div>
    <div class="msg-bubble">${text.replace(/\n/g, '<br>')}</div>
  `;

  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

/**
 * Add a typing indicator and return the element (to remove later)
 * @returns {HTMLElement}
 */
function addTypingIndicator() {
  const container = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = 'msg ai';
  div.innerHTML = `
    <div class="msg-avatar">E</div>
    <div class="msg-bubble">
      <div class="typing-indicator">
        <span></span><span></span><span></span>
      </div>
    </div>
  `;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
  return div;
}

// Allow sending with Enter key
document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('chat-input');
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') sendMessage();
    });
  }
});