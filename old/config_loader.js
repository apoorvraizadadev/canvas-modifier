async function loadConfig() {
  const response = await fetch(chrome.runtime.getURL('config.csv'));
  const csvText = await response.text();
  
  // Split by lines and map to objects
  const lines = csvText.split('\n').filter(line => line.trim() !== '');
  const headers = lines[0].split(',');

  return lines.slice(1).map(line => {
    // This regex handles commas inside quotes correctly
    const values = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
    const obj = {};
    headers.forEach((header, i) => {
      obj[header.trim()] = values[i].replace(/"/g, '').trim();
    });
    return obj;
  });
}