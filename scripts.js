import { books, authors, genres, BOOKS_PER_PAGE } from './data.js'
import './book-preview.js';
//sets up the page for the site showing all books
let page = 1;
let matches = books;

//Create a function to create the book preview button so you dont rewrite the code (DRY principle(Don't repeat yourself))
function bookPreviewButton({ author, id, image, title }) {
    const element = document.createElement('book-preview');
    element.setAttribute('data-id', id);
    element.setAttribute('image', image);
    element.setAttribute('title', title);
    element.setAttribute('author', authors[author]);
    return element;
}

//populate the initial book preview with the new function
const starting = document.createDocumentFragment();
matches.slice(0, BOOKS_PER_PAGE).forEach(book => {
    starting.appendChild(bookPreviewButton(book));
});

document.querySelector('[data-list-items]').appendChild(starting);

//create a function for dropdown options for both genres and authors

function createDropDownOptions(data, defaultValue, defaultText) {
    const fragment = document.createDocumentFragment();
    const defaultOption = document.createElement("option");
    defaultOption.value = defaultValue;
    defaultOption.innerText = defaultText;
    fragment.appendChild(defaultOption);

    for (const [id, name] of Object.entries(data)) {
        const option = document.createElement('option');
        option.value = id;
        option.innerText = name;
        fragment.appendChild(option);
    }
    return fragment;
}

//use new function to populate genre and author dropdowns
document.querySelector('[data-search-genres]').appendChild(createDropDownOptions(genres, 'any', 'All Genres'));
document.querySelector('[data-search-authors]').appendChild(createDropDownOptions(authors, 'any', 'All Authors'));


//checks users preference to either set light or dark mode based on current scheme
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.querySelector('[data-settings-theme]').value = 'night'
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
} else {
    document.querySelector('[data-settings-theme]').value = 'day'
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
}


//have the show more button at the bottom with remaining books
//create a const to call the data-list-button once instead of repeatedly 
const listButton = document.querySelector('[data-list-button]');
const remainingBooks = matches.length - (page * BOOKS_PER_PAGE);
//disable when <1 book left to show
listButton.disabled = remainingBooks < 1;

// Set innerhtml with the remaining book count
listButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${remainingBooks > 0 ? remainingBooks : 0})</span>
`;

//create a function to cancel an event listener
function cancelEventListener(selector) {
    document.querySelector(selector).addEventListener("click", () => {
        document.querySelector(selector.replace("cancel", "overlay")).open = false;
    });
}

//Event Listeners
cancelEventListener('[data-search-cancel]');
cancelEventListener('[data-settings-cancel]');

//event listener to open search overlay
document.querySelector('[data-header-search]').addEventListener('click', () => {
    document.querySelector('[data-search-overlay]').open = true;
    document.querySelector('[data-search-title]').focus();
});

//event listener to open settings overlay
document.querySelector('[data-header-settings]').addEventListener('click', () => {
    document.querySelector('[data-settings-overlay]').open = true;
});

//event listener to close the list overlay
document.querySelector('[data-list-close]').addEventListener('click', () => {
    document.querySelector('[data-list-active]').open = false;
});

//event listener for the settings form submitting
document.querySelector('[data-settings-form]').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const { theme } = Object.fromEntries(formData);

    if (theme === 'night') {
        document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
        document.documentElement.style.setProperty('--color-light', '10, 10, 20');
    } else {
        document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
        document.documentElement.style.setProperty('--color-light', '255, 255, 255');
    }
    
    document.querySelector('[data-settings-overlay]').open = false;
})

//event listener for the search submission
document.querySelector('[data-search-form]').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const filters = Object.fromEntries(formData);
    const result = [];

//create the filter logic for genre, author and title
    for (const book of books) {
        let genreMatch = filters.genre === 'any'

        for (const singleGenre of book.genres) {
            if (genreMatch) break;
            if (singleGenre === filters.genre) { genreMatch = true }
        }

        if (
            (filters.title.trim() === '' || book.title.toLowerCase().includes(filters.title.toLowerCase())) && 
            (filters.author === 'any' || book.author === filters.author) && 
            genreMatch
        ) {
            result.push(book)
        }
    }
//resets the first page and pulls the results
    page = 1;
    matches = result
//shows or hide the message if no results are found
    if (result.length < 1) {
        document.querySelector('[data-list-message]').classList.add('list__message_show')
    } else {
        document.querySelector('[data-list-message]').classList.remove('list__message_show')
    }
//reset the innerhtml by clearing it
    document.querySelector('[data-list-items]').innerHTML = ''
    const newItems = document.createDocumentFragment();
//recreate the buttons for filtered books using the bookPreviewButton function
    result.slice(0, BOOKS_PER_PAGE).forEach(book => {
        newItems.appendChild(bookPreviewButton(book));
    });

    document.querySelector('[data-list-items]').appendChild(newItems)
    document.querySelector('[data-list-button]').disabled = (matches.length - (page * BOOKS_PER_PAGE)) < 1
//update the show more button based on the above search completing
    document.querySelector('[data-list-button]').innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${(matches.length - (page * BOOKS_PER_PAGE)) > 0 ? (matches.length - (page * BOOKS_PER_PAGE)) : 0})</span>
    `

    window.scrollTo({top: 0, behavior: 'smooth'});
    document.querySelector('[data-search-overlay]').open = false
})

document.querySelector('[data-list-button]').addEventListener('click', () => {
    const fragment = document.createDocumentFragment()
//update logic to use the function bookPreviewButton to create the buttons
matches.slice(page * BOOKS_PER_PAGE, (page + 1) * BOOKS_PER_PAGE).forEach(book => {
        fragment.appendChild(bookPreviewButton(book));
    });

    document.querySelector('[data-list-items]').appendChild(fragment)
    page += 1;
//update the show more button
    const remainingBooks = matches.length - (page * BOOKS_PER_PAGE);
    listButton.disabled = remainingBooks < 1;
    listButton.innerHTML = `
        <span>Show more</span>
        <span class="list__remaining"> (${remainingBooks > 0 ? remainingBooks : 0})</span>
    `;
});
//event listener for clicking on a book preview
document.querySelector('[data-list-items]').addEventListener('book-preview-click', (event) => {
    const bookId = event.detail.id;
    const active = books.find(book => book.id === bookId);
    //if an active book is found, populate all the details below in the overlay
    if (active) {
        document.querySelector('[data-list-active]').open = true
        document.querySelector('[data-list-blur]').src = active.image
        document.querySelector('[data-list-image]').src = active.image
        document.querySelector('[data-list-title]').innerText = active.title
        document.querySelector('[data-list-subtitle]').innerText = `${authors[active.author]} (${new Date(active.published).getFullYear()})`
        document.querySelector('[data-list-description]').innerText = active.description
    }
})