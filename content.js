// Function to apply the color
const applyColor = (color) => {
  document.documentElement.style.setProperty('--main-text-color', color);
};

// 1. Check storage immediately when the page loads
chrome.storage.local.get(['selectedColor'], (result) => {
  if (result.selectedColor) {
    applyColor(result.selectedColor);
  }
});

// 2. Listen for real-time updates from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "changeColor") {
    applyColor(request.color);
  }
});