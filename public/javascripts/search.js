document.addEventListener("DOMContentLoaded", function() {
    const searchDesktop = document.getElementById('search-desktop');
    const suggestionsDesktop = document.getElementById('suggestions-desktop');

    function performSearch(query, suggestionsElement) {
        if (query.length > 0) {
            fetch(`/search?q=${query}`)
                .then(response => response.json())
                .then(data => {
                    if (data.length) {
                        let suggestionsHtml = data.map(neighborhood => `
                            <a href="/neighborhoods/${neighborhood._id}" class="block w-full px-3 py-2 rounded-md transition-colors duration-200 hover:bg-blue-100">
                                ${neighborhood.title} - ${neighborhood.location}
                            </a>
                        `).join('');
                        suggestionsElement.innerHTML = suggestionsHtml;
                        suggestionsElement.classList.remove('hidden');
                    } else {
                        suggestionsElement.innerHTML = `
                            <div class="block p-2">No results found</div>
                        `
                        suggestionsElement.classList.remove('hidden');
                    }
                })
                .catch(error => console.error('Error fetching search results:', error));
        } else {
            suggestionsElement.classList.add('hidden');
        }
    }

    if (searchDesktop) {
        searchDesktop.addEventListener('input', function() {
            performSearch(searchDesktop.value, suggestionsDesktop);
        });
    }

});
