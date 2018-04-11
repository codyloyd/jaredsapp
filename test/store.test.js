import appStore from "../src/store.js";

const { getters } = appStore;

describe("Getters", () => {
  const { category } = getters;
  test("category", () => {
    const state = {
      categories: [{ id: "a" }, { id: "b" }]
    };
    expect(category(state)("b")).toEqual({ id: "b" });
  });

  const { item } = getters;
  test("item", () => {
    const state = {
      items: [{ name: "a" }, { name: "b" }]
    };
    expect(item(state)("b")).toEqual({ name: "b" });
  });

  const { items } = getters;
  test("items", () => {
    const state = {
      categories: [{name: "foo", items:[1,3]}],
      items: [
        { name: "a", id: 1 },
        { name: "b", id: 2 },
        { name: "c", id: 3 }
      ]
    };
    expect(items(state)("foo")).toEqual([
      { name: "a", id: 1 },
      { name: "c", id: 3 }
    ]);
  });

  const { steps } = getters;
  test("steps from item", () => {
    const sampleSteps = [
      { id: "1", title: "one", description: "one one" },
      { id: "2", title: "two", description: "two two" }
    ];
    const state = {
      items: [{ name: "a", steps: ["1", "2"] }, { name: "b", steps: [] }],
      steps: sampleSteps
    };

    expect(steps(state)("a")).toEqual(sampleSteps);
  });
});

const { mutations } = appStore;

describe("Mutations", () => {
  const { setAddingCategory } = mutations;
  test("setAddingCategory true", () => {
    const state = { addingCategory: false };

    setAddingCategory(state, true);
    expect(state.addingCategory).toBe(true);
  });
  test("setAddingCategory false", () => {
    const state = { addingCategory: true };

    setAddingCategory(state, false);
    expect(state.addingCategory).toBe(false);
  });

  const { setAddingItem } = mutations;
  test("setAddingItem true", () => {
    const state = { addingItem: false };

    setAddingItem(state, true);
    expect(state.addingItem).toBe(true);
  });
  test("setAddingItem false", () => {
    const state = { addingItem: true };

    setAddingItem(state, false);
    expect(state.addingItem).toBe(false);
  });

  const { setAddingStep } = mutations;
  test("setAddingStep true", () => {
    const state = { addingStep: false };
    setAddingStep(state, true);
    expect(state.addingStep).toBe(true);
    setAddingStep(state, false);
    expect(state.addingStep).toBe(false);
  });

  const { setRouteTransition } = mutations;
  test("setRouteTransition", () => {
    const state = { routeTransition: "fade" };

    setRouteTransition(state, { transition: "spin" });
    expect(state.routeTransition).toBe("spin");
  });

  const { setCategories } = mutations;
  test("setCategories", () => {
    const state = {
      categories: []
    };
    const categories = ["a", "b", "c"];
    setCategories(state, { categories });
    expect(state.categories).toEqual(categories);
  });

  const { setCategoryNameMap } = mutations;
  test("setCategoryNameMap", () => {
    const state = {
      categoryNameMap: {},
    };
    const nameMap = {a: 1, b: 2};
    setCategoryNameMap(state, {categoryNameMap: nameMap});
    expect(state.categoryNameMap).toEqual(nameMap);
  });

  const { addCategory } = mutations;
  test("addCategory", () => {
    const state = { categories: ["a", "b", "c"] };
    addCategory(state, { category: "d" });
    expect(state.categories).toEqual(["a", "b", "c", "d"]);
  });

  const { addStep } = mutations;
  test("addStep", () => {
    const sampleSteps = [
      { id: "1", title: "one", description: "one one" },
      { id: "2", title: "two", description: "two two" }
    ];
    const newStep = { title: "three", description: "three three" };
    const state = {
      items: [{ name: "a", steps: ["1", "2"] }],
      steps: sampleSteps
    };
    addStep(state, {
      item: "a",
      step: newStep
    });
    sampleSteps.push(newStep);
    expect(state.steps).toEqual(sampleSteps);
  });

  const { addItem } = mutations;
  test("addItem unique", () => {
    const state = { items: [{ id: "a" }, { id: "b" }, { id: "c" }] };
    addItem(state, { item: { id: "d" } });
    expect(state.items).toEqual([
      { id: "a" },
      { id: "b" },
      { id: "c" },
      { id: "d" }
    ]);
  });
  test("addItem dupe", () => {
    const state = { items: [{ id: "a" }, { id: "b" }, { id: "c" }] };
    addItem(state, { item: { id: "c" } });
    expect(state.items).toEqual([{ id: "a" }, { id: "b" }, { id: "c" }]);
  });
});

const { actions } = appStore;

jest.mock("../src/db.js", () => ({
  categories: {
    add() {
      return new Promise(resolve => {
        resolve(1);
      });
    },
    toArray() {
      return new Promise(resolve => {
        resolve([{id: 1, name:"a"}, {id: 2, name: "b"},{id: 3, name: "c"}]);
      });
    },
    where(string) {
      return {
        equals(string) {
          return {
            toArray() {
              return new Promise(resolve => {
                resolve([{ items: ["a", "b", "c"] }]);
              });
            },
            modify() {
              return new Promise(resolve => {
                resolve(1);
              });
            }
          };
        }
      };
    }
  },
  items: {
    get(object) {
      return new Promise(resolve => {
        resolve({ id: "item" });
      });
    },
    add() {
      return new Promise(resolve => resolve());
    }
  }
}));

describe("Actions", () => {
  const { getCategories } = actions;
  test("getCategories", () => {
    expect.assertions(3);

    let commits = []

    const context = {
      commit(type, data) {
        commits.push({type, data});
      }
    };

    return getCategories(context).then(() => {
      expect(commits[0].type).toEqual("setCategories");
      expect(commits[1].type).toEqual("setCategoryNameMap");
      expect(commits[1].data).toEqual({a:1, b:2, c:3});
    });
  });

  const { getItem } = actions;
  test("getItem", () => {
    expect.assertions(2);

    let commitType = null;
    let commitData = null;

    const context = {
      commit(type, data) {
        commitType = type;
        commitData = data;
      }
    };

    const payload = { item: "item" };

    return getItem(context, payload).then(() => {
      expect(commitType).toEqual("addItem");
      expect(commitData).toEqual({ item: { id: "item" } });
    });
  });

  const { getItems } = actions;
  test("getItems", () => {
    expect.assertions(2);
    let commitType = null;
    let commitData = null;
    let numberOfCommits = 0;

    const context = {
      commit(type, data) {
        commitType = type;
        commitData = data;
        numberOfCommits++;
      }
    };

    const payload = { item: "item" };

    return getItems(context, payload).then(() => {
      expect(numberOfCommits).toEqual(3);
      expect(commitData).toEqual({ item: { id: "item" } });
    });
  });

  const { addCategory } = actions;
  test("addCategory", () => {
    expect.assertions(2);

    let commitType = null;
    let commitData = null;

    const context = {
      commit(type, data) {
        commitType = type;
        commitData = data;
      }
    };

    const payload = { name: "category" };

    return addCategory(context, payload).then(() => {
      expect(commitType).toEqual("addCategory");
      expect(commitData).toEqual({ category: { name: "category", items: [] } });
    });
  });

  const { addItem } = actions;
  test("addItem", () => {
    expect.assertions(2);
    let commitType = null;
    let commitData = null;

    const context = {
      commit(type, data) {
        commitType = type;
        commitData = data;
      }
    };

    const payload = { id: "item" };

    return addItem(context, payload).then(() => {
      expect(commitType).toEqual("addItem");
      expect(commitData).toEqual({ item: { id: "item" } });
    });
  });
});
