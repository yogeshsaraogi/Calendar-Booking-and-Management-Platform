const { ClickHouse } = require("clickhouse");

const db = new ClickHouse({
  url: "https://f2xl474f3d.ap-south-1.aws.clickhouse.cloud:8443",
  user: "default",
  password: "Z8Ux9kcsmR4.X",
  format: "json",
});

module.exports = {
  db,
};
