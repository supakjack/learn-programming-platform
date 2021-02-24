<template>
  <v-card-text class="kanit-font">
    <v-container>
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <v-text-field
            label="ชื่อโจทย์ปัญหา"
            v-model="problemTitle"
          ></v-text-field>
          <v-select
            v-model="problemStatus"
            :items="problemStatusData"
            menu-props="auto"
            label="สถานะ"
            hide-details
            single-line
          ></v-select>
        </v-col>

        <v-col cols="12" sm="12" md="6">
          <v-text-field label="กำหนดคะแนน" v-model="taskScore"></v-text-field>
          <p class="text-md-left">
            ภาพประกอบโจทย์
            <input type="file" />
          </p>
        </v-col>
      </v-row>
      <v-textarea
        label="คำอธิบาย"
        rows="3"
        v-model="problemDescription"
      ></v-textarea>

      <v-row>
        <v-col cols="12" sm="12" md="12">
          <v-autocomplete
            v-model="tags"
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
    value: null,
    problemTitle: "",
    problemStatus: "",
    taskScore: "",
    problemDescription: "",
    tags: [],
    problemStatusData: [
      // use in select options
      { text: "ใช้งาน", value: 1 },
      { text: "ไม่ใช้งาน", value: 2 }
    ]
  }),

  computed: {},

  watch: {
    problemTitle: function(newValue, oldValue) {
      console.log(newValue, oldValue);
      this.$store.commit("problem/setProblem", {
        problem: {
          title: this.problemTitle
        }
      });
    },
    problemStatus: function(newValue, oldValue) {
      console.log(newValue, oldValue);
      this.$store.commit("problem/setProblem", {
        problem: {
          status: this.problemStatus
        }
      });
    },
    taskScore: function(newValue, oldValue) {
      console.log(newValue, oldValue);
      this.$store.commit("problem/setProblem", {
        problem: {
          score: this.taskScore
        }
      });
    },
    problemDescription: function(newValue, oldValue) {
      console.log(newValue, oldValue);
      this.$store.commit("problem/setProblem", {
        problem: {
          description: this.problemDescription
        }
      });
    },
    tags: function(newValue, oldValue) {
      console.log(newValue, oldValue);
      this.$store.commit("problem/setProblem", {
        problem: {
          tags: this.tags
        }
      });
    }
  },

  // when created call initialize to geting all tag data
  async created() {
    this.initialize();
  },

  methods: {
    async initialize() {
      const { doesGetAll } = await this.getTag();
      this.items = doesGetAll;
    }
  }
};
</script>
