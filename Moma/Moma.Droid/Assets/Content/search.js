function showSearchBar() {
    var searchBarContainer = document.getElementById('searchBarDiv');
    if (searchBarContainer.childNodes.length == 0) {
        createSearchBar();
    }
    showHideSearch();
}

function createSearchBar() {
    
}

function showHideSearch() {
    var searchBar = document.getElementById('searchBar');
    if (searchBar != null) {
        searchBar.style.display = searchBar.style.display === 'none' ? '' : 'none';
    }
}