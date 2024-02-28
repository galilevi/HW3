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

wrapper.addEventListener("click", () => loginAsVisitor (visitor.name));
return wrapper;
};

const getCloseModalHTMLButton = () => {
  const closeButton = document.createElement("button");
  closeButton.innerText="close modal";
  closeButton.addEventListener("click",()=> dialog.close ())
  return closeButton;
}

function loginAsVisitor(visitorName) {
  // תממשו את הלוגיקה של בחירת אורח שנכנס לגן החיות
  // שמרו את האורח שבחרתם, בלוקל סטורג' כך שבכל העמודים נדע מי האורח הנוכחי


}

