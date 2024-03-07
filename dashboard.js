document.addEventListener(
  "DOMContentLoaded",
  showVisitedAnimals(),
  showFeededAnimals(),
  showFavoriteAnimal()
);
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

//איפוס אפליקציה ע"י איפוס לוקל סטורג'
function clearLocalStorage() {
  localStorage.clear();
  window.location.href = "/signup.html";
}

//פונקציה שמסננת את מערך החיות שביקרנו בהן למערך חדש שבו כל חיה תופיעה רק פעם אחת
function showVisitedAnimals() {
  const visitedAnimals = document.getElementById("visited-animals");
  const AllvisitoredAnimal = JSON.parse(
    localStorage.getItem("AllvisitoredAnimal")
  );
  const newVisitedAnimals = [];
  AllvisitoredAnimal.forEach((animal) => {
    if (!newVisitedAnimals.some((a) => a.name === animal.name)) {
      newVisitedAnimals.push(animal);
    }
  });
  localStorage.setItem("newVisitedAnimals", JSON.stringify(newVisitedAnimals));

  const animalImags = document.createElement("div");
  animalImags.className = "animal-img";
  animalImags.innerHTML = "";

  for (let i = 0; i < newVisitedAnimals.length; i++) {
    animalImags.innerHTML += `<img class="card-img" src="${newVisitedAnimals[i].image}" alt="${newVisitedAnimals[i].name}"/>`;
    visitedAnimals.appendChild(animalImags);
  }
}

//פונקציה שמסננת את מערך החיות שהאכלנו אותן למערך חדש שבו כל חיה תופיעה רק פעם אחת
function showFeededAnimals() {
  const FedAnimals = document.getElementById("feeded-animals");
  const AllFedAnimal = JSON.parse(localStorage.getItem("AllFeededAnimal"));
  const newFedAnimals = [];

  AllFedAnimal.forEach((animal) => {
    if (!newFedAnimals.some((a) => a.name === animal.name)) {
      newFedAnimals.push(animal);
    }
  });

  const animalImags = document.createElement("div");
  animalImags.className = "animal-img";
  animalImags.innerHTML = "";

  for (let i = 0; i < newFedAnimals.length; i++) {
    animalImags.innerHTML += `<img class="card-img" src="${newFedAnimals[i].image}" alt="${newFedAnimals[i].name}"/>`;
    FedAnimals.appendChild(animalImags);
  }
}

//פונקציה שמציגה את החיה שהאורח ביקר הכי הרבה פעמים - האהובה ביותר
function showFavoriteAnimal() {
  const FavAnimal = document.getElementById("favorite-animal");
  const AllvisitoredAnimal2 = JSON.parse(
    localStorage.getItem("AllvisitoredAnimal")
  ); // לא מסונן
  const newVisitedAnimals2 = JSON.parse(
    localStorage.getItem("newVisitedAnimals")
  ); //מסונן
  let count = 0;
  let MaxCount = 0;
  let common = "";
  for (let i = 0; i < newVisitedAnimals2.length; i++) {
    for (let j = 0; j < AllvisitoredAnimal2.length; j++) {
      if (newVisitedAnimals2[i].name === AllvisitoredAnimal2[j].name) {
        count++;
      }
      if (count > MaxCount) {
        common = newVisitedAnimals2[i];
      }
    }
    count = 0;
  }
  console.log(common);
  const FavAnimalCard = document.createElement("div");
  FavAnimalCard.className = "Fav-animal-img";
  FavAnimalCard.innerHTML = "";
  FavAnimalCard.innerHTML += `<p>${common.name}</p>`;
  FavAnimalCard.innerHTML += `<img class="card-img" src="${common.image}" alt="${common.image}"/>`;
  FavAnimal.appendChild(FavAnimalCard);
}
