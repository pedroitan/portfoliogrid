const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

// Read the Excel file
const workbook = XLSX.readFile(path.join(__dirname, 'Portfolio Youtube urls .xlsx'));
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const data = XLSX.utils.sheet_to_json(worksheet);

// Transform data to the videos.js format
const videos = data.map((row, index) => {
  // Determine platform from URL and fix URL format
  let platform = 'youtube';
  let url = row['URL'] || '';
  
  if (url.toLowerCase().includes('vimeo')) {
    platform = 'vimeo';
    
    // Fix Vimeo URLs that have the format vimeo.com/manage/videos/ID/HASH
    if (url.includes('/manage/videos/')) {
      // Extract the video ID
      const match = url.match(/\/manage\/videos\/([0-9]+)\//); 
      if (match && match[1]) {
        // Convert to the proper embed format
        url = `https://vimeo.com/${match[1]}`;
      }
    }
  }
  
  // Extract tags from Tags column
  let tags = [];
  if (row['Tags']) {
    // Split by comma or semicolon and convert to lowercase
    const tagString = String(row['Tags']);
    tags = tagString.split(/[,;]/).map(tag => tag.trim().toLowerCase()).filter(tag => tag.length > 0);
  }
  
  // Create video object
  return {
    id: index + 1,
    title: row['Direção AudioVisual'] || `Video ${index + 1}`,
    description: row['Funções'] || '',
    url: url,
    tags: tags,
    platform: platform,
    thumbnailImage: row['Thumbnail'] || null
  };
});

// Generate the videos.js content
const jsContent = `// Array of all videos with metadata
// thumbnailImage is optional - if provided, it will be used instead of the video thumbnail
// Add your custom thumbnail images to /public/images/thumbnails/ directory
export const videos = ${JSON.stringify(videos, null, 2)};
`;

// Write to videos.js
fs.writeFileSync(path.join(__dirname, 'videos.js'), jsContent);

console.log(`Successfully converted ${videos.length} videos from Excel to videos.js`);
