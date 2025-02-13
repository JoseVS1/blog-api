const getApiMessage = (req, res) => {
    res.json({
        message: "Welcome to the API"
    });
}

module.exports = {
    getApiMessage
}