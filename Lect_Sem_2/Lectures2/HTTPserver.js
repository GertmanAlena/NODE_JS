const http = require('http');   //импорт функции require
const server = http.createServer((req, res) => {
    console.log("Запрос получен");

    if (req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
        });
        res.end('<h1>Hello</h1>'); //любой http код
    } else if (req.url === '/about') {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=UTF-8',
        });
        res.end('<h1>About</h1>'); //любой http код
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