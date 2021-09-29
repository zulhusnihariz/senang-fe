<template>
  <div class="q-mb-xl text-h5 text-weight-light">
    <div class="row q-mr-lg">
      <q-icon name="lightbulb" size="md"></q-icon>
      <h6 class="no-margin text-weight-light">Search Result for --insert search input here--</h6>
    </div>
    <br />
    <div style="height: 80px" class="bg-grey-3 flex items-center">
      <p class="q-ma-none q-ml-md text-subtitle1">Sort by</p>
      <q-select
        class="q-ml-md q-pl-md bg-white filter-field"
        v-model="filter.price"
        :options="filterOptions"
        label="Price"
        dense
        borderless
      />
    </div>
    <br />
    <div class="row q-gutter-md">
      <template v-for="(item, index) in products" :key="index">
        <!-- :class="[{ 'card-hover': isHovering }, 'cursor-pointer']" -->
        <q-card
          :ref="`card${index}`"
          class="cursor-pointer"
          style="width: 272px; height: 375px"
          @click="dialog.order = true"
          @mouseover="addCardHover(index)"
          @mouseout="removeCardHover(index)"
        >
          <q-img style="max-width: 300px; height: 200px" :src="`${item.image}`" :fit="contain" />

          <q-card-section>
            <div class="text-body2">{{ item.title }}</div>
            <div class="text-primary text-h6">USD {{ item.price }}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{ lorem }}
          </q-card-section>
        </q-card>
      </template>
    </div>

    <q-dialog v-model="dialog.order">
      <Cart />
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import Cart from './Cart';

// import RepositoryFactory from '../../repositories/RepositoryFactory';

export default {
  components: { Cart },
  data() {
    return {
      isHovering: false,

      filter: {
        price: '',
      },

      dialog: {
        order: false,
      },

      filterOptions: ['Low to High', 'High to Low'],
    };
  },

  async created() {},
  computed: {
    ...mapGetters('product', ['products', 'categories']),
  },

  methods: {
    addCardHover(index) {
      this.$refs[`card${index}`].$el.classList.add('card-hover');
    },
    removeCardHover(index) {
      this.$refs[`card${index}`].$el.classList.remove('card-hover');
    },
  },
};
</script>

<style scoped lang="scss">
.q-menu {
  height: 50px;
}
.filter-field {
  width: 170px;
}
.card-hover {
  border: 1px solid $primary;
  transform: translateY(-0.5em);
}
</style>
