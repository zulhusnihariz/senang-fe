<template>
  <div class="row full-height">
    <q-card
      style="max-height: 900px"
      class="bg-green-3 full-width column justify-start items-center"
    >
      <div class="col-7">
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
          class="bg-white q-my-lg q-mx-auto self-center"
          style="width: 200px; font-size: 20px"
        ></q-select>

        <!------------------>
        <!-- Ticket Table -->
        <!------------------>
        <q-markup-table v-if="!!productsAPI.length" :seperator="seperator">
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
              <template v-for="(data, index) in filteredTicketData" :key="index">
                <td class="text-left" v-if="data.name.match(type)">
                  <div class="row">
                    <div class="col-6">
                      <p>
                        {{ `${index}  ${data.name.split('-')[1]}` }}
                        <!-- {{ selected.currency.toUpperCase() }}
                      {{ data.prices[selected.currency].amount }} -->
                      </p>
                    </div>
                    <div class="col-6">
                      <q-btn
                        class="text-black add-remove-btn q-mx-md"
                        icon="add"
                        size="sm"
                        @click="addProductToCart({ ...data, currency: `${selected.currency}` })"
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
                    <p>
                      {{ selected.currency.toUpperCase() }}
                      {{ filteredTicketData[filteredTicketData.length - 1].prices['myr'].amount }}
                    </p>
                  </div>
                  <div class="col-6">
                    <q-btn
                      class="text-black add-remove-btn q-mx-md"
                      icon="add"
                      size="sm"
                      @click="++filteredTicketData[filteredTicketData.length - 1].quantity"
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
              <td class="col-4" style="border-bottom: 0.5px solid #1a237e">{{ type }}</td>

              <template v-for="(data, index) in filteredPackData" :key="index">
                <tr>
                  <td
                    style="width: 820px"
                    v-if="data.name.match(type)"
                    class="row borders no-padding"
                  >
                    <div
                      style="border-right: 0.5px solid #1a237e"
                      class="col-3 text-center self-center full-height text-weight-bold"
                    >
                      {{ data.name.split('-')[1] }}
                    </div>
                    <div
                      style="border-right: 0.5px solid #1a237e"
                      class="col-5 text-center self-center"
                    >
                      <p class="full-height">List of gifts</p>
                    </div>
                    <div class="col-4 row items-center justify-around">
                      <div class="q-mr-md">
                        {{ selected.currency.toUpperCase() }}
                        {{ data.prices[selected.currency].amount }}
                      </div>
                      <div class="row items-center">
                        <q-btn
                          class="text-black add-remove-btn"
                          icon="remove"
                          size="sm"
                          @click="removeProductFromCart(data)"
                        ></q-btn>

                        <q-input
                          v-model="data.quantity"
                          style="width: 30px"
                          input-class="text-center"
                          class="q-mx-md text-subtitle2"
                          borderless
                        ></q-input>

                        <q-btn
                          class="text-black add-remove-btn"
                          icon="add"
                          size="sm"
                          @click="addProductToCart({ ...data, currency: `${selected.currency}` })"
                        ></q-btn>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
            </tr>
          </template>
        </q-markup-table>
      </div>

      <!------------------>
      <!-- Current Cart -->
      <!------------------>
      <div
        style="width: 542px; height: 500px; overflow-y: scroll"
        class="col-5 current-cart q-mt-md bg-green-2 text-center"
      >
        <div style="width: 542px; z-index: 2" class="fixed bg-green-2">
          <h4 class="no-padding q-mt-md q-mb-none">Current Cart</h4>
          <q-btn v-if="!!currentCart.length" class="q-my-lg bg-white" @click="proceedToCheckout()">
            Checkout
          </q-btn>
        </div>

        <div style="margin-top: 150px">
          <q-list v-for="(data, index) in currentCart" :key="index">
            <q-item-section>
              <q-item>
                <div style="min-width: 350px" class="col-5 text-right q-mr-lg self-center">
                  {{
                    ` ${data.name} - ${data.currency.toUpperCase()} ${
                      data.prices[data.currency].amount
                    } `
                  }}
                </div>
                <div style="height: 40px" class="col-7 row items-center justify-start">
                  <q-btn
                    class="text-black add-remove-btn"
                    icon="remove"
                    size="sm"
                    @click="removeProductFromCart(data)"
                  ></q-btn>

                  <q-input
                    v-model="data.quantity"
                    style="width: 40px"
                    input-class="text-center "
                    class="q-mx-md text-subtitle2 no-padding"
                    borderless
                    dense
                  ></q-input>

                  <q-btn
                    class="text-black add-remove-btn"
                    icon="add"
                    size="sm"
                    @click="addProductToCart({ ...data, currency: `${selected.currency}` })"
                  ></q-btn>
                </div>

                <div></div>
              </q-item>
            </q-item-section>
          </q-list>
        </div>
      </div>

      <!-------------------->
      <!-- Quantity Table -->
      <!-------------------->
      <!-- <q-markup-table v-if="!!productsAPI.length" :seperator="seperator">
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
            <template v-for="(data, index) in filteredTicketData" :key="index">
              <td class="text-center" v-if="data.name.match(type)">
                <p>
                  {{ data.quantity }}
                </p>
              </td>
            </template>
            <td class="text-center">
              <p>
                {{ filteredTicketData[filteredTicketData.length - 1].quantity }}
              </p>
            </td>
          </tr>
        </template>
      </q-markup-table> -->
    </q-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';

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

  methods: {
    ...mapActions('product', ['addProductToCart', 'removeProductFromCart', 'proceedToCheckout']),

    setProductData(array) {
      const arrayCopy = JSON.parse(JSON.stringify(array));
      arrayCopy.map(el => {
        el.quantity = 0;
      });
      return arrayCopy;
    },
    async getAllProducts() {
      try {
        const response = await ProductRepository.getReviveProducts();

        this.productsAPI = this.setProductData(response.data);

        console.log('productsAPI: ', this.productsAPI[0].name);
      } catch (error) {
        console.error();
      }
    },
  },

  computed: {
    ...mapGetters('product', ['currentCart']),

    filteredTicketData() {
      if (!!this.productsAPI.length) return this.productsAPI.filter(el => !el.name.match('Pack'));
      return this.productsAPI;
    },
    filteredPackData() {
      console.log(this.productsAPI.filter(el => el.name.match('Pack')));
      if (!!this.productsAPI.length) return this.productsAPI.filter(el => el.name.match('Pack'));
      return this.productsAPI;
    },
  },
};
</script>

<style scoped>
p {
  margin: 0;
}
.add-remove-btn {
  width: 25px;
  height: 25px;
}
.borders {
  border: 0.5px solid #1a237e;
  border-top: none;
}
.height-30 {
  height: 30px !important;
}
.q-field__control {
  height: 30px !important;
}

.current-cart::-webkit-scrollbar {
  display: none;
}
</style>
