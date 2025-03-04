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

app.post('/save', (req, resp) => {
    const id = Number(req.body.id);
    const name = req.body.name;
    const course_type = req.body.course_type;
    const semester = req.body.semester;
    const department = req.body.department;

    const params = {
        "id": id,
        "name": name,
        "course_type": course_type,
        "semester": semester,
        "department": department
    }

    courses.push(params);

    return resp.redirect('/');
})

app.post('/delete', (req, resp) => {
    const listCheckBoxesSelected = req.body.id;

    let data = courses;

    if (!listCheckBoxesSelected.length) {
        return resp.redirect('/');
    }

    const idsToDelete = Array.isArray(listCheckBoxesSelected) ? listCheckBoxesSelected.map(Number) : [Number(listCheckBoxesSelected)];

    courses = courses.filter(item => !idsToDelete.includes(item.id));

    console.log('Data after deletion: ', JSON.stringify(courses));
    return resp.redirect('/');
})