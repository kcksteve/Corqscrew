const badgeClicked = () => {
    let pageData;
    let loggingStyle = 'prettier';

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

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target : {tabId : tab.id},
        func : badgeClicked,
        world : 'MAIN'
    })
});

