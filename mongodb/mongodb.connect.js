const mongoose = require("mongoose");

async function connect() {
    try {
        const uri = "mongodb+srv://sathishsundar92:Sundar2022@cluster0.q3qjql1.mongodb.net/?retryWrites=true&w=majority";
        await mongoose.connect(uri, { useNewUrlParser: true });
    }
    catch (err) {
        console.log("error connecting to mongo db");
        console.log(err);
    }
}

module.exports = { connect };