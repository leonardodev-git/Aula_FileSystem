const express = require('express');
const router = express.Router();

const controller = require('../controller/login')

// GET /login
router.get('/', controller.index);

// GET / GRID de Usuários
router.get('/grid', controller.grid);

// POST /login/entrar
router.post('/entrar', controller.submit);

// GET /login/cadastro
router.get('/cadastro', controller.cadastro);

// POST /login/cadastro
router.post('/cadastro', controller.novoCadastro);

module.exports = router;