<template>
  <div class="text-h5 text-weight-light">
    <div class="row justify-between items-center q-mx-lg q-pt-lg">
      <h6 class="no-margin">My Address</h6>
      <q-btn @click="dialog = true" icon="add" color="primary" size="md" style="height: 20px"
        >Add New Address</q-btn
      >
    </div>

    <br />

    <q-separator />

    <q-dialog v-model="dialog">
      <div class="q-pa-md bg-white" style="width: 600px; height: 410px">
        <br />

        <h6 class="q-my-none q-ml-md">New Address</h6>

        <br />
        <q-form @submit="onSubmit" @reset="onReset">
          <div class="row">
            <div class="col q-mx-md">
              <q-input
                outlined
                dense
                placeholder="Full Name"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'This field is required']"
              />
            </div>
            <div class="col q-mx-md">
              <q-input
                outlined
                dense
                placeholder="Phone Number"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'This field is required']"
              />
            </div>
          </div>
          <div class="row q-mb-lg">
            <div class="col q-mx-md">
              <q-select
                outlined
                dense
                options-dense
                v-model="inputs.state"
                virtual-scroll-item-size="7"
                placeholder="State"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="optionsState"
                @filter="filterFn"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey"> No results </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
            <div class="col q-mx-md">
              <q-select
                outlined
                dense
                v-model="model"
                placeholder="Area"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="filteredAreas"
                @filter="filterFn"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey"> No results </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </div>
          </div>

          <q-input
            class="q-mx-md"
            outlined
            dense
            v-model="name"
            placeholder="Postal Code"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />

          <q-input
            class="q-mx-md"
            outlined
            dense
            v-model="age"
            placeholder="Unit Number, House Number, Building, Street Name"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />

          <div class="q-ml-md">
            <q-btn label="Submit" type="submit" color="primary" />
          </div>
        </q-form>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import StateCities from '../../data/state-cities.js';
export default {
  data() {
    return {
      states: Object.keys(StateCities),
      areas: [],
      dialog: true,

      inputs: {
        state: '',
      },
      optionsState: this.states,
    };
  },
  computed: {
    filteredAreas() {
      if (this.inputs.state) {
        const filtered = Object.entries(StateCities).filter(el => el[0] === this.inputs.state);

        return filtered[0][1];
      }

      return [];
    },
  },

  methods: {
    filterFn(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.optionsState = this.states.filter(v => v.toLowerCase().indexOf(needle) > -1);
      });
    },
  },
};
</script>

<style scoped>
.q-menu {
  height: 50px;
}
</style>
