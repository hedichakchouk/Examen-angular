const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:4200',
}));
app.get('/api/students', async (req, res) => {
  try {
    const data = await fs.readFile('students.json', 'utf8');
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: 'Error reading the JSON file' });
  }
});

app.put('/api/students', async (req, res) => {
  try {
    // Read existing data from the file
    const existingData = await fs.readFile('students.json', 'utf8');

    // Parse existing data into a JavaScript object
    const existingStudents = JSON.parse(existingData);

    // Merge existing data with new data
    const updatedStudents = [...existingStudents, ...req.body];

    // Write merged data back to the file
    await fs.writeFile('students.json', JSON.stringify(updatedStudents, null, 2), 'utf8');

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error updating the JSON file'+error });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

