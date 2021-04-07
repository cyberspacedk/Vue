module.exports = {
    dbConnected: () => console.log("Successfully connected toDatabase"),
    dbConnectionFailed: (err) => console.log("Connection failed. Reason:", err)
}