console.log("options.js loaded!");
const default_background_color = '#ffc7b3';
const default_format_string = '%OP% (OP)';
const setStatus = (message) => {
    const status = document.getElementById('status');
    status.textContent = message;
    setTimeout(() => {
        status.textContent = '';
    }, 2000);
};
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
const loadOptions = () => {
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
};
const resetOptions = () => {
  document.getElementById('background-color').value = default_background_color;
  document.getElementById('format-string').value = default_format_string;
  saveOptions();
};
document.addEventListener('DOMContentLoaded', loadOptions);
document.getElementById('save').addEventListener('click', saveOptions);
document.getElementById('reset').addEventListener('click', resetOptions);