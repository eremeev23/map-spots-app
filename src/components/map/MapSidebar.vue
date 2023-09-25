<template>
  <aside class="map-sidebar">
    <v-btn
      fab
      dark
      class="map-sidebar__button"
      :class="{ active: sidebarStatus }"
      @click="sidebarStatus = !sidebarStatus"
    >
      <v-icon v-if="!sidebarStatus" dark> mdi-format-list-bulleted </v-icon>
      <v-icon v-else dark> mdi-close </v-icon>
    </v-btn>
    <v-navigation-drawer v-model="sidebarStatus">
      <v-list v-if="markers?.length">
        <v-list-item-group
          v-model="selectedMarker"
          :value="1"
          class="markers-list"
          @change="markerHandler($event)"
        >
          <v-list-item
            v-for="marker in markers"
            :key="marker.id"
            :value="marker.id"
            color="primary"
            class="markers-list__item"
          >
            <v-list-item-title>
              <span class="markers-list__item-title">
                {{ marker.title }}
              </span>
              <span class="markers-list__item-coords">
                {{ marker.coords[0] }}, {{ marker.coords[1] }}
              </span>
            </v-list-item-title>
            <v-btn
              @click.stop="deleteMarker(marker.id)"
              title="Удалить"
              small
              text
              fab
            >
              <v-icon small> mdi-trash-can-outline </v-icon>
            </v-btn>
          </v-list-item>
        </v-list-item-group>
      </v-list>
      <p v-else class="map-sidebar__empty">Метки еще не добавлены</p>
    </v-navigation-drawer>
  </aside>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  name: "MapSidebar",

  props: {
    markers: {
      required: true,
    },
    activeMarker: {
      required: true,
    },
    addMode: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      sidebarStatus: false,
      selectedMarker: undefined,
    };
  },

  watch: {
    activeMarker() {
      if (this.activeMarker) {
        this.sidebarStatus = true;
        this.selectedMarker = this.activeMarker.id;
      } else {
        this.selectedMarker = undefined;
      }
    },

    addMode() {
      if (this.addMode) {
        this.sidebarStatus = false;
      }
    },
  },

  methods: {
    ...mapMutations(["setActiveMarker", "removeActiveMarker"]),
    ...mapActions(["deleteMarker"]),
    markerHandler(id) {
      // to avoid odd map centring
      this.removeActiveMarker();
      setTimeout(() => this.setActiveMarker(id), 0);
    },
  },
};
</script>

<style scoped lang="scss">
.v-navigation-drawer {
  width: 320px !important;

  @media screen and (max-width: 540px) {
    width: calc(100vw - 80px) !important;
  }
}

.map-sidebar {
  height: 100%;
  position: absolute;
  pointer-events: none;
  z-index: 998;

  &__button {
    position: absolute;
    left: 0;
    margin: 20px;
    pointer-events: all;
    transition: left 0.2s ease;

    &.active {
      left: 320px;
    }

    @media screen and (max-width: 540px) {
      max-width: 40px;
      max-height: 40px;

      &.active {
        left: calc(100vw - 80px) !important;
      }
    }
  }

  &__empty {
    margin: 2rem auto;
    width: fit-content;
    color: #888;
  }
}

.markers-list {
  &__item {
    position: relative;
    padding: 1rem 3rem 1rem 1.4rem;
    border-bottom: 2px solid;

    &-title {
      display: block;
      margin-bottom: 0.4rem;
      font-size: 1.2rem;
    }

    &-coords {
      color: #777;
    }

    button {
      position: absolute;
      right: 0.2rem;
      top: 50%;
      transform: translateY(-50%);
    }

    @media screen and (max-width: 540px) {
      padding: 0.5rem 3rem 0.5rem 1rem;

      &-title {
        margin-bottom: 0.3rem;
        font-size: 1rem;
      }

      &-coords {
        font-size: .8rem;
      }
    }
  }
}
</style>
