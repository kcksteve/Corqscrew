//Get options when run
let loggingStyle;

chrome.storage.local.get(
    { loggingStyle: 'prettier' },
    (items) => {
        loggingStyle = items.loggingStyle;
    }
);

//Watch for option changes
chrome.storage.onChanged.addListener((changes, area) => {
    if (area === 'local' && changes) {
        loggingStyle = changes.loggingStyle.newValue;
    }
});

//Log after button is clicked
const badgeClicked = (loggingStyle) => {
    let pageData = null;
    let cacheData = null;

    const logPageData = () => {
        let date = new Date(Date.now()).toLocaleTimeString();

        if (loggingStyle === 'prettier') {
            let mainGroupLabel = '%cUnqork Data Found (' + date + '):'
            let subGroupLabel = '%cSubmission Data'
            let cacheGroupLabel = '%cCache Data'
            let logStyling = 'color: cyan; font-weight: bold;';
            console.group(mainGroupLabel, logStyling);
            console.group(subGroupLabel, logStyling);
            console.log(pageData);
            console.groupEnd(subGroupLabel);

            if (cacheData != null && Object.keys(cacheData).length > 0) {
                console.group(cacheGroupLabel, logStyling);
                console.log(cacheData);
                console.groupEnd(cacheGroupLabel);
            }

            if (pageData.validationErrors.length > 0) {
                console.warn('Validation errors were found.');
            }

            if (Object.keys(pageData.integratorErrors).length > 0) {
                console.warn('Integration errors were found.');
            }

            console.groupEnd(mainGroupLabel);
        }
        else {
            console.log(pageData);
        }
    }

    //Verify what is available to log
    if (typeof angular != 'undefined') {
        if (typeof angular.element(document.body).injector().get("CacheService").cache != 'undefined') {
            cacheData = angular.element(document.body).injector().get("CacheService").cache
        }

        if (typeof angular.element('.unqorkio-form').scope().submission != 'undefined') {
            pageData = angular.element('.unqorkio-form').scope().submission;
            logPageData();
        }
    }
    else {
        console.log('No unqork page data found.');
    }
}

//Listen for badge click
chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target : {tabId : tab.id},
        func : badgeClicked,
        args : [ loggingStyle ],
        world : 'MAIN'
    })
});