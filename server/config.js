/* ------------ MARIA DB ------------ */

const mariadbConfig = {
    client: "mysql",
    connection: {
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "ecommerce",
    },
}

/* ------------ SQLITE 3 ------------ */

const sqlite3Config = {
    client: "sqlite3",
    connection: {
      filename: "./DB/ecommerce.sqlite",
    },
    useNullAsDefault: true,
}

/* ------------ MONGO DB ------------ */

const mongodbConfig = 'mongodb+srv://gabriel:gabriel@cluster0.9qtkfe7.mongodb.net/ecommerce?retryWrites=true&w=majority';


/* ------------- EXPORTS ------------ */

exports.mariadbConfig = mariadbConfig;
exports.sqlite3Config = sqlite3Config;
exports.mongodbConfig = mongodbConfig;