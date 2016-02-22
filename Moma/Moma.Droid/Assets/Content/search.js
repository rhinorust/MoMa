function showSearchBar() {
    var searchBarContainer = document.getElementById('searchBarDiv');
    if (searchBarContainer.childNodes.length === 0) {
        createSearchBar(searchBarContainer);
    }
    showHideSearch();
}

function createSearchBar(containerElement) {
    var searchInput = document.createElement('input');
}

function showHideSearch() {
    var searchBar = document.getElementById('searchBar');
    if (searchBar != null) {
        searchBar.style.display = searchBar.style.display === 'none' ? '' : 'none';
    }
}