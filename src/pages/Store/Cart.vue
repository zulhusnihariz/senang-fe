<template>
  <div class="row full-height">
    <q-card class="bg-green-3 full-width column justify-center items-center">
      <!-------------------->
      <!-- Quantity Table -->
      <!-------------------->
      <q-markup-table :seperator="seperator">
        <thead>
          <tr class="text-center">
            <th>Type</th>
            <th>Two Day Pass</th>
            <th>Saturday 4 Dec 21' Only</th>
            <th>Sunday 5 Dec 21' Only</th>
            <th>Add on Meat Cute Burger Meal</th>
          </tr>
        </thead>
        <template v-for="(type, index) in ticketType" :key="index">
          <tr>
            <td>{{ type }}</td>
            <template v-for="(data, index) in ticketData" :key="index">
              <td class="text-center" v-if="data.name.match(type)">
                <p class="no-padding no-margin">
                  {{ data.quantity }}
                </p>
              </td>
            </template>
            <td class="text-center">
              <p class="no-padding no-margin">
                {{ ticketData[ticketData.length - 1].quantity }}
              </p>
            </td>
          </tr>
        </template>
      </q-markup-table>
      <!----------------------->
      <!-- Currency dropdown -->
      <!----------------------->
      <q-select
        dense
        outlined
        v-model="selected.currency"
        :options="currencies"
        emit-value
        map-options
        class="bg-white q-my-lg"
        style="min-width: 200px; font-size: 20px"
      ></q-select>

      <!------------------>
      <!-- Ticket Table -->
      <!------------------>
      <q-markup-table :seperator="seperator">
        <thead>
          <tr class="text-left">
            <template v-for="(header, index) in tableHeader" :key="index">
              <th style="width: 200px">{{ header }}</th>
            </template>
          </tr>
        </thead>
        <template v-for="(type, index) in ticketType" :key="index">
          <tr>
            <td>{{ type }}</td>
            <template v-for="(data, index) in ticketData" :key="index">
              <td class="text-left" v-if="data.name.match(type)">
                <div class="row">
                  <div class="col-6">
                    <p class="no-padding no-margin">
                      {{ selected.currency.toUpperCase() }}
                      {{ data.prices[selected.currency].amount }}
                      <!-- {{ data.prices[selected.currency].amount }} -->
                    </p>
                  </div>
                  <div class="col-6">
                    <q-btn
                      class="text-black add-remove-btn q-mx-md"
                      icon="add"
                      size="sm"
                      @click="addProductToCart(data)"
                    ></q-btn>

                    <!-- <q-btn
                      v-if="!!data.quantity"
                      class="text-black add-remove-btn"
                      icon="remove"
                      size="sm"
                      @click="--data.quantity"
                    ></q-btn> -->
                  </div>
                </div>
              </td>
            </template>
            <td class="text-center">
              <div class="row">
                <div class="col-6">
                  <p class="no-padding no-margin">
                    {{ selected.currency.toUpperCase() }}
                    {{ ticketData[ticketData.length - 1].prices['myr'].amount }}
                  </p>
                </div>
                <div class="col-6">
                  <q-btn
                    class="text-black add-remove-btn q-mx-md"
                    icon="add"
                    size="sm"
                    @click="++ticketData[ticketData.length - 1].quantity"
                  ></q-btn>

                  <!-- <q-btn
                    v-if="!!ticketData[ticketData.length - 1].quantity"
                    class="text-black add-remove-btn"
                    icon="remove"
                    size="sm"
                    @click="--ticketData[ticketData.length - 1].quantity"
                  ></q-btn> -->
                </div>
              </div>
            </td>
          </tr>
        </template>
      </q-markup-table>

      <br />

      <!--------------------------->
      <!-- Home/Party Pack table -->
      <!--------------------------->
      <q-markup-table :seperator="seperator">
        <template v-for="(type, index) in packType" :key="index">
          <tr>
            <td class="col-4" style="border-bottom: 1px solid black">{{ type }}</td>

            <template v-for="(data, index) in packData" :key="index">
              <tr>
                <td style="width: 600px" v-if="data.name.match(type)" class="row">
                  <div class="col-3">{{ data.name.split('-')[1] }}</div>
                  <div class="col-4 text-center">List of gifts</div>
                  <div class="col-5 row items-center">
                    <div class="col-4">
                      {{ selected.currency.toUpperCase() }}
                      {{ data.prices[selected.currency].amount }}
                    </div>
                    <div class="col-8 row items-center">
                      <q-btn
                        class="text-black add-remove-btn"
                        icon="add"
                        size="sm"
                        @click="++ticketData[ticketData.length - 1].quantity"
                      ></q-btn>

                      <q-input
                        style="width: 30px"
                        class="q-mx-md text-h6 text-center"
                        disable
                      ></q-input>
                      <q-btn
                        class="text-black add-remove-btn"
                        icon="remove"
                        size="sm"
                        @click="--item.quantity"
                      ></q-btn>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
          </tr>
        </template>
      </q-markup-table>

      <!-- <q-list v-for="(item, index) in productData" :key="index">
        <q-item-section>
          <q-item>
            {{ item.name }}
            <div class="row">
              <q-btn
                class="text-black"
                icon="add"
                size="lg"
                @click="++productData[index].quantity"
              ></q-btn>

              <q-input
                v-model="item.quantity"
                style="width: 50px"
                class="q-mx-lg text-h6 text-center"
                disable
              ></q-input>
              <q-btn class="text-black" icon="remove" size="lg" @click="--item.quantity"></q-btn>
            </div>
          </q-item>
        </q-item-section>
      </q-list> -->
    </q-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

import products from '../../data/products';

import RepositoryFactory from '../../repositories/RepositoryFactory';

const ProductRepository = RepositoryFactory.get('product');

export default {
  data() {
    return {
      productsAPI: [],
      selected: {
        currency: 'myr',
      },
      packQuantity: {
        earlyBird: '',
        midRelease: '',
        finalRelease: '',
      },
      currencies: [
        { label: 'SGD', value: 'sgd', symbol: '$' },
        { label: 'IDR', value: 'idr', symbol: '' },
        { label: 'PHP', value: 'php', symbol: 'PHP' },
        { label: 'THB', value: 'thb', symbol: '฿' },
        { label: 'USD', value: 'usd', symbol: 'USD' },
        { label: 'MYR', value: 'myr', symbol: 'RM' },
      ],

      tableHeader: [
        'Type',
        'Two Day Pass',
        "Saturday 4 Dec 21' Only",
        "Sunday 5 Dec 21' Only",
        'Add on Meat Cute Burger Meal',
      ],
      productData: products,
      ticketType: [
        'Early Bird',
        'First Release',
        'Second Release',
        'Third Release',
        'Final Release',
      ],
      packType: ['Early Bird', 'Mid Release', 'Final Release'],
    };
  },
  async created() {
    await this.getAllProducts();
  },
  async mounted() {
    // this.setProductData();
  },
  methods: {
    ...mapActions('product', ['addProductToCart']),

    productDataSetup(array) {
      array.forEach(el => {
        el.quantity = 0;
        this.productsAPI.push(el);
      });
    },
    async getAllProducts() {
      try {
        const response = await ProductRepository.getReviveProducts();
        await this.productDataSetup(response.data);

        return response;
      } catch (error) {
        console.error();
      }
    },
    // setProductData() {
    //   const productDataCopy = JSON.parse(JSON.stringify(this.productData));
    //   productDataCopy.forEach(el => {
    //     el.quantity = 0;
    //     console.log(el);
    //   });

    //   this.productData = productDataCopy;
    // },
  },

  computed: {
    ...mapGetters('product', ['currentCart']),

    ticketData() {
      return this.productData.filter(el => !el.name.match('Pack'));
      // return this.productData.filter(el => !el.name.match('Pack'));
    },
    packData() {
      return this.productData;
    },
  },
};
</script>

<style scoped>
.add-remove-btn {
  width: 25px;
  height: 25px;
}
</style>
