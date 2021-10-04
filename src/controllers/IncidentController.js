const crypto = require('crypto');
const connection = require('../database/connections');

module.exports = {
async index(req, res) {
  const { page = 1 } = req.query;

  const [count] = await connection('incidents').count();

  const incidents = await connection('incidents')
  .join('cards', 'cards.id',  '=', 'incidents.cards_id')
  .limit(5).offset((page - 1)*5)
  .select([
      'incidents.*',
      'cards.titulo',
       'cards.pessoa',
        'cards.conteudo',
         'cards.prazo'
          ]);

  res.header('X-Total-Count', count['count(*)']);

  return res.json(incidents);
},
async create(req, res) {

  const {title, description, value} = req.body;
  const cards_id = req.headers.authorization;

  const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      cards_id,
  });
  return res.json({id});
},

async delete(req, res) {
  const { id } = req.params;
  const cards_id = req.headers.authorization;

  const incident = await connection('incidents').where('id', id).select('cards_id').first();

  console.log(incident);

  if(incident.cards_id !== cards_id) {
      return res.status(401).json({error: 'Operation not permited'});
  }

  await connection('incidents').where('id', id).delete();

  return res.status(204).send();
}
}
