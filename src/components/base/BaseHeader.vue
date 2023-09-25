<template>
  <v-app-bar app dark>
    <span>Тестовое задание SquareGPS</span>

    <v-spacer></v-spacer>

    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="200"
      offset-y
      max-width="200"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn text fab small v-bind="attrs" v-on="on">
          <v-icon>mdi-earth</v-icon>
        </v-btn>
      </template>
      <v-list dense>
        <v-list-item-group v-model="selectedLanguage" color="primary">
          <v-list-item @click="menu = false"> Русский </v-list-item>
          <v-list-item @click="menu = false"> Английский </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-menu>
    <template v-slot:extension>
      <v-tabs align-with-title v-model="activeTab">
        <v-tab @click.stop tab-value="/">
          <router-link to="/"> О задании </router-link>
        </v-tab>
        <v-tab @click.stop tab-value="/map">
          <router-link to="/map"> Карта </router-link>
        </v-tab>
      </v-tabs>
    </template>
  </v-app-bar>
</template>

<script>
export default {
  name: "BaseHeader",

  data: () => ({
    menu: false,
    selectedLanguage: 0,
    activeTab: "/",
  }),

  created() {
    this.activeTab = this.$route.path;
  },
};
</script>

<style lang="scss">
.v-tab {
  max-width: 180px;
  flex: 1;

  @media screen and (max-width: 540px) {
    max-width: 50%;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }
}

.v-toolbar__extension {
  > .v-tabs:last-child,
  .v-tab {
    margin: 0 !important;
  }

  @media screen and (max-width: 540px) {
    padding: 1rem 0 !important;
  }
}
</style>
