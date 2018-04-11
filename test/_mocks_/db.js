export default (db = {
  categories: {
    toArray() {
      console.log("CALLING TO ARRAY HERE LALALALALA");
      return new Promise(resolve => {
        resolve(["a", "b", "c"]);
      });
    }
  }
});
