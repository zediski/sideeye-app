import { ISelectProps } from "@blueprintjs/select";
import { FormGroup, Switch, RadioGroup, Radio } from "@blueprintjs/core";
import * as React from "react";
import { ReactWrapper } from "enzyme";
import { some, isArray, isEqual } from "lodash";
import { StyledComponent } from "styled-components";

export class TestFile extends File {
  constructor(contents: string[], name: string) {
    super(contents, name);
    this.path = name;
  }
}

export function expectToExist(element: ReactWrapper<any>): void {
  expect(element.exists()).toEqual(true);
}

export function expectNotToExist(element: ReactWrapper<any>): void {
  expect(element.exists()).toEqual(false);
}

export async function selectDropdownValue(
  wrapper: ReactWrapper,
  select: ReactWrapper<any>,
  value: any
): Promise<void> {
  const selectProps = select.props() as ISelectProps<any>;
  selectProps.onItemSelect(value);
  await waitForUpdate(wrapper);
}

export async function waitForComponent(
  parent: ReactWrapper,
  components:
    | React.ComponentClass<any>
    | Array<React.ComponentClass<any> | StyledComponent<any, any>>
    | StyledComponent<any, any>,
  timeout = 4000
): Promise<void> {
  components = isArray(components) ? components : [components];
  await parent.update();
  if (some(components, component => parent.find(component).exists())) {
    return;
  }
  if (timeout <= 0) {
    throw new Error(`timeout waiting to redirect to component`);
  }
  await wait(100);
  return await waitForComponent(parent, components, timeout - 100);
}

export function wait(milliSeconds: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, milliSeconds));
}

export async function waitForUpdate(application: ReactWrapper<any>, time = 0) {
  await wait(time);
  await application.update();
}

export async function waitForStateChange(
  application: ReactWrapper<any>,
  startingState: any,
  timeout = 4000
): Promise<void> {
  await application.update();
  if (!isEqual(application.state(), startingState)) {
    return;
  }
  if (timeout <= 0) {
    throw new Error(`timeout waiting to redirect to component`);
  }
  await wait(100);
  return await waitForStateChange(application, startingState, timeout - 100);
}

export const expectFormInput = (
  wrapper: ReactWrapper,
  id: string,
  label: string,
  value: any
) => {
  expectToExist(
    wrapper.find(FormGroup).filterWhere(e => e.prop("label") === label)
  );
  expect(
    wrapper
      .find("input")
      .filterWhere(e => e.prop("id") === id)
      .prop("value")
  ).toEqual(value);
};

export const expectFormSwitch = (
  wrapper: ReactWrapper,
  id: string,
  label: string,
  value: boolean
) => {
  expectToExist(
    wrapper.find(FormGroup).filterWhere(e => e.prop("label") === label)
  );
  expect(
    wrapper
      .find(Switch)
      .filterWhere(e => e.prop("id") === id)
      .prop("checked")
  ).toEqual(value);
};

export const expectFormRadio = (
  wrapper: ReactWrapper,
  radioLabel: string,
  label: string,
  value: boolean
) => {
  expectToExist(
    wrapper.find(RadioGroup).filterWhere(e => e.prop("label") === label)
  );
  expect(
    wrapper
      .find(Radio)
      .filterWhere(e => e.prop("label") === radioLabel)
      .prop("checked")
  ).toEqual(value);
};
