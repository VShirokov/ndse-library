const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const indexRouter = require('./routes/index');
const bookRouter = require('./routes/book');
const userRouter = require('./routes/user');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/public', express.static(__dirname+'/public'));

app.use('/', indexRouter);
app.use('/api/books', bookRouter);
app.use('/api/user', userRouter);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});