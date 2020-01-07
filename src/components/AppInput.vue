<template>
  <v-text-field
    :label="this.label"
    :hint="this.hint"
    persistent-hint
    required
    :value="typeof this.product === 'object' ? this.product.value : this.product"
    @input="onChangeValue($event)"
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
    product: {
      type: [Object, Number],
      required: true
    }
  },
  mounted () {
    this.initValue()
  },
  methods: {
    initValue () {
      if (typeof this.product === 'object') {
        this.label = this.product.name + ' ' + this.product.sym + ',' + ' ' + this.product.unit
        this.hint = 'от ' + this.product.minimValue + this.product.unit + ' до ' + this.product.maximValue + this.product.unit
      } else {
        this.label = 'Колличество, шт'
        this.hint = 'максимум ' + this.maxQuantity + ' шт'
      }
    },
    onChangeValue (e) {
      if (typeof this.product === 'object') {
        this.$emit('onUpdate', {
          product: this.product,
          prop: 'value',
          newValue: e
        })
      } else {
        this.$emit('onUpdate', e)
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

<style>

</style>
