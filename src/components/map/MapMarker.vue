<template>
  <ymapMarker
    :coords="marker.coords"
    :marker-id="marker.id"
    @click="balloonHandler"
  />
</template>

<script>
import { ymapMarker } from "vue-yandex-maps";
import { mapMutations } from "vuex";

export default {
  name: "MapMarker",

  components: {
    ymapMarker,
  },

  props: {
    marker: {
      type: Object,
      required: true,
    },
    activeMarker: {
      required: true,
    },
  },

  methods: {
    ...mapMutations(["setActiveMarker", "removeActiveMarker"]),
    balloonHandler() {
      // to avoid odd map centring
      setTimeout(() => this.setActiveMarker(this.marker.id), 0);
    },
  },
};
</script>

<style scoped lang="scss"></style>
