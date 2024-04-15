// Set default option values.
const default_background_color = '#ffc7b3';
const default_format_string = '%OP% (OP)';

// Get and apply options to document.
chrome.storage.sync.get(
    {
        "background_color": default_background_color,
        "format_string": default_format_string
    },
    (items) => {
        const op_username = document.querySelector('.hnuser').innerHTML;
        const comments = document.querySelectorAll(".athing.comtr");
        for(i=0;i<comments.length;i++)
        {
            let username_element = comments[i].querySelector('.hnuser');
            if (op_username === username_element.innerHTML)
            {
                username_element.innerHTML = `<strong>${op_username} (OP)</strong>`;
                username_element.innerHTML = items.format_string.replace('%OP%', op_username);
                comments[i].style.background = items.background_color;
            }
        }
    }
);

