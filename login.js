//נעבוד על מערך זמני (TEMP) כדי לעשות שינויים ולשחק עם הדאטה
let visitorsForView = [...visitors];
const dialog = document.querySelector("#visitor-dialog");

// יצירת תבנית של אובייקט - כרטיסיית אורח והזרקתה לHTML
const getVisitorHTMLCard = (visitor) => {
  const template = `
      <div class="card" style="min-height: 360px;" >
        <img class="card-img" src="${visitor.image}" alt="${visitor.name}"/>
        <div class="card-body">
          <p class="card-text">${visitor.name}</p>
          <p class="card-text">Coins: ${visitor.coins}</p>
        </div>
      </div>`;

  const wrapper = document.createElement("div");
  wrapper.className = "visitor-card";
  wrapper.innerHTML = template;

  //לחיצה על תמונת האורח שפותחת את הודעת המודל עם פרטי האורח
  wrapper.addEventListener("click", () => handleVisitorClick(visitor));
  return wrapper;
};

//הכפתור שסוגר את המודל
const getCloseModalHTMLButton = () => {
  const closeButton = document.createElement("button");
  closeButton.innerText = "close modal";
  closeButton.addEventListener("click", () => dialog.close());
  return closeButton;
};

//הפונקציה שמחזיקה את כל האלמנטיים בתוך הודעת המודל
const handleVisitorClick = (visitor) => {
  dialog.innerHTML = "";
  const visitorCard = getVisitorHTMLCard(visitor);
  const closeButton = getCloseModalHTMLButton();
  const loginButton = document.createElement("button");
  loginButton.textContent = "Login";
  loginButton.onclick = () => loginAsVisitor(visitor.name); // Triggers login
  dialog.append(closeButton, loginButton, visitorCard);
  dialog.showModal();
};

//תיבת חיפוש דינמית לאורח
const getSearchBox = () => {
  const queryInput = document.createElement("input");
  queryInput.id = "query-input";
  queryInput.placeholder = "Search visitor";
  queryInput.className = "form-control my-4";
  queryInput.oninput = (e) => {
    visitorsForView = visitors.filter((visitor) =>
      visitor.name.includes(e.target.value)
    );
    renderVisitors();
  };
  return queryInput;
};

//הצגת הודעה ריקה כאשר האורח שרשמת לא נמצא במערכת
const getEmptyCardsHTMLTemplate = () => {
  const templateWrapper = document.createElement("div");
  templateWrapper.className = "empty-result";

  const template = `
    <h2>No visitors Found</h2>
    <p>We're sorry, but no visitors match your search or filter criteria.</p>
    <button id="clear-filter-btn" class="btn btn-dark">Clear search text</button>`;

  templateWrapper.innerHTML = template;
  templateWrapper.children["clear-filter-btn"].addEventListener(
    "click",
    clearSearchBox
  );
  return templateWrapper;
};

//כפתור שמנקה את תיבת החיפוש
const clearSearchBox = () => {
  const input = document.getElementById("query-input");
  input.value = "";
  visitorsForView = [...visitors];
  renderVisitors();
};

//פוקנציה שמרנדרת את הכרטיסים לעמוד
const renderVisitors = () => {
  const visitorCards = visitorsForView.map(getVisitorHTMLCard);
  const visitorsPlaceholder = document.getElementById("place-holder");
  visitorsPlaceholder.innerHTML = "";

  if (!visitorCards.length) {
    visitorsPlaceholder.appendChild(getEmptyCardsHTMLTemplate());
  }
  visitorsPlaceholder.append(...visitorCards);
};

document.body.insertAdjacentElement("afterbegin", getSearchBox());
window.addEventListener("load", renderVisitors);

//מוצאת את האורח שהתחברנו איתו,ושומרת אותו בלוקל סטורג' ומוציאה הודעה
function loginAsVisitor(visitorname) {
  visitors.forEach((visitor) => {
    if (visitor.name === visitorname) {
      localStorage.setItem("currentVisitor", JSON.stringify(visitor));
      alert(`${visitorname} is now logged in.`);
      window.location.href = "/zoo.html";
      return;
    }
  });
}
