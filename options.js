let environmentList;

//Save options to local chrome storage
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

document.getElementById('save').addEventListener('click', saveOptions);

//Get options from local chrome storage when option page opens
const restoreOptions = () => {
    chrome.storage.local.get(
        { loggingStyle: 'prettier' },
        (items) => {
            document.getElementById('loggingStyle').value = items.loggingStyle;
        }
    );

    chrome.storage.local.get(
        { environmentList: [] },
        (items) => {
            environmentList = items.environmentList;
        }
    );
};

document.addEventListener('DOMContentLoaded', restoreOptions);
