document.addEventListener('DOMContentLoaded', async () => {
    const savedBrightness = localStorage.getItem('brightness') || 1;
  
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (value) => {
        let style = document.getElementById('dimmer-style');
        
        if (!style) {
          style = document.createElement('style');
          style.id = 'dimmer-style';
          document.head.appendChild(style);
        }
  
        style.textContent = `html { filter: brightness(${value}); transition: filter 0.3s ease; }`;
      },
      args: [savedBrightness]
    });
  
    const slider = document.getElementById('slider');
    if (slider) {
      slider.value = savedBrightness;
    }
  });
  
  document.getElementById('slider').addEventListener('input', async function () {
    const brightness = this.value;
  
    localStorage.setItem('brightness', brightness);
  
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: (value) => {
        let style = document.getElementById('dimmer-style');
        
        if (!style) {
          style = document.createElement('style');
          style.id = 'dimmer-style';
          document.head.appendChild(style);
        }
  
        style.textContent = `html { filter: brightness(${value}); transition: filter 0.3s ease; }`;
      },
      args: [brightness]
    });
  });
  
