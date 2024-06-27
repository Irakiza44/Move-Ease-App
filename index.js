const express = require("express");
const errorHandler = require('./middleware/errorHandler');
const connectDb = require("./config/dbConnection");
const dotenv = require('dotenv').config()
connectDb();
const cors = require('cors');

const app = express();
// Enable CORS for all routes
app.use(cors());
// Set EJS as the view engine
app.set('view engine', 'ejs');
const port = 5000;

app.use(express.json());
// Routes
app.use('/api/contacts', require('./routes/contactRoutes'));
app.use('/api/users', require('./routes/usersRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use('/api/places', require('./routes/placeRoutes'));
app.use('/api/contact-us', require('./routes/contactUsRoutes'));
app.use('/api/surveys', require('./routes/surveyRoutes'));
app.use('/api/surveys', require('./routes/surveyRoutes'));
app.use('/api/issues', require('./routes/issueRoutes'));
app.use('/api/visitors', require('./routes/visitorRoutes'));
// Error handling middleware
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});