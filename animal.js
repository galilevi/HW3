  document.addEventListener('DOMContentLoaded',renderAnimal);
  function renderAnimal() {
    const currentAnimalName = localStorage.getItem("currentAnimal");
    if (!currentAnimalName) {
      console.error("No animal selected");
      return;
    }
  
    const animal = animals.find(animal => animal.name === currentAnimalName);
    if (!animal) {
      console.error("Animal not found");
      return;
    }
  
    // מציג את התמונה
    document.getElementById("image").innerHTML = `<img src="${animal.image}" alt="${animal.name}" style="width:100%;">`;
    // מציג את השם והפרטים
    document.getElementById("name").textContent =  `Name: ${animal.name}`;
    document.getElementById("weight").textContent = `Weight: ${animal.weight}kg`;
    document.getElementById("height").textContent = `Height: ${animal.height}cm`;
    document.getElementById("color").textContent = `Color: ${animal.color}`;
    document.getElementById("habitat").textContent = `Habitat: ${animal.habitat}`;
    document.getElementById("isPredator").textContent = `Is Predator: ${animal.isPredator ? "Yes" : "No"}`;
  }

function renderRelatedAnimals() {
  // ממשו את הלוגיקה שמרנדרת כרטיסיות של החיות ששדה ההאביטט שלהם זהה לחיה שמוצגת
  // רנדרו אותן לתוך הדיב שמיועד להן עם האיידי related-animals
  // ממשו את אותה לוגיקה של כרטיסיית חיה כמו בכרטיסיות בעמוד zoo.html
}

function feedAnimal() {
  // ממשו את הלוגיקה של האכלת חיה
  // במידה ואין מספיק מטבעות, טפלו בהתאם להנחיות במטלה
}

function visitorGotEaten() {
  // ממשו את הלוגיקה של חיה שטורפת אורח
}

function animalEscaped() {
  //ממשו את הלוגיקה של חיה שבורחת מגן החיות
}
