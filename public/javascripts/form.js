let currentPage = 1;
const totalPages = 4;

function nextPage(pageNumber) {
    // Hide the current page
    document.getElementById(`page-${pageNumber}`).classList.remove('active');

    // Show the next page
    if (pageNumber < totalPages) {
        document.getElementById(`page-${pageNumber + 1}`).classList.add('active');
    }
}

// Initially show the first page
document.getElementById('page-1').classList.add('active');
