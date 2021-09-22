function sortTable(columnNumber, type) {
    // https://www.w3schools.com/howto/howto_js_sort_table.asp
    var table, rows, switching, i, cur, next, shouldSwitch, direction, switchCount = 0;
    var values
    table = document.getElementById("results");
    switching = true;
    direction = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i=1; i<(rows.length-1); i++) {
            shouldSwitch = false;
            cur = rows[i].getElementsByTagName("td")[columnNumber];
            next = rows[i+1].getElementsByTagName("td")[columnNumber];
            if (type in ["number", "int"]) {
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
            if (switchCount == 0 && direction == "asc") {
                direction = "desc";
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

function makeHandler(column, type, header) {
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
        var direction = sortTable(column, type);

        // show current sort status
        e.target.classList.add(direction);
    }
};

(function () {
    var results = document.getElementById("results");
    var header = results.rows[0].children;
    var type = null;
    for (var col = 0; col < header.length; col++) {
        var element = header[col];
        if ("int" in element.classList) {
            type = "int";
        }
        header[col].onclick = makeHandler(col, type, header);
    }
})();
