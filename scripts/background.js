const updateIcon = () => {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, (tabs) => {
        if(!tabs.length) return;
        let icon_path = tabs[0].url.indexOf("https://news.ycombinator.com/item?id=") >= 0
            ? "../images/icon-16.png" : "../images/icon-16-inactive.png";
        chrome.action.setIcon({ path: icon_path });
    });
};

["onActivated", "onCreated", "onUpdated"].forEach((e) => {
    chrome.tabs[e].addListener(updateIcon);
});

["onCreated", "onFocusChanged", "onRemoved"].forEach((e) => {
    chrome.windows[e].addListener(updateIcon);
});