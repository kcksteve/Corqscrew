const getLoggingStyle = () => {
    chrome.storage.local.get(
        { loggingStyle: 'prettier' },
        (items) => {
            return items.loggingStyle;
        }
    );
};

const badgeClicked = () => {
    let pageData;
    let loggingStyle = getLoggingStyle();

    const logPageData = () => {
        if (loggingStyle === 'prettier') {
            console.log('Data:');
            console.log(angular.element('.unqorkio-form').scope().submission.data);
        }
        else {
            console.log(angular.element('.unqorkio-form').scope().submission);
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

