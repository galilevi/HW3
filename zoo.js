const currentVisitor = JSON.parse(localStorage.getItem("currentVisitor"));
document;

document.addEventListener("DOMContentLoaded", () => {
  updateVisitorInfo();
});

//כפתור התנתקות מאורח
const btnLogout = document.getElementById("btnlogout");
btnLogout.addEventListener("click", () => logout(currentVisitor));

document.addEventListener;

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

//איפוס אפליקציה ע"י איפוס לוקל סטורג'
function clearLocalStorage() {
  localStorage.clear();
  window.location.href = "signup.html";
}

//המערך הזמני שמכיל את החיות אחרי הפילטר הרלוונטי
let animalToshow = animals;
document.addEventListener("DOMContentLoaded", function () {
  renderAvailableAnimals();

  //בניית הפילטרים
  const selectElement = document.getElementById("weight-select");
  for (let i = 0; i <= 1200; i += 50) {
    const option = document.createElement("option");
    option.value = i;
    option.text = i;
    selectElement.appendChild(option);
  }

  const selectHeight = document.getElementById("height-select");
  for (let i = 0; i <= 300; i += 50) {
    const option = document.createElement("option");
    option.value = i;
    option.text = i;
    selectHeight.appendChild(option);
  }
  let colors = [];
  animals.forEach((animal) => {
    if (!colors.includes(animal.color)) {
      colors.push(animal.color);
    }
  });
  const selectColor = document.getElementById("color-select");

  //בניית פילטר הצבע - באופן דינמי לפי סוגי החיות
  for (let i in colors) {
    const option = document.createElement("option");
    if (i == 0) {
      const option2 = document.createElement("option");
      option2.value = "";
      option2.text = "Select...";
      selectColor.appendChild(option2);
    }
    option.value = colors[i];
    option.text = colors[i];
    selectColor.appendChild(option);
  }
});

//תיבת חיפוש טקסטי לחיות
const searchAnimal = (e) => {
  animalToshow = animals.filter(function (animal) {
    return animal.name.includes(e.value);
  });

  renderAvailableAnimals();
};

//מרנדרת את כל כרטיסיות החיות בהתחלה ולאחר הפילטרים
function renderAvailableAnimals() {
  const wrapperAnimal = document.getElementById("animal-cards");
  wrapperAnimal.innerHTML = "";
  if (animalToshow.length == 0) {
    const template = `
    <h2 style="color:white;">No Animals Found</h2>`;
    wrapperAnimal.innerHTML = template;
    return;
  }
  const isPredator = localStorage.getItem("isPredator");
  const habitat = localStorage.getItem("habitat");
  const weight = JSON.parse(localStorage.getItem("weight"));
  const height = JSON.parse(localStorage.getItem("height"));
  const color = localStorage.getItem("color");

  //לולאה שעוברת על מערך החיות ובודקת את הפילטרים ומציגה את כרטיסיית החיה מתאימה
  animalToshow.forEach((animal) => {
    const animalCard = document.createElement("div");
    animalCard.className = "animal-card";
    if (
      weight <= animal.weight &&
      (color == animal.color || color == "" || color == undefined) &&
      (habitat == animal.habitat || habitat == "" || habitat == undefined) &&
      height <= animal.height &&
      (String(isPredator) == String(animal.isPredator) ||
        isPredator == "" ||
        isPredator == undefined)
    ) {
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
      wrapperAnimal.appendChild(animalCard);
      animalCard.addEventListener("click", () => {
        visitAnimal(animal), CountAnimalVisited(animal);
      });
    }
  });
}

// פונקציה ששומרת כל לחיצה שנכנסנו לחיה (כללי) - מציגה את כל החיות שביקרנו אותן
function CountAnimalVisited(animal) {
  let AllvisitoredAnimal =
    JSON.parse(localStorage.getItem("AllvisitoredAnimal")) || [];
  AllvisitoredAnimal.push(animal);
  localStorage.setItem(
    "AllvisitoredAnimal",
    JSON.stringify(AllvisitoredAnimal)
  );
}

//שומר את החיה הספציפית שנכנסנו אליה בלוקל סטורג' (בזמן אמת)
function visitAnimal(animal) {
  localStorage.setItem("currentAnimal", JSON.stringify(animal));
  window.location.href = "animal.html";
}

//שמירת הפילטורים בלוקל סטורג' ומימושם ברינדור הכרטיסיות
function setFilter(filterKey, filterValue) {
  localStorage.setItem(filterKey, filterValue);
  renderAvailableAnimals();
}
