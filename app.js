const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const connect = require("./connect");
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");

// Connect to database
connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const port = 5000;

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });
app.use("/api/upload/images", express.static(path.join(__dirname, "upload/images")));

app.post("/api/upload", upload.single("product"), (req, res) => {
  res.status(200).json({
    success: true,
    image_url: `http://localhost:${port}/api/upload/images/${req.file.filename}`,
  });
});

// JWT Authentication Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) return res.sendStatus(401);
  
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Example user routes with JWT authentication
app.use("/api/product", authenticateToken, productRoute);
app.use("/api/user", userRoute);

app.get("/", (req, res) => {
  res.send("<h1>ECOMMERCE API ROUTES. CNINNMAKES-DEV</h1>");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
