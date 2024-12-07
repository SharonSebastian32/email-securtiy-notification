import express from "express";
import arcjet, { validateEmail } from "@arcjet/node";
import session from "express-session";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";

const app = express();

const users = [{ email: "Sharon", password: "sha123" }];

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    validateEmail({
      mode: "LIVE",

      block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
    }),
  ],
});

const displayEmail = () => {
  users.forEach((user) => {
    console.log(user.email);
  });

  console.log("Registered Successfully");
};

// app.post("/signup", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const decision = await aj.protect(req, {
//       email,
//     });
//     console.log("Arcjet decision", decision);

//     if (decision.isDenied()) {
//       res.writeHead(403, { "Content-Type": "application/json" });
//       res.end(JSON.stringify({ error: "Forbidden" }));
//     }
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ message: "Hello World", email: req.body.email }));

//     if (users.find((user) => user.email === email)) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // send verfication email to users
//   } catch (error) {}
// });

app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user already exists
    if (users.find((user) => user.email === email)) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Apply Arcjet email validation before proceeding
    const decision = await aj.protect(req, { email });
    console.log("Arcjet decision", decision);

    if (decision.isDenied()) {
      return res
        .status(403)
        .json({ error: "Forbidden", reason: decision.reason });
    }

    // If email is valid, register the user
    users.push({ email, password });
    displayEmail();

    return res
      .status(200)
      .json({ message: "User registered successfully", email });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port http://localhost:${process.env.PORT}`);
});
