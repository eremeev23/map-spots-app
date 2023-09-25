<template>
  <v-app>
    <BaseHeader />
    <v-main>
      <router-view />
    </v-main>
    <BaseLoader v-if="loading" />
  </v-app>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import BaseHeader from "./components/base/BaseHeader.vue";
import BaseLoader from "./components/base/BaseLoader.vue";

export default {
  name: "App",

  components: {
    BaseHeader,
    BaseLoader
  },

  computed: {
    ...mapState({
      loading: state => state.loading
    })
  },

  methods: {
    ...mapMutations(["setActiveMarker"]),
    ...mapActions(["getMarkers"]),
  },

  created() {
    this.getMarkers();
  },
};
</script>
