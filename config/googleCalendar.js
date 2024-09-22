
const { google } = require('googleapis');
const calendar = google.calendar('v3');

// Assuming you have OAuth set up
async function addTaskToCalendar(task) {
    const auth = await authorize(); // your OAuth function

    const event = {
        summary: task.description,
        start: {
            dateTime: task.date.toISOString(),
            timeZone: 'Asia/Kolkata', // Changed to India/Mumbai time zone
        },
        end: {
            dateTime: new Date(task.date.getTime() + 60 * 60 * 1000).toISOString(), // 1 hour duration
            timeZone: 'Asia/Kolkata', // Changed to India/Mumbai time zone
        },
    };

    await calendar.events.insert({
        auth,
        calendarId: 'primary',
        resource: event,
    });
}

module.exports = { addTaskToCalendar };
