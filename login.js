let visitorsForView = [...visitors];
const dialog = document.querySelector("#visitor-dialog");

const getVisitorHTMLCard = (visitor) => {
  const template = `
      <div class="card" style="min-height: 360px;" >
        <img class="card-img" src="${visitor.image}" alt="${visitor.name}"/>
        <div class="card-body">
          <p class="card-text">${visitor.name}</p>
          <p class="card-text">Coins: ${visitor.coins}</p>
        </div>
      </div>`;

const wrapper = document.createElement("div")
wrapper.className= "visitor-card";
wrapper.innerHTML = template;

wrapper.addEventListener("click", () => handleVisitorClick (visitor));
return wrapper;
};

const getCloseModalHTMLButton = () => {
  const closeButton = document.createElement("button");
  closeButton.innerText="close modal";
  closeButton.addEventListener("click",()=> dialog.close ())
  return closeButton;
};

const handleVisitorClick = (visitor) => {
  dialog.innerHTML = "";
  const visitorCard = getVisitorHTMLCard(visitor);
  const closeButton = getCloseModalHTMLButton();
  const loginButton = document.createElement("button");
  loginButton.textContent = "Login";
  loginButton.onclick = () => loginAsVisitor(visitor.name); // Triggers login
  dialog.append(closeButton,loginButton, visitorCard);
  dialog.showModal();
};

const getSearchBox = () => {
  const queryInput = document.createElement("input");
  queryInput.id = "query-input";
  queryInput.placeholder = "Search visitor";
  queryInput.className = "form-control my-4";
  queryInput.oninput = (e) => {
    visitorsForView = visitors.filter((visitor) =>
    visitor.name.includes(e.target.value));
    renderVisitors();};
  return queryInput;
};

const getEmptyCardsHTMLTemplate = () => {
  const templateWrapper = document.createElement("div");
  templateWrapper.className = "empty-result";

  const template = `
    <h2>No visitors Found</h2>
    <p>We're sorry, but no visitors match your search or filter criteria.</p>
    <button id="clear-filter-btn" class="btn btn-dark">Clear search text</button>`;

  templateWrapper.innerHTML = template;
  templateWrapper.children["clear-filter-btn"].addEventListener("click",clearSearchBox);
  return templateWrapper;
};

const clearSearchBox = () => {
  const input = document.getElementById("query-input");
  input.value = "";
  visitorsForView = [...visitors];
  renderVisitors();
};

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



function loginAsVisitor(visitorname) {
  // תממשו את הלוגיקה של בחירת אורח שנכנס לגן החיות
  // שמרו את האורח שבחרתם, בלוקל סטורג' כך שבכל העמודים נדע מי האורח הנוכחי
const currentVisitor= localStorage.getItem("currentVisitor")

if(currentVisitor)
{
  const confirmLogout = confirm(`A visitor is already logged in ${currentVisitor}. Do you want to log out and switch to a different visitor?`);
  if (!confirmLogout){
    return;
  }
}
localStorage.setItem("currentVisitor", visitorname);
alert (`${visitorname} is now logged in.`);
window.location.href="/zoo.html";
}

