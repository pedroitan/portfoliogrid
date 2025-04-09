/**
 * Script to analyze Excel file structure
 * Usage: node analyze-excel.js
 */

const xlsx = require('xlsx');
const path = require('path');

// Path to the Excel file
const excelPath = path.join(__dirname, '../src/data/Portfolio Youtube urls .xlsx');

function analyzeExcel() {
  try {
    // Read Excel file
    const workbook = xlsx.readFile(excelPath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON to see structure
    const jsonData = xlsx.utils.sheet_to_json(worksheet);
    
    if (jsonData.length === 0) {
      console.log('Excel file appears to be empty or has no data rows.');
      return;
    }

    // Print first row to see column structure
    console.log('Excel file structure:');
    console.log('----------------------');
    console.log('First row data:');
    console.log(jsonData[0]);
    console.log('\nColumn names:');
    console.log(Object.keys(jsonData[0]));
    console.log('\nTotal records:', jsonData.length);
    
  } catch (error) {
    console.error('Error analyzing Excel file:', error);
  }
}

// Run the analysis
analyzeExcel();
