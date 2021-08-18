exports.checkAccountPayload = (req, res, next) => {
  const { name, budget, id} = req.body
  
  if(!budget || !budget.trim() || !name || !name.trim()){
    res.status(400).json({
      message: '"name and budget are required"'
    })
  
    if(typeof name  !== 'string'){
    res.status(400).json({
       message: "name of account must be a string"
    })
    }
    if(name.trim()< 3 || name.trim() > 100){
      res.status(400).json({
        message: "name of account must be between 3 and 100"
      })
    }
    if(typeof budget !== 'number' ){
      res.status(400).json({
        message: "budget of account must be a number"
      })
    }
    if(budget < 0 || budget > 1000000){
      res.status(400).json({
        message: "budget of account is too large or too small"
      })
    }
  }else{
    req.name = name.trim()
    req.budget = budget
    req.id =id
    next()
  }
}

exports.checkAccountNameUnique = async (req, res, next) => {
  const accountName = await Accounts.get(req.body.name)
  if (accountName){
    res.status(400).json({
      message: "that name is taken"
    })
  }else{
    req.accountName = accountName
    next()
  }
  
}

exports.checkAccountId = async (req, res, next) => {
  try {
    const accounts = await Accounts.get(req.params.id)
    if(!accounts){
      res.status(404).json({
        message: "account not found"
      })
    }else{
      req.accounts = accounts
      next()
    }
    
  }
  catch(err){
    next(err)
  }
}
