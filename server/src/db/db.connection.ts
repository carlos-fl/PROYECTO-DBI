import sql from "mssql";

export function connectToDatabase(sqlConfig: any) {
  console.log(sqlConfig)
  sql
    .connect(sqlConfig)
    .then(() => {
      console.log("connection stablished");
    })
    .catch((err) => {
      console.log("error while connecting to database. ERROR WAS: ", err);
    });
}

