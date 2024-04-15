const bg_color = '#ffc7b3';
const op_username = document.querySelector('.hnuser').innerHTML;
const comments = document.querySelectorAll(".athing.comtr");
for(i=0;i<comments.length;i++){
    let username_element = comments[i].querySelector('.hnuser');
    if (op_username === username_element.innerHTML)
    {
        username_element.innerHTML = `<strong>${op_username} (OP)</strong>`;
        comments[i].style.background = bg_color;
    }
}
