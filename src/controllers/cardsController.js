const crypto = require("crypto");
const connection = require("../database/connections");

module.exports = {
  async index(req, res) {
    const cards = await connection("cards").select("*");
    return res.json(cards);
  },

  async create(req, res) {
    const { titulo, pessoa, conteudo, prazo } = req.body;
    const status = "sprint";
    await connection("cards").insert({
      titulo,
      pessoa,
      conteudo,
      prazo,
      status,
    });

    return res.json({ msg: "ok" });
  },

  async delete(req, res) {
    // console.log('[DEBUG] USER ROTA',request)
    // console.log('[DEBUG] USER ROTA',request.params.id_user);
    const del = await connection("cards").where("id", req.params.id).del();

    return res.json(del);
  },
  async atualizar(req, res) {
    var { titulo, pessoa, conteudo, prazo, status } = req.body;
   

    const atualizar = {
      titulo,
      pessoa,
      conteudo,
      prazo,
      status,
    };

    await connection("cards").where("id", req.params.id).update(atualizar);

    return res.json({ msg: "ok" });
  },
};
