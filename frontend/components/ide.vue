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
      // const codeFiles = data[0];
      // console.log("------------");
      // const dataFile = {};
      // for (let file of data) {
      //   dataFile.codeFiles
      // }

      // console.log(data);
      this.$axios.$post("ide/seperate", data).catch(error => {
        console.error(error);
      });
      return data;
    }
  }
};
</script>
