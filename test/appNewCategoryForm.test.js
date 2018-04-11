import { mount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Vue from "vue";
import appNewCategoryForm from "../src/components/appNewCategoryForm.vue";

const localVue = createLocalVue();

localVue.use(Vuex);

describe("appNewCategoryForm", () => {
  let actions;
  let mutations;
  let store;

  beforeEach(() => {
    actions = {
      addCategory: jest.fn()
    };
    mutations = {
      setAddingCategory: jest.fn()
    };

    store = new Vuex.Store({
      state: {},
      actions,
      mutations
    });
  });

  test("button adds category", () => {
    const wrapper = mount(appNewCategoryForm, { store, localVue });
    Vue.nextTick(() => {
      const input = wrapper.find("input");
      input.element.value = "test";
      input.trigger("input");
      const button = wrapper.find("button");
      button.trigger("click");
      expect(actions.addCategory).toHaveBeenCalled();
      expect(mutations.setAddingCategory).toHaveBeenCalled();
    });
  });
});
