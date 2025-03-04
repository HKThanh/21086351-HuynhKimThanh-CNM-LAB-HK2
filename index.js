// console.log("Hi");

const express = require('express');
const PORT = 3000;
const app = express();
let courses = require('./data');

// register middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./views'));

//config view
app.set('view engine', 'ejs'); //Khai báo web sẽ dùng engine ejs để render
app.set('views', './views'); // Nội dung render nằm trong thư mục views

app.get('/', (req, resp) => {
    return resp.render('index', { courses }); // send data to ejs
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})