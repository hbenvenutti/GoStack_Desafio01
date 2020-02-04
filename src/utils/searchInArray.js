// TODO: find a better way to do this;
// tried do use indexOf, but didn't work;

module.exports = function searchInArray(array, id){
    const len = array.length;

    for (var i=0; i<len; i++){
        if (array[i].id === id){
            return i;
        };
    };

    return -1;
};