function showVisitedAnimals() {
  //ממשו את הלוגיקה שמציגה את החיות שהאורח הנוכחי ביקר בהן
  const visitedAnimals = document.getElementById("visited-animals");
  const AllvisitoredAnimal = JSON.parse(
    localStorage.getItem("AllvisitoredAnimal")
  );
  const newVisitedAnimals = [];

  AllvisitoredAnimal.forEach((animal) => {
    if (!newVisitedAnimals.includes(animal.name)) {
      newVisitedAnimals.push(animal);
    }
  });
  console.log(newVisitedAnimals);

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
}
function showFavoriteAnimal() {
  //ממשו את הלוגיקה שמציגה את החיה שהאורח ביקר הכי הרבה פעמים אצלה
}
