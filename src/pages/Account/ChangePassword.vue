<template>
  <div class="text-h5 text-weight-light">
    <div class="q-mx-lg q-pt-md">
      <h6>Change Password</h6>
      <p class="text-subtitle1">
        For your account's security, do not share your password with anyone else
      </p>
      <q-seperator class="q-mx-xl" />
    </div>

    <div class="row text-h6 text-weight-regular">
      <!-- -------------------------------------------------------------------------- -->
      <!--                                    Label                                   -->
      <!-- -------------------------------------------------------------------------- -->
      <div class="col-3 column content-end items-end">
        <div class="row q-mb-xl" style="height: 40px">Current Password</div>
        <div class="row q-mb-xl" style="height: 40px">New Password</div>
        <div class="row q-mb-xl" style="height: 40px">Confirm Password</div>
        <div class="row q-mb-xl"></div>
      </div>
      <!-- -------------------------------------------------------------------------- -->
      <!--                                    Input                                   -->
      <!-- -------------------------------------------------------------------------- -->
      <div class="col-9 q-pl-lg">
        <div class="row q-mb-xl">
          <q-input v-model="inputs.currentPassword" style="width: 50%" outlined dense />
        </div>
        <div class="row q-mb-xl">
          <q-input v-model="inputs.newPassword" style="width: 50%" outlined dense />
        </div>

        <div class="row q-mb-xl">
          <q-input v-model="inputs.confirmPassword" style="width: 50%" outlined dense />
        </div>

        <div class="row q-mb-xl">
          <q-btn
            @click="submitConfirm"
            color="primary"
            size="lg"
            :disable="
              inputs.currentPassword && inputs.newPassword && inputs.confirmPassword ? false : true
            "
            >Confirm</q-btn
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { Notify } from 'quasar';

export default {
  data() {
    return {
      inputs: {
        id: null,
        currentPassword: null,
        newPassword: null,
        confirmPassword: null,
      },
    };
  },
  methods: {
    submitConfirm() {
      const inputs = this.inputs;

      if (inputs.currentPassword === inputs.newPassword) {
        Notify.create({
          color: 'negative',
          timeout: 1500,
          position: 'top',
          type: 'negative',
          message: 'New Password cannot be the same as current password',
        });
      } else if (inputs.newPassword !== inputs.confirmPassword) {
        Notify.create({
          color: 'negative',
          timeout: 1500,
          position: 'top',
          type: 'negative',
          message: 'Confirm password does not match with new password',
        });
      } else {
        inputs.id = this.user.data.id;
        this.$emit('patchPassword', inputs);
      }

      // console.log(inputs);
    },
  },
  computed: {
    ...mapGetters('authentication', ['user']),
  },
};
</script>

<style scoped>
h6 {
  margin: 0;
  padding: 0;
}
</style>
