function applyStyles(settings) {
  CATEGORIES.forEach(cat => {
    const color = settings[cat.id] || cat.default;
    const elements = document.querySelectorAll(cat.selector);
    
    elements.forEach(el => {
      el.style.setProperty('color', color, 'important');
      // If it's a background category
      if (cat.id === 'bg') el.style.setProperty('background-color', color, 'important');
    });
  });
}

// Initial Load
chrome.storage.sync.get('userSettings', (result) => {
  applyStyles(result.userSettings || {});
});

// Update on message
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "update") applyStyles(msg.settings);
});