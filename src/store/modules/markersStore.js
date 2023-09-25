import Vue from "vue";
import services from "@/plugins/services";

export const markersStore = {
  state: {
    markers: [
      {
        id: 1,
        title: "Маркер №1",
        coords: [55.7506, 37.615771],
      },
      {
        id: 2,
        title: "Маркер №2",
        coords: [55.3506, 36.115771],
      },
    ],
    activeMarker: null,
  },

  mutations: {
    setMarkers(state, markers) {
      state.markers = markers;
    },

    setActiveMarker(state, id) {
      const marker = state.markers.find((marker) => marker.id === id);
      if (marker) {
        state.activeMarker = marker;
      } else {
        state.activeMarker = null;
      }
    },

    removeActiveMarker(state) {
      state.activeMarker = null;
    },
  },

  actions: {
    async getMarkers({ commit }) {
      const { data } = await services.api.getMarkers();
      commit("setMarkers", data);
    },

    async addNewMarker({ commit, state, rootState }, [lat, lon]) {
      rootState.loading = true;

      try {
        const address = await services.api.getAddressByCoords([lat, lon]);

        if (!address) {
          Vue.$toast.error("Возникла ошибка, попробуйте еще раз");
          return
        }

        const currentLastId = state.markers?.length ? state.markers.at(-1).id + 1 : 1;

        const newMarker = {
          id: currentLastId,
          coords: [lat, lon],
          title: address,
        };

        if (state.markers?.length) {
          state.markers.push(newMarker);
        } else {
          state.markers = [newMarker];
        }

        const updateResult = await services.api.updateStore(state.markers);

        if (updateResult.message === "ok") {
          Vue.$toast.success("Метка добавлена");
        } else {
          Vue.$toast.error("Возникла ошибка, попробуйте еще раз");
        }
      } catch (e) {
        Vue.$toast.error("Возникла ошибка, попробуйте еще раз");
      } finally {
        rootState.loading = false;
      }
    },

    async deleteMarker({ commit, state, rootState }, id) {
      rootState.loading = true;

      try {
        const removableMarker = state.markers.find((marker) => marker.id === id);
        const removableIndex = state.markers.indexOf(removableMarker);
        state.markers.splice(removableIndex, 1);

        const updateResult = await services.api.updateStore(state.markers);

        if (updateResult.message === "ok") {
          Vue.$toast.success("Метка удалена");
        } else {
          Vue.$toast.error("Возникла ошибка, попробуйте еще раз");
        }
      } catch (e) {
        Vue.$toast.error("Возникла ошибка, попробуйте еще раз");
      } finally {
        rootState.loading = false;
      }
    },
  },
};
