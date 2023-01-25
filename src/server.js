require("express-async-errors");
require("dotenv/config");

const express = require("express");
const cors = require("cors");
const routes = require("./routes");
const database = require("./database/sqlite");
const AppError = require("./utils/AppError");
const uploadConfig = require("./configs/upload");

const app = express();

app.use(cors());
app.use(express.json());
database();
app.use(routes);
app.use("/foodImg", express.static(uploadConfig.UPLOADS_FOLDER));

app.use((error, request, response, next) => {
    if (error instanceof AppError) {
        return response.status(error.statusCode).json({
            status: "ERROR",
            message: error.message
        })
    };

    console.error(error);

    return response.status(500).json({
        status: "ERROR",
        message: "Internal server error"
    })
})

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));