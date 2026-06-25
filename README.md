# Solat & Quran Helper

A simple static web app with multiple buttons.

## Features
- Home screen with navigation buttons
- Solat Times section:
  - view prayer times for a selected date
  - navigate previous and next dates
  - see the current local time
- Quran Checker section:
  - recite Surah Al-Fatihah with your microphone
  - compare the browser Arabic transcript against the expected Surah text
  - receive a match score and practice feedback

## Run locally or on a host
1. Open `index.html` in your browser, or deploy the site to a static host like Vercel.
2. Click `Solat Times` to view the prayer schedule.
3. Select a past date or press `Today` to update the schedule.
4. Click `Quran Checker`, allow microphone access, and press `Start Reciting` to practice Al-Fatihah.

## Notes
- Prayer times are fetched from the Aladhan API when available.
- If the network request fails, a fallback sample schedule is displayed.
- The recitation checker uses browser speech recognition, so accuracy depends on browser support, microphone quality, accent, and noise level. It checks detected words, not tajweed rules.
