<template>
  <div class="map-wrapper">
    <yandex-map
      :coords="coords"
      :controls="[]"
      :zoom="zoom"
      @click="onClick"
      @map-was-initialized="mapLoaded"
      @balloonclose="onClose"
    >
      <template v-if="markers?.length">
        <MapMarker
          v-for="marker in markers"
          :key="marker.id"
          :marker="marker"
          :active-marker="activeMarker"
        />
      </template>
    </yandex-map>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { yandexMap } from "vue-yandex-maps";
import MapMarker from "@/components/map/MapMarker.vue";

export default {
  name: "MapComponent",

  components: {
    yandexMap,
    MapMarker,
  },

  props: {
    markers: {
      required: true,
    },
    addMode: {
      type: Boolean,
      required: true,
      default: () => false,
    },
    activeMarker: {
      required: true,
    },
  },

  data: () => ({
    myMap: {},
    coords: [55.755864, 37.617698],
    newMarkerCoords: null,
    zoom: 11,
  }),

  watch: {
    activeMarker(newVal, val) {
      if ((!val && newVal) || (val && newVal && newVal.id !== val.id)) {
        this.$router.push({ query: { id: newVal.id } }).catch(() => {});
      }

      if (newVal) {
        this.myMap.setCenter(newVal.coords);
        this.coords = newVal.coords;
        this.myMap.balloon.open(
          newVal.coords,
          `
          <h3 style="margin-bottom: 0.5rem; font-size: .85rem">${newVal.title}</h3>
          <p style="font-size: .7rem">${newVal.coords}</p>
        `
        );
        this.myMap.setZoom(17);
      } else {
        this.myMap.balloon.close();
      }
    },
  },

  methods: {
    ...mapMutations(["setActiveMarker", "removeActiveMarker"]),
    ...mapActions(["addNewMarker"]),

    mapLoaded(myMap) {
      const { query } = this.$route;
      this.myMap = myMap;

      if (query.id) {
        this.setActiveMarker(Number(query.id));
      }

      if (this.markers?.length) {
        this.zoom = 17;
        this.myMap.setCenter(this.markers[0].coords);
      }
    },
    onClick(e) {
      if (this.addMode) {
        this.newMarkerCoords = e.get("coords");
        this.addNewMarker(this.newMarkerCoords);
        this.$emit("add");
      }
    },
    onClose() {
      this.removeActiveMarker();
      this.$router.push({ query: {} });
    },
  },
};
</script>

<style scoped lang="scss">
.map-wrapper {
  .ymap-container {
    height: calc(100dvh - 112px);

    @media screen and (max-width: 540px) {
      height: calc(100dvh - 104px);
    }
  }
}
</style>
