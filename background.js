const badgeClicked = (loggingStyle) => {
    let pageData;

    const logPageData = () => {
        let date = new Date(Date.now()).toLocaleTimeString();

        if (loggingStyle === 'prettier') {
            let groupLabel = '%cPage Data (' + date + "):"
            let logStyling = 'color: cyan; font-weight: bold;';
            console.group(groupLabel, logStyling);
            console.log(pageData);

            if (pageData.validationErrors.length > 0) {
                console.warn('Validation errors were found.');
            }

            if (Object.keys(pageData.integratorErrors).length > 0) {
                console.warn('Integration errors were found.');
            }

            console.groupEnd(groupLabel);
        }
        else {
            console.log(pageData);
        }
    }

    if (typeof angular != 'undefined' && typeof angular.element('.unqorkio-form').scope().submission != 'undefined') {
        pageData = angular.element('.unqorkio-form').scope().submission;
        logPageData();
    }
    else {
        console.log('No unqork page data found.');
    }
}

let loggingStyle;

chrome.storage.local.get(
    { loggingStyle: 'prettier' },
    (items) => {
        loggingStyle = items.loggingStyle;
    }
);

chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes) {
        loggingStyle = changes.loggingStyle.newValue;
    }
});

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target : {tabId : tab.id},
        func : badgeClicked,
        args : [ loggingStyle ],
        world : 'MAIN'
    })
});

