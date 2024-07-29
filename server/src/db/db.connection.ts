import sql from "mssql/msnodesqlv8";
import * as dotenv from "dotenv";

dotenv.config();

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
