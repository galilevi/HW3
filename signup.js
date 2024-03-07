//תפיסת הדיב של תמונות האבטר
let selectedAvatar;
document.getElementById("choose-avatar").addEventListener("click", function () {
  const panel = document.getElementById("avatar-panel");
  window.location.href = "#avatar-panel";
  panel.style.display = panel.style.display === "none" ? "block" : "none";
});

//בחירת תמונת אווטר בהרשמת אורח
document.querySelectorAll(".avatar").forEach((image) => {
  image.addEventListener("click", function () {
    selectedAvatar = this.getAttribute("src");
    document
      .querySelectorAll(".avatar")
      .forEach((i) => i.classList.remove("selected"));
    this.classList.add("selected");
    document.getElementById("avatar-panel").style.display = "none";
    localStorage.setItem("selectedAvatar", selectedAvatar);
  });
});

//פונקציה של יצירת אורח חדש במערכת
function createNewVisitor(event) {
  event.preventDefault();
  const nameInput = document.getElementById("name");
  const name = nameInput.value.trim();

  if (!name) {
    alert("Name cannot be empty!)");
    return;
  }

  if (!selectedAvatar) {
    alert("please select an avatar!");
    return;
  }

  if (visitorExists(name)) {
    alert("A visitor with this name already exists!");
    return;
  }
  //הכנסת המשתמש החדש ללוקל סטורג' ומעבר לעמוד ההתחברות
  const newVisitor = makeVisitor(name, selectedAvatar);
  visitors.push(newVisitor);
  localStorage.setItem("visitors", JSON.stringify(visitors));
  window.location.href = "/login.html";
}

//בדיקה האם האורח קיים
function visitorExists(name) {
  return visitors.some((visitor) => visitor.name === name);
}

// תבנית של אורח
function makeVisitor(name, avatar) {
  return { name, coins: 50, image: avatar };
}

const createForm = document.getElementById("create-visitor-form");
if (createForm) {
  createForm.addEventListener("submit", createNewVisitor);
}
