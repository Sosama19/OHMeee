const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process'); // Use a machine learning model or API here

const app = express();
const port = 3000;

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Serve static files (HTML, CSS, etc.)
app.use(express.static('public'));

// Handle image upload
app.post('/upload', upload.single('image'), (req, res) => {
    // Use a machine learning model or API to classify the image
    const imagePath = req.file.path;
    
    // Example: Run a placeholder command for classification
    exec(`python classify.py ${imagePath}`, (error, stdout, stderr) => {
        if (error) {
            return res.status(500).json({ message: 'Error processing image' });
        }
        
        const classification = stdout.trim(); // Assume output is 'plastic', 'metal', 'glass', 'paper'
        fs.unlinkSync(imagePath); // Clean up the uploaded image

        let message = 'Unknown material';
        if (['plastic', 'metal', 'glass', 'paper'].includes(classification)) {
            message = `The material is ${classification}. Please dispose of it properly.`;
        }

        res.json({ message });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
