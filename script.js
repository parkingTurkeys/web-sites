let readable = false

function checkPreferences() {
    /*if (window.localStorage.getItem("lightmodeon") && window.localStorage.getItem("auto")) {
        switch (window.localStorage.getItem("lightmodeon")) {
            case "yes":
                break;
            case "no":
                toggleDarkMode()
                break;
        }
    } else */if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) /*got this from stack overflow ~(￣▽￣)~*/ {
        toggleDarkMode()
        window.localStorage.setItem("auto", true)
    }
    /*if (window.localStorage.getItem("csson")) {
        switch (window.localStorage.getItem("csson")) {
            case "yes":
                break;
            case "no":
                toggleReadability()
                break;
        }
    }*/
}



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
            
        }
        source[i].origlength = source[i].length
        dbg(source[i].origlength)
    }
    //for the first row
    for (n = 0; n < rows; n++) {
        //each individual cell
        table += "<th>" + source[n][0] + "</th>"
        source[n].splice(0, 1)
        dbg(source[n])
    }
    for (i = 1; i < columns; i++) {
        //for each row after the first
        table += "<tr>"
        for (n = 0; n < rows; n++) {
            //each individual cell
            if (source[n].origlength - 1 /*don't ask*/ /*the length of each column; are we to the point of needing repeats*/ <= i) {
                //repeat due to the fact that we have reached the repeat point
                table += "<td>" + source[n][source[n].length - 1] + "</td>"
            } else {
                //we still have data left!
                if (shuffle) {table += "<td>" + getAndRemoveRandItem(source[n], []) + "</td>"} else {table += "<td>" + source[n][i] + "</td>"}
                dbg(source[i])
            }
        }
        //end the row
        table += "<tr>"
    }
    //end the table
    table += "</table>"
    return table
}

function generateQuotes(array) {
    //div = document.getElementById("quotes")
    lengthy = array.length
    for (i = 0; i < lengthy; i++) {
        
        quote = getAndRemoveRandItem(array, [])
        //console.log(quote)
        htmlstring = " <div><blockquote cite = '" + quote.link + "'><p>" + quote.text + "</p></blockquote><p>—" + quote.name + " <cite><a href = '" + quote.link + "'>" + quote.source + "</a></cite></p><p class = 'explanation'>" + quote.explanation + "</div>"
        html = elementify(htmlstring)
        document.getElementById("quotes").appendChild(html)
    }
}

/*
base quote stucture from https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/blockquote
<div>
  <blockquote cite= 'quote.link'>
    <p>
      quote.text
    </p>
  </blockquote>
  <p>—quote.name <cite>quote.source</cite></p>
</div>


*/


//source is an array with rows amount of arrays where columns is the amount of items in the largest array; rows is the width of the table and columns is the height 

function toggleReadability() {
    document.getElementById('body').classList.toggle('css')
    document.getElementById('body').classList.toggle('no-css')
    if (document.getElementById('body').classList.contains('css')) {
        document.getElementById('css-toggle').innerHTML = "this is unreadable"
        window.localStorage.setItem("csson", "yes")
        readable = false
    } else {
        document.getElementById('css-toggle').innerHTML = "this is far too readable"
        window.localStorage.setItem("csson", "no")
        readable = true
    }
}

function toggleDarkMode() {
    document.getElementById('body').classList.toggle('light')
    document.getElementById('body').classList.toggle('dark')
    if (document.getElementById('body').classList.contains('light')) {
        document.getElementById('darkmode-toggle').innerHTML = "MY EYES"
        window.localStorage.setItem("lightmodeon", "yes")
        window.localStorage.setItem("auto", false)
        dark = false
    } else {
        document.getElementById('darkmode-toggle').innerHTML = "<div style = 'letter-spacing: 1rem; font-variant: small-caps;'>make it brighter</div>"
        dark = true
        window.localStorage.setItem("lightmodeon", "no")
        window.localStorage.setItem("auto", false)
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