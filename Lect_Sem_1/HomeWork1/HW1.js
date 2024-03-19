const http = require('http');   //импорт функции require
let countHome = 0;
let countAbout = 0;
const server = http.createServer((req, res) => {
    // req запрос
    // res ответ
    console.log("Запрос получен");
    
    if (req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
        });
        
        res.end(`<h1>Главная страница</h1><p>посещений ${++countHome}</p> <a href="/about">Перейти на страницу about</a>`); //любой http код
    } else if (req.url === '/about') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
        });
        res.end(`<h1>Страница about</h1><p>посещений ${++countAbout}</p><a href="/">Перейти на главую страницу</a>`); //любой http код
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html; charset=UTF-8',
        });
        res.end('<h1>Страница не найдена</h1>'); 
    }
});
const port = 8081;
server.listen(port, () => {
    console.log(`сервер запущен на порту ${port}`);
});

