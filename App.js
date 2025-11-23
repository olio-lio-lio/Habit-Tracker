document.addEventListener("DOMContentLoaded", function() {
  // --------------------------
  // Utility Functions
  // --------------------------

  function escapeHTML(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function isValidState(data) {
    if (!data || !Array.isArray(data.habits)) return false;
    return data.habits.every(
      h => h.id && typeof h.name === "string" && h.log && typeof h.log === "object"
    );
  }

  // --------------------------
  // App State
  // --------------------------

  const rows = document.getElementById("rows");

  let state = { habits: [] };
  try {
    const stored = JSON.parse(localStorage.getItem("habitTrackerState"));
    if (isValidState(stored)) state = stored;
  } catch {
    // Invalid JSON in localStorage, ignore
  }

  function todayKey() {
    const d = new Date();
    return d.toISOString().split("T")[0];
  }

  function getWeekKeys() {
    const keys = [];
    const d = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date(d);
      date.setDate(d.getDate() - i);
      keys.push(date.toISOString().split("T")[0]);
    }
    return keys;
  }

  let weekKeys = getWeekKeys();

  // --------------------------
  // Render Header
  // --------------------------

  function renderHeaderRow() {
    const headerRow = document.getElementById("header-row");
    headerRow.innerHTML = "";

    const habitCol = document.createElement("div");
    habitCol.style.padding = "10px";
    habitCol.style.color = "#0b3b58";
    habitCol.textContent = "Habit";
    headerRow.appendChild(habitCol);

    weekKeys.forEach((dateStr) => {
      const col = document.createElement("div");
      col.style.padding = "10px";
      col.style.color = "#0b3b58";
      const d = new Date(dateStr);
      const options = { weekday: "short", day: "numeric" };
      col.textContent = d.toLocaleDateString(undefined, options);
      headerRow.appendChild(col);
    });

    ["Streak", "Actions"].forEach((text) => {
      const col = document.createElement("div");
      col.style.padding = "10px";
      col.style.color = "#0b3b58";
      col.textContent = text;
      headerRow.appendChild(col);
    });
  }

  renderHeaderRow();

  // --------------------------
  // Habit Helpers
  // --------------------------

  function newHabit(name) {
    return {
      id: Math.random().toString(36).slice(2, 9),
      name: name,
      log: {},
    };
  }

  function saveState(stateObj) {
    localStorage.setItem("habitTrackerState", JSON.stringify(stateObj));
  }

  function computeStreak(habit) {
    let count = 0;
    const d = new Date();
    while (true) {
      const key = d.toISOString().split("T")[0];
      if (habit.log[key]) {
        count++;
        d.setDate(d.getDate() - 1);
      } else break;
    }
    return count;
  }

  // --------------------------
  // Render UI
  // --------------------------

  function render() {
    rows.innerHTML = "";

    if (state.habits.length === 0) {
      const row = document.createElement("div");
      row.className = "habit-row";

      const nameCol = document.createElement("div");
      nameCol.textContent = "No habits yet.";
      row.appendChild(nameCol);

      weekKeys.forEach(() => row.appendChild(document.createElement("div")));

      const streakCol = document.createElement("div");
      streakCol.textContent = "0";
      row.appendChild(streakCol);

      const actionsCol = document.createElement("div");
      actionsCol.textContent = "Add a habit";
      row.appendChild(actionsCol);

      rows.appendChild(row);
      return;
    }

    state.habits.forEach((h) => {
      const row = document.createElement("div");
      row.className = "habit-row";

      const nameCol = document.createElement("div");
      nameCol.textContent = escapeHTML(h.name);
      row.appendChild(nameCol);

      weekKeys.forEach((k) => {
        const col = document.createElement("div");
        col.style.padding = "10px";
        col.style.textAlign = "center";

        const btn = document.createElement("button");
        btn.type = "button";
        btn.setAttribute("aria-label", `${h.name} on ${k}`);
        btn.setAttribute("role", "checkbox");

        const checked = !!h.log[k];
        btn.setAttribute("aria-checked", String(checked));
        btn.textContent = checked ? "✓" : "";
        btn.dataset.habitId = h.id;
        btn.dataset.dateKey = k;

        btn.style.cssText = `
          display:flex;
          align-items:center;
          justify-content:center;
          width:36px;
          height:36px;
          margin:auto;
          border-radius:8px;
          border:1px solid #dbe7f0;
          cursor:pointer;
          user-select:none;
          background:${checked ? "#e9f8ef" : "#fff"};
          color:${checked ? "#1e9e4a" : "inherit"};
          font-weight:${checked ? "700" : "400"};
        `;

        btn.addEventListener("click", onToggleDay);
        btn.addEventListener("keydown", (e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            btn.click();
          }
        });

        col.appendChild(btn);
        row.appendChild(col);
      });

      const streakCol = document.createElement("div");
      streakCol.textContent = String(computeStreak(h));
      row.appendChild(streakCol);

      const actions = document.createElement("div");
      const tick = document.createElement("button");
      tick.textContent = "Tick today";
      tick.addEventListener("click", () => toggleLog(h.id, todayKey()));
      actions.appendChild(tick);

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "✕";
      deleteBtn.addEventListener("click", () => {
        if (confirm(`Delete "${h.name}"?`)) {
          state.habits = state.habits.filter((x) => x.id !== h.id);
          saveState(state);
          render();
        }
      });
      actions.appendChild(deleteBtn);

      row.appendChild(actions);
      rows.appendChild(row);
    });
  }

  // --------------------------
  // Event Handlers
  // --------------------------

  function onToggleDay(e) {
    const btn = e.currentTarget;
    toggleLog(btn.dataset.habitId, btn.dataset.dateKey);
  }

  function toggleLog(habitId, dateKey) {
    const habit = state.habits.find((h) => h.id === habitId);
    if (habit) {
      habit.log[dateKey] = !habit.log[dateKey];
      saveState(state);
      render();
    }
  }

  function showError(message) {
    let errorEl = document.getElementById("habit-error");
    if (!errorEl) {
      errorEl = document.createElement("div");
      errorEl.id = "habit-error";
      errorEl.style.color = "red";
      errorEl.style.marginTop = "5px";
      document.getElementById("habit-form").appendChild(errorEl);
    }
    errorEl.textContent = message;
  }

  // --------------------------
  // Form and Buttons
  // --------------------------

  document.getElementById("habit-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("habit-name");
    const name = input.value.trim();
    if (!name) return;

    const exists = state.habits.some(
      (h) => h.name.toLowerCase() === name.toLowerCase()
    );

    if (exists) {
      showError("Habit already exists");
      return;
    }

    showError("");
    state.habits.push(newHabit(name));
    saveState(state);
    input.value = "";
    render();
  });

  document.getElementById("export-json").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(state, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "habits-export.json";
    a.click();

    URL.revokeObjectURL(url);
  });

  document.getElementById("import-json").addEventListener("change", async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      if (!isValidState(data)) throw new Error("Invalid format");

      state = data;
      saveState(state);
      render();
      alert("Import complete. Data loaded.");
    } catch {
      alert("Import failed. Please check the JSON file format.");
    }

    e.target.value = "";
  });

  document.getElementById("reset-all").addEventListener("click", () => {
    if (!confirm("Delete all habits and logs?")) return;
    state = { habits: [] };
    saveState(state);
    render();
    alert("All data reset.");
  });

  // --------------------------
  // Initial Render
  // --------------------------

  render();
});
