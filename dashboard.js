document.addEventListener(
  "DOMContentLoaded",
  showVisitedAnimals(),
  showFeededAnimals()
);

function showVisitedAnimals() {
  //ממשו את הלוגיקה שמציגה את החיות שהאורח הנוכחי ביקר בהן
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

  const animalImags = document.createElement("div");
  animalImags.className = "animal-img";
  animalImags.innerHTML = "";

  for (let i = 0; i < newVisitedAnimals.length; i++) {
    animalImags.innerHTML += `<img class="card-img" src="${newVisitedAnimals[i].image}" alt="${newVisitedAnimals[i].name}"/>`;
    visitedAnimals.appendChild(animalImags);
  }
}
function showFeededAnimals() {
  //ממשו את הלוגיקה שמציגה את החיות שהאורח הנוכחי האכיל אותן
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
function showFavoriteAnimal() {
  //ממשו את הלוגיקה שמציגה את החיה שהאורח ביקר הכי הרבה פעמים אצלה

  AllvisitoredAnimal.forEach((animal) => {});
}
