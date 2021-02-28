<template>
  <v-card-text class="kanit-font">
    <v-container>
      <v-row style="margin-top:-30px">
        <v-col cols="12" sm="12" md="8">
          <v-text-field
            label="ชื่อโจทย์ปัญหา"
            v-model="problemTitle"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="12" md="4">
          <v-select
            v-model="problemStatus"
            :items="problemStatusData"
            menu-props="auto"
            label="สถานะ"
            hide-details
            single-line
          ></v-select>
        </v-col>
      </v-row>
      <v-textarea
        label="คำอธิบาย"
        rows="3"
        v-model="problemDescription"
      ></v-textarea>
      <v-row>
        <v-col cols="12" sm="12" md="6">
          <p class="text-md-left">
            ภาพประกอบโจทย์
            <input type="file" />
          </p>
        </v-col>
        <v-col cols="12" sm="12" md="6"> </v-col>
      </v-row>

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
  mixins: [problemsmixin, tagsmixin],
  props: {
    watchArray: {
      type: Array,
      required: true
    }
  },
  components: {},

  data: () => ({
    items: [],
    testset: [],
    value: null,
    problemId: "",
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
  mounted() {
    this.watchArray.map((e, i) => {
      if (e.name == "title") {
        this.problemTitle = e.val;
      }
      if (e.name == "description") {
        this.problemDescription = e.val;
      }
      if (e.name == "status") {
        this.problemStatus = e.val;
      }
      if (e.name == "tags") {
        this.tags = e.val;
      }
      if (e.name == "testset") {
        this.testset = e.val;
      }
    });
  },
  computed: {},

  watch: {
    watchArray: function(newValue, oldValue) {
      console.log("testttttttttttt");
      this.watchArray.map((e, i) => {
        if (e.name == "title") {
          this.problemTitle = e.val;
        }
        if (e.name == "description") {
          this.problemDescription = e.val;
        }
        if (e.name == "status") {
          this.problemStatus = e.val;
        }
        if (e.name == "tags") {
          this.tags = e.val;
        }
        if (e.name == "testset") {
          this.testset = e.val;
        }
      });
    },
    problemTitle: function(newValue, oldValue) {
      this.$store.commit("problem/setProblem", {
        problem: {
          title: this.problemTitle,
          testset: this.testset
        }
      });
    },
    problemStatus: function(newValue, oldValue) {
      this.$store.commit("problem/setProblem", {
        problem: {
          status: this.problemStatus,
          testset: this.testset
        }
      });
    },
    taskScore: function(newValue, oldValue) {
      this.$store.commit("problem/setProblem", {
        problem: {
          score: this.taskScore,
          testset: this.testset
        }
      });
    },
    problemDescription: function(newValue, oldValue) {
      this.$store.commit("problem/setProblem", {
        problem: {
          description: this.problemDescription,
          testset: this.testset
        }
      });
    },
    tags: function(newValue, oldValue) {
      this.$store.commit("problem/setProblem", {
        problem: {
          tags: this.tags,
          testset: this.testset
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
    },

    editItemInstep1(item) {}
  }
};
</script>
