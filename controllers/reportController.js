
const Report = require('../models/Report');
const { getReportsFromGoogleSheets } = require('../googleSheetsService');

// Fetch reports from MongoDB and Google Sheets
const getReports = async (req, res) => {
    try {
        // Fetch from MongoDB
        const mongoReports = await Report.find();

        // Fetch from Google Sheets
        const googleSheetReports = await getReportsFromGoogleSheets();

        // Combine both sources
        const allReports = [...mongoReports, ...googleSheetReports];

        res.json(allReports);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reports', error });
    }
};

module.exports = { getReports };
