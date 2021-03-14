const bcrypt = require('bcrypt');
const path = require('path');
const fs = require('fs');
const pathFile = path.join('static-database', 'db.json');

const index = (req, res) => {

  res.render('login/index');
}

const grid = (req, res) => {
  const data = fs.readFileSync(pathFile);
  const users = JSON.parse(data);
  res.render('login/grid', { users });
}

const submit = (req, res) => {
  const { email, password } = req.body;
  const data = fs.readFileSync(pathFile);
  const users = JSON.parse(data);
  const [userFilter] = users.filter(usuario => usuario.email === email);
  if (!userFilter) res.render('login/errorLogin');
  if (bcrypt.compareSync(password, userFilter.password)) {
    res.redirect('/login/grid');
  }
}

const cadastro = (req, res) => {
  res.render('login/cadastro');
}


const novoCadastro = (req, res) => {
  const salt = 10;
  const data = fs.readFileSync(pathFile);
  let dadosEnviado = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, salt),
  };
  const users = JSON.parse(data);
  users.push(dadosEnviado);
  const json = JSON.stringify(users);
  fs.writeFileSync(pathFile, json);
  res.redirect('/login');
}

module.exports = {
  index,
  submit,
  cadastro,
  novoCadastro,
  grid
}