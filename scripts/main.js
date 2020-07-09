let onclick = document.querySelector('#listControl');
onclick.addEventListener('click', menuListControl);

function menuListControl() {
    let menu = document.querySelector(".weeklyLinks");
    if (menu.style.display === "block") {
      menu.style.display = "none";
    } else {
      menu.style.display = "block";
    }
  }
