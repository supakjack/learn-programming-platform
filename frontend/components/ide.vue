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
      const codeFiles = data[0];
      console.log("------------");
      console.log(codeFiles);
      this.$axios.$post("ide/seperate", codeFiles).catch(error => {
        console.error(error);
      });
      return codeFiles;
    }
  }
};
</script>
