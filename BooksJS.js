const buttonBuy = document.querySelector('.button_buy');
const buttonTextBuy = document.querySelector('.button-p');
const buttonBuyCart = document.querySelector('.button-p-buy');

let count = document.querySelector('.header-svg-count');
let buyBooks = [];

buttonBuy.addEventListener('click', getBook);

// счетчик корзины и смена кнопки

function getBook() {
    saveBuyBooks();

    buttonTextBuy.addEventListener('click', replaceText);

    function replaceText() {
        if(buttonTextBuy) {
            buttonBuyCart.className = 'button-p';
            buttonTextBuy.className = 'button-p-buy';
        }

        let result = Number(count.innerHTML) + 1;

        if (result = 1) {
            count.innerHTML = result;
        }

        buyBooks.push(result);
    }

    buttonBuyCart.addEventListener('click', replaceTextAgain);

    function replaceTextAgain() {
        if (buttonBuyCart) {
            buttonBuyCart.className = 'button-p-buy';
            buttonTextBuy.className = 'button-p';

            let res = Number(count.innerHTML) - 1;

            if (res >= 0) {
                count.innerHTML = res;
            }

            buyBooks.pop(res);
        }
    }
}

function saveBuyBooks() {
    localStorage.setItem('buyBooks', JSON.stringify(buyBooks));
}