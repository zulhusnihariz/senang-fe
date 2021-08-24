<template>
  <div class="row full-height q-pt-xl">
    <!-- -------------------------------------------------------------------------- -->
    <!--                                 Navigation                                 -->
    <!-- -------------------------------------------------------------------------- -->
    <div class="col-3 full-height column items-end">
      <div>
        <div class="q-mb-md q-ml-none text-h6 text-weight-bold items-center">
          <q-icon name="filter_alt" size="sm"> </q-icon>
          {{ query }}

          <span class="q-ml-md">SEARCH FILTER</span>

          <q-separator class="q-mt-lg" />
        </div>
        <q-list>
          <q-item class="column text-h6">
            <q-item-section class="text-weight-medium">By Category</q-item-section>
            <q-item-section class="text-weight-regular">
              <div>
                <q-option-group
                  v-model="selected.category"
                  :options="computedCategories"
                  color="green"
                  type="checkbox"
                  @update:model-value="setCategoryQuery"
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
            <q-item-section
              ><q-btn
                :disable="!selected.min_price && !selected.max_price"
                class="bg-primary text-white"
                @click="setPriceQuery"
              >
                APPLY</q-btn
              ></q-item-section
            >
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
        category: [],
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
    setQuery: function () {
      /* 

      const initialQuery = this.$route.query
      const finalQuery = {}

      const selectedArray = Object.keys(this.selected)

      selectedArray.forEach(key =>{

        if (key.match('category') && !!this.selected[key].length) finalQuery[key] = this.selected[key]
        if (key.match('price') && !!this.selected[key]) finalQuery[key] = this.selected[key]

      })

      console.log(finalQuery)

      this.$router.replace({query:null})

      this.$router.push({path:'/user/product', query: finalQuery})

      */

      return Object.assign({}, this.$route.query, newObject);
    },

    setCategoryQuery: async function (value) {
      if (this.selected.category.length > 0) {
        this.$router.push({ path: '/user/product', query: { category: [value] } });
        console.log('hello');
        const response = await this.filterProductByCategory({
          category_id: this.selected.category,
        });

        if (response.data) await this.setProducts(response.data);
      } else {
        this.$router.replace({ query: null });
        await this.getAllProduct();
      }
    },

    setPriceQuery: async function () {
      const priceArray = ['min_price', 'max_price'];
      let priceQuery = {};

      console.log('before:', priceQuery, this.selected.min_price, this.selected.max_price);

      priceArray.forEach(el => {
        if (!!this.selected[el]) priceQuery[el] = this.selected[el];
      });

      console.log('after:', priceQuery);

      this.$router.push({
        path: '/user/product',
        query: this.setQuery(priceQuery),
      });
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

    filterProductByCategory: async function (id) {
      const response = await ProductRepository.filterProductByCategory(id);
      return response;
    },
  },

  computed: {
    ...mapGetters('product', ['products', 'categories']),
    computedCategories() {
      return this.categories.map(el => {
        return { value: el.category_id, label: el.category_name };
      });
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
