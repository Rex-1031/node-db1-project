const db = require("../../data/db-config.js")


const getAll = async () => {
  return db('accounts')
}

const getById = async id => {
  return db('accounts').where("id", id).first();
}

const create = async account => {
  const [id] = await db('account').insert(account)
  return getById(id)
}

const updateById = async (id, account) => {
  await db('account').where('id', id).update(account)
  return getById(id)
}

const deleteById = async id => {
  const deletedAcc = await getById(id)
  await db('account').where('id', id).delete()
  return deletedAcc
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
}

