/**
 * Script to convert Excel data to videos.js format
 * Usage: node convert-excel-to-videos.js
 * 
 * Features:
 * - Converts Excel data to videos.js format
 * - Preserves manual thumbnail settings
 * - Updates only new/changed videos
 * - Automatically detects YouTube/Vimeo platforms
 */

const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// Path to the Excel file
const excelPath = path.join(__dirname, '../src/data/Portfolio Youtube urls.xlsx');

// Path to output the videos.js file
const outputPath = path.join(__dirname, '../src/data/videos.js');

// Load existing videos.js file if it exists to preserve thumbnails and other custom data
let existingVideos = [];
try {
  // A bit of a hack to load the existing videos.js file
  const existingContent = fs.readFileSync(outputPath, 'utf8');
  
  // Extract the array part from the file (between 'export const videos = ' and '];')
  const arrayMatch = existingContent.match(/export const videos = (\[\s*\S*?\]);/);
  if (arrayMatch && arrayMatch[1]) {
    // Parse the array part
    const videosArray = arrayMatch[1].replace(/,\s*\]$/, ']');
    existingVideos = JSON.parse(videosArray);
    console.log(`Loaded ${existingVideos.length} existing videos from videos.js`);
  }
} catch (error) {
  console.log('No existing videos.js file found or unable to parse it. Creating new file.');
}

// Function to determine platform from URL
function getPlatform(url) {
  if (!url) return 'youtube';
  if (url.includes('vimeo.com')) return 'vimeo';
  return 'youtube';
}

// Function to process the tags string into an array
function processTags(tagsString) {
  if (!tagsString || typeof tagsString !== 'string') return [];
  
  // Split by commas and clean up the tags
  return tagsString.split(',')
    .map(tag => tag.trim().toLowerCase())
    .filter(tag => tag.length > 0);
}

// Function to process the "Funções" column into additional tags
function processFunctions(functionString) {
  if (!functionString || typeof functionString !== 'string') return [];
  
  // Split by commas and clean up the function tags
  return functionString.split(',')
    .map(func => func.trim().toLowerCase())
    .filter(func => func.length > 0);
}

// Function to sort tags by frequency (most used first)
function sortTagsByFrequency(tags, videos) {
  // Count tag frequency
  const tagCount = {};
  videos.forEach(video => {
    if (video.tags && Array.isArray(video.tags)) {
      video.tags.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });
    }
  });
  
  // Sort tags by frequency (most used first)
  return tags.sort((a, b) => {
    // Always keep 'todos' at the beginning
    if (a === 'todos') return -1;
    if (b === 'todos') return 1;
    return (tagCount[b] || 0) - (tagCount[a] || 0);
  });
}

// Function to get a key for comparing videos (to detect changes)
function getVideoKey(video) {
  return `${video.title}|${video.url}`;
}

// Convert Excel to videos.js format
function convertExcelToVideos() {
  try {
    // Read Excel file
    const workbook = xlsx.readFile(excelPath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON
    const jsonData = xlsx.utils.sheet_to_json(worksheet);
    
    // Create a map of existing videos for faster lookup by title+url
    const existingVideoMap = new Map();
    existingVideos.forEach(video => {
      existingVideoMap.set(getVideoKey(video), video);
    });
    
    // Format the data for videos.js
    const videosData = jsonData.map((row, index) => {
      // Get the primary URL (preferring YouTube over Vimeo)
      const url = row.URL || row.URL2 || '';
      const title = row['Direção AudioVisual'] || `Video ${index + 1}`;
      
      // Extract tags from the Tags column
      const tagTags = processTags(row.Tags);
      
      // Extract additional tags from the Funções column
      const functionTags = processFunctions(row['Funções']);
      
      // Combine all tags
      const combinedTags = [...new Set([...tagTags, ...functionTags])];
      
      // Create a new video object
      const newVideo = {
        id: index + 1,
        title: title,
        description: row['Funções'] || '',
        url: url,
        tags: combinedTags,
        platform: getPlatform(url),
        thumbnailImage: null
      };
      
      // Check if this video already exists in our data
      const videoKey = getVideoKey(newVideo);
      const existingVideo = existingVideoMap.get(videoKey);
      
      if (existingVideo) {
        // Preserve thumbnailImage from existing video if it exists
        if (existingVideo.thumbnailImage) {
          newVideo.thumbnailImage = existingVideo.thumbnailImage;
          console.log(`Preserved thumbnail for: ${title}`);
        }
        
        // Preserve other custom fields you might want to keep
        // For example: newVideo.customField = existingVideo.customField;
      }
      
      return newVideo;
    });
    
        // Extract all unique tags for filtering
    const tagSet = new Set();
    videosData.forEach(video => {
      if (video.tags && Array.isArray(video.tags)) {
        video.tags.forEach(tag => {
          // Skip adding 'todos' as a regular tag since we'll add it manually at the beginning
          if (tag !== 'todos') {
            tagSet.add(tag);
          }
        });
      }
    });
    
    // Get sorted tags (by frequency)
    const sortedTags = sortTagsByFrequency(['todos', ...Array.from(tagSet)], videosData);
    
    // Create the videos.js file content
    const fileContent = `// Array of all videos with metadata
// thumbnailImage is optional - if provided, it will be used instead of the video thumbnail
// Add your custom thumbnail images to /public/images/thumbnails/ directory
export const videos = ${JSON.stringify(videosData, null, 2)};

// All tags sorted by frequency for filtering
export const allTags = ${JSON.stringify(sortedTags, null, 2)};
`;

    // Write the output file
    // Write the output file
    fs.writeFileSync(outputPath, fileContent);
    console.log('Successfully converted Excel data to videos.js');
    console.log(`Output file: ${outputPath}`);
    console.log('-----------------------------------');
    console.log(`Total videos processed: ${jsonData.length}`);
    
    // Count preserved thumbnails
    const preservedCount = videosData.filter(v => v.thumbnailImage !== null).length;
    console.log(`Thumbnails preserved: ${preservedCount}`);
    
    // Show extracted tags
    console.log(`Total unique tags extracted: ${sortedTags.length-1}`);
    console.log('Tags for filtering:', sortedTags.join(', '));
    
  } catch (error) {
    console.error('Error converting Excel to videos.js:', error);
  }
}

// Run the conversion
convertExcelToVideos();
