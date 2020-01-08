<template>
  <v-container>
    <v-row justify="center">
      <v-card
        class="ma-2 px-5 py-2"
        max-width="960"
        min-width="90%"
        style="cursor:default"
        elevation="8"
      >
        <v-row>
          <v-col class="pa-0">
            <v-card-title><span class="headline font-weight-bold mx-auto">{{ this.titleProduct }}</span></v-card-title>
          </v-col>
        </v-row>
        <v-divider/>
        <v-row dense no-gutters>
          <v-col cols="12" sm="5" lg="4" class="mb-sm-0 mb-7">
            <v-img
              :src="this.imageProduct"
              max-height="250"
              contain
            />
          </v-col>
          <v-col cols="12" sm="7" lg="8">
            <v-card-text class="description-product">
              <v-simple-table dense>
                <thead/>
                <tbody>
                <tr v-for="param in productParams" :key="param.id">
                  <td style="width:70%">
                    <span class="name-param">{{ param.name + " " + param.sym }}</span>
                  </td>
                  <td style="width:30%">
                    <span class="font-italic font-weight-bold">{{ param.value + " " + param.unit }}</span>
                  </td>
                </tr>
                </tbody>
              </v-simple-table>
              <v-divider/>
              <v-simple-table dense>
                <thead/>
                <tbody>
                <tr>
                  <td style="width:70%">
                    <span class="name-param">Колличество</span>
                  </td>
                  <td style="width:30%">
                    <span class="font-italic font-weight-bold">{{ this.quantity + ' шт'}}</span>
                  </td>
                </tr>
                <tr>
                  <td style="width:70%">
                    <span class="name-param">Цена за ед.</span>
                  </td>
                  <td style="width:30%">
                    <span class="font-italic font-weight-bold">{{ this.price }} грн</span>
                  </td>
                </tr>
                </tbody>
              </v-simple-table>
              <v-divider/>
            </v-card-text>
          </v-col>
        </v-row>
        <v-divider/>
        <v-row>
          <v-spacer/>
          <v-card-actions class="pa-4">
            <edit-product
              class="mr-5"
              :cartItem="this.productInCart"
            />
            <v-btn color="red accent-4" dark small to="/">Закрыть<v-icon right size="25">close</v-icon></v-btn>
          </v-card-actions>
        </v-row>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>

import EditProduct from '../components/EditProduct'

export default {
  name: 'ProductDetail',
  data () {
    return {
      titleProduct: '',
      imageProduct: '',
      quantity: '',
      price: '',
      productParams: [],
      productSelectParams: []
    }
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    EditProduct
  },
  mounted () {
    this.titleProduct = this.productInCart.titleProduct
    this.imageProduct = this.productInCart.imageProduct
    this.quantity = this.productInCart.quantity
    this.price = this.productInCart.price
    this.productParams = this.productInCart.productParams
    this.productSelectParams = this.productInCart.productSelectParams
  },
  watch: {
    'productInCart.quantity': {
      handler (val) {
        this.quantity = val
      }
    },
    'productInCart.productParams': {
      handler () {
        this.productParams = []
        for (let i = 0; i < this.productInCart.productParams.length; i++) {
          this.productParams.push({
            name: this.productInCart.productParams[i].name,
            sym: this.productInCart.productParams[i].sym,
            unit: this.productInCart.productParams[i].unit,
            value: this.productInCart.productParams[i].value
          })
        }
      },
      deep: true
    }
  },
  computed: {
    productInCart () {
      const id = this.id
      return this.$store.getters.productById(id)
    }
  }
}
</script>

<style scoped>

</style>
