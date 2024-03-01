let selectedAvatar;
document.getElementById("choose-avatar").addEventListener("click", function () {
  const panel = document.getElementById("avatar-panel");

  panel.style.display = panel.style.display === "none" ? "block" : "none";
});

document.querySelectorAll(".avatar").forEach((image) => {
  image.addEventListener("click", function () {
    selectedAvatar = this.getAttribute("src");
    document
      .querySelectorAll(".avatar")
      .forEach((i) => i.classList.remove("selected"));
    this.classList.add("selected");
    document.getElementById("avatar-panel").style.display = "none";

    // Store selected avatar in localStorage
    localStorage.setItem("selectedAvatar", selectedAvatar);
  });
});

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

  const newVisitor = makeVisitor(name, selectedAvatar);
  visitors.push(newVisitor); // Add new visitor to the visitors array
  localStorage.setItem("visitors", JSON.stringify(visitors)); // Save updated visitors array in localStorage
  window.location.href = "/login.html";
}

function visitorExists(name) {
  return visitors.some((visitor) => visitor.name === name);
}

function makeVisitor(name, avatar) {
  return { name, coins: 50, image: avatar };
}

const createForm = document.getElementById("create-visitor-form");
if (createForm) {
  createForm.addEventListener("submit", createNewVisitor);
}

/**
  צרו אורח חדש כאן 👇
  ניתן לפצל את הלוגיקה למספר בלתי מוגבל של פונקציות.
  כמו שיותר מפוצל וטהור - פונקציות עם מטרה יחידה ושם משמעותי שמסביר מה הפונקציה עושה ומחזירה
  דוגמא:

  const validateFormInputs = () => {
    בודק האם האינפוטים קיימים ויש בהם ערך
    מחזיר האם תקין או לא (בוליאני)
  }

  const visitorExists = (name) => {
    מקבל שם ומחזיר תשובה האם השם האורח קיים
  }

  const makeVisitor = (name) => {
    מקבל שם, בודק שאין אותו כבר במערך האורחים ומחזיר אובייקט אורח
  }
  **/

/**************************************
  מימשתי עבורכם את ההאזנה לאירוע שליחת טופס
  שימו לב כי האיידי של createForm
  זהה לאיידי של הטופס בעמוד signup.html
  אין לשנות אותו */
