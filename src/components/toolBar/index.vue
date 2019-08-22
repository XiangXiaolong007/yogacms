<template>
  <div class="r-toolbar">
    <el-button
      v-for="child in children"
      :key="child.text"
      v-show="premissStatus[child.text]"
      v-bind="getChildBind(child)"
      @click="handlerClick(child)"
    >
      {{child.text}}
      <i v-if="child.iconClass" :class="child.iconClass"></i>
    </el-button>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";
import { ButtonItem } from "@/components/Interface";
@Component({})
export default class Toolbar extends Vue {
  @Prop(Object)
  readonly ctx?: object;

  @Prop({
    type: Array,
    default() {
      return [];
    }
  })
  readonly children!: Array<ButtonItem>;

  @Emit()
  async handlerClick(child: ButtonItem) {
    if (_.isFunction(child.action)) {
      console.log(this.ctx);
      await child.action(this.ctx);
    }
    return child;
  }
  premissStatus: any = {};

  async premissHandler(child: ButtonItem) {
    if (_.isFunction(child.premise)) {
      return child.premise(this.ctx);
    }
    return _.isUndefined(child.premise) ? true : child.premise;
  }

  @Watch("children", { immediate: true, deep: true })
  refreshPremise() {
    this.children.forEach(async child => {
      const status = await this.premissHandler(child);

      if (child.text)
        this.$set(this.premissStatus, child.text.toString(), status);
    });
  }
  getChildBind = (child: ButtonItem) => {
    return {
      icon: child.icon,
      size: child.size,
      type: child.type
    };
  };
}
</script>