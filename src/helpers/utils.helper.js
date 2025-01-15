const bcrypt = require('bcrypt');

exports.verifyPassword = async(plainPassword, hasedPassword) => {
    try{
        
        const isPasswordMatched = await bcrypt.compare(plainPassword, hasedPassword);
        if(isPasswordMatched){
            return true;
        }
        return false;
    }catch(error){
        console.log(error,'error');
        return false;
    }
}