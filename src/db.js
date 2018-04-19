import Dexie from "dexie";

const db = new Dexie("jaredsApp");
// db.delete();
db.version(1).stores({
  categories: `id++,name`,
  items: `id++,name`,
  steps: `id++,title`
});

db.open();
// db.on("populate", () => {
//   db.categories.add({
//     name: "food",
//     items: [1]
//   });

//   db.items.add({
//     name: "ramen",
//     category: "food",
//     image: "xx",
//     steps: [1, 2, 3]
//   });

//   db.steps.add({
//     title: "Step One",
//     image: "xx",
//     description: "Do step One"
//   });
//   db.steps.add({
//     title: "Step Two",
//     image: "xx",
//     description: "Do step two"
//   });
//   db.steps.add({
//     title: "Step three",
//     image: "xx",
//     description: "Do step three"
//   });
// });

export default db;
