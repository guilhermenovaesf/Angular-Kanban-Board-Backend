const crypto = require('crypto');
const connection = require('../database/connections');

module.exports = {

    async index(req, res) {
        const cards = await connection('cards').select('*');
        return res.json(cards);
    },

    async create(req, res) {
        const {titulo, pessoa, conteudo, prazo} = req.body;


         await connection('cards').insert({

        titulo,
        pessoa,
        conteudo,
        prazo,

    })

    return res.json({msg:'ok'});
    }
}
