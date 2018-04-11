import { mount } from "@vue/test-utils";
import Vue from "vue";
import appModal from "../src/components/shared/appModal.vue";

describe("appModal", () => {
  test("is instance", () => {
    const wrapper = mount(appModal);
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test("renders slotted content when visible", () => {
    expect.assertions(1);
    const wrapper = mount(appModal, {
      slots: {
        default: "<div id='test'>hello world</div>"
      }
    });
    Vue.nextTick(() => {
      expect(wrapper.contains("#test")).toBe(true);
    });
  });

  test("doesn't render modal or backdrop when hidden", () => {
    const wrapper = mount(appModal, {
      slots: {
        default: "<div id='test'>hello world</div>"
      }
    });
    wrapper.setData({ modalShowing: false });
    Vue.nextTick(() => {
      expect(wrapper.contains(".backdrop")).toBe(false);
    });
  });

  test("toggles modal showing on click of backdrop", () => {
    const wrapper = mount(appModal);
    Vue.nextTick(() => {
      wrapper.find(".backdrop").trigger("click");
      expect(wrapper.contains(".backdrop")).toBe(false);
    });
  });
});
