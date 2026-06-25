const homeBtn = document.getElementById('homeBtn');
const solatBtn = document.getElementById('solatBtn');
const quranBtn = document.getElementById('quranBtn');
const quizBtn = document.getElementById('quizBtn');
const settingsBtn = document.getElementById('settingsBtn');
const homeSection = document.getElementById('homeSection');
const solatSection = document.getElementById('solatSection');
const quranSection = document.getElementById('quranSection');
const quizSection = document.getElementById('quizSection');
const settingsSection = document.getElementById('settingsSection');
const solatDate = document.getElementById('solatDate');
const prevDate = document.getElementById('prevDate');
const nextDate = document.getElementById('nextDate');
const todayDate = document.getElementById('todayDate');
const selectedDate = document.getElementById('selectedDate');
const currentTime = document.getElementById('currentTime');
const prayerTimesList = document.getElementById('prayerTimesList');
const solatStatusMessage = document.getElementById('solatStatusMessage');
const nextPrayerName = document.getElementById('nextPrayerName');
const nextPrayerTime = document.getElementById('nextPrayerTime');
const solatLocation = document.getElementById('solatLocation');
const solatSource = document.getElementById('solatSource');
const startRecitation = document.getElementById('startRecitation');
const stopRecitation = document.getElementById('stopRecitation');
const recitationScore = document.getElementById('recitationScore');
const recitationStatus = document.getElementById('recitationStatus');
const recitationTranscript = document.getElementById('recitationTranscript');
const recitationFeedback = document.getElementById('recitationFeedback');
const yesToggle = document.getElementById('yesToggle');
const yesToggle2 = document.getElementById('yesToggle2');
const popoutContainer = document.getElementById('popoutContainer');
const subjectSelect = document.getElementById('subjectSelect');
const languageSelect = document.getElementById('languageSelect');
const themeToggle = document.getElementById('themeToggle');
const timerSelect = document.getElementById('timerSelect');
const startQuizBtn = document.getElementById('startQuizBtn');
const retryWrongBtn = document.getElementById('retryWrongBtn');
const quizQuestionText = document.getElementById('quizQuestionText');
const quizOptions = document.getElementById('quizOptions');
const quizStatusText = document.getElementById('quizStatus');
const quizTimer = document.getElementById('quizTimer');
const quizScore = document.getElementById('quizScore');
const quizWrongList = document.getElementById('quizWrongList');
const quizProgress = document.getElementById('quizProgress');
const settingsLanguageLabel = document.getElementById('settingsLanguageLabel');
const settingsThemeLabel = document.getElementById('settingsThemeLabel');
const settingsTimerLabel = document.getElementById('settingsTimerLabel');
const yesLabel = document.getElementById('yesLabel');
const quizSubjectLabel = document.getElementById('quizSubjectLabel');
const appTitle = document.getElementById('appTitle');
const appSubtitle = document.getElementById('appSubtitle');
const solatHeading = document.getElementById('solatHeading');
const quranHeading = document.getElementById('quranHeading');
const quranDescription = document.getElementById('quranDescription');
const quizHeading = document.getElementById('quizHeading');
const prayerTimesHeading = document.getElementById('prayerTimesHeading');
const selectedDateLabel = document.getElementById('selectedDateLabel');
const localTimeLabel = document.getElementById('localTimeLabel');
const homeTitle = document.getElementById('homeTitle');
const homeLanguageLabel = document.getElementById('homeLanguageLabel');
const homeLanguageSelect = document.getElementById('homeLanguageSelect');
const homeParagraph1 = document.getElementById('homeParagraph1');
const homeParagraph2 = document.getElementById('homeParagraph2');
const feedbackLabel = document.getElementById('feedbackLabel');
const letterSelectLabel = document.getElementById('letterSelectLabel');
const letterModeBtn = document.getElementById('letterModeBtn');
const quranModeBtn = document.getElementById('quranModeBtn');
const letterSelect = document.getElementById('letterSelect');
const letterSection = document.getElementById('letterSection');
const letterInfo = document.getElementById('letterInfo');
const surahSection = document.getElementById('surahSection');
const surahSelect = document.getElementById('surahSelect');
const surahLineSelect = document.getElementById('surahLineSelect');
const readLineBtn = document.getElementById('readLineBtn');
const readWholeBtn = document.getElementById('readWholeBtn');
const surahInfo = document.getElementById('surahInfo');
const navButtons = [homeBtn, solatBtn, quranBtn, quizBtn, settingsBtn];

let activeDate = new Date();
let timerId = null;
let recognition = null;
let collectedTranscript = '';
let recognitionHadError = false;
let currentLanguage = 'en';
let currentTheme = 'light';
let quizAdvanceTimeout = null;
let quizTimerInterval = null;
let latestPrayerTimes = null;
let latestPrayerSource = 'Preparing schedule...';
let latestNextPrayerKey = null;
let prayerRequestId = 0;
let quizState = {
  subject: 'Prophet Muhammad',
  questions: [],
  currentIndex: 0,
  score: 0,
  wrongQuestions: [],
  remaining: 15,
  running: false,
  answered: false,
};

const prayerSchedule = [
  { key: 'Fajr', note: 'Dawn prayer' },
  { key: 'Dhuhr', note: 'Midday prayer' },
  { key: 'Asr', note: 'Afternoon prayer' },
  { key: 'Maghrib', note: 'Sunset prayer' },
  { key: 'Isha', note: 'Night prayer' },
];

const uiCopy = {
  en: {
    navHome: 'Home',
    navSolat: 'Solat Times',
    navQuran: 'Quran Checker',
    navQuiz: 'Quizzes',
    navSettings: 'Settings',
    settingsLanguage: 'Language',
    settingsTheme: 'Theme',
    settingsTimer: 'Timer',
    settingsSubject: 'Choose subject',
    startQuiz: 'Start Quiz',
    retryWrong: 'Retry Wrong',
    readyToStart: 'Ready to start',
    quizIntro: 'Select a subject and press Start Quiz.',
    selectSubjectPrompt: 'Choose a subject and click Start Quiz to begin.',
    timeRemaining: 'Timer',
    seconds: 'sec',
    questionProgress: 'answered',
    correctAnswer: 'Correct answer! Well done.',
    wrongAnswer: 'Wrong answer. The quiz will continue.',
    timeUpMessage: 'Time is up for this question.',
    quizComplete: 'Quiz complete. Review your wrong questions and try again.',
    noWrong: 'No wrong questions yet.',
    wrongHeader: 'Wrong questions',
    startRecitation: 'Start Reciting',
    stopRecitation: 'Stop',
    transcriptLabel: 'Your transcript',
    feedbackLabel: 'Feedback',
    letterSelectLabel: 'Select letter',
    readLineBtn: 'Read Line',
    readWholeBtn: 'Read Whole Surah',
    yesLabel: 'Yes',
    appTitle: 'Muslimbuddy',
    appSubtitle: 'Use the buttons below to check prayer times, quizzes, or Quran reading practice.',
    homeTitle: 'Welcome',
    homeLanguageLabel: 'Select your language',
    homeParagraph1: 'This simple app helps you view prayer times and select past or present dates for Solat schedules.',
    homeParagraph2: 'Click the <strong>Solat Times</strong> button to view the prayer schedule and current clock.',
    solatHeading: 'Solat Times',
    quranHeading: 'Quran Checker',
    quranDescription: 'Choose between Arabic letters reading and Quran reading in this prototype.',
    quranReaderTitle: 'Quran Reader',
    prayerTimesHeading: 'Prayer Times',
    selectedDateLabel: 'Selected date:',
    localTimeLabel: 'Local time:',
    solatNote: 'This app uses local time and can fetch daily prayer times from a public service. If internet is unavailable, a simple fallback schedule is shown.',
    arabicLettersTab: 'Arabic Letters',
    quranReadingTab: 'Quran Reading',
    selectSurahLabel: 'Select Surah',
    selectLineLabel: 'Select line',
    quizHeading: 'Quizzes',
    settingsHeading: 'Settings',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    restartQuiz: 'Restart Quiz',
  },
  ms: {
    navHome: 'Utama',
    navSolat: 'Waktu Solat',
    navQuran: 'Semak Quran',
    navQuiz: 'Kuiz',
    navSettings: 'Tetapan',
    settingsLanguage: 'Bahasa',
    settingsTheme: 'Tema',
    settingsTimer: 'Pemasa',
    settingsSubject: 'Pilih subjek',
    startQuiz: 'Mula Kuiz',
    retryWrong: 'Ulang Salah',
    readyToStart: 'Sedia untuk bermula',
    quizIntro: 'Pilih subjek dan tekan Mula Kuiz.',
    selectSubjectPrompt: 'Pilih subjek dan tekan Mula Kuiz untuk bermula.',
    timeRemaining: 'Masa tinggal',
    seconds: 'saat',
    questionProgress: 'dijawab',
    correctAnswer: 'Jawapan betul! Bagus.',
    wrongAnswer: 'Jawapan salah. Kuiz akan diteruskan.',
    timeUpMessage: 'Masa tamat untuk soalan ini.',
    quizComplete: 'Kuiz selesai. Semak soalan salah dan cuba lagi.',
    noWrong: 'Tiada soalan salah lagi.',
    wrongHeader: 'Soalan salah',
    startRecitation: 'Mula Membaca',
    stopRecitation: 'Berhenti',
    transcriptLabel: 'Transkrip anda',
    feedbackLabel: 'Maklum balas',
    letterSelectLabel: 'Pilih huruf',
    readLineBtn: 'Baca Baris',
    readWholeBtn: 'Baca Surah Penuh',
    yesLabel: 'Ya',
    appTitle: 'Muslimbuddy',
    appSubtitle: 'Gunakan butang di bawah untuk semak waktu solat, kuiz atau latihan bacaan Quran.',
    homeTitle: 'Selamat datang',
    homeLanguageLabel: 'Pilih bahasa anda',
    homeParagraph1: 'Aplikasi ringkas ini membantu anda melihat waktu solat dan memilih tarikh lalu atau sekarang untuk jadual Solat.',
    homeParagraph2: 'Klik butang <strong>Waktu Solat</strong> untuk melihat jadual solat dan jam semasa.',
    solatHeading: 'Waktu Solat',
    quranHeading: 'Semak Quran',
    quranDescription: 'Pilih antara bacaan huruf Arab dan bacaan Quran dalam prototaip ini.',
    quranReaderTitle: 'Pembaca Quran',
    prayerTimesHeading: 'Waktu Solat',
    selectedDateLabel: 'Tarikh terpilih:',
    localTimeLabel: 'Masa tempatan:',
    solatNote: 'Aplikasi ini menggunakan masa tempatan dan boleh mendapatkan waktu solat harian daripada perkhidmatan awam. Jika internet tidak tersedia, jadual ringkas digunakan.',
    arabicLettersTab: 'Huruf Arab',
    quranReadingTab: 'Bacaan Quran',
    selectSurahLabel: 'Pilih Surah',
    selectLineLabel: 'Pilih baris',
    quizHeading: 'Kuiz',
    settingsHeading: 'Tetapan',
    darkMode: 'Mod Gelap',
    lightMode: 'Mod Terang',
    restartQuiz: 'Mula Semula Kuiz',
  },
};

const subjectOptions = [
  { key: 'Prophet Muhammad', en: 'Prophet Muhammad', ms: 'Nabi Muhammad' },
  { key: 'Prophet Ibrahim', en: 'Prophet Ibrahim', ms: 'Nabi Ibrahim' },
  { key: 'Prophet Musa', en: 'Prophet Musa', ms: 'Nabi Musa' },
  { key: 'Abu Bakr', en: 'Abu Bakr', ms: 'Abu Bakr' },
  { key: 'Umar ibn al-Khattab', en: 'Umar ibn al-Khattab', ms: 'Umar ibn al-Khattab' },
  { key: 'Uthman ibn Affan', en: 'Uthman ibn Affan', ms: 'Uthman ibn Affan' },
];

const quizData = {
  'Prophet Muhammad': [
    {
      answerIndex: 1,
      translations: {
        en: {
          question: "Who are Prophet Muhammad's parents?",
          options: [
            'Abdullah and Siti Hajar',
            'Abdullah and Siti Aminah',
            'Tung tung tung sahur',
            'Ibrahim and Aminah',
          ],
        },
        ms: {
          question: 'Siapakah ibu bapa Nabi Muhammad?',
          options: [
            'Abdullah dan Siti Hajar',
            'Abdullah dan Siti Aminah',
            'Tung tung tung sahur',
            'Ibrahim dan Aminah',
          ],
        },
      },
    },
    {
      answerIndex: 0,
      translations: {
        en: {
          question: 'Where was Prophet Muhammad born?',
          options: ['Makkah', 'Madinah', 'Jerusalem', 'Cairo'],
        },
        ms: {
          question: 'Di manakah Nabi Muhammad dilahirkan?',
          options: ['Makkah', 'Madinah', 'Baitulmaqdis', 'Kaherah'],
        },
      },
    },
  ],
  'Prophet Ibrahim': [
    {
      answerIndex: 1,
      translations: {
        en: {
          question: 'Who was the son of Prophet Ibrahim?',
          options: ['Ishaq', 'Ismail', 'Yusuf', 'Musa'],
        },
        ms: {
          question: 'Siapakah anak Nabi Ibrahim?',
          options: ['Ishak', 'Ismail', 'Yusuf', 'Musa'],
        },
      },
    },
    {
      answerIndex: 1,
      translations: {
        en: {
          question: 'What animal did Allah ask Ibrahim to sacrifice?',
          options: ['Cow', 'Ram', 'Camel', 'Goat'],
        },
        ms: {
          question: 'Haiwan apakah yang diminta Allah untuk dikorbankan oleh Ibrahim?',
          options: ['Lembu', 'Biri-biri', 'Unta', 'Domba'],
        },
      },
    },
  ],
  'Prophet Musa': [
    {
      answerIndex: 0,
      translations: {
        en: {
          question: 'What did Prophet Musa use to part the Red Sea?',
          options: ['His staff', 'A sword', 'A shield', 'A book'],
        },
        ms: {
          question: 'Apa yang digunakan Nabi Musa untuk membelah Laut Merah?',
          options: ['Tongkatnya', 'Pedang', 'Perisai', 'Buku'],
        },
      },
    },
    {
      answerIndex: 3,
      translations: {
        en: {
          question: 'Who spoke to Pharaoh on behalf of Musa?',
          options: ['Harun', 'Yunus', 'Isa', 'Harun bin Nuh'],
        },
        ms: {
          question: 'Siapakah yang bercakap dengan Firaun bagi pihak Musa?',
          options: ['Harun', 'Yunus', 'Isa', 'Harun bin Nuh'],
        },
      },
    },
  ],
  'Abu Bakr': [
    {
      answerIndex: 0,
      translations: {
        en: {
          question: 'Who became the first caliph after the Prophet?',
          options: ['Abu Bakr', 'Umar', 'Uthman', 'Ali'],
        },
        ms: {
          question: 'Siapakah khalifah pertama selepas Nabi?',
          options: ['Abu Bakr', 'Umar', 'Uthman', 'Ali'],
        },
      },
    },
    {
      answerIndex: 2,
      translations: {
        en: {
          question: 'Which companion was known for his sincere support of the Prophet?',
          options: ['Abu Ubaydah', 'Talhah', 'Abu Bakr', 'Saad'],
        },
        ms: {
          question: 'Sahabat manakah yang terkenal kerana sokongan ikhlas kepada Nabi?',
          options: ['Abu Ubaidah', 'Talhah', 'Abu Bakr', 'Saad'],
        },
      },
    },
  ],
  'Umar ibn al-Khattab': [
    {
      answerIndex: 1,
      translations: {
        en: {
          question: 'Which caliph was known for strong justice and public welfare?',
          options: ['Abu Bakr', 'Umar ibn al-Khattab', 'Uthman ibn Affan', 'Ali'],
        },
        ms: {
          question: 'Khalifah manakah yang terkenal dengan keadilan dan kebajikan awam?',
          options: ['Abu Bakr', 'Umar ibn al-Khattab', 'Uthman ibn Affan', 'Ali'],
        },
      },
    },
    {
      answerIndex: 3,
      translations: {
        en: {
          question: 'Which city expanded significantly under Umar?',
          options: ['Cairo', 'Baghdad', 'Damascus', 'Kufah'],
        },
        ms: {
          question: 'Bandar manakah yang berkembang pesat di bawah Umar?',
          options: ['Kaherah', 'Baghdad', 'Damsyik', 'Kuffah'],
        },
      },
    },
  ],
  'Uthman ibn Affan': [
    {
      answerIndex: 1,
      translations: {
        en: {
          question: 'Which caliph compiled the Quran into a single book?',
          options: ['Abu Bakr', 'Uthman ibn Affan', 'Umar', 'Ali'],
        },
        ms: {
          question: 'Khalifah manakah yang mengumpulkan Quran menjadi satu mushaf?',
          options: ['Abu Bakr', 'Uthman ibn Affan', 'Umar', 'Ali'],
        },
      },
    },
    {
      answerIndex: 0,
      translations: {
        en: {
          question: 'Which companion was known for gentle generosity under Uthman?',
          options: ['Uthman ibn Affan', 'Ammar', 'Bilal', 'Talhah'],
        },
        ms: {
          question: 'Sahabat manakah yang terkenal dengan kemurahan hati di bawah Uthman?',
          options: ['Uthman ibn Affan', 'Ammar', 'Bilal', 'Talhah'],
        },
      },
    },
  ],
};

function t(key) {
  return uiCopy[currentLanguage][key] || uiCopy.en[key] || key;
}

const alphabetData = {
  alif: { name: 'Alif', transliteration: 'A', sample: 'ا', description_en: "A for apple", description_ms: "A untuk 'abang'" },
  ba: { name: 'Ba', transliteration: 'B', sample: 'ب', description_en: "B for baby", description_ms: "B untuk 'bapa'" },
  ta: { name: 'Ta', transliteration: 'T', sample: 'ت', description_en: "T for tea", description_ms: "T untuk 'tangan'" },
  tha: { name: 'Tha', transliteration: 'TH', sample: 'ث', description_en: "TH as in 'think'", description_ms: "Bunyi seperti 'th' (tiada padanan tepat)" },
  jim: { name: 'Jim', transliteration: 'J', sample: 'ج', description_en: "J for jam", description_ms: "J untuk 'jalan'" },
  ha: { name: 'Ha', transliteration: 'H', sample: 'ح', description_en: "H (deeper)", description_ms: "H lebih dalam dari tekak" },
  kha: { name: 'Kha', transliteration: 'KH', sample: 'خ', description_en: "KH guttural", description_ms: "Bunyi 'kh' dari tekak" },
  dal: { name: 'Dal', transliteration: 'D', sample: 'د', description_en: "D for dog", description_ms: "D untuk 'dapur'" },
  dhal: { name: 'Dhal', transliteration: 'DH', sample: 'ذ', description_en: "DH as in 'this'", description_ms: "Bunyi seperti 'dh' dalam 'this'" },
  ra: { name: 'Ra', transliteration: 'R', sample: 'ر', description_en: "Rolled R", description_ms: "R dilontarkan (bergulung)" },
  zay: { name: 'Zay', transliteration: 'Z', sample: 'ز', description_en: "Z for zebra", description_ms: "Z untuk 'zaman'" },
  sin: { name: 'Sin', transliteration: 'S', sample: 'س', description_en: "S for sun", description_ms: "S untuk 'satu'" },
  shin: { name: 'Shin', transliteration: 'SH', sample: 'ش', description_en: "SH for ship", description_ms: "SH atau 'sy'" },
  sad: { name: 'Sad', transliteration: 'S', sample: 'ص', description_en: "Strong S", description_ms: "S yang kuat" },
  dad: { name: 'Dad', transliteration: 'D', sample: 'ض', description_en: "Unique Arabic D", description_ms: "D yang khas" },
  ta2: { name: 'Ta', transliteration: 'T', sample: 'ط', description_en: "Heavy T", description_ms: "T yang berat" },
  za2: { name: 'Za', transliteration: 'Z', sample: 'ظ', description_en: "Heavy Z", description_ms: "Z yang berat" },
  ain: { name: 'Ain', transliteration: '’', sample: 'ع', description_en: "Ain (throat)", description_ms: "Bunyi dari kerongkong (ain)" },
  ghain: { name: 'Ghain', transliteration: 'GH', sample: 'غ', description_en: "GH guttural", description_ms: "Ghain dari tekak" },
  fa: { name: 'Fa', transliteration: 'F', sample: 'ف', description_en: "F for fun", description_ms: "F untuk 'fikir'" },
  qaf: { name: 'Qaf', transliteration: 'Q', sample: 'ق', description_en: "Deep Q", description_ms: "Q dari pangkal tekak" },
  kaf: { name: 'Kaf', transliteration: 'K', sample: 'ك', description_en: "K for kite", description_ms: "K untuk 'kaki'" },
  lam: { name: 'Lam', transliteration: 'L', sample: 'ل', description_en: "L for lamp", description_ms: "L untuk 'lama'" },
  mim: { name: 'Mim', transliteration: 'M', sample: 'م', description_en: "M for moon", description_ms: "M untuk 'mama'" },
  nun: { name: 'Nun', transliteration: 'N', sample: 'ن', description_en: "N for noon", description_ms: "N untuk 'nasi'" },
  ha2: { name: 'Ha', transliteration: 'H', sample: 'ه', description_en: "Soft H", description_ms: "H lembut" },
  waw: { name: 'Waw', transliteration: 'W', sample: 'و', description_en: "W for water", description_ms: "W untuk 'waktu'" },
  ya: { name: 'Ya', transliteration: 'Y', sample: 'ي', description_en: "Y for yes", description_ms: "Y untuk 'yang'" },
};

const surahData = {
  'al-fatihah': {
    name: 'Surah Al-Fatihah (Surah 1) - The Opening',
    lines: [
      { arab: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', transliteration: 'Bismillahir rahmanir rahim' },
      { arab: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', transliteration: 'Alhamdu lillahi rabbil alameen' },
      { arab: 'الرَّحْمَٰنِ الرَّحِيمِ', transliteration: 'Ar rahmanir rahim' },
      { arab: 'مَالِكِ يَوْمِ الدِّينِ', transliteration: 'Maliki yawmid deen' },
      { arab: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', transliteration: 'Iyyaka nabudu wa iyyaka nastaeen' },
      { arab: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', transliteration: 'Ihdinas siratal mustaqim' },
      { arab: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', transliteration: 'Siratal ladhina anamta alaihim ghayril maghdubi alaihim wa lad daalleen' },
    ],
  },
  'al-baqarah': {
    name: 'Surah Al-Baqarah (Surah 2)',
    lines: [
      { arab: 'الم', transliteration: 'Alif, Lam, Meem' },
      { arab: 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ', transliteration: 'Dhalika alkitabu la rayba fihi' },
      { arab: 'هُدًى لِلْمُتَّقِينَ', transliteration: 'Hudan lil muttaqeen' },
    ],
  },
  'al-aala': {
    name: "Surah Al-A'la (Surah 3)",
    lines: [
      { arab: 'سَبِّحِ اسْمَ رَبِّكَ الْأَعْلَى', transliteration: "Sabbih isma rabbika al-a'la" },
      { arab: 'الَّذِي خَلَقَ فَسَوَّى', transliteration: 'Alladhi khalaqa fa sawwa' },
      { arab: 'وَالَّذِي قَدَّرَ فَهَدَى', transliteration: 'Wa alladhi qaddara fahada' },
    ],
  },
};

function repairArabicContent() {
  const fixedLetters = {
    alif: 'ا',
    ba: 'ب',
    ta: 'ت',
    tha: 'ث',
    jim: 'ج',
    ha: 'ح',
    kha: 'خ',
    dal: 'د',
    dhal: 'ذ',
    ra: 'ر',
    zay: 'ز',
    sin: 'س',
    shin: 'ش',
    sad: 'ص',
    dad: 'ض',
    ta2: 'ط',
    za2: 'ظ',
    ain: 'ع',
    ghain: 'غ',
    fa: 'ف',
    qaf: 'ق',
    kaf: 'ك',
    lam: 'ل',
    mim: 'م',
    nun: 'ن',
    ha2: 'ه',
    waw: 'و',
    ya: 'ي',
  };

  Object.entries(fixedLetters).forEach(([key, sample]) => {
    if (alphabetData[key]) {
      alphabetData[key].sample = sample;
    }
  });

  surahData['al-fatihah'].lines = [
    { arab: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', transliteration: 'Bismillahir rahmanir rahim' },
    { arab: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', transliteration: 'Alhamdu lillahi rabbil alameen' },
    { arab: 'الرَّحْمَٰنِ الرَّحِيمِ', transliteration: 'Ar rahmanir rahim' },
    { arab: 'مَالِكِ يَوْمِ الدِّينِ', transliteration: 'Maliki yawmid deen' },
    { arab: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', transliteration: 'Iyyaka nabudu wa iyyaka nastaeen' },
    { arab: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', transliteration: 'Ihdinas siratal mustaqim' },
    { arab: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', transliteration: 'Siratal ladhina anamta alaihim ghayril maghdubi alaihim wa lad daalleen' },
  ];

  surahData['al-baqarah'].lines = [
    { arab: 'الم', transliteration: 'Alif, Lam, Meem' },
    { arab: 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ', transliteration: 'Dhalika alkitabu la rayba fihi' },
    { arab: 'هُدًى لِلْمُتَّقِينَ', transliteration: 'Hudan lil muttaqeen' },
  ];

  surahData['al-aala'].lines = [
    { arab: 'سَبِّحِ اسْمَ رَبِّكَ الْأَعْلَى', transliteration: "Sabbih isma rabbika al-a'la" },
    { arab: 'الَّذِي خَلَقَ فَسَوَّى', transliteration: 'Alladhi khalaqa fa sawwa' },
    { arab: 'وَالَّذِي قَدَّرَ فَهَدَى', transliteration: 'Wa alladhi qaddara fahada' },
  ];
}

let popoutInterval = null;
let asciiInterval = null;
let asciiArtInterval = null;

function updateLetterInfo() {
  const letter = letterSelect.value;
  const data = alphabetData[letter];
  const desc = currentLanguage === 'ms' ? data.description_ms || data.description_en : data.description_en || data.description_ms;
  letterInfo.innerHTML = `
        <strong>${data.name} - ${data.transliteration}</strong>
        <span class="arabic-sample" lang="ar" dir="rtl">${data.sample}</span>
        <p>${desc}</p>
      `;
}

function updateSurahLines() {
  const selected = surahSelect.value;
  const lines = surahData[selected].lines;
  surahLineSelect.innerHTML = lines
    .map((line, index) => `<option value="${index}">${index + 1}. ${line.transliteration}</option>`)
    .join('');
  showSurahLine('line');
}

function showSurahLine(mode) {
  const selected = surahSelect.value;
  const surah = surahData[selected];
  if (!surah) {
    surahInfo.textContent = 'Select a surah to see its text.';
    return;
  }

  if (mode === 'whole') {
    const text = surah.lines.map((line, index) => `${index + 1}. ${line.arab}`).join('\n');
    surahInfo.innerHTML = `
          <strong>${surah.name}</strong>
          <pre>${text}</pre>
          <p>Read the full surah slowly and clearly. The AI feedback is based on the chosen lines.</p>
        `;
    return;
  }

  const index = Number(surahLineSelect.value);
  const line = surah.lines[index];
  if (!line) {
    surahInfo.textContent = 'Choose a valid line.';
    return;
  }

  surahInfo.innerHTML = `
        <strong>${surah.name} - Line ${index + 1}</strong>
        <p>${line.arab}</p>
        <small>${line.transliteration}</small>
        <p>Try to read this line clearly. The AI encourages correct pronunciation and pacing.</p>
      `;
}

function switchReadingMode(mode) {
  letterModeBtn.classList.toggle('active', mode === 'letters');
  quranModeBtn.classList.toggle('active', mode === 'quran');
  letterSection.classList.toggle('hidden', mode === 'quran');
  surahSection.classList.toggle('hidden', mode === 'letters');
}

function togglePopouts(enabled) {
  if (!enabled) {
    clearPopouts();
    stopAsciiSpawns();
    return;
  }

  clearPopouts();
  popoutInterval = window.setInterval(() => {
    const types = ['amongus', 'tung'];
    createPopout(types[Math.floor(Math.random() * types.length)]);
  }, 260);
  startAsciiSpawns();
}

function createPopout(type) {
  const item = document.createElement('div');
  item.className = `popout-item ${type}`;

  const image = document.createElement('img');
  image.src = type === 'amongus' ? 'assets/popout-amongus-red.png' : 'assets/popout-tung-sahur.png';
  image.alt = '';
  image.draggable = false;
  item.appendChild(image);

  const size = type === 'amongus' ? 72 + Math.random() * 42 : 82 + Math.random() * 54;
  item.style.width = `${size}px`;
  item.style.height = `${size}px`;
  item.style.top = `${20 + Math.random() * 50}%`;
  item.style.left = `${20 + Math.random() * 60}%`;
  item.style.opacity = '1';
  item.style.transform = `translateY(12px) scale(${0.82 + Math.random() * 0.25}) rotate(${Math.random() * 24 - 12}deg)`;
  popoutContainer.appendChild(item);

  window.setTimeout(() => {
    item.style.transform = `translateY(-70px) scale(${1.04 + Math.random() * 0.18}) rotate(${Math.random() * 34 - 17}deg)`;
    item.style.opacity = '0';
  }, 10);
  window.setTimeout(() => {
    item.remove();
  }, 1900);
}

function clearPopouts() {
  window.clearInterval(popoutInterval);
  popoutInterval = null;
  popoutContainer.innerHTML = '';
}

function spawnAsciiPopout(content, color = '#FFD700', fontSize = 20, lifetime = 1200) {
  const item = document.createElement('pre');
  item.className = 'ascii-popout';
  item.textContent = content;
  item.style.position = 'absolute';
  item.style.whiteSpace = 'pre';
  item.style.fontFamily = 'Menlo, Monaco, Consolas, monospace';
  item.style.fontSize = `${fontSize}px`;
  item.style.color = color;
  item.style.left = `${18 + Math.random() * 64}%`;
  item.style.top = `${20 + Math.random() * 56}%`;
  item.style.padding = '6px 8px';
  item.style.pointerEvents = 'none';
  item.style.background = 'transparent';
  item.style.textAlign = 'center';
  item.style.opacity = '1';
  item.style.transition = 'transform 1.2s ease, opacity 1.2s ease';
  popoutContainer.appendChild(item);

  setTimeout(() => {
    item.style.transform = `translateY(-60px) scale(${0.9 + Math.random() * 0.3}) rotate(${Math.random() * 20 - 10}deg)`;
    item.style.opacity = '0';
  }, 30);
  setTimeout(() => item.remove(), lifetime + 400);
}

function startAsciiSpawns() {
  if (asciiInterval) return;
  const smallArts = ['🍍','🥚','🥭','𝓪𝓶𝓸𝓰𝓾𝓼 ඞ','AMONG US','/\\_/\\','= ( • . • ) ='];
  asciiInterval = setInterval(() => {
    const content = smallArts[Math.floor(Math.random() * smallArts.length)];
    const colors = ['#FFD700', '#FF6B6B', '#6BFF95', '#6BCBFF', '#D36BFF', '#FFB86B'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    spawnAsciiPopout(content, color, 22 + Math.random() * 10, 1200 + Math.random() * 800);
  }, 320);
}

function stopAsciiSpawns() {
  if (!asciiInterval) return;
  clearInterval(asciiInterval);
  asciiInterval = null;
}

function startAsciiArtSpawns() {
  if (asciiArtInterval) return;
  const arts = [
    { content: `⠀⠀⠀⠀⠀⠀⠀⠀⣔⠉⠁⠀⠀⠀⠈⣢⠀
      ⠀⠀⠀⠀⠀⠀⠀⢀⣯⣄⢀⣴⣶⣶⣄⣹⠀
      ⠀⠀⠀⠀⠀⠀⠀⣿⣟⢻⠟⣿⣽⣏⣿⣼⠀
      ⠀⠀⠀⠀⠀⠀⢀⠿⠿⢾⢰⣌⡛⠛⢁⣸⠀
      ⠀⠀⠀⠀⠀⠀⠘⢵⣶⢿⣶⡶⢛⣿⣿⣿⡇
      ⠀⠀⠀⠀⠀⠀⠀⠀⡟⣿⣿⡽⠟⣸⣿⣿⡇
      ⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣶⣿⢟⣻⢿⡇
      ⠀⠀⠀⠀⠀⠀⠀⠀⣼⢻⣿⢻⡜⣯⣿⡄⡇
      ⠀⠀⠀⠀⠀⠀⠀⠀⣿⣼⣿⣷⣛⣯⣿⡧⣁
      ⠀⠀⠀⠀⠀⠀⠀⢀⢽⣿⣿⡷⣯⢾⣽⢧⠆
      ⠀⠀⠀⠀⠀⠀⠀⠸⣹⣿⣿⣿⡽⣿⣫⣼⠀
      ⠀⠀⠀⠀⠀⠀⠀⢀⢟⣿⣿⣿⣽⣿⣷⠟⠀
      ⠀⠀⠀⠀⠀⠀⢀⢂⡞⢹⣿⡇⢸⣛⡟⠀⠀
      ⠀⠀⠀⠀⠀⢠⢂⡞⠀⢸⣽⡇⢸⣼⡇⠀⠀
      ⠀⠀⠀⠀⠔⣡⡞⠀⠀⢸⣿⡇⠀⣿⣿⠀⠀
      ⠀⠀⠀⡪⣴⠿⠀⠀⠀⠈⣿⣿⠀⣾⣿⠀⠀
      ⠀⣰⢯⣵⠯⠁⠀⠀⠀⢀⢿⣟⡀⣿⣿⠀⠀
      ⣤⣟⣾⡯⠁⢀⠤⢐⠈⢐⣽⣿⡶⠀⢳⡄⠀
      ⠙⠿⠟⠀⠀⠣⢯⣥⠶⠟⢉⣙⡄⡆⣶⣱⠀`, color: '#8B5A2B' },
    { content: `░░░░░░░░░░░███████░░░░░░░░░░░
      ░░░░░░░████░░░░░░░████░░░░░░░
      ░░░░░██░░░░░░░░░░░░░░░██░░░░░
      ░░░██░░░░░░░░░░░░░░░░░░░██░░░
      ░░░█░░░░░░░░░░░░░░░░░░░░░░░█░░
      ░█░░████░░░░░░░░██████░░░░░█░
      █░░█░░░██░░░░░░█░░░░███░░░░░█
      █░█░░░░░░█░░░░░█░░░░░░░█░░░░█
      █░█████████░░░░█████████░░░░█
      █░░░░░░░░░░░░░░░░░░░░░░░░░░░█
      █░░░████████████████████░░░░█
      ░█░░░█▓▓▓▓▓▓▓▓█████▓▓▓█░░░░█░
      ░█░░░░█▓▓▓▓▓██░░░░██▓██░░░░█░
      ░░█░░░░██▓▓█░░░░░░░▒██░░░░█░░
      ░░░██░░░░██░░░░░░▒██░░░░██░░░
      ░░░░░██░░░░███████░░░░██░░░░░
      ░░░░░░░███░░░░░░░░░███░░░░░░░
      ░░░░░░░░░░█████████░░░░░░░░░░`, color: '#FFD700' },
    { content: `⬛⬛⬛
      ⬛🟦🟦⬛
      ⬛🟦🟦🟦⬛`, color: '#6BCBFF' },
    { content: `⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣤⣤⣤⣶⣶⣶⣶⣤⣤⣀⣀⠀⠀⠙⢿⣷⣶
      ⠀⠀⠀⠀⠀⠀⠀⣀⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣶⣦⣿`, color: '#D36BFF' },
    { content: `⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿\n⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿`, color: '#6BCBFF' },
    { content: `ඞ`, color: '#D36BFF' },
    { content: `67`, color: '#6BCBFF' },
    { content: `░█████╗░███╗░░░███╗░█████╗░░██████╗░██╗░░░██╗░██████╗
      ██╔══██╗████╗░████║██╔══██╗██╔════╝░██║░░██║██╔════╝
      ███████║██╔████╔██║██║░░██║██║░░██╗░██║░░██║╚█████╗░
      ██╔══██║██║╚██╔╝██║██║░░██║██║░░╚██╗██║░░██║░╚═══██╗
      ██║░░██║██║░╚═╝░██║╚█████╔╝╚██████╔╝╚██████╔╝██████╔╝
      ╚═╝░░╚═╝╚═╝░░░░░╚═╝░╚════╝░░╚═════╝░░╚═════╝░╚═════╝░`, color: '#FFD700' },
    { content: `..╭━━━━━━╮
      ╭┃    ╭━━━━╮
      ┃┃    ╰━━━━╯
      ┃┃    💧   👉 👈    it's not me
      ╰┃    ┃ ─┌     ┃
          ╰━╯   ╰━╯`, color: '#6BCBFF' },
  ];

  asciiArtInterval = setInterval(() => {
    const item = arts[Math.floor(Math.random() * arts.length)];
    spawnAsciiPopout(item.content, item.color || '#FFD700', 12 + Math.random() * 10, 1600 + Math.random() * 1200);
  }, 250);
}

function stopAsciiArtSpawns() {
  if (!asciiArtInterval) return;
  clearInterval(asciiArtInterval);
  asciiArtInterval = null;
}

const fatihahExpectedText = [
  'بسم الله الرحمن الرحيم',
  'الحمد لله رب العالمين',
  'الرحمن الرحيم',
  'مالك يوم الدين',
  'إياك نعبد وإياك نستعين',
  'اهدنا الصراط المستقيم',
  'صراط الذين أنعمت عليهم غير المغضوب عليهم ولا الضالين',
].join(' ');

function showSection(sectionName) {
  homeSection.classList.add('hidden');
  solatSection.classList.add('hidden');
  quranSection.classList.add('hidden');
  quizSection.classList.add('hidden');
  settingsSection.classList.add('hidden');

  homeBtn.classList.remove('active');
  solatBtn.classList.remove('active');
  quranBtn.classList.remove('active');
  quizBtn.classList.remove('active');
  settingsBtn.classList.remove('active');

  if (sectionName === 'home') {
    homeSection.classList.remove('hidden');
    homeBtn.classList.add('active');
  } else if (sectionName === 'solat') {
    solatSection.classList.remove('hidden');
    solatBtn.classList.add('active');
  } else if (sectionName === 'quran') {
    quranSection.classList.remove('hidden');
    quranBtn.classList.add('active');
  } else if (sectionName === 'quiz') {
    quizSection.classList.remove('hidden');
    quizBtn.classList.add('active');
  } else if (sectionName === 'settings') {
    settingsSection.classList.remove('hidden');
    settingsBtn.classList.add('active');
  }
}

function updateThemeLabel() {
  themeToggle.textContent = currentTheme === 'dark' ? t('lightMode') : t('darkMode');
}

function setTheme(theme) {
  currentTheme = theme;
  document.body.classList.toggle('dark', theme === 'dark');
  updateThemeLabel();
}

function renderSubjectOptions() {
  const selectedValue = subjectSelect.value;
  subjectSelect.innerHTML = subjectOptions
    .map((subject) => `<option value="${subject.key}">${subject[currentLanguage]}</option>`)
    .join('');
  subjectSelect.value = selectedValue || subjectOptions[0].key;
}

function updateQuizTimerText() {
  quizTimer.textContent = `${t('timeRemaining')}: ${quizState.remaining} ${t('seconds')}`;
}

function updateQuizProgress() {
  const total = quizState.questions.length;
  const completed = Math.min(quizState.currentIndex, total);
  quizProgress.textContent = `${completed} / ${total} ${t('questionProgress')}`;
}

function clearQuizIntervals() {
  window.clearInterval(quizTimerInterval);
  window.clearTimeout(quizAdvanceTimeout);
  quizTimerInterval = null;
  quizAdvanceTimeout = null;
}

function updateWrongList() {
  quizWrongList.innerHTML = '';
  if (quizState.wrongQuestions.length === 0) {
    const li = document.createElement('li');
    li.textContent = t('noWrong');
    quizWrongList.appendChild(li);
    retryWrongBtn.disabled = true;
    return;
  }

  quizState.wrongQuestions.forEach((question) => {
    const li = document.createElement('li');
    li.textContent = question.translations[currentLanguage].question;
    quizWrongList.appendChild(li);
  });
  retryWrongBtn.disabled = false;
}

function setQuizStatus(message) {
  quizStatusText.textContent = message;
}

function finishQuiz() {
  quizState.running = false;
  quizState.answered = false;
  clearQuizIntervals();
  startQuizBtn.textContent = t('restartQuiz');
  setQuizStatus(t('quizComplete'));
  quizScore.textContent = `${quizState.score} / ${quizState.questions.length}`;
  updateWrongList();
}

function markOptions(correctIndex) {
  quizOptions.querySelectorAll('button').forEach((button) => {
    const index = Number(button.dataset.index);
    button.disabled = true;
    if (index === correctIndex) {
      button.classList.add('correct');
    }
  });
}

function showQuizQuestion() {
  if (!quizState.running || quizState.currentIndex >= quizState.questions.length) {
    finishQuiz();
    return;
  }

  quizState.answered = false;
  const current = quizState.questions[quizState.currentIndex];
  const translations = current.translations[currentLanguage];
  quizQuestionText.textContent = translations.question;
  quizOptions.innerHTML = '';
  translations.options.forEach((optionText, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'quiz-option';
    button.textContent = `${String.fromCharCode(65 + index)}. ${optionText}`;
    button.dataset.index = index;
    button.addEventListener('click', () => {
      if (quizState.answered) return;
      handleQuizAnswer(index);
    });
    quizOptions.appendChild(button);
  });
  quizState.remaining = Number(timerSelect.value);
  updateQuizTimerText();
  updateQuizProgress();
  setQuizStatus(`${t('timeRemaining')}: ${quizState.remaining} ${t('seconds')}`);
  clearQuizIntervals();
  quizTimerInterval = window.setInterval(() => {
    quizState.remaining -= 1;
    updateQuizTimerText();
    if (quizState.remaining <= 0) {
      clearQuizIntervals();
      markOptions(quizState.questions[quizState.currentIndex].answerIndex);
      quizState.wrongQuestions.push(quizState.questions[quizState.currentIndex]);
      setQuizStatus(t('timeUpMessage'));
      quizState.currentIndex += 1;
      quizAdvanceTimeout = window.setTimeout(showQuizQuestion, 800);
    }
  }, 1000);
  quizScore.textContent = `${quizState.score} / ${quizState.questions.length}`;
}

function handleQuizAnswer(selectedIndex) {
  if (quizState.answered) return;
  quizState.answered = true;
  clearQuizIntervals();

  const current = quizState.questions[quizState.currentIndex];
  const isCorrect = selectedIndex === current.answerIndex;
  const buttons = quizOptions.querySelectorAll('button');
  buttons.forEach((button) => {
    const index = Number(button.dataset.index);
    if (index === current.answerIndex) {
      button.classList.add('correct');
    }
    if (index === selectedIndex && !isCorrect) {
      button.classList.add('incorrect');
    }
    button.disabled = true;
  });

  if (isCorrect) {
    quizState.score += 1;
    setQuizStatus(t('correctAnswer'));
  } else {
    quizState.wrongQuestions.push(current);
    setQuizStatus(t('wrongAnswer'));
  }

  quizState.currentIndex += 1;
  quizScore.textContent = `${quizState.score} / ${quizState.questions.length}`;
  updateQuizProgress();
  quizAdvanceTimeout = window.setTimeout(showQuizQuestion, 900);
}

function startQuiz() {
  quizState.subject = subjectSelect.value;
  quizState.questions = quizData[quizState.subject].map((item) => ({ ...item }));
  quizState.currentIndex = 0;
  quizState.score = 0;
  quizState.wrongQuestions = [];
  quizState.running = true;
  quizState.answered = false;
  startQuizBtn.textContent = t('restartQuiz');
  updateWrongList();
  showQuizQuestion();
}

function retryWrongAnswers() {
  if (quizState.wrongQuestions.length === 0) {
    return;
  }
  quizState.questions = quizState.wrongQuestions.map((item) => ({ ...item }));
  quizState.currentIndex = 0;
  quizState.score = 0;
  quizState.wrongQuestions = [];
  quizState.running = true;
  quizState.answered = false;
  startQuizBtn.textContent = t('restartQuiz');
  updateWrongList();
  showQuizQuestion();
}

function translateUI() {
  renderSubjectOptions();
  homeBtn.textContent = t('navHome');
  solatBtn.textContent = t('navSolat');
  quranBtn.textContent = t('navQuran');
  quizBtn.textContent = t('navQuiz');
  settingsBtn.textContent = t('navSettings');
  appTitle.textContent = t('appTitle');
  appSubtitle.textContent = t('appSubtitle');
  solatHeading.textContent = t('solatHeading');
  quranHeading.textContent = t('quranHeading');
  quranDescription.textContent = t('quranDescription');
  quizHeading.textContent = t('quizHeading');
  prayerTimesHeading.textContent = t('prayerTimesHeading');
  selectedDateLabel.textContent = t('selectedDateLabel');
  localTimeLabel.textContent = t('localTimeLabel');
  letterSelectLabel.textContent = t('letterSelectLabel');
  readLineBtn.textContent = t('readLineBtn');
  readWholeBtn.textContent = t('readWholeBtn');
  settingsLanguageLabel.textContent = t('settingsLanguage');
  settingsThemeLabel.textContent = t('settingsTheme');
  settingsTimerLabel.textContent = t('settingsTimer');
  yesLabel.textContent = t('yesLabel');
  quizSubjectLabel.textContent = t('quizSubjectLabel');
  homeTitle.textContent = t('homeTitle');
  homeLanguageLabel.textContent = t('homeLanguageLabel');
  homeLanguageSelect.value = currentLanguage;
  homeParagraph1.textContent = t('homeParagraph1');
  homeParagraph2.innerHTML = t('homeParagraph2');
  languageSelect.value = currentLanguage;
  settingsLanguageLabel.textContent = t('settingsLanguage');
  settingsThemeLabel.textContent = t('settingsTheme');
  settingsTimerLabel.textContent = t('settingsTimer');
  startQuizBtn.textContent = quizState.running ? t('restartQuiz') : t('startQuiz');
  retryWrongBtn.textContent = t('retryWrong');
  quizScore.textContent = quizState.running ? `${quizState.score} / ${quizState.questions.length}` : t('readyToStart');
  setQuizStatus(quizState.running ? t('quizIntro') : t('selectSubjectPrompt'));
  if (!quizState.running) {
    quizQuestionText.textContent = t('selectSubjectPrompt');
  }
  updateQuizProgress();
  updateThemeLabel();
  updateWrongList();
  updateLetterInfo();
  updateSurahLines();
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

function toLocalDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function toPrayerApiDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${day}-${month}-${year}`;
}

function setSelectedDateInput(date) {
  solatDate.value = toLocalDateKey(date);
}

function updateSelectedDate(date) {
  activeDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  setSelectedDateInput(activeDate);
  selectedDate.textContent = formatDate(activeDate);
  fetchPrayerTimes(activeDate);
}

function updateClock() {
  currentTime.textContent = formatTime(new Date());
  updatePrayerSummary();
}

function parsePrayerMinutes(time) {
  const match = String(time).match(/^(\d{1,2}):(\d{2})/);
  if (!match) {
    return null;
  }
  return Number(match[1]) * 60 + Number(match[2]);
}

function getNextPrayerKey(times) {
  if (!times || toLocalDateKey(activeDate) !== toLocalDateKey(new Date())) {
    return null;
  }

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const nextPrayer = prayerSchedule.find((prayer) => {
    const prayerMinutes = parsePrayerMinutes(times[prayer.key]);
    return prayerMinutes !== null && prayerMinutes >= currentMinutes;
  });

  return nextPrayer ? nextPrayer.key : null;
}

function updatePrayerSummary() {
  if (!latestPrayerTimes || !nextPrayerName || !nextPrayerTime) {
    return;
  }

  const selectedKey = toLocalDateKey(activeDate);
  const todayKey = toLocalDateKey(new Date());
  const nextKey = getNextPrayerKey(latestPrayerTimes);

  if (nextKey !== latestNextPrayerKey && prayerTimesList.children.length > 0) {
    renderPrayerTimes(latestPrayerTimes, latestPrayerSource);
    return;
  }

  if (nextKey) {
    nextPrayerName.textContent = nextKey;
    nextPrayerTime.textContent = String(latestPrayerTimes[nextKey]).split(' ')[0];
  } else if (selectedKey > todayKey) {
    nextPrayerName.textContent = 'Fajr';
    nextPrayerTime.textContent = String(latestPrayerTimes.Fajr || '-').split(' ')[0];
  } else if (selectedKey < todayKey) {
    nextPrayerName.textContent = 'Completed day';
    nextPrayerTime.textContent = String(latestPrayerTimes.Isha || '-').split(' ')[0];
  } else {
    nextPrayerName.textContent = 'Tomorrow Fajr';
    nextPrayerTime.textContent = String(latestPrayerTimes.Fajr || '-').split(' ')[0];
  }

  if (solatSource) {
    solatSource.textContent = latestPrayerSource;
  }
}

function createTimeRow(prayer, time, isNext) {
  const row = document.createElement('div');
  row.className = isNext ? 'time-item next' : 'time-item';

  const nameGroup = document.createElement('span');
  nameGroup.className = 'time-name';

  const nameText = document.createElement('strong');
  nameText.textContent = prayer.key;

  const noteText = document.createElement('span');
  noteText.className = 'time-note';
  noteText.textContent = prayer.note;

  const valueGroup = document.createElement('span');
  valueGroup.className = 'time-value';

  const timeText = document.createElement('span');
  timeText.textContent = String(time).split(' ')[0];

  nameGroup.append(nameText, noteText);
  valueGroup.appendChild(timeText);

  if (isNext) {
    const badge = document.createElement('span');
    badge.className = 'time-badge';
    badge.textContent = 'Next';
    valueGroup.appendChild(badge);
  }

  row.append(nameGroup, valueGroup);
  return row;
}

function renderPrayerTimes(times, sourceText) {
  latestPrayerTimes = times;
  latestPrayerSource = sourceText || 'Prayer schedule ready';
  prayerTimesList.innerHTML = '';
  const nextKey = getNextPrayerKey(times);
  latestNextPrayerKey = nextKey;
  prayerSchedule.forEach((prayer) => {
    if (times[prayer.key]) {
      prayerTimesList.appendChild(createTimeRow(prayer, times[prayer.key], prayer.key === nextKey));
    }
  });
  updatePrayerSummary();
}

function generateOfflinePrayerTimes(startDate, endDate) {
  const schedule = {};
  const current = new Date(startDate);

  while (current <= endDate) {
    const iso = toLocalDateKey(current);
    const dayOfYear = Math.round((current - startDate) / 86400000);

    const fajr = 320 + Math.round(Math.sin((dayOfYear / 365) * Math.PI) * 15);
    const dhuhr = 760 + Math.round(Math.sin((dayOfYear / 365) * Math.PI) * 5);
    const asr = 1000 + Math.round(Math.sin((dayOfYear / 365) * Math.PI) * 6);
    const maghrib = 1140 + Math.round(Math.sin((dayOfYear / 365) * Math.PI) * 8);
    const isha = 1220 + Math.round(Math.sin((dayOfYear / 365) * Math.PI) * 7);

    const format = (value) => {
      const h = String(Math.floor(value / 60)).padStart(2, '0');
      const m = String(value % 60).padStart(2, '0');
      return `${h}:${m}`;
    };

    schedule[iso] = {
      Fajr: format(fajr),
      Dhuhr: format(dhuhr),
      Asr: format(asr),
      Maghrib: format(maghrib),
      Isha: format(isha),
    };

    current.setDate(current.getDate() + 1);
  }

  return schedule;
}

const currentYear = new Date().getFullYear();
const offlinePrayerTimes = generateOfflinePrayerTimes(new Date(currentYear, 0, 1), new Date(currentYear, 11, 31));

function fallbackPrayerTimes() {
  return {
    Fajr: '05:15',
    Dhuhr: '12:30',
    Asr: '15:45',
    Maghrib: '18:20',
    Isha: '19:40',
  };
}

async function fetchPrayerTimes(date) {
  const requestId = prayerRequestId + 1;
  prayerRequestId = requestId;
  const isoDate = toLocalDateKey(date);
  const times = offlinePrayerTimes[isoDate];
  const latitude = 4.9031;
  const longitude = 114.9398;
  const apiUrl = `https://api.aladhan.com/v1/timings/${toPrayerApiDate(date)}?latitude=${latitude}&longitude=${longitude}&method=3`;

  if (solatStatusMessage) {
    solatStatusMessage.textContent = `Loading prayer times for ${isoDate}...`;
  }
  if (solatLocation) {
    solatLocation.textContent = 'Bandar Seri Begawan, Brunei';
  }
  if (solatSource) {
    solatSource.textContent = 'Checking live schedule...';
  }
  if (nextPrayerName) {
    nextPrayerName.textContent = 'Loading';
  }
  if (nextPrayerTime) {
    nextPrayerTime.textContent = '-';
  }
  latestPrayerTimes = null;
  latestNextPrayerKey = null;
  prayerTimesList.innerHTML = '<div class="time-item"><span class="time-name"><strong>Loading</strong><span class="time-note">Getting prayer schedule</span></span><span class="time-value">...</span></div>';

  try {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 5000);
    const response = await fetch(apiUrl, { signal: controller.signal });
    window.clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error('Prayer time request failed');
    }

    const data = await response.json();
    if (data && data.data && data.data.timings) {
      if (requestId !== prayerRequestId) {
        return;
      }
      renderPrayerTimes(data.data.timings, 'Live schedule from Aladhan');
      if (solatStatusMessage) {
        solatStatusMessage.textContent = `Prayer times for ${isoDate}`;
      }
      return;
    }
  } catch (error) {
    console.warn('Prayer times fetch failed, using fallback schedule.', error);
  }

  if (requestId !== prayerRequestId) {
    return;
  }

  if (times) {
    renderPrayerTimes(times, 'Offline fallback schedule');
    if (solatStatusMessage) {
      solatStatusMessage.textContent = `Offline prayer times for ${isoDate}`;
    }
    return;
  }

  const fallback = fallbackPrayerTimes(date);
  renderPrayerTimes(fallback, 'Sample fallback schedule');
  if (solatStatusMessage) {
    solatStatusMessage.textContent = `Date not in preset schedule. Using sample times.`;
  }
}

function normalizeArabicText(text) {
  return text
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/[^ -\p{L}\s]/gu, ' ')
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

function getExpectedRecitationText() {
  const isLetterMode = !letterSection.classList.contains('hidden');

  if (isLetterMode) {
    const selectedLetter = alphabetData[letterSelect.value];
    const letterSpeechNames = {
      alif: 'ا الف ألف',
      ba: 'ب باء با',
      ta: 'ت تاء تا',
      tha: 'ث ثاء ثا',
      jim: 'ج جيم',
      ha: 'ح حاء حا',
      kha: 'خ خاء خا',
      dal: 'د دال',
      dhal: 'ذ ذال',
      ra: 'ر راء را',
      zay: 'ز زاي زي',
      sin: 'س سين',
      shin: 'ش شين',
      sad: 'ص صاد',
      dad: 'ض ضاد',
      ta2: 'ط طاء طا',
      za2: 'ظ ظاء ظا',
      ain: 'ع عين',
      ghain: 'غ غين',
      fa: 'ف فاء فا',
      qaf: 'ق قاف',
      kaf: 'ك كاف',
      lam: 'ل لام',
      mim: 'م ميم',
      nun: 'ن نون',
      ha2: 'ه هاء ها',
      waw: 'و واو',
      ya: 'ي ياء يا',
    };
    return selectedLetter ? `${selectedLetter.sample} ${letterSpeechNames[letterSelect.value] || ''}` : '';
  }

  const selected = surahSelect.value;
  const surah = surahData[selected];
  const line = surah && surah.lines[Number(surahLineSelect.value)];
  return line ? line.arab : 'بسم الله الرحمن الرحيم';
}

function checkRecitation(transcript) {
  const expectedText = getExpectedRecitationText();
  const expected = normalizeArabicText(expectedText);
  const actual = normalizeArabicText(transcript);

  if (!actual) {
    recitationScore.textContent = 'No reading detected';
    recitationStatus.textContent = 'Please try again and allow microphone access if your browser asks.';
    setFeedback(['No clear words were captured. Move closer to the microphone and recite again.']);
    return;
  }

  const expectedWords = expected.split(' ');
  const actualWords = actual.split(' ');

  if (!letterSection.classList.contains('hidden')) {
    const heardExpectedLetter = actualWords.some((word) => expectedWords.includes(word));
    const selectedLetter = alphabetData[letterSelect.value];
    recitationScore.textContent = heardExpectedLetter ? 'Correct letter detected' : 'Try again';
    recitationStatus.textContent = heardExpectedLetter
      ? `The app heard the selected letter: ${selectedLetter.name}.`
      : `The app heard "${transcript}". Try saying ${selectedLetter.name} again clearly.`;
    setFeedback([
      `Expected: ${selectedLetter.sample} (${selectedLetter.name})`,
      `Heard: ${transcript}`,
      heardExpectedLetter ? 'Good match for this Arabic letter.' : 'Not a clear match yet. Try speaking closer to the microphone.',
    ]);
    return;
  }

  const distance = levenshteinDistance(actual, expected);
  const score = Math.max(0, Math.round((1 - distance / expected.length) * 100));
  const missingWords = expectedWords.filter((word) => !actualWords.includes(word));
  const closeMatches = actualWords
    .map((word) => ({ spoken: word, ...findClosestExpectedWord(word, expectedWords) }))
    .filter((match) => match.distance > 0 && match.distance <= 2 && match.spoken !== match.word)
    .slice(0, 4);

  recitationScore.textContent = `${score}% match`;

  if (score >= 85) {
    recitationStatus.textContent = 'Good match. Your reading was close to the selected Arabic text.';
  } else if (score >= 65) {
    recitationStatus.textContent = 'Partial match. Review the highlighted feedback and try again slowly.';
  } else {
    recitationStatus.textContent = 'Needs practice. Read the selected Arabic text clearly and try again.';
  }

  const feedback = [];
  if (missingWords.length === 0) {
    feedback.push('All expected Arabic words were detected.');
  } else {
    feedback.push(`Words not clearly detected: ${missingWords.slice(0, 8).join(', ')}${missingWords.length > 8 ? '...' : ''}.`);
  }

  closeMatches.forEach((match) => {
    feedback.push(`Heard "${match.spoken}". Closest expected word: "${match.word}".`);
  });

  if (actualWords.length < expectedWords.length * 0.6) {
    feedback.push('The transcript is much shorter than expected. Make sure you recite the full selection before stopping.');
  }

  setFeedback(feedback);
}

function setupRecitationChecker() {
  if (!startRecitation || !stopRecitation || !recitationScore || !recitationStatus || !recitationTranscript || !recitationFeedback) {
    return;
  }

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
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.addEventListener('start', () => {
    collectedTranscript = '';
    recognitionHadError = false;
    recitationTranscript.textContent = 'Listening...';
    recitationScore.textContent = 'Listening';
    recitationStatus.textContent = 'Read the selected Arabic text clearly, then press Stop.';
    setFeedback(['Listening for your recitation.']);
    startRecitation.disabled = true;
    stopRecitation.disabled = false;
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

  recognition.addEventListener('end', () => {
    startRecitation.disabled = false;
    stopRecitation.disabled = true;
    if (!recognitionHadError) {
      checkRecitation(recitationTranscript.textContent);
    }
  });

  recognition.addEventListener('error', (event) => {
    recognitionHadError = true;
    startRecitation.disabled = false;
    stopRecitation.disabled = true;
    recitationScore.textContent = 'Recording error';
    recitationStatus.textContent = event.error === 'not-allowed'
      ? 'Microphone permission was blocked. Allow microphone access and try again.'
      : 'Speech recognition stopped unexpectedly. Please try again.';
    setFeedback([`Recognition error: ${event.error}.`]);
  });
}

homeBtn.addEventListener('click', () => showSection('home'));
solatBtn.addEventListener('click', () => showSection('solat'));
quranBtn.addEventListener('click', () => showSection('quran'));
quizBtn.addEventListener('click', () => showSection('quiz'));
settingsBtn.addEventListener('click', () => showSection('settings'));
languageSelect.addEventListener('change', (event) => {
  currentLanguage = event.target.value;
  translateUI();
});
homeLanguageSelect.addEventListener('change', (event) => {
  currentLanguage = event.target.value;
  languageSelect.value = currentLanguage;
  translateUI();
});
themeToggle.addEventListener('click', () => {
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});
yesToggle.addEventListener('change', () => {
  togglePopouts(yesToggle.checked);
});
if (yesToggle2) {
  yesToggle2.addEventListener('change', () => {
    if (yesToggle2.checked) startAsciiArtSpawns(); else stopAsciiArtSpawns();
  });
}
letterModeBtn.addEventListener('click', () => switchReadingMode('letters'));
quranModeBtn.addEventListener('click', () => switchReadingMode('quran'));
letterSelect.addEventListener('change', updateLetterInfo);
surahSelect.addEventListener('change', updateSurahLines);
surahLineSelect.addEventListener('change', () => showSurahLine('line'));
readLineBtn.addEventListener('click', () => showSurahLine('line'));
readWholeBtn.addEventListener('click', () => showSurahLine('whole'));
timerSelect.addEventListener('change', () => {
  if (quizState.running) {
    quizState.remaining = Number(timerSelect.value);
    updateQuizTimerText();
  }
});
startQuizBtn.addEventListener('click', startQuiz);
retryWrongBtn.addEventListener('click', retryWrongAnswers);

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
    recognition.stop();
  }
});

function startApp() {
  repairArabicContent();
  updateSelectedDate(new Date());
  updateClock();
  setupRecitationChecker();
  translateUI();
  setTheme(currentTheme);
  timerId = setInterval(updateClock, 1000);
  showSection('home');
}

startApp();
