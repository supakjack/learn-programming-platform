<template>
  <v-app>
    <div class="red--text">
      <Topbar></Topbar>
      <v-main>
        <v-container>
          <Breadcrumb></Breadcrumb>
          <nuxt />
        </v-container>
      </v-main>
      <Footer></Footer>
      <!-- <Sidebar></Sidebar> -->
      <testSidebar></testSidebar>
    </div>
  </v-app>
</template> 

<script>
import Sidebar from "./Modrens/Sidebar";
import Topbar from "./Modrens/Topbar";
import Footer from "./Modrens/Footer";
import Breadcrumb from "./Modrens/Breadcrumb";
import testSidebar from "./Modrens/testSidebar";

export default {
  components: {
    Sidebar,
    Topbar,
    Footer,
    Breadcrumb,
    testSidebar,
  },
};
</script>

<style>
#app {
  font-family: "kanit";
}
</style>