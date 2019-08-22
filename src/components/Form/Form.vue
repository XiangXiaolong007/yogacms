<template>
  <div class="r-form">
    <el-form ref="form" v-bind="formProps">
      <el-form-item v-for="(child,$index) in children" :key="$index" :label="child.label">
        <component :is="itemType(child)" v-bind="child" ref="widgets" @ready="widgetReady"></component>
      </el-form-item>
      <el-form-item :size="handlerSize">
        <r-toolbar :children="toolbar" @handler-click="toolbarHandler" :ctx="model"></r-toolbar>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import {
  Component,
  Mixins,
  Vue,
  Watch,
  Provide,
  Prop
} from "vue-property-decorator";
import { Form as ElForm } from "element-ui";
import RInput from "@/components/widget/Input.vue";
import RToolbar from "@/components/toolBar/index.vue";
import RPassword from "@/components/widget/Password.vue";
import {
  FormModel,
  Validate,
  ButtonItem,
  FormItem
} from "@/components/Interface";

@Component({
  components: {
    RInput,
    RToolbar,
    RPassword
  }
})
export default class Form extends Mixins(Vue) {
  @Prop(Array)
  readonly children!: Array<FormItem>;
  @Prop({
    default() {
      return {};
    }
  })
  readonly defaultModel?: any;
  @Prop(Array)
  readonly toolbar?: Array<ButtonItem>;

  @Prop(String)
  readonly handlerSize?: string;

  rules: Validate = {};
  widgetList: Array<string> = [];
  defaultModelCache?: any = {};
  widget: { [name: string]: any } = {};

  @Provide()
  model: FormModel = {};

  @Provide()
  changeModelItem(name: string, value: any) {
    this.$set(this.model, name, value);
  }
  @Provide()
  initModelItemValidate(name: string, value: any) {
    this.$set(this.rules, name, value);
  }

  get validateOnRuleChange(): boolean {
    return Object.keys(this.widget).some((key: string) => {
      return !this.widget[key];
    });
  }

  get formProps() {
    const { widgetList, toolbar, handlerSize, ...props } = this.$props;
    return {
      ...props,
      model: this.model,
      rules: this.rules,
      validateOnRuleChange: this.validateOnRuleChange
    };
  }

  @Watch("defaultModel", { immediate: true, deep: true })
  async refreshDefaultModel() {
    const res = await this.defaultModelHandler();
    Object.keys(res).forEach((key: string) => {
      this.$set(this.model, key, res[key]);
      this.defaultModelCache[key] = _.cloneDeep(res[key]);
    });
  }

  widgetReady(name: string, defaultValue: any) {
    this.defaultModelCache[name] = _.cloneDeep(this.model[name]);
  }
  itemType = (child: { widget: string }) => {
    const widget = child.widget || "input";
    const widgetName = widget.replace(/([A-Z])/g, e => `-${e.toLowerCase()}`);
    return `r-${widgetName}`;
  };

  async defaultModelHandler() {
    return _.isFunction(this.defaultModel)
      ? this.defaultModel()
      : this.defaultModel;
  }
  validate() {
    return new Promise((resolve, reject) => {
      const ref: ElForm = this.$refs.form as ElForm;
      ref.validate((valid: boolean) =>
        valid ? resolve(valid) : reject(valid)
      );
    });
  }
  async submit() {
    const valid = await this.validate();
  }

  created() {
    this.children.forEach(item => this.$set(this.model, item.name, null));
  }
  async cancel() {
    const form: ElForm = this.$refs.form as ElForm;
    const { widgets } = this.$refs;
    form.clearValidate();
    _.forEach(this.defaultModelCache, (value, key) => {
      this.changeModelItem(key, value);
    });
  }
  async toolbarHandler(child: ButtonItem) {
    if (child.action === "SUBMIT") {
      this.submit();
    } else if (child.action === "CANCEL") {
      this.cancel();
      this.$emit("cancelClick", this.model);
    } else if (child.action === "SEARCH") {
      this.$emit("searchClick", this.model);
    }
  }
}
</script>