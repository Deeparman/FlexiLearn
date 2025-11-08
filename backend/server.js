const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require('./routes/authRoutes');
const testRoutes = require("./routes/testRoutes");
const questionRoutes = require("./routes/questionRoutes");
const practiceQuizRoutes = require("./routes/practiceQuizRoutes");
const mandatoryQuizRoutes = require("./routes/mandatoryQuizRoutes");
const instructorRoutes = require("./routes/instructorRoutes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("Welcome to FlexiLearn Zone API ");
});



app.use('/api/auth', authRoutes);
app.use("/api/test", testRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/practice-quiz", practiceQuizRoutes);
app.use("/api/mandatory-quiz", mandatoryQuizRoutes);
app.use("/api/instructor", instructorRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is listening to port ${PORT}`));
