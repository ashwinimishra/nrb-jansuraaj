export default {
    HOST: "js-echo-db.ctooy0s6a5rg.ap-south-1.rds.amazonaws.com",
    USER: "nrb_fulluser",
    PASSWORD: "2dK4UUizIuI2Mz97",
    DB: "nrb_db",
    PORT: 3306,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};