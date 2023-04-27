const saveOptions = () => {
    const loggingStyle = document.getElementById('loggingStyle').value;

    chrome.storage.local.set(
      { loggingStyle: loggingStyle },
      () => {
        const saveButton = document.getElementById('save');
        saveButton.textContent = 'Saved...';
        setTimeout(() => {
            saveButton.textContent = 'Save';
        }, 1000);
      }
    );
};

const restoreOptions = () => {
    chrome.storage.local.get(
        { loggingStyle: 'prettier' },
        (items) => {
            document.getElementById('loggingStyle').value = items.loggingStyle;
        }
    );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);