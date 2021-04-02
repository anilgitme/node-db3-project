const db = require('../../data/db-config');
/*
  If `scheme_id` does not exist in the database:

  status 404
  {
    "message": "scheme with scheme_id <actual id> not found"
  }
*/
const checkSchemeId = async(req, res, next) => {
    try {
        const { scheme_id } = await req.params
        const scheme = await db('schemes').where(scheme_id).first()
        if (!scheme) {
            //if no scheme found
            return res.status(404).json({ message: `scheme with ${scheme_id} not found` })
        } else {
            res.status(200).json(scheme)
            next()
        }
    } catch (err) {
        next(err)
    }
}



/*
  If `scheme_name` is missing, empty string or not a string:

  status 400
  {
    "message": "invalid scheme_name"
  }
*/
const validateScheme = async(req, res, next) => {
    try {
        const { scheme_name } = await req.body;
        if (scheme_name === '' || !scheme_name || typeof scheme_name !== 'string') {
            res.status(400).json({ message: 'invalid scheme_name' })
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

/*
  If `instructions` is missing, empty string or not a string, or
  if `step_number` is not a number or is smaller than one:

  status 400
  {
    "message": "invalid step"
  }
*/
const validateStep = async(req, res, next) => {
    try {
        const { instructions, step_number } = req.body;
        if (!instructions || instructions === '' || typeof instructions !== 'string' ||
            step_number !== 'number' || step_number < 1) {
            res.status(400).json({ message: 'invalid step' })
        } else {
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    checkSchemeId,
    validateScheme,
    validateStep,
}