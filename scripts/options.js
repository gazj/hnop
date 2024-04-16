// Set default option values.
const default_background_color = '#ffc7b3';
const default_format_string = '%OP% (OP)';

// Define set status as anonymous function for reusability.
const setStatus = (message) => {
    const status = document.getElementById('status');
    status.textContent = message;
    setTimeout(() => {
        status.textContent = '';
    }, 2000);
};

// Define safe options listener as anonymous function for reusability.
const saveOptions = () => {
  const background_color = document.getElementById('background-color').value;
  const format_string = document.getElementById('format-string').value;
  if (!background_color || !format_string)
  {
    setStatus('Cannot save empty options.');
    return;
  }
  chrome.storage.sync.set(
    {
        "background_color": background_color,
        "format_string": format_string
    }, () => {
      setStatus('Options saved!');
    }
  );
};

// Set content loaded listener.
document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.sync.get(
    {
        "background_color": default_background_color,
        "format_string": default_format_string,
    },
    (items) => {
      document.getElementById('background-color').value = items.background_color;
      document.getElementById('format-string').value = items.format_string;
    }
  );
});

// Set reset options listener.
document.getElementById('reset').addEventListener('click', () => {
  document.getElementById('background-color').value = default_background_color;
  document.getElementById('format-string').value = default_format_string;
  saveOptions();
});

// Set save options listener.
document.getElementById('save').addEventListener('click', saveOptions);

// Update the options icon based on the current URL.
chrome.tabs.query({
    active: true,
    currentWindow: true
}, (tabs) => {
    if(!tabs.length) return;
    let icon_path = tabs[0].url.indexOf("https://news.ycombinator.com/item?id=") >= 0
        ? "../images/icon-128.png" : "../images/icon-128-inactive.png";
    document.getElementById("logo").src = icon_path;
});

// Make external links clickable.
const ext_links = document.querySelectorAll('a.ext-link')
for(i=0;i<ext_links.length;i++)
{
    let url = ext_links[i].href;
    ext_links[i].addEventListener('click', () => {
        chrome.tabs.create({ url: url });
    });
}