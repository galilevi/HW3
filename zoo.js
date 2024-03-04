// let AllvisitoredAnimal = [];

document.addEventListener("DOMContentLoaded", function () {
  renderAvailableAnimals();

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
let animalToshow = animals;
const searchAnimal = (e) => {
  animalToshow = animals.filter(function (animal) {
    return animal.name.f(e.value);
  });

  renderAvailableAnimals();
};

function renderAvailableAnimals() {
  // ממשו את הלוגיקה שמרנדרת את החיות לתוך הדיב עם האיידי animal-cards
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

function CountAnimalVisited(animal) {
  let AllvisitoredAnimal =
    JSON.parse(localStorage.getItem("AllvisitoredAnimal")) || [];
  AllvisitoredAnimal.push(animal);
  localStorage.setItem(
    "AllvisitoredAnimal",
    JSON.stringify(AllvisitoredAnimal)
  );
}

function visitAnimal(animal) {
  localStorage.setItem("currentAnimal", JSON.stringify(animal));
  window.location.href = "/animal.html";

  // ממשו את הלוגיקה של מעבר לעמוד חיה עבור החיה הספציפית שנבחרה
  // שמרו בלוקל סטורג' את החיה שנבחרה, כך שבעמוד החיה נוכל לשלוף אותה מהסטורג' ולהציגה בהתאם
}

function setFilter(filterKey, filterValue) {
  localStorage.setItem(filterKey, filterValue);
  renderAvailableAnimals();
}
