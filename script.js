let readable = false


function generateTable(source, shuffle = false) {
    //rows and columns are switched :)
    //rows AND columns ARE ONE MORE THAN THE INDEX OF THE LAST ITEM
    let rows = source.length
    let columns = 0
    //begin the table
    let table = "<table>"
    for (i = 0; i < rows; i++) {
        if (source[i].length > columns) {
            columns = source[i].length
            source[i].splice(0, 1)
        }
    }
    //for the first row
    for (n = 0; n < rows; n++) {
        //each individual cell
        table += "<th>" + source[n][0] + "</th>"
    }
    for (i = 1; i < columns; i++) {
        //for each row after the first
        table += "<tr>"
        for (n = 0; n < rows; n++) {
            //each individual cell
            if (source[n].length /*the length of each column; are we to the point of needing repeats*/ <= i) {
                //repeat due to the fact that we have reached the repeat point
                table += "<td>" + source[n][source[n].length - 1] + "</td>"
            } else {
                //we still have data left!
                if (shuffle) {table += "<td>" + getAndRemoveRandItem(source[n], []) + "</td>"} else {table += "<td>" + source[n][i] + "</td>"}
            }
        }
        //end the row
        table += "<tr>"
    }
    //end the table
    table += "</table>"
    return table
}

//source is an array with rows amount of arrays where columns is the amount of items in the largest array; rows is the width of the table and columns is the height 

function toggleReadability() {
    if (readable) {
        document.getElementById('css-toggle').innerHTML = "this is unreadable"
        document.getElementById('body').className = 'css'
        readable = false
    } else {
        document.getElementById('css-toggle').innerHTML = "this is far too readable"
        document.getElementById('body').className = 'no-css'
        readable = true
    }
}

function printEssay(essarray, id) {
    for (i = 0; i < essarray.length; i++) {
        document.getElementById(id).innerHTML += "<p>" + essarray[i] + "</p>"
    }
}

function getAndRemoveRandItem(array, ignore) {
    
    reuse = Math.floor(Math.random() * array.length)
    if (ignore.includes(reuse)) {
        //try again! :DDD very good strategy
        console.log("try again :heavysob:")
        reuse = getAndRemoveRandItem(array, ignore)
        return reuse
    }
    reuse2 = array[reuse]
    if (array.length > ignore.length /*check that there is more than one non-ignored left !*/) {array.splice(reuse, 1)}
    return reuse2
}