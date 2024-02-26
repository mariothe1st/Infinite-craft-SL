document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('saveButton').addEventListener('click', saveLocalStorage);
    document.getElementById('loadButton').addEventListener('click', loadLocalStorage);
  });
  
  function saveLocalStorage() {
    chrome.tabs.executeScript({
      code: `
      var localStorageContent = JSON.stringify(localStorage);
      var blob = new Blob([localStorageContent], { type: 'application/json' });
      var a = document.createElement('a');
      a.download = 'IC-Save.json';
      a.href = window.URL.createObjectURL(blob);
      a.dataset.downloadurl = ['application/json', a.download, a.href].join(':');
      a.click();
      alert("Downloading save file");
      `
    });
  }
  
  function loadLocalStorage() {
    chrome.tabs.executeScript({
      code: `
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
              alert('Save loaded successfully!');
              location.reload();
            } catch (error) {
              console.error('Error loading Save:', error);
              alert('Error loading Save!');
            }
          };
          reader.readAsText(file);
        };
        
        input.click();
      `
    });
  }
  