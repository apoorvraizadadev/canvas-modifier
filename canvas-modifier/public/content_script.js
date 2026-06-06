// content_script.js

// 1. Apply colors initially when the page loads
chrome.storage.local.get(null, (result) => {applyColorsToPage(result); });

// 2. Listen for real-time changes made by the user in the React popup
chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'local') 
    {
        const newColors = {};

        for (const [key, value] of Object.entries(changes))
        {
            newColors[key] = value.newValue;
        }

        applyColorsToPage(newColors);
    }
});

// Helper function to inject or modify CSS variables
function applyColorsToPage(colors) 
{
    for (const [key, value] of Object.entries(colors))
    {
        console.log(value);
        document.documentElement.style.setProperty(key, value);
    }
}