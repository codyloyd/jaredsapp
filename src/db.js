import Dexie from "dexie";

const db = new Dexie("jaredsApp");
db.delete();
db.version(1).stores({
  categories: `id++,name`,
  items: `id++,name,category`
});

db.open();
db.on("populate", () => {
  db.categories.add({
    name: "food",
    items: ["ramen"]
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
});

export default db;
