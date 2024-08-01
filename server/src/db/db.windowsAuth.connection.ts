import sql from "mssql/msnodesqlv8";

export function connectToDatabaseWithWindowsAuth(config: any) {
  console.log(config);
  sql
    .connect(config)
    .then(() => {
      console.log("connected to database");
    })
    .catch((err) => {
      console.log("error while connecting to database", err);
    });
}
