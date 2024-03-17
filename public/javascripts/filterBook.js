document.addEventListener("DOMContentLoaded", function() {
    var genres = document.querySelectorAll('.genre-filter li');
    var books = document.querySelectorAll('.card');

    genres.forEach(function(genre) {
        genre.addEventListener('click', function() {
            var selectedGenre = this.dataset.genre;

            books.forEach(function(book) {
                var bookGenre = book.dataset.genre;
                if (bookGenre === selectedGenre || selectedGenre === "todos") {
                    book.style.display = 'flex';
                } else {
                    book.style.display = 'none';
                }
            });
        });
    });
});