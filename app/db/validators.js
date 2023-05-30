module.exports = {

    checkForbidenString(value, forbidenString) {
        if (value === forbidenString) {
            throw new Error(`Nazwa ${forbidenString} jest zakazana`)
        }
    },

    validateEmail(email) {
        var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return re.test(email)
      }
    

};