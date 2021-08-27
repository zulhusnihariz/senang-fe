<template>
  <div class="row full-height q-pt-xl">
    <!-- -------------------------------------------------------------------------- -->
    <!--                                 Navigation                                 -->
    <!-- -------------------------------------------------------------------------- -->
    <div class="col-3 full-height column items-end">
      <div>
        <div class="q-mb-md q-ml-none text-h6 text-weight-bold items-center">
          <q-icon name="filter_alt" size="sm"></q-icon>

          <span class="q-ml-md">SEARCH FILTER</span>

          <q-separator class="q-mt-lg" />
        </div>
        <q-list>
          <q-item class="column text-h6">
            <q-item-section class="text-weight-medium">By Category</q-item-section>
            <q-item-section class="text-weight-regular">
              <div>
                <q-option-group
                  v-model="selected.category_id"
                  :options="computedCategories"
                  color="green"
                  type="checkbox"
                  @update:model-value="setQuery"
                />
              </div>
            </q-item-section>
          </q-item>
        </q-list>
        <q-list>
          <q-item class="column text-h6">
            <q-item-section>By Price Range</q-item-section>
            <q-item-section>
              <div class="row q-my-lg">
                <div class="column">
                  <q-input
                    class="q-mx-md price-range"
                    v-model="selected.min_price"
                    outlined
                    dense
                    placeholder="RM MIN"
                    lazy-rules
                  />
                </div>
                <div class="column flex self-center">
                  <hr style="border-top: 1px solid #bdbdbd; width: 30px" />
                </div>
                <div class="column">
                  <q-input
                    class="q-mx-md price-range"
                    v-model="selected.max_price"
                    outlined
                    dense
                    placeholder="RM MAX"
                    lazy-rules
                  />
                </div>
              </div>
            </q-item-section>
            <q-item-section>
              <q-btn
                :disable="!selected.min_price || !selected.max_price"
                class="bg-primary text-white"
                @click="setQuery"
              >
                APPLY
              </q-btn>
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <!-- -------------------------------------------------------------------------- -->
    <!--                                    View                                    -->
    <!-- -------------------------------------------------------------------------- -->
    <div class="col-9 q-mb-xl full-height">
      <div class="q-mx-xl" style="width: 80%">
        <ProductList v-if="$route.path.match('product')" />
      </div>
    </div>
    <br />
    <br />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import { Notify } from 'quasar';

import ProductList from './Store/Product-List.vue';

import RepositoryFactory from '../repositories/RepositoryFactory';
const ProductRepository = RepositoryFactory.get('product');

export default {
  components: {
    ProductList,
  },
  data() {
    return {
      selected: {
        category_id: [],
        min_price: null,
        max_price: null,
      },
    };
  },
  async created() {
    await this.getAllProduct();
    await this.getAllCategory();
  },

  methods: {
    ...mapActions('product', ['setProducts', 'setCategories']),

    /* -------------------------------------------------------------------------- */
    /*                                QUERY METHODS                               */
    /* -------------------------------------------------------------------------- */
    setQuery: async function () {
      const finalQuery = {};

      // setup query object for $router.push()
      Object.keys(this.selected).forEach(key => {
        if (key.match('category') && !!this.selected[key].length)
          finalQuery[key] = this.selected[key];

        if (key.match('price') && !!this.selected[key]) finalQuery[key] = this.selected[key];
      });

      this.$router.push({ path: '/user/product', query: finalQuery });

      // if no filter applied, trigger getAllProduct; else trigger getFilteredProducts
      !!Object.keys(finalQuery).length
        ? await this.getFilteredProducts(finalQuery)
        : await this.getAllProduct();
    },

    /* -------------------------------------------------------------------------- */
    /*                                 API METHODS                                */
    /* -------------------------------------------------------------------------- */

    getAllProduct: async function () {
      const response = await ProductRepository.getAllProduct();
      if (response.data) await this.setProducts(response.data);
    },

    getAllCategory: async function () {
      const response = await ProductRepository.getAllCategory();
      if (response.data) await this.setCategories(response.data);
    },
    getFilteredProducts: async function (data) {
      const response = await ProductRepository.filterProduct(data);
      if (response.data) await this.setProducts(response.data);
    },
  },

  computed: {
    ...mapGetters('product', ['products', 'categories']),
    computedCategories() {
      return this.categories.map(el => {
        return { value: el.category_id, label: el.category_name };
      });
    },
    checkMinMaxPrice() {
      return [`${this.selected.min_price}`, `${this.selected.max_price}`];
    },
  },
  watch: {
    // After min & max price filter applied, if both field is emptied, getAllProduct will be triggered automatically
    checkMinMaxPrice: async function (newVal, oldVal) {
      let [oldMin, newMin] = [oldVal[0], newVal[0]];
      let [oldMax, newMax] = [oldVal[1], newVal[1]];

      if (!!!newMin.length && !!!newMax.length) await this.getAllProduct();
    },
  },
};
</script>

<style scoped>
h6 {
  margin: 0;
  padding: 0;
}

.price-range {
  width: 80px;
}
</style>
