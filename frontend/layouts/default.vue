<template>
  <v-app>
    <div>
      <Topbar></Topbar>
      <Sidebar></Sidebar>
      <v-main>
        <v-container>
          <Breadcrumb></Breadcrumb>
          <nuxt />
        </v-container>
      </v-main>
      <Footer></Footer>
    </div>
  </v-app>
</template> 

<script>
import Sidebar from "./Modrens/Sidebar";
import Topbar from "./Modrens/Topbar";
import Footer from "./Modrens/Footer";
import Breadcrumb from "./Modrens/Breadcrumb";

export default {
  components: {
    Sidebar,
    Topbar,
    Footer,
    Breadcrumb,
  },
};
</script>

<style>
#app {
  font-family: "kanit";
}
</style>