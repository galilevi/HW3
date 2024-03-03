document.addEventListener("DOMContentLoaded", renderAnimal);

const currentAnimalName = localStorage.getItem("currentAnimal");

function renderAnimal() {
  if (!currentAnimalName) {
    console.error("No animal selected");
    return;
  }
  const animal = animals.find((animal) => animal.name === currentAnimalName);
  if (!animal) {
    console.error("Animal not found");
    return;
  }
  document.getElementById(
    "image"
  ).innerHTML = `<img src="${animal.image}" alt="${animal.name}" style="width:100%;">`;
  document.getElementById("name").textContent = `Name: ${animal.name}`;
  document.getElementById("weight").textContent = `Weight: ${animal.weight}kg`;
  document.getElementById("height").textContent = `Height: ${animal.height}cm`;
  document.getElementById("color").textContent = `Color: ${animal.color}`;
  document.getElementById("habitat").textContent = `Habitat: ${animal.habitat}`;
  document.getElementById("isPredator").textContent = `Is Predator: ${
    animal.isPredator ? "Yes" : "No"
  }`;
  currentHabitatNow(animal.name);
  renderRelatedAnimals();
}

function currentHabitatNow(currentAnimalName) {
  for (let i = 0; i < animals.length; i++) {
    if (currentAnimalName === animals[i].name) {
      const CurHabitat = animals[i].habitat;
      const CurPredetor = animals[i].isPredator;
      localStorage.setItem("CurHabitat", CurHabitat);
      localStorage.setItem("CurPredetor", CurPredetor);
    }
  }
}

function renderRelatedAnimals() {
  // ממשו את הלוגיקה שמרנדרת כרטיסיות של החיות ששדה ההאביטט שלהם זהה לחיה שמוצגת
  const relatedHabitat = localStorage.getItem("CurHabitat");
  const relatedCard = document.getElementById("related-animals");
  relatedCard.innerHTML = "";
  animals.forEach((animal) => {
    if (relatedHabitat === animal.habitat && currentAnimalName != animal.name) {
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
const currentVisitorName = localStorage.getItem("currentVisitor");
const dialogFeed = document.createElement("dialog");
const feed = document.getElementById("feed-animal");
feed.addEventListener("click", () => feedAnimal(currentVisitorName));

function currentVisitorNow(currentVisitorName) {
  for (let i = 0; i < visitors.length; i++) {
    if (currentVisitorName === visitors[i].name) {
      const VisitorCoins = visitors[i].coins;
      localStorage.setItem("VisitorCoins", VisitorCoins);
    }
  }
}

function feedAnimal(Visitor) {
  currentVisitorNow(Visitor);
  dialogFeed.innerHTML = "";
  // if (VisitorCoins == 0) {
  //   if (CurPredetor) {
  //     visitorGotEaten();
  //     return;
  //   }
  //   animalEscaped();
  //   return;
  // }
  for (let i = 0; i < visitors.length; i++) {
    if (Visitor === visitors[i].name) {
      visitors[i].coins -= 2;
      localStorage.setItem("visitors", JSON.stringify(visitors));
    }
  }
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
