const Login = require("../models/LoginModel");

exports.index = async (req, res) => {
  res.json("Tela de login alterada");
};

exports.register = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.register();

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(function () {
        return res.redirect("/login/index");
      });
      return;
    }
    req.flash("success", "Seu usuário foi salvo com sucesso");
    req.session.save(function () {
      return res.redirect("http://localhost:3000/login/index");
    });
  } catch (e) {
    console.log(e);
    res.render("404");
  }
};

exports.login = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.login();

    if (login.errors.length > 0) {
      req.flash("errors", login.errors);
      req.session.save(function () {
        return res.redirect("/login/index");
      });
      return;
    }

    req.flash("success", "Você entrou no sistema");
    req.session.user = login.user;
    req.session.save(function () {
      return res.redirect("http://localhost:3000");
    });
  } catch (e) {
    console.log(e);
    res.render("404");
  }
};

exports.logout = function (req, res) {
  req.session.destroy();
  res.redirect("/");
};
