const express = require('express');
const app = express();
const port = 8081;

app.use(express.json());
const fs = require(`fs`);
const path = require('path');
const joi = require('joi');
const jsonPath = path.join(__dirname, './users.json');
let uniqueID = 1;

const userShema = joi.object({
    firstName: joi.string().min(2).max(10).required(),
    secondName: joi.string().min(2).max(10).required(),
    age: joi.number().min(0).required(),
    city: joi.string().min(2).max(10).required()
})

app.get('/users', (req, res) => {
    try {
        const users = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
        res.send({users});
    } catch (error) {
        console.error(err);
    }
});

app.get('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    const findUser = users.find((user) => {
        return user.id === Number(req.params.id);
    });
    res.send({ user: findUser });
});

app.post('/users', (req, res) => {
    const resultValidate = userShema.validate(req.body);

    if (resultValidate) {
        return res.status(404).send( {error: resultValidate.error.details} );
    }

    uniqueID += 1; 
    const users = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

    users.push({
        id: uniqueID,
        ...req.body
    });
    fs.writeFileSync(jsonPath, JSON.stringify(users));
    res.send({ 
        id: uniqueID,
     });
});

app.put('/users/:id', (req, res) => {

    const resultValidate = userShema.validate(req.body);

    if (resultValidate) {
        return res.status(404).send( {error: resultValidate.error.details} );
    }

    const users = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    const findUser = users.find((user) => {
        return user.id === Number(req.params.id);
    });
    if (findUser) {
        findUser.firstName = req.body.firstName;
        findUser.secondName = req.body.secondName;
        findUser.age = req.body.age;
        findUser.city = req.body.city;
        fs.writeFileSync(jsonPath, JSON.stringify(users));
        res.send({ user: findUser });
    } else {
        res.send({ user: null });
    }
});

app.delete('/users/:id', (req, res) => {
    const users = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    const indexFindUser = users.findIndex((user) => {
        return user.id === Number(req.params.id);
    });
    users.splice(indexFindUser, 1);
    fs.writeFileSync(jsonPath, JSON.stringify(users));
    res.send({ id: req.params.id });

});

app.listen(port);