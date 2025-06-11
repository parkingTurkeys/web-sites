let readable = false

function generateTable(source) {
    //X AND Y ARE ONE MORE THAN THE INDEX OF THE LAST ITEM
    let x = source.length
    let y = 0
    //begin the table
    let table = "<table>"
    for (i = 0; i < x; i++) {
        if (source[i].length > y) {
            y = source[i].length
        }
    }
    //for the first row
    for (n = 0; n < x; n++) {
        //each individual cell
        table += "<th>" + source[n][0] + "</th>"
    }
    for (i = 1; i < y; i++) {
        //for each row after the first
        table += "<tr>"
        for (n = 0; n < x; n++) {
            //each individual cell
            if (source[n].length /*the length of each column; are we to the point of needing repeats*/ <= i) {
                //repeat due to the fact that we have reached the repeat point
                table += "<td>" + source[n][source[n].length - 1] + "</td>"
            } else {
                //we still have data left!
                table += "<td>" + source[n][i] + "</td>"
            }
        }
        //end the row
        table += "<tr>"
    }
    //end the table
    table += "</table>"
    return table
}

//source is an array with x amount of arrays where y is the amount of items in the largest array; x is the width of the table and y is the height 

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