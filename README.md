[![CI and Deploy Pages](https://github.com/olio-lio-lio/Habit-Tracker/actions/workflows/main.yml/badge.svg)](https://github.com/olio-lio-lio/Habit-Tracker/actions/workflows/main.yml)# Habit-Tracker
Live Demo: [Habit Tracker](https://olio-lio-lio.github.io/Habit-Tracker/)

Habit Tracker

A lightweight, fully client-side Habit Tracker built with HTML, CSS, and Vanilla JavaScript.

This app allows users to:
- Track daily habits
- Mark days complete with a weekly view
- See live streaks
- Add and delete habits
- Export/import data as JSON
- Reset all habits
- Store everything locally via localStorage

No backend needed — the entire app runs in the browser.

Live Demo

Website: https://olio-lio-lio.github.io/Habit-Tracker/
GitHub Pages: https://github.com/olio-lio-lio/Habit-Tracker


## CI/CD Pipeline

This project uses GitHub Actions to automatically:
- Lint all JavaScript files in the `App/` folder using ESLint
- Run a dependency audit to check for security issues
- Deploy the site to GitHub Pages on every push to the `main` branch



Installation & Setup
1. Clone the repository
git clone https://github.com/olio-lio-lio/habit-tracker


Or download the ZIP and extract it.

2. Navigate into the folder
cd habit-tracker

3. Open in your browser

Just open:

index.html

Optional: Open in VS Code

Windows (PowerShell):

code .


macOS:

code .

Features
✅ Add New Habits

Type a name and press Add or Enter.

🚫 Duplicate Habit Detection

If a habit already exists, a red error appears:

This habit already exists.

☑️ Mark Days as Complete

Click any past or current day to toggle it

Accessible via Tab + Enter/Space

🔥 Automatic Streak Tracking

The right column shows how many consecutive days the habit has been completed.

📅 Dynamic Weekly View

Always shows the last 7 days, ending with today.

💾 Import / Export JSON

Export your data as a JSON file

Import previously saved data
Perfect for backup and restore.

🗑 Reset All

Wipes all habits and completions from localStorage.

📱 Mobile-Friendly

Responsive layout with accessible UI.

Usage
Adding a Habit

Enter name in the input field

Click Add, or press Enter

Toggling Days

Click a day button

Or use keyboard navigation

Only today + past days are interactive

Viewing Streaks

A “Streak” counter updates automatically.

Export / Import

Click Export to download JSON

Click Import to restore a file

Reset

Deletes all habits permanently.

Screenshots
Desktop	Mobile

	

These screenshots show the weekly habit grid, streak counter, Add Habit input, and daily completion buttons.
The layout updates dynamically so that the week always ends with today.

Tech Stack

HTML5 – app structure

CSS3 – styling and responsive layout

Vanilla JavaScript – logic, rendering, streak system

localStorage – saves all habit data locally

Project Structure
habit-tracker/
├── .github/
│   └── workflows/
│       └── pages.yml          # CI: lint, audit, deploy
├── assets/
│   └── styles.css             # main stylesheet
├── js/
│   └── app.js                 # main JS logic
├── img/                       # screenshots used in README
│   ├── HabitPage.png
│   └── MobileView.png
├── index.html
├── package.json               # optional, for linting tools
└── README.md

GitHub Pages Deployment

Your repo uses a GitHub Actions workflow to:

Lint all JS

Run a dependency audit

Deploy automatically to GitHub Pages

Workflow file path:

.github/workflows/pages.yml


Live site is automatically published to:

👉 https://olio-lio-lio.github.io/Habit-Tracker/

Browser Support

Chrome

Firefox

Safari

Edge

(localStorage required)

License

MIT License — © 2025 olio-lio-lio
Free to fork, modify, and use.

