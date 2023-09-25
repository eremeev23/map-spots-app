<template>
  <div class="map-page">
    <div v-if="addMode" class="map-page__add-mode-hint">
      Кликните на карту для добавления новой точки
    </div>
    <MapSidebar
      :markers="markers"
      :active-marker="activeMarker"
      :add-mode="addMode"
    />
    <MapComponent
      :markers="markers"
      :add-mode="addMode"
      :active-marker="activeMarker"
      @add="addMode = false"
    />
    <v-btn
      fab
      :color="addMode ? 'error' : 'primary'"
      class="map-page__add-marker-button"
      @click="toAddMarker"
    >
      <v-icon v-if="!addMode" large color="white"> mdi-plus </v-icon>
      <v-icon v-else large color="white"> mdi-close </v-icon>
    </v-btn>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import MapComponent from "@/components/map/MapComponent.vue";
import MapSidebar from "@/components/map/MapSidebar.vue";

export default {
  name: "MapView",

  components: {
    MapSidebar,
    MapComponent,
  },

  data: () => ({
    addMode: false,
  }),

  computed: {
    ...mapState({
      markers: (state) => state.markersStore.markers,
      activeMarker: (state) => state.markersStore.activeMarker,
    }),
  },

  methods: {
    ...mapMutations(["removeActiveMarker"]),
    toAddMarker() {
      this.removeActiveMarker();
      this.addMode = !this.addMode;
    },
  },
};
</script>

<style lang="scss" scoped>
.map-page {
  position: relative;

  &__add-marker-button {
    position: absolute;
    bottom: 30px;
    right: 30px;
  }

  &__add-mode-hint {
    position: fixed;
    top: 9rem;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
    font-weight: 500;
    text-align: center;
    background-color: #fff;
    border: 2px solid;
    border-radius: 8px;
    z-index: 999;
  }
}
</style>
