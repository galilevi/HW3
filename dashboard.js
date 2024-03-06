document.addEventListener(
  "DOMContentLoaded",
  showVisitedAnimals(),
  showFeededAnimals(),
  showFavoriteAnimal()
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
  localStorage.setItem("newVisitedAnimals", JSON.stringify(newVisitedAnimals));

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
  FavAnimalCard.className = "animal-img";
  FavAnimalCard.innerHTML = "";
  FavAnimalCard.innerHTML += `<p>${common.name}</p>`;
  FavAnimalCard.innerHTML += `<img class="card-img" src="${common.image}" alt="${common.image}"/>`;
  FavAnimal.appendChild(FavAnimalCard);
}
