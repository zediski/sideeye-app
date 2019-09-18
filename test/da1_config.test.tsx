import { FormGroup } from "@blueprintjs/core";
import { mount, ReactWrapper } from "enzyme";
import * as React from "react";
import { DA1ConfigInput } from "renderer/config/da1";
import { expectToExist, waitForUpdate, expectFormInput } from "test/utils";

describe("Parser Configuration Input", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<DA1ConfigInput />);
  });

  it("displays the DA1 fields", () =>
    expectToExist(
      wrapper.find(FormGroup).filterWhere(e => e.prop("label") === "DA1 Fields")
    ));

  it("displays the index field", () =>
    expectFormInput(wrapper, "index", "Index", "0"));

  it("displays the condition field", () =>
    expectFormInput(wrapper, "condition", "Condition", "1"));

  it("displays the item field", () =>
    expectFormInput(wrapper, "number", "Item ID", "2"));

  it("displays the fixation start field", () =>
    expectFormInput(wrapper, "fixation_start", "Fixation Start", "8"));

  it("displays the trial duration field", () =>
    expectFormInput(wrapper, "time", "Trial Duration", "-1"));

  describe("updating a value", () => {
    beforeEach(async () => {
      wrapper
        .find("input")
        .filterWhere(e => e.prop("id") === "index")
        .simulate("change", { target: { value: "10" } });
      await waitForUpdate(wrapper);
    });

    it("updates state", () =>
      expect(wrapper.state("configFile")).toMatchObject({ index: 10 }));
  });
});
