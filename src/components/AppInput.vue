<template>
  <v-text-field
    :label="this.label"
    :hint="this.hint"
    persistent-hint
    required
    :value="typeof this.data === 'object' ? this.data.value : this.data"
    @input="onChangeValue($event)"
    :error="!validValue"
  />
</template>

<script>
export default {
  name: 'AppInput',
  data () {
    return {
      label: '',
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
      type: [Number],
      required: false
    }
  },
  mounted () {
    this.initValue()
  },
  methods: {
    initValue () {
      if (typeof this.data === 'object') {
        this.label = this.data.name + ' ' + this.data.sym + ',' + ' ' + this.data.unit
        this.hint = 'от ' + this.data.minimValue + this.data.unit + ' до ' + this.data.maximValue + this.data.unit
      } else {
        this.label = 'Колличество, шт'
        this.hint = 'максимум ' + this.maxQuantity + ' шт'
      }
    },
    onChangeValue (e) {
      if (typeof this.data === 'object') {
        this.$emit('onUpdate', {
          index: this.index,
          product: this.data,
          prop: 'value',
          newValue: Number(e),
          valid: this.patternValidParam.test(e) && e >= this.data.minimValue && e <= this.data.maximValue
        })
      } else {
        this.$emit('onUpdate', {
          newValue: e,
          valid: this.patternValidQuantity.test(String(e)) && String(e) > 0 && String(e) <= this.maxQuantity
        })
      }
    }
  },
  computed: {
    validValue () {
      if (typeof this.data === 'object') {
        return this.patternValidParam.test(this.data.value) && this.data.value >= this.data.minimValue && this.data.value <= this.data.maximValue
      } else {
        return this.patternValidQuantity.test(String(this.data)) && String(this.data) > 0 && String(this.data) <= this.maxQuantity
      }
    }
  }
}
</script>

<style scoped>

</style>
