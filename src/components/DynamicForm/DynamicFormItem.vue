<template>
  <el-form-item
    class="element-dynamic-item"
    :label="data.label"
    :label-width="data.labelWidth"
    :required="data.required"
    :rules="data.rules"
    :error="data.error"
    :show-message="data.showMessage"
    :inline-message="data.inlineMessage"
    :size="data.size"
  >
    <template v-if="data.type == 'input'">
      <el-input
        v-model="currentValue"
        :type="data.type"
        :placeholder="data.placeholder"
        :clearable="data.clearable"
        :readonly="data.readonly"
        :disabled="data.disabled"
        :minlength="data.minlength"
        :maxlength="data.maxlength"
        :prefix-icon="data.prefixIcon"
        :suffix-icon="data.suffixIcon"
        :style="data.style"
        :class="data.class"
        @focus="handleEvent('focus', $event)"
        @blur="handleEvent('blur', $event)"
        @change="handleEvent('change', $event)"
      ></el-input>
    </template>
    <template v-if="data.type == 'textarea'">
      <el-input
        v-model="currentValue"
        type="textarea"
        :rows="data.rows"
        :autosize="data.autosize"
        :resize="data.resize"
        :minlength="data.minlength"
        :maxlength="data.maxlength"
        :show-word-limit="data.showWordLimit"
        :placeholder="data.placeholder"
        :readonly="data.readonly"
        :disabled="data.disabled"
        :style="data.style"
        :class="data.class"
        @focus="handleEvent('focus', $event)"
        @blur="handleEvent('blur', $event)"
        @change="handleEvent('change', $event)"
      ></el-input>
    </template>
    <template v-if="data.type == 'input-number'">
      <el-input-number
        v-model="currentValue"
        :min="data.min"
        :max="data.max"
        :step="data.step"
        :step-strictly="data.stepStrictly"
        :precision="data.precision"
        :controls="data.controls"
        :placeholder="data.placeholder"
        :controls-position="'right'"
        :disabled="data.disabled"
        :style="data.style"
        :class="data.class"
        @focus="handleEvent('focus', $event)"
        @blur="handleEvent('blur', $event)"
        @change="handleEvent('change', $event)"
      ></el-input-number>
    </template>
    <template v-if="data.type == 'select'">
      <el-select
        v-model="currentValue"
        :disabled="data.disabled"
        :multiple="data.multiple"
        :clearable="data.clearable"
        :placeholder="data.placeholder"
        :style="{ width: data.width }"
      >
        <el-option
          v-for="item in data.options"
          :key="item.value"
          :value="item.value"
          :label="data.showLabel ? item.label : item.value"
        ></el-option>
      </el-select>
    </template>
    <template v-if="data.type == 'radio'">
      <el-radio-group
        v-model="currentValue"
        :style="{ width: data.width }"
        :disabled="data.disabled"
      >
        <el-radio
          v-for="item in data.options"
          :style="{display: data.inline === false ? 'block' : 'inline-block'}"
          :label="item.value"
          :key="item.value"
        >
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </template>

    <template v-if="data.type == 'checkbox'">
      <el-checkbox-group
        v-model="data.defaultValue"
        :style="{ width: data.width }"
        :disabled="data.disabled"
      >
        <el-checkbox
          v-for="item in data.options"
          :style="{display: data.inline ? 'inline-block' : 'block'}"
          :label="item.value"
          :key="item.label"
        >
          {{ item.label }}
        </el-checkbox>
      </el-checkbox-group>
    </template>

    <template v-if="data.type == 'time'">
      <el-time-picker
        v-model="data.defaultValue"
        :is-range="data.isRange"
        :placeholder="data.placeholder"
        :start-placeholder="data.startPlaceholder"
        :end-placeholder="data.endPlaceholder"
        :readonly="data.readonly"
        :disabled="data.disabled"
        :editable="data.editable"
        :clearable="data.clearable"
        :arrowControl="data.arrowControl"
        :style="{ width: data.width }"
      >
      </el-time-picker>
    </template>

    <template v-if="data.type == 'date'">
      <el-date-picker
        v-model="data.defaultValue"
        :type="data.type"
        :is-range="data.isRange"
        :placeholder="data.placeholder"
        :start-placeholder="data.startPlaceholder"
        :end-placeholder="data.endPlaceholder"
        :readonly="data.readonly"
        :disabled="data.disabled"
        :editable="data.editable"
        :clearable="data.clearable"
        :style="{ width: data.width }"
      >
      </el-date-picker>
    </template>

    <!-- <template v-if="data.type == 'rate'">
      <el-rate
        v-model="data.defaultValue"
        :max="data.max"
        :disabled="data.disabled"
        :allow-half="data.allowHalf"
      ></el-rate>
    </template>

    <template v-if="data.type == 'switch'">
      <el-switch
        v-model="data.defaultValue"
        :disabled="data.disabled"
      >
      </el-switch>
    </template>

    <template v-if="data.type == 'slider'">
      <el-slider
        v-model="data.defaultValue"
        :min="data.min"
        :max="data.max"
        :disabled="data.disabled"
        :step="data.step"
        :show-input="data.showInput"
        :range="data.range"
        :style="{ width: data.width }"
      ></el-slider>
    </template>

    <template v-if="data.type == 'cascader'">
      <el-cascader
        v-model="data.defaultValue"
        :disabled="data.disabled"
        :clearable="data.clearable"
        :placeholder="data.placeholder"
        :style="{ width: data.width }"
        :options="data.remoteOptions"
      >
      </el-cascader>
    </template> -->
  </el-form-item>
</template>

<script>
  import Emitter from '../../utils/emitter.js';

  export default {
    name: "DynamicFormItem",
    mixins: [ Emitter ],
    props: {
      value: {
        type: [String, Number, Boolean, Array, Object],
        required: true
      },
      data: {
        type: Object,
        required: true,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        currentValue: this.value
      }
    },
    watch: {
      value(value) {
        this.currentValue = value;
      },
      currentValue(value) {
        this.$emit('input', value);
      }
    },
    methods: {
      handleEvent(type, event) {
        // 处理事件
        const eventData = {
          context: this,
          value: this.currentValue,
          type: type,
          handle: '',
          event: event
        };
        if (this.data.on && this.data.on.length > 0) {
          for (const item of this.data.on) {
            if (item.type === type) {
              eventData.handle = item.name;
              this.dispatch('DynamicForm', 'on-dynamic-form-item-event', eventData);
            }
          }
        }
      }
    }
  };
</script>

<style lang="less">
  
</style>
