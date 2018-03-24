import Dexie from "dexie";

const db = new Dexie("jaredsApp");
db.version(1).stores({
  categories: `id++,name`,
  items: `id++,name,category`
});

db.open();
db.on("populate", () => {
  db.categories.add({
    name: "food",
    items: ["ramen", "easy mac", "ham sammy"]
  });
  db.items.add({
    name: "ramen",
    category: "food",
    image: "xx",
    steps: [
      { title: "Step One", image: "xx", description: "Do step One" },
      { title: "Step Two", image: "xx", description: "Do step Two" },
      { title: "Step Three", image: "xx", description: "Do step Three" }
    ]
  });
  db.items.add({
    name: "easy mac",
    category: "food",
    image: "xx",
    steps: [
      { title: "Step One", image: "xx", description: "Do step One" },
      { title: "Step Two", image: "xx", description: "Do step Two" },
      { title: "Step Three", image: "xx", description: "Do step Three" }
    ]
  });
  db.items.add({
    name: "ham sammy",
    category: "food",
    image: "xx",
    steps: [
      { title: "Step One", image: "xx", description: "Do step One" },
      { title: "Step Two", image: "xx", description: "Do step Two" },
      { title: "Step Three", image: "xx", description: "Do step Three" }
    ]
  });
});

export default db;
