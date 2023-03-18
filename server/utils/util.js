
const responseMessage= require("./response-message")

module.exports = class utils {
    
    static responseFormat(code = 200, data = {}, message = "") {
        return {
          code: code,
          data: data,
          message: message,
        };
      }

      static response(code, data={}, message) {
        let returnObj = {
          code: code,
        };
        if (message) {
          returnObj.message = message;
        } else {
          returnObj.message = responseMessage[code];
        }
        if (data) {
          returnObj.data = data;
        }
        return returnObj;
      }
}