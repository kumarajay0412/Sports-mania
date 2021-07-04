const config = {
    db: {
        host: process.env.AWS_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT
    },
    rowsPerPage: 10
}
module.exports = config;