const Accounts = require('./accounts-model.js')
const db = require('../../data/db-config.js')



exports.checkAccountPayload = (req, res, next) => {
  const { name, budget, id} = req.body
  
  if(!req.body.budget || !req.body.name){
    res.status(400).json({
      message: "name and budget are required"
    })
  }
    else if(typeof req.body.name  !== 'string'){
    res.status(400).json({
       message: "name of account must be a string"
    })
    }
   else if(req.body.name.length <= 3 || req.body.name.length > 100){
      res.status(400).json({
        message: "name of account must be between 3 and 100"
      })
    }
    else if(typeof req.body.budget !== 'number' ){
      res.status(400).json({
        message: "budget of account must be a number"
      })
    }
    else if(req.body.budget < 0 || req.body.budget > 1000000){
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
  const accountName = await Accounts.getAll()
  const nameCheck = accountName.filter(account => account.name === req.body.name)
  if (nameCheck.name === req.body.name){
    res.status(400).json({
      message: "that name is taken"
    })
  }else{
    next()
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
