const picker = document.getElementById('colorPicker');

// 1. Load the saved color when the popup opens
chrome.storage.local.get(['selectedColor'], (result) => {
  if (result.selectedColor) {
    picker.value = result.selectedColor;
  }
});

// 2. Save the color whenever it changes
picker.addEventListener('input', async (event) => {
  const color = event.target.value;

  // Save to Chrome's local storage
  chrome.storage.local.set({ selectedColor: color });

  // Send to the active tab (your existing code)
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, { action: "changeColor", color: color });
  }
});