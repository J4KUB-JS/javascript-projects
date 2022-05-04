//  ------- Klasa książka: Format książki -------
class Book {
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }
}

// ------- Klasa User Interface: Zażądza tym co się dziej na ekranie -------
class UI {
    // Pokazuje książki 
    static displayBooks() {
        const books = Store.getBooks();

        books.forEach((book) => UI.addBookToList(book));
    }
    //Dodawanie książek
    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.year}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;

        list.appendChild(row);
    }

    // Usuwanie elementu z UI
    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    // Alert o tym co zrobiono (Dodano, Nie pełne informacje, Usunieto)
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        // Znika po upływie 3 sekund
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    // Czyści pola formularza
    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#year').value = '';
    }
}

// ------- Klasa Storage: Zażądza formatem zapisu obiektów do pamieci -------
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(year) {
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.year === year) {
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
}

// ------- Zdażenia: Pokazuje książki -------
document.addEventListener('DOMContentLoaded', UI.displayBooks);


// ------- Zdażenia: Dodawania książki do UI (Wyświetlamy ją) -------

document.querySelector('#book-form').addEventListener('submit', (e) => {
    // "Zmieniamy" sposób działania submit typu
    e.preventDefault();

    // Bierze informacje o książce wpisane w pola formularza
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const year = document.querySelector('#year').value;

    // Sprawdzamy czy pola są poprawne (Czy wszytkie pola są wypełnione)
    if (title === '' || author === '' || year === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
        // Tworzymy nową książkę z wartościami podanymi w formularzu
        const book = new Book(title, author, year);

        // Dodajemy stwożoną książkę do UI (Wyświetlamy ją)
        UI.addBookToList(book);

        // Dodajemy stwożoną książkę do pamieci
        Store.addBook(book);

        // Pokazujemy że udało się dodać książkę
        UI.showAlert('Book Added', 'success');

        // Czyścimy pola formularza
        UI.clearFields();
    }
});


// ------- Zdażenia: Proces usuwania książki -------

document.querySelector('#book-list').addEventListener('click', (e) => {
    // Krok pierwszy usuwa książkę z wyświetlania
    UI.deleteBook(e.target);

    // Krok drugi usuwa książkę z pamięci
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Krok trzeci wyświetla informacje o usunieciu książki
    UI.showAlert('Book Removed', 'success');
});