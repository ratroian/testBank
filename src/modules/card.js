const transactionsList = document.querySelector(".transactions-list");
const templateTransaction = document.querySelector("#card-template");

export const setCardValue = (element) => {
    const clone = templateTransaction.content.cloneNode(true);
    const date = clone.querySelector(".card__date");
    const descriptionCard = clone.querySelector(".card__description");
    const valueCard = clone.querySelector(".card__value");

    date.textContent = element.date;
    descriptionCard.textContent = element.description;
    valueCard.textContent = element.amount;
    transactionsList.appendChild(clone);
};
