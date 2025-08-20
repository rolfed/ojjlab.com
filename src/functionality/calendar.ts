export const toggleCalandarView = (document: Document) => {
    const dayButton = document.querySelector('#dayViewBtn');
    const weekButton = document.querySelector('#weekViewBtn');

    const scheduleElement = document.querySelector('#schedule');

    const today = getPacificDayName();


    dayButton?.addEventListener('click', () => {
        console.log('attr: ', scheduleElement?.attributes)
        console.log('today ', today);
    });
    
    weekButton?.addEventListener('click', () => {
        console.log('attr: ', scheduleElement?.attributes)
        console.log('today ', today);
    })
};

const getPacificDayName = (date: Date = new Date()): string => {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    timeZone: "America/Los_Angeles", // Pacific Time zone ID
  }).format(date);
}
