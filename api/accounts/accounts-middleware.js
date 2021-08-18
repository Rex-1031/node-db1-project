const Accounts = require('./accounts-model.js')
const db = require('../../data/db-config.js')



exports.checkAccountPayload = (req, res, next) => {
  const { name, budget, id} = req.body
  
  if(!budget || !name){
    res.status(400).json({
      message: "name and budget are required"
    })
  }
    else if(typeof name  !== 'string'){
    res.status(400).json({
       message: "name of account must be a string"
    })
    }
   else if(name.trim().length <= 3 || name.trim().length > 100){
      res.status(400).json({
        message: "name of account must be between 3 and 100"
      })
    }
    else if(typeof budget !== 'number' ){
      res.status(400).json({
        message: "budget of account must be a number"
      })
    }
    else if(budget < 0 || budget > 1000000){
      res.status(400).json({
        message: "budget of account is too large or too small"
      })
    
  }else{
    req.name = name.trim()
    req.budget = budget
    req.id =id
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  try{
  const accountName = await db('accounts').where('name', req.body.name.trim()).first()
      if(accountName){
        next({status: 400, message: 'that name is taken'})
      }else{
        next()
      }
  }catch(err){
    next(err)
  }
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const accountsId = await Accounts.getById(req.params.id)

    if(!accountsId){
      res.status(404).json({
        message: "account not found"
      })
    }else{
      req.accountsId = accountsId
      next()
    }
    
  }
  catch(err){
    next(err)
  }
}
