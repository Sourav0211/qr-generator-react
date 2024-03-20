const express = require('express');
const multer  = require('multer');
const path = require('path');
const fs = require('fs');
// const cors = require('cors');

const app = express();
const port = 4000; 
app.use(express.static('build'));

// multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  }
});

const upload = multer({ storage: storage });

app.get('/',(req,res)=>{

});


// Endpoint for file upload
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  const filePath = req.file.path;
  const downloadLink = `/api/download/${req.file.filename}`; // Adjusted port to 3000
  res.json({ downloadLink });
});

// Endpoint for downloading the uploaded file
app.get('/download/:filename', (req, res) => {
  const filePath = path.join(__dirname, 'uploads', req.params.filename);
  if (fs.existsSync(filePath)) {
    res.download(filePath);
  } else {
    res.status(404).json({ error: 'File not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
