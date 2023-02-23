const SuccessResponse = (data, message)=>{
    return {
        success: true,
        message,
        data,
        error: {},
    }
}

const ErrorResponse = (error)=>{
    return {
        success: false,
        message: "Operation failed",
        data: {},
        error,
    }
}

const generateStatusCode = (error)=>{
    if (error.statusCode) {
        return error.statusCode;
    }
    else if (error.name == "Validationerror") {
        return 400;
    }
    else {
        return 500;
    }
}
module.exports = {
    SuccessResponse,
    ErrorResponse,
    generateStatusCode,
}