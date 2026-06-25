# Muslimbuddy

A single-page static web app for prayer times, Quran reading practice, quizzes, and language/theme settings.

## Features
- Home screen with language selector and navigation buttons
- Solat Times section
  - live prayer times from the Aladhan API
  - offline fallback prayer schedule if the network is unavailable
  - date picker with previous/next/today controls
  - next prayer highlight and local time display
- Quran Checker section
  - Arabic letters practice mode
  - Quran surah reading mode with selectable surah and line
  - speech recognition support for Arabic recitation feedback
- Quizzes section
  - quizzes on Islamic personalities
  - timer countdown and progress tracking
  - retry wrong questions after the quiz
- Settings section
  - language switching between English and Malay
  - light/dark theme toggle
  - timer duration control
  - optional animated popout effects

## Run locally or deploy
1. Open `index.html` in a browser, or deploy this folder as a static site on GitHub Pages, Vercel, or any static host.
2. Use the navigation buttons to switch between Home, Solat Times, Quran Checker, Quizzes, and Settings.
3. Allow microphone access for Quran recitation practice.

## Notes
- The app is a static site and requires no server-side code.
- Prayer times are fetched from the public Aladhan API and also support offline fallback values.
- Browser speech recognition works best in Chrome or Edge and may require microphone permission.
- The app includes built-in assets in `assets/` for animated corner and popout visuals.
