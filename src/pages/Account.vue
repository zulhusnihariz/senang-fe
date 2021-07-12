<template>
  <div class="row full-height q-pt-xl">
    <!-- -------------------------------------------------------------------------- -->
    <!--                                 Navigation                                 -->
    <!-- -------------------------------------------------------------------------- -->
    <div class="col-3 full-height column items-end">
      <div>
        <div class="q-mb-md text-h5 text-weight-bold">
          <q-icon color="grey" name="account_circle" size="xl"> </q-icon>
          <span class="q-ml-md">{{ user.username }}</span>
          <q-separator class="q-mt-lg" />
        </div>
        <q-list class="text-h6">
          <q-item>
            <q-item-section avatar>
              <q-icon color="indigo-6" name="person_outline" size="lg" />
            </q-item-section>

            <q-item-section>My Account</q-item-section>
          </q-item>
          <q-item-section>
            <q-list
              id="account-nav"
              class="q-ml-xl q-pl-md text-grey-8 text-h6 text-weight-regular"
            >
              <q-item manual-focus :to="`${baseURL}/profile`">Profile</q-item>
              <q-item manual-focus :to="`${baseURL}/payment`">Bank & Cards</q-item>
              <q-item manual-focus :to="`${baseURL}/address`">Address</q-item>
              <q-item manual-focus :to="`${baseURL}/password`">Change Password</q-item>
            </q-list>
          </q-item-section>
          <q-item>
            <q-item-section avatar>
              <q-icon color="indigo-6" name="list_alt" size="lg" />
            </q-item-section>

            <q-item-section>My Purchase</q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>

    <!-- -------------------------------------------------------------------------- -->
    <!--                                    View                                    -->
    <!-- -------------------------------------------------------------------------- -->
    <div class="col-9 full-height">
      <q-card class="q-mx-xl q-mb-xl" style="width: 80%; height: 90%">
        <Profile v-if="$route.path.match('profile')" @patchUser="patchUser" />
        <BankCards v-if="$route.path.match('payment')" />
        <Addresses v-if="$route.path.match('address')" />
        <ChangePassword v-if="$route.path.match('password')" @patchPassword="patchPassword" />
      </q-card>
    </div>

    <q-dialog v-model="dialog">
      <q-card
        class="q-pt-md text-h5 text-weight-medium text-center"
        style="width: 500px; height: 250px"
      >
        <q-card-section>
          <q-icon
            color="positive"
            name="check_circle_outline"
            class="cursor-pointer"
            size="100px"
          />
        </q-card-section>

        <q-card-section>
          <div v-if="$route.path.match('profile')">Profile updated!</div>
          <div v-if="$route.path.match('payment')">Profile updated!</div>
          <div v-if="$route.path.match('address')">Address updated!</div>
          <div v-if="$route.path.match('password')">Password updated!</div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { mapActions } from 'vuex';
import { Notify } from 'quasar';
import Profile from './Account/Profile.vue';
import BankCards from './Account/BankCards.vue';
import Addresses from './Account/Addresses.vue';
import ChangePassword from './Account/ChangePassword.vue';

import RepositoryFactory from '../repositories/RepositoryFactory';
const UserRepository = RepositoryFactory.get('user');
const AuthenticationRepository = RepositoryFactory.get('authentication');

export default {
  components: {
    Profile,
    BankCards,
    Addresses,
    ChangePassword,
  },
  data() {
    return {
      dialog: false,
      baseURL: '/user/account',
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    ...mapActions('user', ['getUser']),
    async patchUser(data) {
      try {
        console.log('inside patchUser');
        const successful = await UserRepository.patchUser(data.id, data);
        if (successful) {
          await this.getUser('test');
          this.dialog = true;
        }
      } catch (error) {
        console.error();
      }
    },
    async patchPassword(data) {
      try {
        const response = await AuthenticationRepository.changePassword(data);
        console.log(response.data);

        if (!response.data.status) {
          Notify.create({
            color: 'negative',
            timeout: 1500,
            position: 'top',
            type: 'negative',
            message: response.data.message,
          });
        } else {
          this.dialog = true;
        }
      } catch (error) {
        console.error();
      }
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
