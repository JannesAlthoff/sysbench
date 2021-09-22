function sortTable(table, columnNumber, valueType) {
    // https://www.w3schools.com/howto/howto_js_sort_table.asp
    var rows, switching, i, cur, next, shouldSwitch, direction, switchCount = 0;
    var values
    switching = true;
    direction = "desc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i=1; i<(rows.length-1); i++) {
            shouldSwitch = false;
            cur = rows[i].getElementsByTagName("td")[columnNumber];
            next = rows[i+1].getElementsByTagName("td")[columnNumber];
            if (["number", "int"].includes(valueType)) {
                values = [parseNumber(cur.innerText), parseNumber(next.innerText)];
            } else {
                values = [cur.innerText.toLowerCase(), next.innerText.toLowerCase()];
            }
            if (values[0] == values[1]) {
                continue;
            }
            compare = (values[0] > values[1]);
            shouldSwitch = (compare) == (direction == "asc"); // logical xor
            if (shouldSwitch) {
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
            switching = true;
            switchCount++;
        } else {
            if (switchCount == 0 && direction == "desc") {
                direction = "asc";
                switching = true;
            }
        }
    }
    return direction;
}

function parseNumber(text) {
    var num = Number(text);
    if (isNaN(num)) {
        return 0;
    } else {
        return num;
    }
}

function makeHandler(table, column, valueType) {
    var header = table.rows[0].children;
    return (e) => {
        // clear previous sort status
        var variants = ["asc", "desc"];
        for (var col = 0; col < header.length; col++) {
            var cell = header[col];
            for (var cls = 0; cls < cell.classList.length; cls++) {
                var className = cell.classList[cls];
                if (variants.includes(className)) {
                    cell.classList.remove(className);
                }
            }
        }

        // sort
        var direction = sortTable(table, column, valueType);

        // show current sort status
        console.log("Sort " + direction + ": " + header[column].innerText + " (" + valueType + ")");
        e.target.classList.add(direction);
    }
};

(function () {
    var results = document.getElementById("results");
    var header = results.rows[0].children;
    for (var col = 0; col < header.length; col++) {
        var element = header[col];
        var valueType = null;
        if (element.classList.contains("int")) {
            valueType = "int";
        }
        header[col].onclick = makeHandler(results, col, valueType);
    }
    header[1].click()
})();
