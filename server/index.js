import express from "express";
import mongoose from "mongoose";
import multer from "multer"; //to handle file uploads
import cors from "cors"; //to handle cross origin platforms
import { fileURLToPath } from 'url';
import path from 'path';
import bcrypt from "bcrypt";

const app = express();
const PORT = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "pdfs")));

//database configuration
mongoose.connect("mongodb://127.0.0.1:27017/loginVerificationData");
mongoose.connection.on('connected', () => {
  console.log("Database connected successfully");
})
mongoose.connection.on('disconnected', () => {
  console.log("Database disconnected");
})
mongoose.connection.on('error', () => {
  console.log("Error while connecting with the database", error.message);
})

const loginSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
      type: String,
      required: true,
      unique: true
  },
  password: {
    type: String,
    required: true
  }
})

loginSchema.pre('save', async function(next) {
  const user = this;

  // Hash the password only if it's modified or new
  if (!user.isModified('password')) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Method to validate password
loginSchema.methods.isValidPassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error(error);
  }
};
const loginModel = mongoose.model("loginModel", loginSchema, "loginUserData");


app.post("/login", async(req,res)=> {
  const { formValues } = req.body; 

  try{
      const newUser = new loginModel({username: formValues.username, email: formValues.email, password: formValues.password});
      await newUser.save();
      console.log("Data saved successfully");
      res.status(201).json({message: "Data saved successfully"});
  }catch(error){
      console.error("Error saving the data", error);
      res.status(500).json({ message: "Error saving todo" });
  }
});

app.post("/authenticateUser", async(req,res) => {
  const {email, password} = req.body;

  try{
  const user = await loginModel.findOne({email});

  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const isValidPassword = await user.isValidPassword(password);

  if (!isValidPassword) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  res.json(user);
}
catch(error){
  console.error('Login error:', error);
  res.status(500).json({ error: 'Server error' });
}
})

// Multer configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const destinationPath = path.resolve('pdfs/');
      console.log('Destination path:', destinationPath);
      cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

app.post("/upload/pdf", upload.single('file'), (req, res) => {
    const file = req.file;
  
    console.log("PDF uploaded:", file);
    res.send("PDF uploaded successfully!");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
