<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-secondary text-black">
      <q-toolbar
        style="height: 150px"
        :class="[
          {
            'q-px-xl row items-center bg-primary text-white': $route.path.match('auth')
              ? false
              : true,
          },
        ]"
      >
        <template v-if="$route.path.match('auth') ? false : true">
          <div class="column q-px-xl full-width text-weight-regular">
            <div id="header-top" class="self-end q-mr-xl text-subtitle1">
              <q-list class="row cursor-pointer">
                <q-item class="items-center q-px-sm">
                  <q-icon name="notifications" size="sm" />
                  <span class="q-ml-sm">Notifications</span>
                </q-item>
                <q-item class="items-center q-px-sm">
                  <q-icon name="help" size="sm" />
                  <span class="q-ml-sm">Help</span>
                </q-item>
                <q-item class="items-center justify-center q-px-sm">
                  <q-icon name="account_circle" size="sm" />
                  <span class="q-ml-sm">{{ user.data.username }}</span>
                  <q-menu>
                    <q-list style="min-width: 100px">
                      <router-link
                        :to="{ name: 'Account-Profile' }"
                        style="text-decoration: none; color: unset"
                      >
                        <q-item clickable v-close-popup>
                          <q-item-section>My Account</q-item-section>
                        </q-item>
                      </router-link>

                      <q-item clickable v-close-popup>
                        <q-item-section>My Purchase</q-item-section>
                      </q-item>
                      <q-separator />
                      <router-link
                        :to="{ name: 'Login' }"
                        style="text-decoration: none; color: unset"
                      >
                        <q-item @click="removeUser" clickable v-close-popup>
                          <q-item-section>Logout</q-item-section>
                        </q-item>
                      </router-link>
                    </q-list>
                  </q-menu>
                </q-item>
              </q-list>
            </div>
            <q-toolbar-title id="header-middle" class="row items-center" style="margin-left: 12%">
              <div class="cursor-pointer text-h4" @click="$router.push({ name: 'Home' })">
                <q-avatar>
                  <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
                </q-avatar>
                <span class="q-ml-sm">Senang</span>
              </div>

              <SearchField />
            </q-toolbar-title>
          </div>
        </template>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <Cart />
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
import { defineComponent, ref } from 'vue';
import SearchField from './SearchField';
// import EssentialLink from 'components/EssentialLink.vue';
import Cart from '../pages/Store/Cart';

const linksList = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev',
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework',
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev',
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev',
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev',
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev',
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev',
  },
];

export default defineComponent({
  name: 'MainLayout',
  components: { SearchField, Cart },

  data() {
    return {
      menu: false,
    };
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      // essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  methods: {
    ...mapActions('authentication', ['removeUser']),
  },
  computed: {
    ...mapGetters('authentication', ['user']),
  },
});
</script>

<style scoped>
.q-page-container {
  margin: 0;
  padding: 0;
  height: 100vh;
}
.q-toolbar {
  height: 12vh;
}
</style>
