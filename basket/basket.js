'use strict';

const baskEl = document.querySelector('.cartIconWrap > span');
const baskListEl = document.querySelector('.basket');
const cartBasket = document.querySelector('div.basketTotal');

document.querySelector('.featuredItems').addEventListener('click', event => {
    if (event.target.classList.contains('addCart')) {

        const dataEl = event.target.parentNode.parentNode.parentNode.dataset;
        if (!cartBasket.querySelector(`[id=\'${dataEl.id}\']`)) {
            addCartBasket(dataEl.id, dataEl.name, dataEl.price);
            ++baskEl.textContent;
            updateTotalPrice();
        } else {
            incCard(dataEl.id);
        };
    };
});

document.querySelector('.basket').addEventListener('click', event => {
    if (event.target.classList.contains('basketIncEl')) {
        incCard(event.target.parentNode.parentNode.id);
    };
    if (event.target.classList.contains('basketDescEl')) {
        descCard(event.target.parentNode.parentNode.id);
    };
});


function updateTotalPrice() {
    const totalPrice = document.querySelector('span.basketTotalValue');
    let total = 0;
    cartBasket.querySelectorAll('.basketRow').forEach(el => {
        total += +el.querySelector('.summ').textContent;
    });
    totalPrice.textContent = total;
}


function incCard(id) {
    const cart = cartBasket.querySelector(`[id=\'${id}\']`);
    ++baskEl.textContent;
    ++cart.querySelector('.count').textContent;
    cart.querySelector('.summ').textContent =
        cart.querySelector('.count').textContent *
        cart.querySelector('.price').textContent;
    updateTotalPrice();
}

function descCard(id) {
    const cart = cartBasket.querySelector(`[id=\'${id}\']`);
    --baskEl.textContent;
    if (+cart.querySelector('.count').textContent === 1) {
        cart.remove();
    } else {
        --cart.querySelector('.count').textContent;
        cart.querySelector('.summ').textContent =
            cart.querySelector('.count').textContent *
            cart.querySelector('.price').textContent;
    }
    updateTotalPrice()
}

function addCartBasket(id, name, price) {
    const cartToBasket = `<div class="basketRow" id='${id}'>\
    <div class="name">${name}</div>\
    <div class="count">1</div>\
    <div class="price">${price}</div>\
    <div class="summ">${price}</div>\
    <div class="countSel">\
        <div class="countSelEl basketIncEl">+</div>\
        <div class="countSelEl basketDescEl">-</div>\
    </div>\
    </div>`;
    cartBasket.insertAdjacentHTML('afterbegin', cartToBasket);
};

document.querySelector('.cartIconWrap').addEventListener('click', event => {
    if (baskListEl.classList.contains('hidden')) {
        baskListEl.classList.remove('hidden');
    } else {
        baskListEl.classList.add('hidden');
    };
});

