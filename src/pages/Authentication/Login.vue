<template>
  <div id="main-wrapper" class="bg-primary">
    <div class="row bg-primary q-px-xl text-white text-center" style="height: 100%">
      <div class="col column justify-center" style="height: 100%">
        <div>
          <q-icon name="shopping_bag" size="400px"></q-icon>
          <h6 class="q-ma-none text-h1 text-weight-regular">Senang</h6>
          <h6 class="text-h4 q-px-xl">
            The Leading Online Shop Platform in Southeast Asia and Taiwan
          </h6>
        </div>
      </div>
      <div class="col column justify-center items-center" style="height: 100%">
        <q-card class="q-pa-xl text-black" style="height: 70%; width: 60%">
          <h6 class="q-mt-none q-mb-lg text-h4 text-left">Log in</h6>
          <q-form @submit="loginUser" class="full-width">
            <q-input
              class="q-mb-sm"
              v-model="inputs.email"
              label="Email"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Invalid email']"
              outlined
            />

            <q-input
              class="q-mb-lg"
              v-model="inputs.password"
              label="Password"
              lazy-rules
              :rules="[val => (val && val.length > 0) || 'Invalid password']"
              outlined
            />

            <q-btn
              size="20px"
              class="full-width text-weight-regular"
              label="Log In"
              type="submit"
              color="primary"
              style="height: 50px"
              :disable="inputs.email && inputs.password ? false : true"
            />
          </q-form>
          <h6 class="text-subtitle1 text-left q-mt-md q-mb-lg text-blue-7">
            <span>Forgot Password</span>
          </h6>

          <q-separator />

          <h6 class="q-mt-xl text-weight-medium">
            <span class="text-grey-5 q-mr-sm">New to Senang?</span>
            <router-link
              :to="{ name: 'Register' }"
              class="text-primary"
              style="text-decoration: none"
            >
              Sign Up
            </router-link>
          </h6>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import { Notify } from 'quasar';
import RepositoryFactory from '../../repositories/RepositoryFactory';

const AuthenticationRepository = RepositoryFactory.get('authentication');

export default {
  data() {
    return {
      inputs: {
        email: null,
        password: null,
      },
    };
  },
  create() {
    console.log('initiating login page');
  },
  methods: {
    ...mapActions('authentication', ['setUser']),
    async loginUser() {
      try {
        const response = await AuthenticationRepository.login(this.inputs);

        if (!!response.data.accessToken) {
          await this.setUser(response.data);

          this.$router.push({ name: 'Home' });
        } else {
          Notify.create({
            color: 'primary',
            timeout: 1500,
            position: 'top',
            type: 'negative',
            message: response.data.message,
          });
        }
      } catch (error) {
        console.error();
      }
    },
  },
  computed: {
    ...mapGetters('authentication', ['user']),
  },
};
</script>

<style scoped>
span {
  cursor: pointer;
}

#main-wrapper::before {
  background-color: white;
  height: 20vh;
}
#main-wrapper {
  margin: 10vh 0;
  height: 80vh;
}
</style>
