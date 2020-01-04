<template>
  <v-text-field
    :label="this.label"
    :value="this.value"
    :hint="this.hint"
    persistent-hint
    required
    @input="onInput($event)"
    :error="!validValue"
  />
</template>

<script>
export default {
  name: 'AppInput',
  data () {
    return {
      label: '',
      value: '',
      hint: '',
      maxQuantity: 100,
      patternValidParam: /^-?\d*\.?\d+$/,
      patternValidQuantity: /^(?:[1-9]\d*|\d)$/
    }
  },
  props: {
    data: {
      type: [Object, Number],
      required: true
    },
    index: {
      type: Number,
      required: false
    }
  },
  created () {
    if (typeof this.data === 'object') {
      this.label = this.data.name + ' ' + this.data.sym + ',' + ' ' + this.data.unit
      this.hint = 'от ' + this.data.minimValue + this.data.unit + ' до ' + this.data.maximValue + this.data.unit
      this.value = this.data.value
    } else {
      this.label = 'Колличество, шт'
      this.hint = 'максимум ' + this.maxQuantity + ' шт'
      this.value = this.data
    }
  },
  updated () {
    this.value = this.updateValue
  },
  methods: {
    onInput (e) {
      this.$emit('changeInput', {
        value: e,
        valid: (
          typeof this.data === 'object'
            ? this.patternValidParam.test(e) && e >= this.data.minimValue && e <= this.data.maximValue
            : this.patternValidQuantity.test(e) && e > 0 && e <= this.maxQuantity
        )
      })
    }
  },
  computed: {
    validValue () {
      if (typeof this.data === 'object') {
        return this.patternValidParam.test(this.data.value) && this.data.value >= this.data.minimValue && this.data.value <= this.data.maximValue
      } else {
        return this.patternValidQuantity.test(String(this.data)) && String(this.data) > 0 && String(this.data) <= this.maxQuantity
      }
    },
    updateValue () {
      return typeof this.data === 'object' ? this.data.value : this.data
    }
  }
}
</script>

<style>

</style>
