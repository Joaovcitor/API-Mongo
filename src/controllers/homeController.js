const Contato = require('../models/ContatoModel');


exports.index = async (req, res) => {
  const contatos = await Contato.buscaContatos();
  res.json("Olá")
  // res.render("index", {contatos})
};
