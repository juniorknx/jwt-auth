const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const SECRET = 'mysecretsignjwt'

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({ message: "Route Working for now!!" })
})

//Funcao que verifica se o token é válido
function verifyJwt(req, res, next) {
    const token = req.headers['x-access-token']
    jwt.verify(token, SECRET, (err, decoded) => {
        if (err) return res.status(401).end();

        req.userId = decoded.userId;
        next();
    })
}

app.get('/clientes', verifyJwt, (req, res) => {
    res.json([{ id: 1, nome: 'Julio' }])
})

app.post('/login', (req, res) => {
    if (req.body.user === 'julio' && req.body.password === '123') {
        const token = jwt.sign({ userId: 1 }, SECRET, { expiresIn: 300 })
        return res.json({ auth: true, token });
    }

    res.status(401).end();
})

app.post('/logout', (req, res) => {
    res.end();
})

app.listen(3000, () => console.log('App Running!!'));