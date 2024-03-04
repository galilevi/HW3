document.addEventListener("DOMContentLoaded", renderAnimal);

const currentAnimal = JSON.parse(localStorage.getItem("currentAnimal"));
let visitorsArr = JSON.parse(localStorage.getItem("visitors"));

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

// function currentHabitatNow(currentAnimalName) {
//   for (let i = 0; i < animals.length; i++) {
//     if (currentAnimalName === animals[i].name) {
//       const CurHabitat = animals[i].habitat;
//       const CurPredetor = animals[i].isPredator;
//       localStorage.setItem("CurHabitat", CurHabitat);
//       localStorage.setItem("CurPredetor", CurPredetor);
//     }
//   }
// }

function renderRelatedAnimals() {
  // ממשו את הלוגיקה שמרנדרת כרטיסיות של החיות ששדה ההאביטט שלהם זהה לחיה שמוצגת
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
const currentVisitor = JSON.parse(localStorage.getItem("currentVisitor"));
const dialogFeed = document.createElement("dialog");
const feed = document.getElementById("feed-animal");
feed.addEventListener("click", () => feedAnimal(currentVisitor));

// function currentVisitorNow(currentVisitorName) {
//   for (let i = 0; i < visitors.length; i++) {
//     if (currentVisitorName === visitors[i].name) {
//       const VisitorCoins = visitors[i].coins;
//       localStorage.setItem("VisitorCoins", VisitorCoins);
//     }
//   }
// }

function feedAnimal(Visitor) {
  // currentVisitorNow(Visitor);
  dialogFeed.innerHTML = "";
  // if (VisitorCoins == 0) {
  //   if (CurPredetor) {
  //     visitorGotEaten();
  //     return;
  //   }
  //   animalEscaped();
  //   return;
  // }
  // for (let i = 0; i < visitorsArr.length; i++) {
  //   if (Visitor.name === visitorsArr[i].name) {
  //     visitorsArr[i].coins -= 2;
  //     localStorage.setItem("visitors", JSON.stringify(visitorsArr));
  //   }
  // }
  currentVisitor.coins -= 2;
  localStorage.setItem("currentVisitor", JSON.stringify(currentVisitor));

  dialogFeed.innerText =
    "Thanks for feeding me, i hope you are enjoying your visit";
  const BtnBackToZoo = BackToZoo();
  dialogFeed.appendChild(BtnBackToZoo);
  document.body.appendChild(dialogFeed);
  dialogFeed.showModal();
}

const BackToZoo = () => {
  const BtnBackToZoo = document.createElement("button");
  BtnBackToZoo.innerText = "Back";
  BtnBackToZoo.addEventListener(
    "click",
    () => (window.location.href = "/zoo.html")
  );
  return BtnBackToZoo;
};

function visitorGotEaten() {
  // ממשו את הלוגיקה של חיה שטורפת אורח
}

function animalEscaped() {
  //ממשו את הלוגיקה של חיה שבורחת מגן החיות
}
