const btns = document.querySelectorAll('#btn')
const addingButtons = document.querySelectorAll('.adding')
const containers = document.querySelectorAll('.container')
const cart = document.querySelector('.cart')
const checkout = document.querySelector('.checkout')
const checkoutTest = document.querySelector('.checkout .items')
const img = document.querySelector('.empty')
const h3 = document.querySelector('.checkout h3')
const dialog = document.querySelector('#dialog');

const carbonNeutral = document.querySelector('.carbon-neutral')
const TotalPrice = document.querySelector('.total')
const confirmOrder = document.querySelector('.confirm-order')
const wholePrice = document.querySelector(".whole-price") 
let priceInt = 0;
let dialogItems;

btns.forEach(button => {
    button.addEventListener('click', () => {
        button.style.display = "none"
    });
});

let allItems = 0
const usedIds = []
addingButtons.forEach(addingButton => {
    const incrementer = addingButton.querySelector('.increment')
    const decrementer = addingButton.querySelector('.decrement')
    let iterator = 0
    incrementer.addEventListener('click', () => {
        //focused title and p 
        const tileTitle = document.querySelector(`.container${addingButton.id} h2`)
        const tilePrice = document.querySelector(`.container${addingButton.id} p`)

        
        iterator += 1;
        allItems += 1;

        const span = document.querySelector(`.span${addingButton.id}`)
        span.textContent = iterator;
        
        //cart content update
        cart.innerHTML = `Your Cart [${allItems}]`
        priceInt = tilePrice.innerText.slice(1,5)

        //span2
        FullPrice = Number(wholePrice.textContent)
        priceInt = Number(priceInt)

        FullPrice += Number(priceInt)
        wholePrice.textContent = FullPrice

        if(allItems >= 1){
            img.style.display = "none"
            h3.style.display = "none"
            carbonNeutral.style.display = "block"
            TotalPrice.style.display = "block"
            confirmOrder.style.display = "block"
        }

        //If product exists in cart we update existing
        if(usedIds.includes(addingButton.id)){
            //get existing item
            const existingItemTitle = document.querySelector(`#item${addingButton.id} h2`)
            const existingItemPrice = document.querySelector(`#item${addingButton.id} p`)

            //put new value to exsiting item
            existingItemTitle.textContent = tileTitle.innerText
            existingItemPrice.textContent = `${iterator}x @${priceInt} $${(iterator * priceInt).toFixed(2)}`;

            
        //If product dont exist we create one
        } else {
            //push id to existing ids 
            usedIds.push(addingButton.id);

            //we create new element
            let newItem = document.createElement('div');
            newItem.classList.add('original');
            newItem.id = `item${addingButton.id}`;

            let newTitle = document.createElement('h2');
            newTitle.textContent = tileTitle.innerText;

            let newPrice = document.createElement('p');
            newPrice.textContent = `${iterator}x @${priceInt} $${(iterator * priceInt).toFixed(2)}`;
            
            let newButton = document.createElement('button')
            newButton.classList.add(`item-button`)
            newButton.classList.add(`#item${addingButton.id}`)

            let newHr = document.createElement('hr')

            
            newButton.addEventListener('click', () => {
                console.log(newButton)
                checkoutTest.removeChild(newItem);
                allItems -= iterator;
                iterator = 0
                console.log(wholePrice)
                wholePrice.textContent = 0
                
                span.textContent = 0;
                usedIds.splice(usedIds.indexOf(addingButton.id), 1);
                cart.innerHTML = `Your Cart [${allItems}]`;

                if (allItems <= 0) {
                    img.style.display = "flex";
                    h3.style.display = "block";
                    carbonNeutral.style.display = "none"
                    TotalPrice.style.display = "none"
                    confirmOrder.style.display = "none"
                }
            })
      
    
            newItem.appendChild(newTitle)
            newItem.appendChild(newPrice)
            newItem.appendChild(newButton) 
            newItem.appendChild(newHr)
            checkoutTest.appendChild(newItem)
            
            dialogItems = newItem;
            dialogPrice = TotalPrice;
        }

    })
    
    decrementer.addEventListener('click', () => {
        if(iterator >= 0){
            iterator -= 1;
            allItems -= 1;

            const span = document.querySelector(`.span${addingButton.id}`)
            FullPrice = Number(wholePrice.textContent)
            priceInt = Number(priceInt)

            FullPrice -= Number(priceInt)
            wholePrice.textContent = FullPrice

            span.textContent = iterator;
            cart.innerHTML = `Your Cart [${allItems}]`
            if(wholePrice.textContent == 0) {
                carbonNeutral.style.display = "none"
                TotalPrice.style.display = "none"
                confirmOrder.style.display = "none"
                img.style.display = "flex"
                h3.style.display = "block"
                const itemToRemove = document.querySelector(`#item${addingButton.id}`)
                checkoutTest.removeChild(itemToRemove)
                usedIds.splice(usedIds.indexOf(addingButton.id), 1)
            }
        }
    })  
    //get all dynamically added buttons
    const deleteButtons = document.querySelectorAll('.item-button') 
    deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener('click', () => {

        })
    })
});

const showDialog = () => {
    checkoutTest.querySelectorAll('.original').forEach(item => {
        // Clone the item to prevent removing it from the checkout section
        const clonedItem = item.cloneNode(true);
        dialog.appendChild(clonedItem);
    });
    dialog.appendChild(dialogPrice);
    dialog.showModal();
}
