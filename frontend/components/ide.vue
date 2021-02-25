<script>
export default {
  methods: {
    // function name: getHomework
    // description: get from backend API
    // input: -
    // output: -
    // CreateBy:Theo Seathan / CreateDate: 21/2/2021
    // UpdateBy:
    async seperate(data) {
      let result = this.$axios.$post("ide/seperate", data).catch(error => {
        console.error(error);
      });
      console.log(result);
      console.log("----------");
      return result;
    },

    async submit(data) {
      let result = this.$axios.$post("ide/submit", data).catch(error => {
        console.error(error);
      });
      return result;
    }
  }
};
</script>
