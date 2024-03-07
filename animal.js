document.addEventListener("DOMContentLoaded", renderAnimal);

const currentAnimal = JSON.parse(localStorage.getItem("currentAnimal"));
let visitorsArr = JSON.parse(localStorage.getItem("visitors"));
const currentVisitor = JSON.parse(localStorage.getItem("currentVisitor"));

document.addEventListener("DOMContentLoaded", () => {
  updateVisitorInfo();
});

//פונקציה זו מכילה את פרטי האורח המחובר ,את כפתור איפוס האפליקציה ואופציית בחירת אורח אחר במידת הצורך
function updateVisitorInfo() {
  const divBtn = document.getElementById("btnclean");
  const resetButton = document.getElementById("btnReset");
  resetButton.addEventListener("click", clearLocalStorage);
  divBtn.appendChild(resetButton);

  const visitorInfo = document.getElementById("visitorInfo");
  visitorInfo.innerHTML = `Visitor Name: ${currentVisitor.name},  Coins: ${currentVisitor.coins}`;

  const selectvisitor = document.getElementById("visitorlist");
  for (let i = 0; i < visitors.length; i++) {
    const option = document.createElement("option");
    option.value = visitors[i].name;
    option.text = visitors[i].name;
    selectvisitor.appendChild(option);
  }
}

//פונקציית עזר - מרעננת את העמוד לאחר בחירת אורח חדש דרך התיבת select
function setVisitor(value) {
  for (let i = 0; i < visitors.length; i++) {
    if (visitors[i].name === value) {
      localStorage.setItem("currentVisitor", JSON.stringify(visitors[i]));
    }
  }
  location.reload();
}

//מאפס את הלוקל סטורג בזמן לחיצה על RESET
function clearLocalStorage() {
  localStorage.clear();
  window.location.href = "signup.html";
}

//מציג את כרטיסיית החיה הספציפית שבחרנו לבקר או להאכיל
function renderAnimal() {
  document.getElementById(
    "image"
  ).innerHTML = `<img src="${currentAnimal.image}" alt="${currentAnimal.name}" style="width:100%;">`;
  document.getElementById("name").textContent = `Name: ${currentAnimal.name}`;
  document.getElementById(
    "weight"
  ).textContent = `Weight: ${currentAnimal.weight}kg`;
  document.getElementById(
    "height"
  ).textContent = `Height: ${currentAnimal.height}cm`;
  document.getElementById(
    "color"
  ).textContent = `Color: ${currentAnimal.color}`;
  document.getElementById(
    "habitat"
  ).textContent = `Habitat: ${currentAnimal.habitat}`;
  document.getElementById("isPredator").textContent = `Is Predator: ${
    currentAnimal.isPredator ? "Yes" : "No"
  }`;
  // currentHabitatNow(currentAnimal.name);
  renderRelatedAnimals();
}

//פונקציה מרנדרת את כרטיסיות החיות שנמצאות באותה סביבת גידול
function renderRelatedAnimals() {
  const relatedHabitat = currentAnimal.habitat;
  const relatedCard = document.getElementById("related-animals");
  relatedCard.innerHTML = "";
  animals.forEach((animal) => {
    if (
      relatedHabitat === animal.habitat &&
      currentAnimal.name != animal.name
    ) {
      const animalCard = document.createElement("div");
      animalCard.className = "related-card";
      animalCard.innerHTML = `
          <img class="card-img" src="${animal.image}" alt="${animal.name}"/>
          <div class="card-body">
            <p class="card-text">${animal.name}</p>
            <p class="card-text">Is-Predator: ${animal.isPredator}</p>
            <p class="card-text">weight: ${animal.weight}</p>
            <p class="card-text">height: ${animal.height}</p>
            <p class="card-text">color: ${animal.color}</p>
            <p class="card-text">habitat: ${animal.habitat}</p>
          </div>`;
      relatedCard.appendChild(animalCard);
    }
  });
}

//בעת לחיצה על כפתור האכלה מפעילים פוקנציית האכלה
const dialogFeed = document.createElement("dialog");
const feed = document.getElementById("feed-animal");
feed.addEventListener("click", () => feedAnimal(currentVisitor));

//שומר את כל החיות שהאכלנו אותם בלוקל סטורג'
function countFeededAnimals(animal) {
  const AllFeededAnimal =
    JSON.parse(localStorage.getItem("AllFeededAnimal")) || [];
  AllFeededAnimal.push(animal);
  localStorage.setItem("AllFeededAnimal", JSON.stringify(AllFeededAnimal));
}

// פונקנציית האכלת החיות שמעדכנת את מטבעות האורח ופועלת במקרה קיצון בהן לא נשאר לאורח מטבעות
function feedAnimal(Visitor) {
  dialogFeed.innerHTML = "";
  if (currentVisitor.coins == 0) {
    if (currentAnimal.isPredator) {
      dialogFeed.innerText = `Oh-No!!! You got Eaten by ${currentAnimal.name}. Now go back to Log-In page and choose another visitor`;
      const BtnBackToLogin = BackToLogin();
      dialogFeed.appendChild(BtnBackToLogin);
      document.body.appendChild(dialogFeed);
      dialogFeed.showModal();
      visitorGotEaten();
      return;
    }
    dialogFeed.innerText = `Oh-No!!! The animal ${currentAnimal.name} ran away from the zoo. Now go back to animal page and feed another animal`;
    const BtnBackToZoo = BackToZoo();
    dialogFeed.appendChild(BtnBackToZoo);
    document.body.appendChild(dialogFeed);
    dialogFeed.showModal();
    visitorGotEaten();
    animalEscaped();
    return;
  }

  //עידכון מטבעות האורח ופתיחת מודל
  currentVisitor.coins -= 2;
  localStorage.setItem("currentVisitor", JSON.stringify(currentVisitor));
  dialogFeed.innerText =
    "Thanks for feeding me, i hope you are enjoying your visit";
  const BtnBackToZoo = BackToZoo();
  dialogFeed.appendChild(BtnBackToZoo);
  document.body.appendChild(dialogFeed);
  dialogFeed.showModal();
  updateCoins(currentVisitor);
}
//עידכון המטבעות של האורח בתוך מערך האורחים בלוקל סטורג'
function updateCoins(currentVisitor) {
  const visitors = JSON.parse(localStorage.getItem("visitors"));
  for (let i = 0; i < visitors.length; i++) {
    if (visitors[i].name === currentVisitor.name) {
      visitors[i].coins = currentVisitor.coins;
      localStorage.setItem("visitors", JSON.stringify(visitors));
    }
  }
  return;
}

//כפתור חזרה לגן החיות
const BackToZoo = () => {
  const BtnBackToZoo = document.createElement("button");
  BtnBackToZoo.innerText = "Back";
  BtnBackToZoo.addEventListener("click", () => {
    (window.location.href = "zoo.html"), countFeededAnimals(currentAnimal);
  });
  return BtnBackToZoo;
};

//כפתור חזרה לעמוד התחברות
const BackToLogin = () => {
  const BtnBackToLogin = document.createElement("button");
  BtnBackToLogin.innerText = "Ok";
  BtnBackToLogin.addEventListener(
    "click",
    () => (window.location.href = "login.html")
  );
  return BtnBackToLogin;
};

//פונקציה שטורפת את האורח ומוציאה אותו ממאגר האורחים
function visitorGotEaten() {
  let newVisitors = JSON.parse(localStorage.getItem("visitors"));
  const currentVisitor = JSON.parse(localStorage.getItem("currentVisitor"));
  newVisitors = visitors.filter(
    (visitor) => currentVisitor.name !== visitor.name
  );
  localStorage.setItem("visitors", JSON.stringify(newVisitors));
  BackToLogin();
}

//פונקציה שבה החיה בורחת ויוצאת ממאגר החיות
function animalEscaped() {
  //ממשו את הלוגיקה של חיה שבורחת מגן החיות
  let newAnimals = JSON.parse(localStorage.getItem("animals"));
  const currentAnimal = JSON.parse(localStorage.getItem("currentAnimal"));
  newAnimals = animals.filter((animal) => currentAnimal.name !== animal.name);
  localStorage.setItem("animals", JSON.stringify(newAnimals));
  BackToZoo();
}
