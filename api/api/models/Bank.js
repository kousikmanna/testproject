/**
* Finance.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        user:{
            model:'User'
        },

        userId :{
            type : 'string',
          
        },

        name : {
            type : 'string'
        },

        account_no : {
            type : 'string'
        },

        isPrimary : {
            type : 'boolean'
        }
    },

    bankDetail : function(userId, cb){
        Bank.findOne({user: userId}).exec(function(err, bank){
            if(!err){
                bank =  bank.length == 0 ? null : bank;
                return cb(null, bank)
            }else{
                return cb(err)
            }
        });
    },

    add: function (userId, reqbody, cb) {
        sails.log.debug("reqbody",reqbody);
        Bank.create(reqbody).exec(function (err, bank) {
            if (!err) {
               return cb(null, bank)
            } else {
                return cb(err)
            }
        });   
    }
  
};

