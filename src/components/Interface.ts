export interface FormModel {
  [name: string]: any;
}

export interface Validate {
  [name: string]: any;
}

export interface FormItem {
  name: string;
  widget: string;
  validate: Array<any> | object;
  placeholder: string | undefined;
}

export interface ButtonItem {
  text: string | undefined;
  icon: string | undefined;
  size: string | undefined;
  type: string | undefined;
  action: string | Function | undefined;
  premise: string | boolean | Function | undefined;
}

export interface WidgetStore {
  [name: string]: any;
}
