import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import session from "express-session";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
app.use(morgan("dev"));

// in memory
const users = [];
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

const displayEmails = () => {
  console.log("Registered");

  users.forEach((user) => {
    console.log(user.email);
  });
};

app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // check in db or array user

    if (users.find((user) => user.email === email)) {
      return res.status(404).json({ message: "user allready exists" });
    }

    // send verfication email to users
    
  } catch (error) {}
});

app.get("/", (req, res) => {
  res.status(200).send("Ok Done");
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
