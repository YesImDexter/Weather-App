const btnSearch = document.getElementById("button-search");
const inputSearch = document.getElementById("input-search");

function getData(){

    var location = [
        ["Kuching", 26, 92],
        ["Sibu", 26, 93],
        ["Bintulu", 27, 89],
        ["Mukah", 27, 87],
        ["Kota Samarahan", 26, 93],
    ];

}

btnSearch.addEventListener("click", getData());