<template>
  <div>
    <ve-line :data="chartData"></ve-line>
  </div>
</template>

<script>
export default {
  name: "line",
  data: function() {
    return {
      chartData: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        testL: "",
        rows: [
          {
            日期: "2019年2月25日",
            访问用户: 1393,
            下单用户: 1093,
            下单率: 0.32
          },
          {
            日期: "2019年2月26日",
            访问用户: 3530,
            下单用户: 3230,
            下单率: 0.26
          },
          {
            日期: "2019年2月27日",
            访问用户: 2923,
            下单用户: 2623,
            下单率: 0.76
          },
          {
            日期: "2019年2月28日",
            访问用户: 1723,
            下单用户: 1423,
            下单率: 0.49
          },
          {
            日期: "2019年2月29日",
            访问用户: 3792,
            下单用户: 3492,
            下单率: 0.323
          }
        ]
      }
    };
  }
};
</script>

<style scoped>
</style>
