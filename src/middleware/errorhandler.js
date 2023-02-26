function errorHandler(err, req, res, next) {
    console.log(err);
    if (err.statusCode == 400) {
        return res.BADREQUEST(err);
    }
    return res.APPERROR(err);
    
}

module.exports = errorHandler;