<template>
  <v-card-text class="kanit-font">
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <v-text-field label="ชื่อโจทย์ปัญหา"></v-text-field>
          <v-select
            menu-props="auto"
            label="สถานะ"
            hide-details
            single-line
          ></v-select>
        </v-col>

        <v-col cols="12" sm="12" md="6">
          <v-text-field label="กำหนดคะแนน"></v-text-field>
          <p class="text-md-left">
            ภาพประกอบโจทย์
            <v-btn color="blue-grey" class="ma-2 white--text" small>
              Upload
              <v-icon right dark>
                mdi-cloud-upload
              </v-icon>
            </v-btn>
          </p>
        </v-col>
      </v-row>
      <v-textarea label="คำอธิบาย" rows="3"></v-textarea>

      <v-row>
        <v-col cols="12" sm="12" md="12">
          <v-autocomplete
            :items="items"
            outlined
            dense
            chips
            small-chips
            filled
            label="แท็ก"
            multiple
            item-text="tagName"
            item-value="tagId"
          ></v-autocomplete>
        </v-col>
      </v-row>
    </v-container>
  </v-card-text>
</template>

<script>
import problemsmixin from "../../../components/problems";
import tagsmixin from "@/components/tags";

export default {
  mixins: [problemsmixin],
  mixins: [tagsmixin],
  components: {},

  data: () => ({
    items: [],
    value: null
  }),

  computed: {},

  watch: {},

  // when created call initialize to geting all tag data
  async created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      const { doesGetAll } = await this.getTag();
      this.items = doesGetAll;
      console.log(doesGetAll);
    }
  }
};
</script>
