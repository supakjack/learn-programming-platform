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
  </v-app>
</template>

<script>
import Sidebar from "@/layouts/Modrens/Sidebar";
import Breadcrumb from "@/layouts/Modrens/Breadcrumb";
export default {
  components: {
    Sidebar,
    Breadcrumb
  }
};
</script>

<style></style>
