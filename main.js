// מערכים גלובלים שישמשו אותנו בכל העמודים
let visitors = [
  {
    name: "John Smith",
    coins: 50,
    image:"visitorImage\M1.jpeg",
  },
  {
    name: "Emily Johnson",
    coins: 50,
    image:"visitorImage\W1.jpeg",
  },
  {
    name: "Michael Williams",
    coins: 50,
    image:"visitorImage\M2.jpeg",
  },
  {
    name: "Jessica Brown",
    coins: 50,
    image:"visitorImage\W3.jpeg",
  },
  {
    name: "Christopher Jones",
    coins: 50,
    image:"visitorImage\M3.jpeg",
  },
  {
    name: "Ashley Davis",
    coins: 50,
    image:"visitorImage\W4.jpeg",
  },
  {
    name: "Matthew Miller",
    coins: 50,
    image:"visitorImage\M4.jpeg",
  },
  {
    name: "Amanda Wilson",
    coins: 50,
    image:"visitorImage\W5.jpeg",
  },
  {
    name: "David Moore",
    coins: 50,
    image:"visitorImage\M5.jpeg",
  },
  {
    name: "Sarah Taylor",
    coins: 50,
    image:"visitorImage\M6.jpeg",
  },
  {
    name: "James Anderson",
    coins: 50,
    image:"visitorImage\M6.jpeg",
  },
  {
    name: "Jennifer Thomas",
    coins: 50,
    image:"visitorImage\W6.jpeg",
  },
  {
    name: "Robert Jackson",
    coins: 50,
    image:"visitorImage\M7.jpeg",
  },
  {
    name: "Elizabeth White",
    coins: 50,
    image:"visitorImage\W7.jpeg",
  },
  {
    name: "Daniel Harris",
    coins: 50,
    image:"visitorImage\M8.jpeg",
  },
  {
    name: "Melissa Martin",
    coins: 50,
    image:"visitorImage\W8.jpeg",
  },
  {
    name: "William Thompson",
    coins: 50,
    image:"visitorImage\M9.jpeg",
  },
  {
    name: "Linda Garcia",
    coins: 50,
    image:"visitorImage\M11.jpeg",
  },
  {
    name: "Joseph Martinez",
    coins: 50,
    image:"visitorImage\M10.jpeg",
  },
  {
    name: "Karen Robinson",
    coins: 50,
    image:"visitorImage\M13.jpeg",
  },
];

let animals = [
  {
    name: "Lion",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
  },
  {
    name: "Elephant",
    isPredator: false,
    weight: 1200,
    height: 200,
    color: "grey",
    habitat: "land",
  },
  {
    name: "Giraffe",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
  },
  {
    name: "Tiger",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
  },
  {
    name: "Monkey",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
  },
  {
    name: "Kangaroo",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
  },
  {
    name: "Penguin",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "sea",
  },
  {
    name: "Zebra",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
  },
  {
    name: "Cheetah",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
  },
];

// פונקציה זו טוענת עבורכם את המידע ההתחלתי של האפליקציה, במידה וקיים מידע בלוקל סטורג׳, היא תקח אותו משם
// אל תשנו את הקוד בפונקציה הזו כדי לשמור על תקינות הטמפלייט
function generateDataset() {
  if (localStorage.getItem("visitors")) {
    visitors = JSON.parse(localStorage.getItem("visitors"));
  } else {
    localStorage.setItem("visitors", JSON.stringify(visitors));
  }
  if (localStorage.getItem("animals")) {
    animals = JSON.parse(localStorage.getItem("animals"));
  } else {
    localStorage.setItem("animals", JSON.stringify(animals));
  }

  console.log(visitors);
}
generateDataset();

//********************** */
function logout() {
  //ממשו את הלוגיקה שמתנתקת מאורח מחובר
  // שימו לב לנקות את השדה המתאים בלוקל סטורג'
}
