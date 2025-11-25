# Habit Tracker ![Habit Tracker](https://img.shields.io/badge/Habit_Tracker-blue) ![CI/CD](https://github.com/olio-lio-lio/Habit-Tracker/actions/workflows/main.yml/badge.svg)

[Live Demo](https://olio-lio-lio.github.io/Habit-Tracker/) | [GitHub Repository](https://github.com/olio-lio-lio/Habit-Tracker)

A lightweight, fully client-side Habit Tracker built with **HTML, CSS, and Vanilla JavaScript**. Track your habits, mark daily completions, and see live streaks — all stored locally in your browser.

---

## 🔥 Features

- ✅ **Add New Habits** – Type a name and press **Add** or **Enter**  
- 🚫 **Duplicate Habit Detection** – Red error if a habit already exists  
- ☑️ **Mark Days as Complete** – Click past/current days or use keyboard navigation (Tab + Enter/Space)  
- 🔥 **Automatic Streak Tracking** – Shows consecutive days completed  
- 📅 **Dynamic Weekly View** – Always shows the last 7 days ending with today  
- 💾 **Import / Export JSON** – Backup and restore habits  
- 🗑 **Reset All** – Wipes all habits and completions  
- 📱 **Mobile-Friendly & Accessible** – Responsive layout and keyboard navigation

---
## ✅ Installation / Setup

1. Clone or download this repository
git clone https://github.com/olio-lio-lio/Habit-Tracker

2. Navigate into the project folder
cd Habit-Tracker

3. Open the app

You can open the app directly by opening index.html in your browser:

Double-click index.html

Or right-click → Open with browser

## 💻 Usage

### Adding a Habit
1. Enter a name in the input field  
2. Click **Add** or press **Enter**

### Toggling Days
- Click a day button or use keyboard navigation  
- Only today + past days are interactive

### Viewing Streaks
- The **Streak** counter updates automatically

### Export / Import
- Click **Export** to download JSON  
- Click **Import** to restore a previously saved JSON file

### Reset
- Click **Reset All** to permanently delete all habits

---

## Screenshots

<div style="display:flex; gap:20px; align-items:flex-start;">
  <div>
    <img src="desktop_UI.png" alt="Desktop UI" width="400"/>
    <p style="text-align:center;">Desktop View</p>
  </div>
  <div>
    <img src="mobile_UI.png" alt="Mobile UI" width="200"/>
    <p style="text-align:center;">Mobile View</p>
  </div>
</div>

> The weekly habit grid updates dynamically so that the week always ends with today.  
> Clickable day buttons, streak counters, and the Add Habit input are all shown.

---

## ⚙️ Tech Stack

- **HTML5** – App structure  
- **CSS3** – Styling & responsive layout  
- **Vanilla JavaScript** – Logic, rendering, streak system  
- **localStorage** – Saves all habit data locally

---

## 📂 Project Structure

habit-tracker/
├── .github/
│ └── workflows/
│ └── main.yml # CI/CD: lint, audit, deploy
├── assets/
│ └── styles.css # Main stylesheet
├── js/
│ └── app.js # Main JS logic
├── desktop_UI.png # Desktop screenshot
├── mobile_UI.png # Mobile screenshot
├── index.html
├── package.json # Optional, for linting tools
└── README.md


---

## 🚀 GitHub Pages Deployment

This project uses **GitHub Actions** to automatically:

1. Lint all JavaScript files  
2. Run a dependency audit  
3. Deploy to GitHub Pages on every push to the `main` branch  

**Workflow file path:**  
.github/workflows/main.yml


**Live site:** [https://olio-lio-lio.github.io/Habit-Tracker/](https://olio-lio-lio.github.io/Habit-Tracker/)

---

## Architecture

The project follows a simple, client-side architecture with no backend.
All runs directly in the browser.

### 1. index.html

Defines the structure of the user interface: header, habit form, weekly grid, and data-management section.
Loads App.js with defer so the script executes after the page loads.

### 2. styles.css

Implements layout, grid styling, responsive behavior, and accessibility improvements (focus states, readable colors).

### 3. App.js

Handles all application logic:

#### State Management

The main data structure is an array of habit objects.
Each habit stores its name and a 7-day array of booleans (true/false).

All data is stored using localStorage, ensuring persistence across browser sessions.

#### Rendering Layer

renderWeek() calculates the current Monday–Sunday range.
renderHabits() updates the DOM by creating rows, columns, and buttons for each habit.

Re-renders after every change to keep the UI consistent.

#### Event Handling

Form submission (add habit)
Day toggling (click, keyboard)
Export and import of data
Resetting all habits
Ensures keyboard accessibility (Enter/Space to toggle).

#### Modules / Functional Separation

Although kept in a single file for simplicity, the logic is divided into:

- Date utilities
- Local storage utilities
- Rendering functions
- Event handlers
- Initialization

This keeps the file readable and maintainable without requiring a build system.


## Limitations

### No backend or user accounts
Data is stored only locally. Habits do not transfer across devices or browsers. Clearing browser storage deletes all data.

### Single-week view only
The app shows only the current week.

### Single JavaScript file
All logic is in one file instead of separate modules. Could be made more scalable for bigger applications.

### No real-time feedback or animations
UI updates instantly but lacks transitions or visual highlights.

### Accessibility could be further improved
Default browser focus outline is used in this app, custom focus styles or ARIA attributes could enhance usability further.

### Limited error handling
Importing corrupted JSON will fail silently, no user-facing error messages for broken imports.


## 🌐 Browser Support

- Chrome  
- Firefox  
- Safari  
- Edge  

localStorage is required for habit tracking.

---

## 📄 License

MIT License — © 2025 olio-lio-lio  
Free to fork, modify, and share.
