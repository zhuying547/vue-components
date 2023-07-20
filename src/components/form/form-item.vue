<template>
  <div>
    <label v-if="label" :class="{ 'i-form-item-label-required': isRequired }">{{ label }}</label>
    <div>
      <slot></slot>
      <div v-if="validateStatus === 'error'" class="i-form-item-message">
        {{ validateMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import Emitter from '../../mixins/emitter';
import AsyncValidator from 'async-validator';

export default {
  mixins: [Emitter],
  inject: ['form'],
  props: {
    label: {
      type: String,
      default: '',
    },
    prop: {
      type: String,
    },
  },
  data() {
    return {
      isRequired: false,
      validateStatus: '',
      validateMessage: '',
    };
  },
  computed: {
    fieldValue() {
      return this.form.model[this.prop];
    },
  },
  mounted() {
    // 只有需要校验的时候才需要缓存
    if (this.prop) {
      this.dispatch('iForm', 'on-form-item-add', this);

      this.initialValue = this.fieldValue;

      this.setRules();
    }
  },
  beforeDestroy() {
    this.dispatch('iForm', 'on-form-item-remove', this);
  },
  methods: {
    getRules() {
      let formRules = this.form.rules;
      formRules = formRules ? formRules[this.prop] : [];
      return [].concat(formRules || []);
    },
    getFilteredRule(trigger) {
      const rules = this.getRules();
      return rules.filter((rule) => !rule.trigger || rule.trigger.indexOf(trigger) !== -1);
    },
    onFieldChange() {
      this.validate('change');
    },
    onFieldBlur() {
      this.validate('blur');
    },
    setRules() {
      let rules = this.getRules();
      if (rules.length) {
        rules.every((rule) => {
          this.isRequired = rule.required;
        });
      }

      this.$on('on-form-change', this.onFieldChange);
      this.$on('on-form-blur', this.onFieldBlur);
    },

    validate(trigger, callback = function () {}) {
      let rules = this.getFilteredRule(trigger);
      if (!rules || rules.length === 0) {
        return true;
      }

      this.validateStatus = 'validating';

      let descriptor = {};
      descriptor[this.prop] = rules;
      const validator = new AsyncValidator(descriptor);
      let model = {};
      model[this.prop] = this.fieldValue;

      validator.validate(model, { firstFields: true }, (errors) => {
        this.validateStatus = !errors ? 'success' : 'error';
        this.validateMessage = errors ? errors[0].message : '';

        callback(this.validateMessage);
      });
    },
    resetField() {
      this.validateStatus = '';
      this.validateMessage = '';
      this.form.model[this.prop] = this.initialValue;
    },
  },
};
</script>

<style>
.i-form-item-label-required::before {
  content: '*';
  color: red;
}
.i-form-item-message {
  color: red;
}
</style>
