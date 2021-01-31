<template>
  <v-app>
    <div class="grid grid-rows-3 grid-flow-col h-full">
      <div class="row-span-3 col-span-2">
        <Sidebar />
      </div>
      <div class="col-span-10 p-4">
        <v-app-bar></v-app-bar>
        <Breadcrumb />
        <v-main class="p-4">
          <nuxt />
        </v-main>
      </div>
    </div>
    <Footer />
  </v-app>
</template>

<script>
import Sidebar from "@/layouts/Modrens/Sidebar";
import Breadcrumb from "@/layouts/Modrens/Breadcrumb";
import Footer from "@/layouts/Modrens/Footer";
export default {
  components: {
    Sidebar,
    Breadcrumb,
    Footer
  }
};
</script>

<style></style>
