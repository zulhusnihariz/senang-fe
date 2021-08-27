<template>
  <!-- option-value="state_id"
    option-label="title"
    emit-value
    map-options 
    @filter="triggerTextSearch"
    
    -->
  <q-select
    v-model="text"
    use-input
    input-debounce="0"
    :options="results"
    option-value="category_id"
    option-label="title"
    emit-value
    map-options
    hide-dropdown-icon
    class="q-ml-xl bg-white text-subtitle-1 bg-white"
    style="position: relative; width: 50%"
    @filter="triggerTextSearch"
  >
    <template v-slot:no-option>
      <q-item>
        <q-item-section class="text-grey">No results</q-item-section>
      </q-item>
    </template>

    <q-btn
      class="q-my-sm q-mr-sm bg-primary text-white"
      icon="search"
      style="width: 10%"
      @click="$router.push({ name: 'Store-ProductList' })"
    />
  </q-select>
  <!-- <q-input
    v-model="text"
    class="q-ml-xl bg-white text-subtitle-1"
    style="position: relative; width: 50%"
    placeholder="Search for products, brands or shops"
    outlined
    @update:model-value="triggerTextSearch"
  >
    <q-btn
      class="q-my-sm bg-primary text-white"
      icon="search"
      style="width: 10%"
      @click="$router.push({ name: 'Store-ProductList' })"
    />
  </q-input>

  <div
    v-if="text && results.length"
    style="
      border: 1px solid black;
      position: fixed;
      transform: translate(32%, 130px);
      width: 666px;
      height: auto;
      max-height: 300px;
      top: 0px;
      overflow: hidden;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    "
    class="bg-white text-black"
  >
    <q-list dense class="rounded-borders">
      <template v-for="(item, index) in results" :key="index">
        <q-item clickable @click="hideSearchDropdown(item.title)">
          <q-item-section>{{ item.title }}</q-item-section>
        </q-item>
      </template>
    </q-list>
  </div> -->
</template>

<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import RepositoryFactory from '/src/repositories/RepositoryFactory';
// import EssentialLink from 'components/EssentialLink.vue';

const ProductRepository = RepositoryFactory.get('product');
export default {
  name: 'SearchField',

  data() {
    return {
      text: '',
      resultsAPI: [],
      test: [
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
      ],
    };
  },

  methods: {
    ...mapActions('authentication', ['removeUser']),
    hideSearchDropdown(value) {
      this.text = value;
      this.resultsAPI = [];
    },
    triggerTextSearch: async function (value, update) {
      console.log(value, update);

      if (value === '') {
        update(() => {
          this.resultsAPI = [];
        });
        return;
      }

      update(async () => {
        if (value.length < 3) return;
        const response = await this.getProductByTextSearch(value);
        this.resultsAPI = response.data.results;
        // const needle = value.toLowerCase();
        // this.options = stringOptions.filter(v => v.toLowerCase().indexOf(needle) > -1);
      });
    },
    // triggerTextSearch: async function (value) {
    //   if (value.length < 3) return;

    //   try {
    //     const response = await this.getProductByTextSearch(value);
    //     this.resultsAPI = response.data.results;
    //     console.log(this.resultsAPI);
    //   } catch (error) {
    //     console.error();
    //   }
    // },
    getProductByTextSearch: async function (text) {
      const response = await ProductRepository.getProductByTextSearch(text);
      return response;
    },
  },
  computed: {
    ...mapGetters('authentication', ['user']),
    results() {
      return this.resultsAPI;
    },
  },
};
</script>
