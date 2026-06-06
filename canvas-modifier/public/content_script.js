// content_script.js

// 1. Apply colors initially when the page loads
chrome.storage.local.get(null, (result) => {applyColorsToPage(result); });

// 2. Listen for real-time changes made by the user in the React popup
chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local') 
    {   
        applyColorsToPage(changes);
    }
});

// Helper function to inject or modify CSS variables
function applyColorsToPage(colors) 
{
    for (const [key, value] of Object.entries(colors))
    {
        document.documentElement.style.setProperty(key, value);
    }
}