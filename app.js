/* ============================================
   CFO Playbook Survey - Altus Nova
   Interactive Survey App
   ============================================ */

// ===== CONFIGURATION =====
const CONFIG = {
  playbookUrl: 'https://docs.google.com/document/d/1Cr4p_PzN4ORnFngp4lMvQsgTYbrdkDpES1_MwVw-am4/edit',
  contactEmail: 'jason@altusnova.com',
  // Data endpoint TBD - currently logs to console
  submitEndpoint: ''
};

// ===== PLAY HEADERS =====
// Shown at the start of each play section
const PLAY_HEADERS = {
  'Play 1': {
    title: 'Funding the Future: Data-Driven Capital Allocation',
    summary: 'Build an intelligent capital allocation process where every investment is rigorously vetted and the portfolio is optimized for risk-adjusted return.'
  },
  'Play 2': {
    title: 'Architecting Your Pricing & Profitability Engine',
    summary: 'Transform gut-feel pricing into a data-driven strategy that reveals exactly where margin is leaking and where opportunities exist.'
  },
  'Play 3': {
    title: 'Fueling Growth with Operational Cash',
    summary: 'Unlock cash hidden in operational inefficiency and multiply your team\'s output to fund growth from within.'
  },
  'Play 4': {
    title: 'Building the Engine for Real-Time & Predictive Decisions',
    summary: 'Transform finance from reporting the past to predicting the future with AI-powered forecasting and scenario planning.'
  }
};

// ===== QUESTIONS DATA =====
// Source: CFO-Playbook-Survey-Content.md
const QUESTIONS = [
  // Section A: Background
  {
    id: 1,
    section: 'Background',
    text: 'Your Role',
    type: 'single',
    options: [
      { text: 'CFO' },
      { text: 'VP Finance' },
      { text: 'Head of FP&A' },
      { text: 'Controller' },
      { text: 'Other senior finance leader' }
    ]
  },
  {
    id: 2,
    section: 'Background',
    text: 'Company Profile',
    type: 'twopart',
    parts: [
      {
        label: 'Revenue',
        options: [
          { text: 'Under $50M' },
          { text: '$50M - $100M' },
          { text: '$100M - $250M' },
          { text: '$250M - $500M' },
          { text: '$500M - $1B' },
          { text: 'Over $1B' }
        ]
      },
      {
        label: 'Ownership',
        options: [
          { text: 'PE-backed' },
          { text: 'Public' },
          { text: 'Private (not PE-backed)' },
          { text: 'Family-owned' }
        ]
      }
    ]
  },

  // Section B: Play 1 - Data-Driven Capital Allocation
  {
    id: 3,
    section: 'Play 1: Capital Allocation',
    text: 'Where are you on implementing a structured, data-backed capital allocation process?',
    type: 'single',
    options: [
      { text: 'Not on our radar', subtext: "We haven't considered this" },
      { text: 'Exploring / researching', subtext: 'Looking into what this could look like' },
      { text: 'Planning to implement', subtext: 'On our roadmap for the next 12-18 months' },
      { text: 'Piloted in one area', subtext: 'Testing with a subset of investments' },
      { text: 'Implemented for major investments', subtext: 'Applied to significant capital decisions' },
      { text: 'Fully embedded and closed-loop', subtext: 'Standard process with post-investment tracking' }
    ],
    tooltip: "The most common capital allocation failure isn't picking wrong - it's lack of post-investment accountability. With a unified source of truth, your team tracks actual performance against original business cases - making the system smarter over time."
  },
  {
    id: 4,
    section: 'Play 1: Capital Allocation',
    text: "What's been the biggest challenge in using data in your capital allocation process?",
    type: 'single',
    hasOther: true,
    options: [
      { text: 'Data quality / integration issues' },
      { text: 'Lack of standardized metrics across business units' },
      { text: 'Business unit resistance to transparency' },
      { text: 'Tooling complexity' },
      { text: 'Executive alignment on criteria' },
      { text: 'Post-investment accountability is weak' },
      { text: "We haven't focused on this yet" },
      { text: 'Other (please specify)', isOther: true }
    ],
    tooltip: "CFOs who implement closed-loop capital tracking report faster board approvals - not because projects get better, but because the decision-making process becomes defensible and repeatable."
  },

  // Section B: Play 2 - Pricing & Profitability Analytics
  {
    id: 5,
    section: 'Play 2: Pricing & Profitability',
    text: 'Do you have customer- or SKU-level profitability visibility today?',
    type: 'single',
    options: [
      { text: 'No visibility', subtext: "We don't track at this level" },
      { text: 'Planning to build this', subtext: 'On our roadmap but not started' },
      { text: 'Partial / delayed', subtext: 'We can get there but it takes significant effort' },
      { text: 'Mostly available', subtext: 'Regular reporting but not real-time' },
      { text: 'Fully real-time and actionable', subtext: 'Embedded in daily decisions' }
    ],
    tooltip: "In some cases, aggressive discounting actually *decreases* win rates. Without data, these counterintuitive dynamics stay hidden - and margin leaks continue unchecked."
  },
  {
    id: 6,
    section: 'Play 2: Pricing & Profitability',
    text: 'Have you used analytics or AI to guide pricing or discounting decisions?',
    type: 'single',
    options: [
      { text: 'Not yet', subtext: "Haven't explored this" },
      { text: 'Considering it', subtext: 'Researching tools or approaches' },
      { text: 'Analysis only', subtext: "We've run studies but no behavior change" },
      { text: 'Guardrails implemented', subtext: 'Discount limits or approval workflows in place' },
      { text: 'Actively steering pricing', subtext: 'AI/analytics drive real-time pricing decisions' }
    ],
    tooltip: "The fastest margin wins usually come from visibility, not optimization. Simply showing sales reps the margin impact of each deal - in real time, in their workflow - often changes behavior without new rules or approvals."
  },
  {
    id: 7,
    section: 'Play 2: Pricing & Profitability',
    text: "What's limited margin improvement the most?",
    type: 'single',
    hasOther: true,
    options: [
      { text: "We don't have accurate cost-to-serve data" },
      { text: "Sales team won't change behavior" },
      { text: 'Compensation rewards revenue, not margin' },
      { text: 'Leadership fears losing customers if we tighten pricing' },
      { text: "We don't trust the underlying data" },
      { text: "Pricing decisions are made outside finance's influence" },
      { text: "We haven't made this a priority yet" },
      { text: 'Other (please specify)', isOther: true }
    ],
    tooltip: "In some cases, aggressive discounting actually decreases win rates. Customers interpret deep discounts as desperation or question product quality. The data often reveals pricing power you didn't know you had."
  },

  // Section B: Play 3 - Operational Cash & Productivity
  {
    id: 8,
    section: 'Play 3: Operational Cash',
    text: 'Have you used data-driven AI to reduce operational friction or increase revenue per employee?',
    type: 'single',
    options: [
      { text: 'Not on our radar', subtext: "Haven't prioritized this" },
      { text: 'Exploring opportunities', subtext: 'Looking at where AI could help' },
      { text: 'Planning specific initiatives', subtext: 'Identified use cases, building business case' },
      { text: 'Small pilots', subtext: 'Testing in isolated areas' },
      { text: 'Department-level impact', subtext: 'Measurable gains in specific functions' },
      { text: 'Company-wide operating model shift', subtext: 'Fundamentally changed how we work' }
    ],
    tooltip: "A mid-market manufacturing company facing top-line pressure from rising interest rates improved service levels by several points, reduced working capital, and cut production costs - all through real-time supplier scorecards and production cycle time measurement."
  },
  {
    id: 9,
    section: 'Play 3: Operational Cash',
    text: 'When implementing data-driven AI, where have you seen the most impact (or would expect to)?',
    subtext: 'Select up to 3',
    type: 'multi',
    maxSelections: 3,
    options: [
      { text: 'Cash conversion cycle improvement' },
      { text: 'Headcount avoidance / productivity gains' },
      { text: 'Faster close / billing cycles' },
      { text: 'Throughput / cycle time reduction' },
      { text: 'Customer service levels' },
      { text: 'Limited or no impact yet' }
    ]
  },
  {
    id: 10,
    section: 'Play 3: Operational Cash',
    text: "What has slowed progress on operational productivity?",
    type: 'single',
    options: [
      { text: 'Change management challenges' },
      { text: 'IT bottlenecks / competing priorities' },
      { text: 'Governance / security concerns' },
      { text: 'Lack of clear ownership' },
      { text: 'We have the tools but not the culture' },
      { text: "Haven't focused here yet" }
    ],
    tooltip: "Don't let procurement processes and managers stand in the way of the AI-trailblazers in your organization. The biggest productivity gains often come from one or two 'data athletes' who get permission to experiment. Small pilots with motivated champions can outperform top-down mandates."
  },

  // Section B: Play 4 - Real-Time & Predictive Decisioning
  {
    id: 11,
    section: 'Play 4: Predictive Decisioning',
    text: 'How do you forecast today?',
    type: 'single',
    options: [
      { text: 'Static annual budget', subtext: 'Traditional annual planning cycle' },
      { text: 'Rolling forecast (manual)', subtext: 'Updated quarterly/monthly but heavy lift' },
      { text: 'Planning to modernize', subtext: 'Evaluating tools or approaches to improve' },
      { text: 'System-driven rolling forecast', subtext: 'Automated updates with some manual adjustment' },
      { text: 'Predictive / scenario-based', subtext: 'AI-powered with multiple scenario modeling' }
    ],
    tooltip: "The winner won't be the one who reports the past most accurately, but the one who can model the future most effectively. While you reconcile last quarter, competitors are simulating next year."
  },
  {
    id: 12,
    section: 'Play 4: Predictive Decisioning',
    text: 'Are leaders in your company using forecasts to change decisions in-flight?',
    type: 'single',
    options: [
      { text: 'Rarely - forecasts are backward-looking reports' },
      { text: 'Sometimes - major variances trigger discussion' },
      { text: 'Often - forecasts drive weekly/monthly decisions' },
      { text: 'This is core to how we operate' }
    ],
    tooltip: "The shift to predictive decisioning starts when leaders ask 'what should we do differently?' not 'what happened?' The forecast becomes a decision tool, not a reporting exercise."
  },
  {
    id: 13,
    section: 'Play 4: Predictive Decisioning',
    text: "What's the biggest gap preventing better forecasting?",
    type: 'single',
    options: [
      { text: 'Fragmented data across systems' },
      { text: 'Lack of modeling capability / tools' },
      { text: 'Trust in forecast outputs' },
      { text: "Leadership adoption - they don't use it" },
      { text: 'Skills gap on the team' },
      { text: "We're satisfied with our current approach" }
    ]
    // No tooltip for Q13
  },

  // Section C: The Missing Play
  {
    id: 14,
    section: 'The Missing Play',
    text: "Is there a major data-driven value creation initiative you've focused on that isn't covered by the four plays we reviewed?",
    type: 'open',
    placeholder: 'Describe any data/AI initiative that\'s driven significant value for your organization that\'s not covered by the four plays.',
    optional: true
  },
  {
    id: 15,
    section: 'The Missing Play',
    text: 'Which area do you believe is most underutilized by finance teams today?',
    type: 'single',
    hasOther: true,
    options: [
      { text: 'M&A integration / post-acquisition value capture' },
      { text: 'Working capital / AR intelligence' },
      { text: 'Vendor spend & contract leakage' },
      { text: 'Risk & compliance automation' },
      { text: 'Customer lifetime value modeling' },
      { text: 'Revenue operations alignment' },
      { text: 'Something else (please specify)', isOther: true }
    ],
    tooltip: "We're actively researching the \"5th play\" based on what CFOs tell us. Your input directly shapes our upcoming research and panel discussions."
  },

  // Section D: Soft Conversion
  {
    id: 16,
    section: 'Share Results',
    text: 'Would you find it useful to see how peers are executing these plays?',
    type: 'single',
    options: [
      { text: 'Yes - send me anonymized benchmark results' },
      { text: 'Maybe - depends on the quality of insights' },
      { text: 'No thanks' }
    ]
  },
  {
    id: 17,
    section: 'Share Results',
    text: "We're hosting a peer discussion panel with finance execs who've run these plays. Would you be interested in participating or attending?",
    type: 'single',
    options: [
      { text: "Yes - I'd consider being a panelist" },
      { text: "Yes - I'd attend as a participant" },
      { text: "Maybe - tell me more when it's scheduled" },
      { text: 'No thanks' }
    ]
  }
  // Q18 (contact form) is handled separately in the gate screen
];

// ===== STATE =====
const state = {
  currentQuestion: 0,
  answers: {},
  otherText: {},
  respondent: null,
  seenPlays: {} // Track which plays have been shown expanded
};

// ===== DOM REFS =====
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ===== SCREEN MANAGEMENT =====
function showScreen(screenId) {
  $$('.screen').forEach(s => s.classList.remove('active'));
  const target = $(`#${screenId}`);
  void target.offsetWidth; // Force reflow for animation
  target.classList.add('active');

  // Show/hide progress bar
  const progressBar = $('#progress-bar');
  if (screenId === 'screen-question') {
    progressBar.classList.add('visible');
  } else {
    progressBar.classList.remove('visible');
  }
}

// ===== PROGRESS BAR =====
function updateProgressBar() {
  const pct = ((state.currentQuestion) / QUESTIONS.length) * 100;
  $('#progress-fill').style.width = pct + '%';
}

// ===== RENDER QUESTION =====
function renderQuestion(index) {
  const q = QUESTIONS[index];
  state.currentQuestion = index;
  updateProgressBar();

  // Back button visibility
  $('#btn-back-question').style.display = index === 0 ? 'none' : '';

  // Check if we need to show a play header
  const playHeader = $('#play-header');
  const sectionLabel = $('#question-section');
  const playMatch = q.section.match(/^Play (\d)/);

  if (playMatch) {
    const playKey = `Play ${playMatch[1]}`;
    if (PLAY_HEADERS[playKey]) {
      const header = PLAY_HEADERS[playKey];
      $('#play-header-label').textContent = playKey;
      $('#play-header-title').textContent = header.title;
      $('#play-header-summary').textContent = header.summary;
      playHeader.hidden = false;
      sectionLabel.hidden = true; // Hide the small green label when play header is shown

      // First time seeing this play = expanded, subsequent = collapsed
      if (!state.seenPlays[playKey]) {
        playHeader.classList.remove('collapsed');
        state.seenPlays[playKey] = true;
      } else {
        playHeader.classList.add('collapsed');
      }
    } else {
      playHeader.hidden = true;
      sectionLabel.hidden = false;
    }
  } else {
    playHeader.hidden = true;
    sectionLabel.hidden = false;
  }

  // Section and counter
  $('#question-section').textContent = q.section;
  $('#question-counter').textContent = `Question ${index + 1} of ${QUESTIONS.length}`;
  $('#question-text').textContent = q.text;
  $('#question-subtext').textContent = q.subtext || '';

  const answersContainer = $('#question-answers');
  answersContainer.innerHTML = '';

  // Hide tooltip, next button, and other input
  $('#question-tooltip').hidden = true;
  $('#btn-next').hidden = true;
  $('#other-input-container').hidden = true;
  $('#other-input').value = state.otherText[q.id] || '';

  // Render based on question type
  if (q.type === 'single') {
    renderSingleSelect(q, answersContainer);
  } else if (q.type === 'multi') {
    renderMultiSelect(q, answersContainer);
  } else if (q.type === 'twopart') {
    renderTwoPart(q, answersContainer);
  } else if (q.type === 'open') {
    renderOpenText(q, answersContainer);
  }

  showScreen('screen-question');
}

// ===== SINGLE SELECT =====
function renderSingleSelect(q, container) {
  q.options.forEach((opt, i) => {
    const card = document.createElement('div');
    card.className = 'answer-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.innerHTML = `
      <div class="answer-card__radio"></div>
      <div class="answer-card__content">
        <span class="answer-card__text">${opt.text}</span>
        ${opt.subtext ? `<span class="answer-card__subtext">${opt.subtext}</span>` : ''}
      </div>
    `;
    card.addEventListener('click', () => selectSingleAnswer(q, i));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectSingleAnswer(q, i);
      }
    });
    container.appendChild(card);
  });

  // Restore previous selection
  if (state.answers[q.id] !== undefined) {
    const cards = container.querySelectorAll('.answer-card');
    cards[state.answers[q.id]].classList.add('selected');

    // Show other input if "Other" was selected
    if (q.hasOther && q.options[state.answers[q.id]].isOther) {
      $('#other-input-container').hidden = false;
    }

    showTooltipAndNext(q);
  }
}

function selectSingleAnswer(q, index) {
  const cards = $$('.answer-card');
  cards.forEach((card, i) => card.classList.toggle('selected', i === index));

  state.answers[q.id] = index;

  // Handle "Other" option
  if (q.hasOther && q.options[index].isOther) {
    $('#other-input-container').hidden = false;
    $('#other-input').focus();
  } else {
    $('#other-input-container').hidden = true;
  }

  showTooltipAndNext(q);
}

// ===== MULTI SELECT =====
function renderMultiSelect(q, container) {
  q.options.forEach((opt, i) => {
    const card = document.createElement('div');
    card.className = 'answer-card answer-card--multi';
    card.setAttribute('role', 'checkbox');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-checked', 'false');
    card.innerHTML = `
      <div class="answer-card__radio"></div>
      <div class="answer-card__content">
        <span class="answer-card__text">${opt.text}</span>
      </div>
    `;
    card.addEventListener('click', () => toggleMultiAnswer(q, i));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleMultiAnswer(q, i);
      }
    });
    container.appendChild(card);
  });

  // Restore previous selections
  if (state.answers[q.id]) {
    const cards = container.querySelectorAll('.answer-card');
    state.answers[q.id].forEach(idx => {
      cards[idx].classList.add('selected');
      cards[idx].setAttribute('aria-checked', 'true');
    });
    showTooltipAndNext(q);
  }
}

function toggleMultiAnswer(q, index) {
  const cards = $$('.answer-card');
  const card = cards[index];

  if (!state.answers[q.id]) state.answers[q.id] = [];

  const selections = state.answers[q.id];
  const alreadySelected = selections.includes(index);

  if (alreadySelected) {
    // Deselect
    state.answers[q.id] = selections.filter(i => i !== index);
    card.classList.remove('selected');
    card.setAttribute('aria-checked', 'false');
  } else {
    // Select (if under max)
    if (selections.length < (q.maxSelections || 99)) {
      selections.push(index);
      card.classList.add('selected');
      card.setAttribute('aria-checked', 'true');
    }
  }

  // Show next if at least one selected
  if (state.answers[q.id].length > 0) {
    showTooltipAndNext(q);
  } else {
    $('#btn-next').hidden = true;
    $('#question-tooltip').hidden = true;
  }
}

// ===== TWO-PART QUESTION =====
function renderTwoPart(q, container) {
  container.innerHTML = `
    <div class="question__two-part">
      ${q.parts.map((part, partIdx) => `
        <div class="question__part">
          <p class="question__part-label">${part.label}</p>
          <div class="question__answers" id="part-${partIdx}">
            ${part.options.map((opt, optIdx) => `
              <div class="answer-card" data-part="${partIdx}" data-option="${optIdx}" role="button" tabindex="0">
                <div class="answer-card__radio"></div>
                <div class="answer-card__content">
                  <span class="answer-card__text">${opt.text}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;

  // Add event listeners
  container.querySelectorAll('.answer-card').forEach(card => {
    card.addEventListener('click', () => {
      const partIdx = parseInt(card.dataset.part);
      const optIdx = parseInt(card.dataset.option);
      selectTwoPartAnswer(q, partIdx, optIdx);
    });
  });

  // Restore previous selections
  if (state.answers[q.id]) {
    Object.entries(state.answers[q.id]).forEach(([partIdx, optIdx]) => {
      const card = container.querySelector(`[data-part="${partIdx}"][data-option="${optIdx}"]`);
      if (card) card.classList.add('selected');
    });

    // Check if both parts answered
    if (Object.keys(state.answers[q.id]).length === q.parts.length) {
      showTooltipAndNext(q);
    }
  }
}

function selectTwoPartAnswer(q, partIdx, optIdx) {
  // Deselect other options in same part
  const partContainer = $(`#part-${partIdx}`);
  partContainer.querySelectorAll('.answer-card').forEach(card => {
    card.classList.remove('selected');
  });

  // Select this option
  const card = partContainer.querySelector(`[data-option="${optIdx}"]`);
  card.classList.add('selected');

  // Store answer
  if (!state.answers[q.id]) state.answers[q.id] = {};
  state.answers[q.id][partIdx] = optIdx;

  // Show next if both parts answered
  if (Object.keys(state.answers[q.id]).length === q.parts.length) {
    showTooltipAndNext(q);
  }
}

// ===== OPEN TEXT =====
function renderOpenText(q, container) {
  container.innerHTML = `
    <textarea
      class="question__textarea"
      id="open-text-input"
      placeholder="${q.placeholder || 'Type your response...'}"
    >${state.answers[q.id] || ''}</textarea>
  `;

  const textarea = $('#open-text-input');
  textarea.addEventListener('input', () => {
    state.answers[q.id] = textarea.value;
  });

  // For optional questions, show Next immediately
  if (q.optional) {
    $('#btn-next').hidden = false;
  } else {
    // Show Next when text is entered
    if (state.answers[q.id]) {
      $('#btn-next').hidden = false;
    }
    textarea.addEventListener('input', () => {
      $('#btn-next').hidden = !textarea.value.trim();
    });
  }
}

// ===== SHOW TOOLTIP AND NEXT =====
function showTooltipAndNext(q) {
  const tooltip = $('#question-tooltip');
  const nextBtn = $('#btn-next');

  if (q.tooltip) {
    $('#tooltip-body').textContent = q.tooltip;
    tooltip.hidden = false;
  }

  nextBtn.hidden = false;
}

// ===== NAVIGATION =====
function advanceQuestion() {
  // Save "Other" text if applicable
  const q = QUESTIONS[state.currentQuestion];
  if (q.hasOther && state.answers[q.id] !== undefined) {
    const selectedOpt = q.options[state.answers[q.id]];
    if (selectedOpt.isOther) {
      state.otherText[q.id] = $('#other-input').value;
    }
  }

  const next = state.currentQuestion + 1;
  if (next < QUESTIONS.length) {
    renderQuestion(next);
  } else {
    // Update progress bar to 100%
    $('#progress-fill').style.width = '100%';
    setTimeout(() => showScreen('screen-gate'), 300);
  }
}

function goBack() {
  if (state.currentQuestion > 0) {
    renderQuestion(state.currentQuestion - 1);
  } else {
    showScreen('screen-landing');
  }
}

// ===== FORM SUBMISSION =====
function submitForm(e) {
  e.preventDefault();

  const name = $('#field-name').value.trim();
  const email = $('#field-email').value.trim();
  const company = $('#field-company').value.trim();

  let valid = true;

  // Validate full name (required)
  if (!name) {
    $('#field-name').classList.add('error');
    valid = false;
  } else {
    $('#field-name').classList.remove('error');
  }

  // Validate work email (required)
  if (!email || !email.includes('@')) {
    $('#field-email').classList.add('error');
    valid = false;
  } else {
    $('#field-email').classList.remove('error');
  }

  if (!valid) return;

  state.respondent = { name, email, company };

  // Compile submission data
  const submission = {
    timestamp: new Date().toISOString(),
    respondent: state.respondent,
    answers: compileAnswers()
  };

  console.log('Survey Submission:', submission);

  // If endpoint configured, send data
  if (CONFIG.submitEndpoint) {
    fetch(CONFIG.submitEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission)
    }).catch(err => console.error('Submit error:', err));
  }

  showScreen('screen-thanks');
}

function compileAnswers() {
  const compiled = [];

  QUESTIONS.forEach(q => {
    const answer = state.answers[q.id];
    if (answer === undefined) {
      compiled.push({ questionId: q.id, question: q.text, answer: null });
      return;
    }

    let answerText;
    if (q.type === 'single') {
      answerText = q.options[answer].text;
      if (q.options[answer].isOther && state.otherText[q.id]) {
        answerText = `Other: ${state.otherText[q.id]}`;
      }
    } else if (q.type === 'multi') {
      answerText = answer.map(i => q.options[i].text);
    } else if (q.type === 'twopart') {
      answerText = {};
      q.parts.forEach((part, idx) => {
        if (answer[idx] !== undefined) {
          answerText[part.label] = part.options[answer[idx]].text;
        }
      });
    } else if (q.type === 'open') {
      answerText = answer;
    }

    compiled.push({
      questionId: q.id,
      section: q.section,
      question: q.text,
      answer: answerText
    });
  });

  return compiled;
}

// ===== EVENT LISTENERS =====
document.addEventListener('DOMContentLoaded', () => {
  // Start button
  $('#btn-start').addEventListener('click', () => renderQuestion(0));

  // Next button
  $('#btn-next').addEventListener('click', advanceQuestion);

  // Back buttons
  $('#btn-back-question').addEventListener('click', goBack);
  $('#btn-back-gate').addEventListener('click', () => renderQuestion(QUESTIONS.length - 1));

  // Play header toggle (expand/collapse)
  $('#play-header-toggle').addEventListener('click', () => {
    const playHeader = $('#play-header');
    playHeader.classList.toggle('collapsed');
  });

  // Form submit
  $('#gate-form').addEventListener('submit', submitForm);
});
