const express = require("express");
const app = express();
const cors = require("cors");
const { signUp, signIn, logOut } = require("./routes/auth");
const { addData,addDataw ,getDataw } = require("./routes/db");
process.env.YAHOO_FINANCE_SILENT_MODE = "true";
const yahooFinance = require("yahoo-finance2").default;
const arr=require("./routes/share")

const port = 3000;

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static("public"));

yahooFinance.suppressNotices(["yahooSurvey"]);

async function getStockPrice(symbol) {
  const quote = await yahooFinance.quote(symbol);
  return quote;
}

app.post("/market", async (req, res) => {
  const { symbol } = req.body;
  try {
    const data = await getStockPrice(symbol.toUpperCase());
    console.log("Fetched data:", data);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/search", async (req, res) => {
  const { symbol } = req.body;
  try {
    const data = await getStockPrice(symbol.toUpperCase());
    console.log("Fetched data:", data); 
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/addW", async (req, res) => {
  const { symbol,email} = req.body;
  try {
    const data = await addDataw(email,symbol)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
app.post("/getW", async (req, res) => {
  const { email} = req.body;
  try {
    const data = await getDataw(email);
    console.log(data)
    res.json(data);

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}); 
 

app.get("/market", (req, res) => {
  res.sendFile("./view/market.html", { root: __dirname });
});
app.get("/main", (req, res) => {
  res.sendFile("./view/main.html", { root: __dirname });
});
app.get("/", (req, res) => {
  res.sendFile("./view/home.html", { root: __dirname });
});
app.get("/signUp", (req, res) => {
  res.sendFile("./view/signUp.html", { root: __dirname });
});

app.post("/signUp", async (req, res) => {
  const { name, email, password, dob, number } = req.body;
  try {
    const user = await signUp(email, password);
    const data = await addData(name, email, dob, number);
    res.json({ message: "User signed up successfully", user, data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/login", (req, res) => {
  res.sendFile("./view/login.html", { root: __dirname });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
