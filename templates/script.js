function sort_table(column_number, type) {
    // https://www.w3schools.com/howto/howto_js_sort_table.asp
    var table, rows, switching, i, cur, next, should_switch, direction, switch_count = 0;
    var values
    table = document.getElementById("results");
    switching = true;
    direction = "asc";
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i=1; i<(rows.length-1); i++) {
            should_switch = false;
            cur = rows[i].getElementsByTagName("td")[column_number];
            next = rows[i+1].getElementsByTagName("td")[column_number];
            if (type in ["number", "int"]) {
                values = [parse_number(cur.innerText), parse_number(next.innerText)];
            } else {
                values = [cur.innerText.toLowerCase(), next.innerText.toLowerCase()];
            }
            if (values[0] == values[1]) {
                continue;
            }
            compare = (values[0] > values[1]);
            should_switch = (compare) == (direction == "asc"); // logical xor
            if (should_switch) {
                break;
            }
        }
        if (should_switch) {
            rows[i].parentNode.insertBefore(rows[i+1], rows[i]);
            switching = true;
            switch_count++;
        } else {
            if (switch_count == 0 && direction == "asc") {
                direction = "desc";
                switching = true;
            }
        }
    }
}

function parse_number(text) {
    var num = Number(text);
    if (isNaN(num)) {
        return 0;
    } else {
        return num;
    }
}

function make_handler(column, type) {
    return () => sort_table(column, type);
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
        header[col].onclick = make_handler(col, type);
    }
})();
