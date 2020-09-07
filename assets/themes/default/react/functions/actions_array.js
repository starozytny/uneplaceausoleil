function updateInArray(array, data){
    let arr = []
    array.map(elem => {
        if(elem.id == data.id){ elem = data }
        arr.push(elem)
    })
    return arr;
}

function updateInArraySeen(array, id){
    let arr = []
    array.map(elem => {
        if(elem.id == id){ elem.isSeen = true }
        arr.push(elem)
    })
    return arr;
}

function deleteInArray(array, data){
    let arr = []
    array.map(elem => {
        if(elem.id != data.id){ arr.push(elem) }
    })
    return arr;
}

module.exports = {
    updateInArray,
    updateInArraySeen,
    deleteInArray
}