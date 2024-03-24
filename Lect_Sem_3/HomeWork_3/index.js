const express = require('express');
const path = require('path');
const fs = require(`fs`);

const jsonPathCount = path.join(__dirname, 'count.json');

const count = {
    index: 0,
    about: 0
};

const app = express();

const port = 8081;

write(jsonPathCount, count);

app.get('/', (req, res) => {
    const count = JSON.parse(fs.readFileSync(jsonPathCount, 'utf8'));
    count.index = count.index + 1;
    res.send(`<h1>Welcome!</h1><p>Количество просмотров: ${count.index}</p> <a href="/about">About</a>`);
    write(jsonPathCount, count);
});
app.get('/about', (req, res) => {
    const count = JSON.parse(fs.readFileSync(jsonPathCount, 'utf8'));
    count.about = count.about + 1;
    res.send(`<h1>About!</h1><p>Количество просмотров: ${count.about}</p><a href="/">Welcome</a>`);
    write(jsonPathCount, count);
});


app.listen(port);
function write(jsonPathCount, count) {
    fs.writeFileSync(jsonPathCount, JSON.stringify(count, null, 2));
}