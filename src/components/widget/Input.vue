<template>
  <div class="r-input">
    {{prefixIcon}}
    <el-input
      :prefixIcon="prefixIcon"
      :type="type"
      v-model="store.value"
      autocomplete="off"
      :placeholder="placeholder"
      :suffixIcon="suffixIcon"
    ></el-input>
  </div>
</template>

<script lang="ts">
import { Mixins } from "vue-property-decorator";
import BaseWidget from "./BaseWidget";
import { ButtonItem } from "../Interface";
export default class WInput extends Mixins(BaseWidget) {
  type: string = "text";
  toolbarHandler(child: ButtonItem) {}
}
</script>