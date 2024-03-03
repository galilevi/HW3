document.addEventListener("DOMContentLoaded", function () {
  renderAvailableAnimals();
});

function renderAvailableAnimals() {
  // ממשו את הלוגיקה שמרנדרת את החיות לתוך הדיב עם האיידי animal-cards
  const wrapperAnimal = document.getElementById("animal-cards");
  wrapperAnimal.innerHTML = "";
  animals.forEach((animal) => {
    const animalCard = document.createElement("div");
    animalCard.className = "animal-card";
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
    animalCard.addEventListener("click", () => visitAnimal(animal.name));
    // וודאו שאתם מציגים אך ורק את החיות שעומדות בפילטורים הנוכחיים
    // במידה ואין פילטרים מסומנים, הציגו את כל החיות
  });
}

function visitAnimal(animalName) {
  localStorage.setItem("currentAnimal", animalName);
  window.location.href = "/animal.html";

  // ממשו את הלוגיקה של מעבר לעמוד חיה עבור החיה הספציפית שנבחרה
  // שמרו בלוקל סטורג' את החיה שנבחרה, כך שבעמוד החיה נוכל לשלוף אותה מהסטורג' ולהציגה בהתאם
}

function setFilter(filterKey, filterValue) {}
