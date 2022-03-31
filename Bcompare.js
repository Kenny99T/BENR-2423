const lineReader = require('line-reader');
const bcrypt = require("bcryptjs")

const Hpassword = "$2a$05$3pqF8gapjY82H.T4G7LNauba.lObTbsVWsBkAh2jEKl.9kK2l/cHq"

lineReader.eachLine('rockyou.txt', (line, last) => {
    bcrypt.compare(line, Hpassword, function(error,isMatch) {
        if (error) {
            throw error
        }
        else if (!isMatch) {
        }
        else {
            console.log("Password matches!")
            console.log(line)
        } 
    });
});

