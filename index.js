const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const indexRouter = require('./routes/index');
const bookApiRouter = require('./routes/api/book');
const userApiRouter = require('./routes/api/user');
const bookRouter = require('./routes/book');
const errorMiddleware = require('./middleware/error');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors());
app.use('/public', express.static(__dirname+'/public'));

app.use('/', indexRouter);
app.use('/api/user', userApiRouter);
app.use('/api/books', bookApiRouter);
app.use('/books', bookRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});