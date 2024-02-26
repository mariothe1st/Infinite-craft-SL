// content.js

function saveLocalStorage() {
    var localStorageContent = JSON.stringify(localStorage);
    var blob = new Blob([localStorageContent], { type: 'application/json' });
    var url = URL.createObjectURL(blob);
    chrome.downloads.download({
      url: url,
      filename: 'localStorageBackup.json',
      saveAs: true
    });
  }
  
  function loadLocalStorage() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
  
    input.onchange = function(event) {
      var file = event.target.files[0];
      if (!file) return;
  
      var reader = new FileReader();
      reader.onload = function(event) {
        try {
          var localStorageContent = JSON.parse(event.target.result);
          for (var key in localStorageContent) {
            if (localStorageContent.hasOwnProperty(key)) {
              localStorage.setItem(key, localStorageContent[key]);
            }
          }
          alert('localStorage loaded successfully!');
        } catch (error) {
          console.error('Error loading localStorage:', error);
          alert('Error loading localStorage!');
        }
      };
      reader.readAsText(file);
    };
  
    input.click();
  }
  
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'saveLocalStorage') {
      saveLocalStorage();
    } else if (request.action === 'loadLocalStorage') {
      loadLocalStorage();
    }
  });
  