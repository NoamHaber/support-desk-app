const express = require('express');
const path = require('path')
const colors = require('colors')
const dotenv = require('dotenv').config();
const {errorHandler} = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 8080

// Connect to database
connectDB();
const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:false}));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketsRoutes'));
app.use('/api/notes', require('./routes/notesRoutes'))

// Serve Frontend
if(process.env.NODE_ENV === 'production') {
       app.use(express.static(path.join(__dirname, '../frontend/build')));       
       app.get('*', (req,res) => res.sendFile(__dirname,'../','frontend','build','index.html'));
}
else{
       app.get('/',(req,res) => {
              res.json({message: 'Hello from the helpdesk API'});
       })              
}


app.use(errorHandler);

// App listener
app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});
