async function initPopup() {
  const CATEGORIES = await loadConfig(); // Get data from CSV
  const container = document.getElementById('controls');
  
  chrome.storage.sync.get('userSettings', (result) => {
    const savedSettings = result.userSettings || {};

    CATEGORIES.forEach(cat => {
      const div = document.createElement('div');
      div.innerHTML = `
        <label>${cat.label}</label>
        <input type="color" id="${cat.id}" value="${savedSettings[cat.id] || cat.default}">
      `;
      container.appendChild(div);
      
      div.querySelector('input').addEventListener('input', () => saveAll(CATEGORIES));
    });
  });
}

initPopup();