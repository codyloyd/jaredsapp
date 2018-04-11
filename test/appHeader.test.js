import { mount } from "@vue/test-utils";
import Vue from "vue";
import appHeader from "../src/components/appHeader.vue";

describe("appHeader", () => {
  test("displays slots", () => {
    const wrapper = mount(appHeader, {
      slots: {
        "left-icon": "<div id=left></div>",
        "right-icon": "<div id=right></div>",
        title: "<div id=title></div>"
      }
    });
    expect(wrapper.find("#left").is("div")).toBe(true);
    expect(wrapper.find("#right").is("div")).toBe(true);
    expect(wrapper.find("#title").is("div")).toBe(true);
  });
});
