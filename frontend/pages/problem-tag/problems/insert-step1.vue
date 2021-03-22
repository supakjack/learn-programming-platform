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
            ภาพประกอบ
            <input
              id="upload"
              ref="fileupload"
              type="file"
              name="singleFile"
              @change="filePicked"
            />
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
    files: undefined,
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
  mounted: function() {
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
      if (e.name == "files") {
        this.files = e.val;
      }
    });
    console.log(this.watchArray);
  },
  computed: {},

  watch: {
    watchArray: function(newValue, oldValue) {
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
        if (e.name == "files") {
          this.files = e.val;
        }
      });
    },
    problemTitle: function(newValue, oldValue) {
      this.$store.commit("problem/setProblem", {
        problem: {
          title: this.problemTitle,
          tags: this.tags,
          status: this.problemStatus,
          score: this.taskScore,
          testset: this.testset,
          description: this.problemDescription
        }
      });
    },
    problemStatus: function(newValue, oldValue) {
      this.$store.commit("problem/setProblem", {
        problem: {
          title: this.problemTitle,
          tags: this.tags,
          status: this.problemStatus,
          score: this.taskScore,
          testset: this.testset,
          description: this.problemDescription
        }
      });
    },
    taskScore: function(newValue, oldValue) {
      this.$store.commit("problem/setProblem", {
        problem: {
          title: this.problemTitle,
          tags: this.tags,
          status: this.problemStatus,
          score: this.taskScore,
          testset: this.testset,
          description: this.problemDescription
        }
      });
    },
    problemDescription: function(newValue, oldValue) {
      this.$store.commit("problem/setProblem", {
        problem: {
          title: this.problemTitle,
          tags: this.tags,
          status: this.problemStatus,
          score: this.taskScore,
          testset: this.testset,
          description: this.problemDescription
        }
      });
    },
    tags: function(newValue, oldValue) {
      this.$store.commit("problem/setProblem", {
        problem: {
          title: this.problemTitle,
          tags: this.tags,
          status: this.problemStatus,
          score: this.taskScore,
          testset: this.testset,
          description: this.problemDescription
        }
      });
    },
    files: function(newValue, oldValue) {
      this.$store.commit("problem/setProblem", {
        problem: {
          title: this.problemTitle,
          tags: this.tags,
          status: this.problemStatus,
          score: this.taskScore,
          testset: this.testset,
          description: this.problemDescription
        }
      });
    }
  },

  // when created call initialize to geting all tag data
  created: function() {
    // `this` points to the vm instance
    this.initialize();
  },
  // updated: function() {
  //   this.$nextTick(function() {
  //     this.$refs.fileupload.value = null;
  //   });
  // },
  // async created() {
  //   this.initialize();
  // },

  methods: {
    async initialize() {
      const { doesGetAll } = await this.getTag();
      this.items = doesGetAll;
      this.files = undefined;
    },
    filePicked(e) {
      this.files = e.currentTarget.files;
      this.$store.commit("problem/setFiles", {
        problem: {
          files: this.files
        }
      });
    }
  }
};
</script>
