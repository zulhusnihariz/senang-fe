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
        <q-form @submit="submitAddress">
          <div class="row">
            <div class="col q-mx-md">
              <q-input
                v-model="inputs.full_name"
                outlined
                dense
                placeholder="Full Name"
                lazy-rules
                :rules="[val => (val && val.length > 0) || 'This field is required']"
              />
            </div>
            <div class="col q-mx-md">
              <q-input
                v-model="inputs.phone_number"
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
                v-model="inputs.state"
                virtual-scroll-item-size="7"
                input-debounce="0"
                placeholder="State"
                option-value="state_id"
                option-label="state_name"
                emit-value
                map-options
                outlined
                dense
                use-input
                options-dense
                hide-selected
                fill-input
                :options="statesAPI"
                @update:model-value="setAreasAPI"
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
                v-model="inputs.area"
                placeholder="Area"
                option-value="area_id"
                option-label="area_name"
                emit-value
                map-options
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                :options="areasAPI"
                :disable="inputs.state"
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
            v-model="inputs.postcode"
            placeholder="Postal Code"
            lazy-rules
            :rules="[val => (val && val.length > 0) || 'Please type something']"
          />

          <q-input
            class="q-mx-md"
            outlined
            dense
            v-model="inputs.unit_number"
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

import RepositoryFactory from '../../repositories/RepositoryFactory';
const LocationRepository = RepositoryFactory.get('location');

export default {
  data() {
    return {
      statesAPI: null,
      areasAPI: null,
      dialog: true,

      inputs: {
        full_name: '',
        phone_number: '',
        state: '',
        area: '',
        postcode: '',
        unit_number: '',
      },
      optionsState: this.statesAPI,
    };
  },

  async created() {
    await this.getAllStates();
  },

  methods: {
    sayHello() {
      console.log('hello');
    },
    getAllStates: async function () {
      const response = await LocationRepository.getAllStates().catch(err => console.log(err));
      this.statesAPI = response.data.states;
    },
    getAreasByID: async function () {
      const response = await LocationRepository.getAreasByID(this.inputs.state).catch(err =>
        console.log(err),
      );

      this.areasAPI = response.data.areas;
    },
    setAreasAPI: async function () {
      this.inputs.area = '';

      await this.getAreasByID().catch(err => console.log(err));
    },
    submitAddress: async function () {
      console.log(this.inputs);
    },
    filterFn(val, update, abort) {
      update(() => {
        const needle = val.toLowerCase();
        this.optionsState = this.statesAPI.filter(v => v.toLowerCase().indexOf(needle) > -1);
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
