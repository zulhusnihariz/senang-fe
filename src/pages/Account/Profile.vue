<template>
  <div class="text-h5 text-weight-light">
    <div class="q-mx-lg q-pt-md">
      <h6>My Profile</h6>
      <p class="text-subtitle1">Manage and protect your account</p>
      <q-seperator class="q-mx-xl" />
    </div>

    <!-- -------------------------------------------------------------------------- -->
    <!--                                    Label                                   -->
    <!-- -------------------------------------------------------------------------- -->
    <div class="row text-h6 text-weight-regular">
      <div class="col-3 column content-end items-end">
        <div class="row q-mb-xl">Username</div>
        <div class="row q-mb-xl">Name</div>
        <div class="row q-mb-xl">Email</div>
        <div class="row q-mb-xl">Contact Number</div>
        <!-- <div class="row q-mb-xl">Shop Name</div> -->
        <div class="row q-mb-xl">Birth Date</div>
        <div class="row q-mb-xl"></div>
      </div>

      <!-- -------------------------------------------------------------------------- -->
      <!--                                    Input                                   -->
      <!-- -------------------------------------------------------------------------- -->
      <div class="col-9 q-pl-lg">
        <div class="row q-mb-xl">{{ inputs.username }}</div>
        <div class="row q-mb-xl" style="height: 32px">
          <q-input v-model="inputs.firstName" placeholder="First name" outlined dense />
          <q-input
            v-model="inputs.lastName"
            class="q-ml-md"
            placeholder="Last name"
            outlined
            dense
          />
        </div>

        <div class="row q-mb-xl">{{ inputs.email }}</div>
        <div class="row q-mb-xl">{{ inputs.contactNumber || '-' }}</div>
        <!-- <div class="row q-mb-xl">Shop Name</div> -->
        <div class="row q-mb-xl" style="height: 32px">
          <q-input v-model="inputs.birthDate" :rules="['inputs.birthDate']" outlined dense>
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="inputs.birthDate" mask="DD/MM/YYYY">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="row q-mb-xl">
          <q-btn @click="submitSave" color="primary" size="lg">Save</q-btn>
        </div>
      </div>
      <!-- -------------------------------------------------------------------------- -->
      <!--                                    Image                                   -->
      <!-- -------------------------------------------------------------------------- -->
      <!-- <div class="col-4 column content-end items-end">
        <div class="row q-mb-xl">Username</div>
        <div class="row q-mb-xl">Name</div>
        <div class="row q-mb-xl">Email</div>
        <div class="row q-mb-xl">Contact Number</div>

        <div class="row q-mb-xl">Birth Date</div>
        <div class="row q-mb-xl"></div>
      </div> -->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      inputs: {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        contactNumber: '',
        birthDate: '',
      },
    };
  },

  mounted() {
    Object.keys(this.user).forEach(el => {
      this.inputs[`${el}`] = this.user[`${el}`];
    });
  },
  methods: {
    submitSave() {
      this.$emit('patchUser', this.inputs);
    },
  },
  computed: {
    ...mapGetters('user', ['user']),
  },
};
</script>

<style scoped>
h6 {
  margin: 0;
  padding: 0;
}
</style>
