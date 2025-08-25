export const toggleCalendarView = (document: Document) => {
  const dayButton = document.querySelector<HTMLButtonElement>("#dayViewBtn");
  const weekButton = document.querySelector<HTMLButtonElement>("#weekViewBtn");
  const scheduleEl = document.querySelector<HTMLElement>("#schedule");

  if (!scheduleEl || !dayButton || !weekButton) {
    console.error("Unable to find schedule elements");
    return;
  }

  const todayIndex = getPacificDayNameIndex(); // 1..7

  const getItems = (): HTMLElement[] =>
    Array.from(scheduleEl.querySelectorAll<HTMLElement>("[data-schedule]"))
      // ensure Mon..Sun sort by data-schedule
      .sort((a, b) => Number(a.dataset.schedule) - Number(b.dataset.schedule));

  const showOnlyToday = () => {
    const items = getItems();
    const todayEl = items.find((el) => Number(el.dataset.schedule) === todayIndex) ?? items[0] ?? null;
    // Hide all except today
    items.forEach((el) => el.toggleAttribute("hidden", el !== todayEl));
    // Ensure today is first visually (optional)
    if (todayEl) scheduleEl.prepend(todayEl);
  };

  const showRotatedWeek = () => {
    const items = getItems();
    const rotated = rotateByToday(items, todayIndex);
    // Rebuild DOM in rotated order
    scheduleEl.replaceChildren(...rotated);
    // Unhide all
    rotated.forEach((el) => el.removeAttribute("hidden"));
  };

  const setPressed = (pressedBtn: HTMLButtonElement, otherBtn: HTMLButtonElement) => {
    pressedBtn.setAttribute("aria-pressed", "true");
    otherBtn.setAttribute("aria-pressed", "false");
  };

  // Initial render based on current aria-pressed
  if (dayButton.getAttribute("aria-pressed") === "true") {
    showOnlyToday();
  } else {
    showRotatedWeek();
  }

  // Events
  dayButton.addEventListener("click", () => {
    setPressed(dayButton, weekButton);
    showOnlyToday();
  });

  weekButton.addEventListener("click", () => {
    setPressed(weekButton, dayButton);
    showRotatedWeek();
  });
};

const getPacificDayNameIndex = (date: Date = new Date()): number => {
  const dayName = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: "America/Los_Angeles",
  }).format(date);

  const map: Record<string, number> = {
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
    Sunday: 7,
  };

  return map[dayName] ?? 1;
};

const rotateByToday = (items: HTMLElement[], todayIndex: number): HTMLElement[] => {
  const pos = items.findIndex((el) => Number(el.dataset.schedule) === todayIndex);
  if (pos === -1) return items; // no rotation fallback
  // e.g., Tue → [Tue, Wed, Thu, Fri, Sat, Sun, Mon]
  return [...items.slice(pos), ...items.slice(0, pos)];
};

