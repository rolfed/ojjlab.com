export const toggleCalendarView = (document: Document) => {
  const dayButton = document.querySelector<HTMLButtonElement>("#dayViewBtn");
  const weekButton = document.querySelector<HTMLButtonElement>("#weekViewBtn");
  const scheduleElement = document.querySelector<HTMLElement>("#schedule");

  if (!scheduleElement || !dayButton || !weekButton) {
    console.error("Unable to find schedule elements");
    return;
  }

  // Collect nodes and keep original DOM order
  const nodeList = scheduleElement.querySelectorAll<HTMLElement>("[data-schedule]");
  const dayMap = new Map<number, HTMLElement>();
  const inDomOrder: HTMLElement[] = [];

  nodeList.forEach((el) => {
    const n = Number(el.dataset.schedule);
    if (Number.isFinite(n) && n >= 1 && n <= 7) {
      dayMap.set(n, el);
      inDomOrder.push(el); // preserve original order for week view
    }
  });

  // Compute today's index and element
  const todayIndex = getPacificDayNameIndex();
  // Fallback to the first card if a matching element isn't found
  const todayEl = dayMap.get(todayIndex) ?? inDomOrder[0] ?? null;

  // Ensure "today" card is first in the DOM once
  if (todayEl) {
    scheduleElement.prepend(todayEl);
  }

  // Initial render based on current aria-pressed
  if (dayButton.getAttribute("aria-pressed") === "true") {
    showOnlyToday(todayEl, nodeList, scheduleElement);
  } else {
    showAllWeek(todayEl, inDomOrder, scheduleElement);
  }

  // Wire events
  dayButton.addEventListener("click", () => {
    setPressed(dayButton, weekButton);
    showOnlyToday(todayEl, nodeList, scheduleElement);
  });

  weekButton.addEventListener("click", () => {
    setPressed(weekButton, dayButton);
    showAllWeek(todayEl, inDomOrder, scheduleElement);
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

const showOnlyToday = (
  todayEl: HTMLElement | null,
  nodeList: NodeListOf<HTMLElement>,
  scheduleEl: HTMLElement
) => {
  if (todayEl) scheduleEl.prepend(todayEl);
  nodeList.forEach((el) => {
    el.toggleAttribute("hidden", el !== todayEl);
  });
};

const showAllWeek = (
  todayEl: HTMLElement | null,
  inDomOrder: HTMLElement[],
  scheduleEl: HTMLElement
) => {
  if (todayEl) {
    // Put today first
    scheduleEl.prepend(todayEl);
  }
  // Append the rest in original order (skipping today so we don't duplicate/move it again)
  inDomOrder.forEach((el) => {
    if (el !== todayEl) scheduleEl.append(el);
  });
  // Unhide all
  inDomOrder.forEach((el) => el.removeAttribute("hidden"));
};

const setPressed = (pressedBtn: HTMLButtonElement, otherBtn: HTMLButtonElement) => {
  pressedBtn.setAttribute("aria-pressed", "true");
  otherBtn.setAttribute("aria-pressed", "false");
};

