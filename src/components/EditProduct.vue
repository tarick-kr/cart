<template>
  <v-row justify="end" class="mr-4">
    <v-dialog v-model="dialog" max-width="760px">
      <template v-slot:activator="{ on }">
        <v-btn class="my-2" color="success" small dark v-on="on">
          изменить
          <v-icon size="18" right>edit</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-center px-1 px-sm-2 px-md-4">
          <span class="headline mx-auto">{{ cartItem.titleProduct }}</span>
        </v-card-title>
        <div class="text-center px-1 px-sm-2 px-md-4">
          <v-divider class="mb-4 divider-width-align"/>
        </div>
        <v-img
          class="mb-4"
          :src="cartItem.imageProduct"
          aspect-ratio="5"
          contain
        />
        <div class="text-center px-1 px-sm-2 px-md-4">
          <v-divider class="divider-width-align"/>
        </div>
        <v-card-text class="px-1 px-sm-2 px-md-4">
          <v-container>
            <v-row>
              <v-col
                cols="12" sm="4"
                v-for="editedProduct in this.editedParams"
                :key="editedProduct.id"
              >
                <app-input
                  :product="editedProduct"
                  @onUpdate="update($event)"
                />
              </v-col>
            </v-row>
          </v-container>
          <v-divider class="divider-width-align"/>
          <v-container>
            <v-row>
              <v-col cols="12" sm="4">
                <app-input
                  :product="this.editedQuantity"
                  @onUpdate="update($event)"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            class="mr-4"
            color="red accent-4"
            dark
            small
            @click="onCancel"
          >Закрыть
            <v-icon right size="21">close</v-icon>
          </v-btn>
          <v-btn

            color="blue darken-1"
            class="white--text"
            small
            @click="onSave"
          >
            Сохранить
            <v-icon right size="19">save</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import AppInput from './AppInput'

export default {
  name: 'EditProduct',
  data () {
    return {
      dialog: false,
      editedParams: [],
      editedParamValid: [],
      editedParamCount: 0,
      editedQuantity: '',
      editedQuantityValid: true
    }
  },
  components: {
    AppInput
  },
  props: {
    cartItem: {
      type: Object,
      required: true
    }
  },
  mounted () {
    this.initValue()
  },
  methods: {
    initValue () {
      for (let i = 0; i < this.cartItem.productParams.length; i++) {
        let itemObj = this.cartItem.productParams[i]
        let itemObjNew = Object.assign({}, itemObj)
        this.editedParams.push(itemObjNew)
      }
      for (let i = 0; i < this.cartItem.productParams.length; i++) {
        this.editedParamValid.push(true)
      }
      this.editedParamCount = this.editedParamValid.length
      this.editedQuantity = this.cartItem.quantity
    },
    onCancel () {
      this.dialog = false
    },
    onSave () {
      this.dialog = false
    },
    update (payload) {
      if (typeof payload === 'object') {
        this.$set(payload.product, payload.prop, payload.newValue)
      } else {
        this.editedQuantity = Number(payload)
      }
    }
    // onChangeParam (index, data) {
    //   this.editedParams[index].value = data.value
    //   this.editedParamValid[index] = data.valid
    //
    //   let editedParamCount = 0
    //   for (let i = 0; i < this.editedParamValid.length; i++) {
    //     if (this.editedParamValid[i]) {
    //       editedParamCount++
    //     }
    //   }
    //   this.editedParamCount = editedParamCount
    // },
    // onChangeQuantity (data) {
    //   this.editedQuantity = Number(data.value)
    //   this.editedQuantityValid = data.valid
    // }
  },
  computed: {
    // editedParamComplited () {
    //   return this.editedParamCount === this.editedParamValid.length
    // },
    // editedQuantityComplited () {
    //   return this.editedQuantityValid
    // },
    // allFieldsComplited () {
    //   return this.editedParamComplited && this.editedQuantityComplited
    // }
  }
}
</script>

<style scoped lang="sass">

.divider-width-align
  margin: 0 auto
  max-width: calc(100% - 26px)

</style>
