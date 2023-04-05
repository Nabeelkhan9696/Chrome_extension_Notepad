document.addEventListener('DOMContentLoaded', () => {
  const notesArea = document.getElementById('notes');
  const saveButton = document.getElementById('save');

  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    const tab = tabs[0];
    const url = tab.url;

    chrome.storage.sync.get(url, items => {
      if (items[url]) {
        notesArea.value = items[url];
      }
    });
  });

  saveButton.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      const tab = tabs[0];
      const url = tab.url;
      const notes = notesArea.value;

      chrome.storage.sync.set({ [url]: notes }, () => {
        window.close();
      });
    });
  });
});
