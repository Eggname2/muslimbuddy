const homeBtn = document.getElementById('homeBtn');
const solatBtn = document.getElementById('solatBtn');
const quranBtn = document.getElementById('quranBtn');
const homeSection = document.getElementById('homeSection');
const solatSection = document.getElementById('solatSection');
const quranSection = document.getElementById('quranSection');
const solatDate = document.getElementById('solatDate');
const prevDate = document.getElementById('prevDate');
const nextDate = document.getElementById('nextDate');
const todayDate = document.getElementById('todayDate');
const selectedDate = document.getElementById('selectedDate');
const currentTime = document.getElementById('currentTime');
const prayerTimesList = document.getElementById('prayerTimesList');
const startRecitation = document.getElementById('startRecitation');
const stopRecitation = document.getElementById('stopRecitation');
const recitationScore = document.getElementById('recitationScore');
const recitationStatus = document.getElementById('recitationStatus');
const recitationTranscript = document.getElementById('recitationTranscript');
const recitationFeedback = document.getElementById('recitationFeedback');
const navButtons = [homeBtn, solatBtn, quranBtn];

let activeDate = new Date();
let timerId = null;
let recognition = null;
let collectedTranscript = '';
let recognitionHadError = false;
let recognitionStopRequested = false;
let listeningTimeoutId = null;

const fatihahExpectedText = [
  'Ø¨Ø³Ù… Ø§Ù„Ù„Ù‡ Ø§Ù„Ø±Ø­Ù…Ù† Ø§Ù„Ø±Ø­ÙŠÙ…',
  'Ø§Ù„Ø­Ù…Ø¯ Ù„Ù„Ù‡ Ø±Ø¨ Ø§Ù„Ø¹Ø§Ù„Ù…ÙŠÙ†',
  'Ø§Ù„Ø±Ø­Ù…Ù† Ø§Ù„Ø±Ø­ÙŠÙ…',
  'Ù…Ø§Ù„Ùƒ ÙŠÙˆÙ… Ø§Ù„Ø¯ÙŠÙ†',
  'Ø¥ÙŠØ§Ùƒ Ù†Ø¹Ø¨Ø¯ ÙˆØ¥ÙŠØ§Ùƒ Ù†Ø³ØªØ¹ÙŠÙ†',
  'Ø§Ù‡Ø¯Ù†Ø§ Ø§Ù„ØµØ±Ø§Ø· Ø§Ù„Ù…Ø³ØªÙ‚ÙŠÙ…',
  'ØµØ±Ø§Ø· Ø§Ù„Ø°ÙŠÙ† Ø£Ù†Ø¹Ù…Øª Ø¹Ù„ÙŠÙ‡Ù… ØºÙŠØ± Ø§Ù„Ù…ØºØ¶ÙˆØ¨ Ø¹Ù„ÙŠÙ‡Ù… ÙˆÙ„Ø§ Ø§Ù„Ø¶Ø§Ù„ÙŠÙ†',
].join(' ');

function showSection(sectionName) {
  homeSection.classList.add('hidden');
  solatSection.classList.add('hidden');
  quranSection.classList.add('hidden');

  homeBtn.classList.remove('active');
  solatBtn.classList.remove('active');
  quranBtn.classList.remove('active');

  if (sectionName === 'home') {
    homeSection.classList.remove('hidden');
    homeBtn.classList.add('active');
  } else if (sectionName === 'solat') {
    solatSection.classList.remove('hidden');
    solatBtn.classList.add('active');
  } else if (sectionName === 'quran') {
    quranSection.classList.remove('hidden');
    quranBtn.classList.add('active');
  }
}

function formatDate(date) {
  return date.toLocaleDateString(undefined, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatTime(date) {
  return date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

function setSelectedDateInput(date) {
  const isoValue = date.toISOString().slice(0, 10);
  solatDate.value = isoValue;
}

function updateSelectedDate(date) {
  activeDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  setSelectedDateInput(activeDate);
  selectedDate.textContent = formatDate(activeDate);
  fetchPrayerTimes(activeDate);
}

function updateClock() {
  currentTime.textContent = formatTime(new Date());
}

function createTimeRow(name, time) {
  const row = document.createElement('div');
  row.className = 'time-item';
  row.innerHTML = `<span><strong>${name}</strong></span><span>${time}</span>`;
  return row;
}

function renderPrayerTimes(times) {
  prayerTimesList.innerHTML = '';
  const prayerOrder = ['Fajr', 'Dhuhr', 'Asr', 'Maghrib', 'Isha'];
  prayerOrder.forEach((name) => {
    if (times[name]) {
      prayerTimesList.appendChild(createTimeRow(name, times[name]));
    }
  });
}

function fallbackPrayerTimes(date) {
  const sample = {
    Fajr: '05:15',
    Dhuhr: '12:30',
    Asr: '15:45',
    Maghrib: '18:20',
    Isha: '19:40',
  };
  return sample;
}

async function fetchPrayerTimes(date) {
  const timestamp = Math.floor(date.getTime() / 1000);
  const latitude = 4.9031; // Bandar Seri Begawan, Brunei
  const longitude = 114.9398;
  const apiUrl = `https://api.aladhan.com/v1/timings/${timestamp}?latitude=${latitude}&longitude=${longitude}&method=2`;

  prayerTimesList.innerHTML = '<p>Loading prayer times...</p>';

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    if (data && data.data && data.data.timings) {
      renderPrayerTimes(data.data.timings);
      return;
    }
  } catch (error) {
    console.warn('Prayer times fetch failed, using fallback schedule.', error);
  }

  const fallback = fallbackPrayerTimes(date);
  renderPrayerTimes(fallback);
}

function normalizeRecitationText(text) {
  return text
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .replace(/[Ø£Ø¥Ø¢]/g, 'Ø§')
    .replace(/Ù‰/g, 'ÙŠ')
    .replace(/Ø©/g, 'Ù‡')
    .replace(/[^\p{L}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function levenshteinDistance(source, target) {
  const rows = source.length + 1;
  const columns = target.length + 1;
  const distances = Array.from({ length: rows }, () => Array(columns).fill(0));

  for (let row = 0; row < rows; row += 1) {
    distances[row][0] = row;
  }

  for (let column = 0; column < columns; column += 1) {
    distances[0][column] = column;
  }

  for (let row = 1; row < rows; row += 1) {
    for (let column = 1; column < columns; column += 1) {
      const substitutionCost = source[row - 1] === target[column - 1] ? 0 : 1;
      distances[row][column] = Math.min(
        distances[row - 1][column] + 1,
        distances[row][column - 1] + 1,
        distances[row - 1][column - 1] + substitutionCost
      );
    }
  }

  return distances[source.length][target.length];
}

function findClosestExpectedWord(word, expectedWords) {
  return expectedWords.reduce(
    (closest, expectedWord) => {
      const distance = levenshteinDistance(word, expectedWord);
      return distance < closest.distance ? { word: expectedWord, distance } : closest;
    },
    { word: '', distance: Infinity }
  );
}

function setFeedback(items) {
  recitationFeedback.innerHTML = '';
  items.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    recitationFeedback.appendChild(li);
  });
}

function clearListeningTimeout() {
  if (listeningTimeoutId) {
    window.clearTimeout(listeningTimeoutId);
    listeningTimeoutId = null;
  }
}

function getRecognitionErrorMessage(errorName) {
  const messages = {
    'not-allowed': 'Microphone permission was blocked. Allow microphone access in the browser and try again.',
    'service-not-allowed': 'Speech recognition is blocked by the browser. Try Chrome or Edge and allow microphone access.',
    'audio-capture': 'No microphone was found. Check that your mic is connected and selected in browser settings.',
    'no-speech': 'No speech was detected. Press Start Reciting again and begin speaking right away.',
    network: 'Speech recognition needs the browser speech service. Check your internet connection and open the app from a hosted URL or web server rather than a local file.',
    aborted: 'Recording was stopped before speech was detected. Press Start Reciting and try again.',
    'language-not-supported': 'Arabic speech recognition is not supported by this browser. Try Chrome or Edge.',
  };

  return messages[errorName] || `Speech recognition stopped with "${errorName}". Please try again in Chrome or Edge with microphone permission enabled.`;
}
function checkRecitation(transcript) {
  const expected = normalizeRecitationText(fatihahExpectedText);
  const actual = normalizeRecitationText(transcript);

  if (!actual) {
    recitationScore.textContent = 'No recitation detected';
    recitationStatus.textContent = 'Please try again and allow microphone access if your browser asks.';
    setFeedback(['No clear words were captured. Move closer to the microphone and recite again.']);
    return;
  }

  const expectedWords = expected.split(' ');
  const actualWords = actual.split(' ');
  const distance = levenshteinDistance(actual, expected);
  const score = Math.max(0, Math.round((1 - distance / expected.length) * 100));
  const missingWords = expectedWords.filter((word) => !actualWords.includes(word));
  const closeMatches = actualWords
    .map((word) => ({ spoken: word, ...findClosestExpectedWord(word, expectedWords) }))
    .filter((match) => match.distance > 0 && match.distance <= 2 && match.spoken !== match.word)
    .slice(0, 4);

  recitationScore.textContent = `${score}% match`;

  if (score >= 85) {
    recitationStatus.textContent = 'Good match. Your recitation was close to the expected text.';
  } else if (score >= 65) {
    recitationStatus.textContent = 'Partial match. Review the highlighted feedback and try again slowly.';
  } else {
    recitationStatus.textContent = 'Needs practice. Recite each ayah clearly and try again.';
  }

  const feedback = [];
  if (missingWords.length === 0) {
    feedback.push('All expected transliterated words were detected.');
  } else {
    feedback.push(`Words not clearly detected: ${missingWords.slice(0, 8).join(', ')}${missingWords.length > 8 ? '...' : ''}.`);
  }

  closeMatches.forEach((match) => {
    feedback.push(`Heard "${match.spoken}". Closest expected word: "${match.word}".`);
  });

  if (actualWords.length < expectedWords.length * 0.6) {
    feedback.push('The transcript is much shorter than Al-Fatihah. Make sure you recite the full surah before stopping.');
  }

  setFeedback(feedback);
}

function setupRecitationChecker() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    startRecitation.disabled = true;
    stopRecitation.disabled = true;
    recitationScore.textContent = 'Browser not supported';
    recitationStatus.textContent = 'Try this feature in Chrome or Edge with microphone permission enabled.';
    setFeedback(['Speech recognition is not available in this browser.']);
    return;
  }

  recognition = new SpeechRecognition();
  recognition.lang = 'ar-SA';
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.maxAlternatives = 1;

  recognition.addEventListener('start', () => {
    collectedTranscript = '';
    recognitionHadError = false;
    recognitionStopRequested = false;
    recitationTranscript.textContent = 'Listening...';
    recitationScore.textContent = 'Listening';
    recitationStatus.textContent = 'Recite Surah Al-Fatihah clearly. The app will stop automatically after a short recording.';
    setFeedback(['Listening now. Start speaking right away so the browser does not time out.']);
    startRecitation.disabled = true;
    stopRecitation.disabled = false;

    clearListeningTimeout();
    listeningTimeoutId = window.setTimeout(() => {
      if (recognition && !recognitionStopRequested) {
        recognitionStopRequested = true;
        recognition.stop();
      }
    }, 12000);
  });

  recognition.addEventListener('result', (event) => {
    let interimTranscript = '';

    for (let index = event.resultIndex; index < event.results.length; index += 1) {
      const transcript = event.results[index][0].transcript;
      if (event.results[index].isFinal) {
        collectedTranscript += `${transcript} `;
      } else {
        interimTranscript += transcript;
      }
    }

    recitationTranscript.textContent = `${collectedTranscript}${interimTranscript}`.trim() || '-';
  });

  recognition.addEventListener('speechend', () => {
    if (recognition && !recognitionStopRequested) {
      recognitionStopRequested = true;
      recognition.stop();
    }
  });

  recognition.addEventListener('end', () => {
    clearListeningTimeout();
    startRecitation.disabled = false;
    stopRecitation.disabled = true;
    if (!recognitionHadError) {
      checkRecitation(recitationTranscript.textContent);
    }
  });

  recognition.addEventListener('error', (event) => {
    clearListeningTimeout();
    recognitionHadError = true;
    startRecitation.disabled = false;
    stopRecitation.disabled = true;
    recitationScore.textContent = 'Recording error';
    recitationStatus.textContent = getRecognitionErrorMessage(event.error);
    setFeedback([
      `Browser error: ${event.error}.`,
      'Tip: use Chrome or Edge, allow microphone access, and open the app from a hosted URL or web server rather than as a local file.',
    ]);
  });
}
homeBtn.addEventListener('click', () => showSection('home'));
solatBtn.addEventListener('click', () => showSection('solat'));
quranBtn.addEventListener('click', () => showSection('quran'));

solatDate.addEventListener('change', (event) => {
  const selected = new Date(event.target.value + 'T00:00:00');
  updateSelectedDate(selected);
});

prevDate.addEventListener('click', () => {
  const previous = new Date(activeDate);
  previous.setDate(previous.getDate() - 1);
  updateSelectedDate(previous);
});

nextDate.addEventListener('click', () => {
  const next = new Date(activeDate);
  next.setDate(next.getDate() + 1);
  updateSelectedDate(next);
});

todayDate.addEventListener('click', () => {
  updateSelectedDate(new Date());
});

startRecitation.addEventListener('click', () => {
  if (recognition) {
    try {
      recognition.start();
    } catch (error) {
      recitationStatus.textContent = 'Speech recognition is already starting. Please wait a moment.';
    }
  }
});

stopRecitation.addEventListener('click', () => {
  if (recognition) {
    recognitionStopRequested = true;
    recognition.stop();
  }
});

function startApp() {
  updateSelectedDate(new Date());
  updateClock();
  setupRecitationChecker();
  timerId = setInterval(updateClock, 1000);
  showSection('home');
}

startApp();




