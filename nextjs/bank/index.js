const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

const internalRandomness = "019430"

app.use(express.json()); // Middleware to parse JSON requests

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Bank Backend API');
});

app.post('/api/store/transaction',(req,res)=>{
    // Called 
})

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});