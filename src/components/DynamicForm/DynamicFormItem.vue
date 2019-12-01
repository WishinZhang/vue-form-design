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
        :multiple="data.multiple"
        :multiple-limit="data.multipleLimit"
        :placeholder="data.placeholder"
        :clearable="data.clearable"
        :disabled="data.disabled"
        :style="data.style"
        :class="data.class"
        @focus="handleEvent('focus', $event)"
        @blur="handleEvent('blur', $event)"
        @change="handleEvent('change', $event)"
      >
        <el-option
          v-for="item in data.options"
          :key="item.value"
          :value="item.value"
          :label="item.label"
          @click.native="handleEvent('select', $event)"
        ></el-option>
      </el-select>
    </template>
    <template v-if="data.type == 'radio'">
      <el-radio-group
        v-model="currentValue"
        :disabled="data.disabled"
        :style="data.style"
        :class="data.class"
        @change="handleEvent('change', $event)"
      >
        <el-radio
          v-for="item in data.options"
          :label="item.value"
          :key="item.value"
        >
          {{ item.label }}
        </el-radio>
      </el-radio-group>
    </template>
    <template v-if="data.type == 'checkbox'">
      <el-checkbox-group
        v-model="currentValue"
        :disabled="data.disabled"
        :style="data.style"
        :class="data.class"
        @change="handleEvent('change', $event)"
      >
        <el-checkbox
          v-for="item in data.options"
          :label="item.value"
          :key="item.label"
        >
          {{ item.label }}
        </el-checkbox>
      </el-checkbox-group>
    </template>
    <template v-if="data.type == 'datepicker'">
      <el-date-picker
        v-model="currentValue"
        :type="data.dateType"
        :placeholder="data.placeholder"
        :start-placeholder="data.startPlaceholder"
        :end-placeholder="data.endPlaceholder"
        :readonly="data.readonly"
        :disabled="data.disabled"
        :editable="data.editable"
        :clearable="data.clearable"
        :format="data.format"
        :style="data.style"
        :class="data.class"
        @focus="handleEvent('focus', $event)"
        @blur="handleEvent('blur', $event)"
        @change="handleEvent('change', $event)"
      >
      </el-date-picker>
    </template>
    <template v-if="data.type == 'timepicker'">
      <el-time-picker
        v-model="currentValue"
        :is-range="data.isRange"
        :placeholder="data.placeholder"
        :start-placeholder="data.startPlaceholder"
        :end-placeholder="data.endPlaceholder"
        :readonly="data.readonly"
        :disabled="data.disabled"
        :editable="data.editable"
        :clearable="data.clearable"
        :format="data.format"
        :style="data.style"
        :class="data.class"
        @focus="handleEvent('focus', $event)"
        @blur="handleEvent('blur', $event)"
        @change="handleEvent('change', $event)"
      >
      </el-time-picker>
    </template>
    <template v-if="data.type == 'switch'">
      <el-switch
        v-model="currentValue"
        :disabled="data.disabled"
        :width="data.width"
        :active-icon-class="data.activeIcon"
        :inactive-icon-class="data.inactiveIcon"
        :active-text="data.activeText"
        :inactive-text="data.inactiveText"
        :active-value="data.activeValue"
        :inactive-value="data.inactiveValue"
        :active-color="data.activeColor"
        :inactive-color="data.inactiveColor"
        :style="data.style"
        :class="data.class"
        @change="handleEvent('change', $event)"
      >
      </el-switch>
    </template>
    <template v-if="data.type == 'slider'">
      <el-slider
        v-model="currentValue"
        :min="data.min"
        :max="data.max"
        :step="data.step"
        :range="data.range"
        :disabled="data.disabled"
        :show-stops="data.showStops"
        :show-tooltip="data.showTooltip"
        :style="data.style"
        :class="data.class"
        @change="handleEvent('change', $event)"
      ></el-slider>
    </template>
  </el-form-item>
</template>

<script>
  import Emitter from '../../utils/emitter.js';

  export default {
    name: "DynamicFormItem",
    mixins: [ Emitter ],
    props: {
      value: {
        validator(value) {
          return value !== undefined;
        },
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
