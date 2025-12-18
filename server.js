require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const logger = require("morgan");

const connectDB = require("./db/db.js");
const authRouter = require('./routers/authRoutes.js');
const userRouter = require('./routers/userRoutes.js');
const currencyRouter = require('./routers/currencyRoutes.js');
const equipmentRouter = require('./routers/equipmentRoutes.js');
const recordRouter = require('./routers/recordRoutes.js');
const auditRouter = require('./routers/auditRoutes.js')
const verifyToken = require('./middleware/verifyToken.js');

connectDB();

app.use(cors());
app.use(express.json());
app.use(logger('dev'));

app.use('/auth', authRouter);
app.use(verifyToken);
app.use('/currencies', currencyRouter);
app.use('/equipment', equipmentRouter);
app.use('/users', userRouter);
app.use('/records', recordRouter);
app.use('/audits', auditRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`The express app is ready on port ${PORT}!`);
});