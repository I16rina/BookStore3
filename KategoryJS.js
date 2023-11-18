// переключение категорий

function switchCategory() {
    const Category = document.querySelectorAll('.section-nav-a');

    Category.forEach(item => {
        item.addEventListener('click', () => {
            removeActiveCategory();
            item.classList.add('active');
            nextLoadCat = item.innerHTML;
            
            if (nextLoadCat && nextLoadCat !== currentCategory) {
                currentCategory = nextLoadCat;
                fetchBook(currentCategory);
                startIndex = 0;

                // fetchBook(currentCategory);
            }            
        });
    });
}

function removeActiveCategory() {
    document.querySelector('.section-nav-a.active').classList.remove('active')
}

// switchCategory();

// API    
const category = document.querySelectorAll('.section-nav-a');
const bookDiv = document.querySelector('.section-books');

let nextLoadCat;
const apiKey = 'AIzaSyCUNVqBXn0JOvvj9vDPWXeEkUUpuSTsuRo'; 
let startIndex = 0; 
const maxResults = 6; 
let currentCategory = 'Architecture';

function fetchBook(currentCategory) {
    const url = `https://www.googleapis.com/books/v1/volumes?q="subject:${currentCategory}"&key=${apiKey}&printType=books&startIndex=${startIndex}&maxResults=${maxResults}&langRestrict=en`

    fetch (url)
    .then (response => response.json())
    .then(data => {
        console.log(data);
        const bookDiv = document.querySelector('.section-books');
        data.items.forEach(book => {
            bookDiv.innerHTML += `
            <div class="books">
                <img class="div-cover" src="${book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : ''}">
                <p class="div-autor">${book.volumeInfo.authors.join(', ')}</p>
                <p>${book.volumeInfo.averageRating ? book.volumeInfo.averageRating : ' '}</p>
                <p class="div-name">${book.volumeInfo.title}</p>
                <p class="div-description">${book.volumeInfo.description ? book.volumeInfo.description.slice(0, 110).concat('...') : ' '}</p>
                <p class="div-price">${book.volumeInfo.price ? book.volumeInfo.price : ' '}</p>
                <button class="button button_buy">
                    <p class="button-p">buy now</p>
                    <p class="button-p-buy">in the cart</p>
                </button>
            </div>
            `;
        })
    })
    .catch(error => console.error(error));
    switchCategory();
}

// кнопка 'показать еще'

let productsData = [];
let showBooks = maxResults;
let countBtnLoadMoreBooks = 1;

const LoadMoreButton = document.querySelector('.button-load');
LoadMoreButton.addEventListener('click', LoadMoreBooks);

function LoadMoreBooks() {
    if (showBooks >= productsData.length) return;

    countBtnLoadMoreBooks++;
    let countChowBooks = showBooks * countBtnLoadMoreBooks;
    console.log(countChowBooks);
}

LoadMoreBooks();

fetchBook(currentCategory);