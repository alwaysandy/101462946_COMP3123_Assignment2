const express = require('express');
const mongoose = require('mongoose');
const employeeRouter = require('./routes/EmployeeRoutes');
const userRouter = require('./routes/UserRoutes');
const userModel = require('./models/UsersModel');

// TODO set up mongo atlas url
const DB_URL = process.env.DB_CONNECTION_STRING
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/user', userRouter);
app.use('/api/v1/emp', employeeRouter);

// Connect to the database
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(async () => {
    const userSeed = {
        email: "testuser@test.com",
        username: "testuser",
        password: "testpassword"
    };

    await userModel.deleteMany({email: "testuser@test.com"}).then(() => {
        userModel.insertOne(userSeed);
    }).catch(err => console.error("Error seeding database: " + err));
    app.listen(PORT, () => {
        console.log(`Server is now listening on port ${PORT}`);
    });
}).catch((err) => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
});