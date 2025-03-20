const idValidationSchema = {
    id : {
        in:['params'],
        isMongoId : {
            errorMessage : 'id is invalid'
        }
    }
}

module.exports = idValidationSchema