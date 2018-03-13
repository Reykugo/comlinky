

const generic = {
    
    /**
     check all value in json and return true if one of this values is empty or undefined
    * @param {JSON} params json with all params to check
    * @return {boolean}
    **/
    isParamsAreEmptyOrUndefined : function(params){
        for(i in params){
            if (params[i] == undefined || params[i] == ""){
                return true;
            }
        }
        return false;
    },

}

module.exports = generic;
