import { mount } from "@vue/test-utils";
import appListItem from "../src/components/shared/appListItem.vue";

describe("appListItem", () => {
  test("renders slotted content", () => {
    const wrapper = mount(appListItem, {
      slots: {
        default: "<div>hello world</div>"
      }
    });
    expect(wrapper.html()).toContain("<div>hello world</div>");
  });
});
