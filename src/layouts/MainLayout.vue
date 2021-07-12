<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-secondary text-black">
      <q-toolbar :class="[{ 'bg-primary text-white': $route.path.match('auth') ? false : true }]">
        <q-toolbar-title @click="$router.push({ name: 'Home' })" class="cursor-pointer">
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          <span class="q-ml-sm">Senang</span>
        </q-toolbar-title>
        <div
          v-if="$route.path.match('auth') ? false : true"
          class="q-mr-xl text-weight-regular text-subtitle1 cursor-pointer"
        >
          <q-menu>
            <q-list style="min-width: 100px">
              <router-link :to="{ name: 'Account' }" style="text-decoration: none; color: unset">
                <q-item clickable v-close-popup>
                  <q-item-section>My Account</q-item-section>
                </q-item>
              </router-link>

              <q-item clickable v-close-popup>
                <q-item-section>My Purchase</q-item-section>
              </q-item>
              <q-separator />
              <router-link :to="{ name: 'Login' }" style="text-decoration: none; color: unset">
                <q-item @click="removeUser" clickable v-close-popup>
                  <q-item-section> Logout </q-item-section>
                </q-item>
              </router-link>
            </q-list>
          </q-menu>
          <q-icon name="account_circle" size="lg"> </q-icon> <span>{{ user.data.username }}</span>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from 'vuex';
import { mapGetters } from 'vuex';
// import EssentialLink from 'components/EssentialLink.vue';

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

import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',
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
