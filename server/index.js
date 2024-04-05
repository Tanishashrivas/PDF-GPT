import express from "express";
import multer from "multer";
import cors from "cors";
import { fileURLToPath } from 'url';
import path from 'path';


const app = express();
const PORT = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "pdfs")));

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
    // const { title } = req.body;
    const file = req.file;
  
    console.log("PDF uploaded:", file);

    res.send("PDF uploaded successfully!");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.get("/", (req,res) => {
    res.send("Server is working fine");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
