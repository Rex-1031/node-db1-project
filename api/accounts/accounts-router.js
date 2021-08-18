const express = require("express")
const Accounts = require("./accounts-model.js")
const {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload
} = require("./accounts-middleware.js")

const router = express.Router()

router.get('/', async (req, res, next) => {
  try{
    const accounts = await Accounts.getAll()
    res.json(accounts)
  }
  catch(err){
    next(err)
  }
  
   
})

router.get('/:id', checkAccountId, async (req, res, next) => {
  try{
    const accounts = await Accounts.getById(req.params.id)
      res.json(accounts)
  }catch(err){
    next(err)
  }
})

router.post('/', checkAccountNameUnique, checkAccountPayload,  async (req, res, next) => {
 try{
    const accounts = await Accounts.create(req.body)
    res.json(accounts)
  }catch(err){
    next(err)
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try{
    const accounts = await Accounts.updateById(req.params.id, req.body)
    res.json(accounts)
  }catch(err){
    next(err)
  }
});


router.delete('/:id',checkAccountId, async (req, res, next) => {
  try{
    const accounts = await Accounts.deleteById(req.params.id)
    res.json(accounts)
  }catch(err){
    next(err)
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
    stack: err.stack,
  })
})

module.exports = router;
