import "@babel/polyfill";
import "./index.html";
import "./style/index.scss";
import axios from "axios";
import { showModal } from "./modules/modal";
import { URL_ACCOUNT, URL_TRANSACTIONS } from "./modules/constants";
import { clearList } from "./modules/utils";
import { setCardValue } from "./modules/card";

const accountValue = document.querySelector(".account-value");
const transactionsList = document.querySelector(".transactions-list");
const formElement = document.getElementById("form-transaction");

const getAccountValue = async () => {
    let startAccount;
    try {
        const response = await axios.get(URL_ACCOUNT);
        startAccount = response.data.account;
        console.log(startAccount);
        return (accountValue.textContent = startAccount);
    } catch (error) {
        return error;
    }
};

const getTransactions = async () => {
    try {
        const response = await axios.get(URL_TRANSACTIONS);
        return response.data;
    } catch (error) {
        return error;
    }
};

const start = () => {
    getAccountValue();
    showModal();
    getTransactions().then((data) => {
        Object.values(data).forEach((element) => {
            console.log(element);
            setCardValue(element);
        });
    });
};

start();

const setTransaction = (type, description, amount) => {
    axios
        .post(URL_TRANSACTIONS, {
            type: type,
            description: description,
            amount: amount,
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
};

const updateList = async (type, description, amount) => {
    await setTransaction(type, description, amount);
    getTransactions().then((data) => {
        Object.values(data).forEach((element) => {
            setCardValue(element);
        });
    });
    setTimeout(() => {
        document.location.reload();
    }, 1000);

};

formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(formElement);
    const description = formData.get("description");
    const amount = formData.get("amount");
    const type = formData.get("type");
    clearList(transactionsList);
    updateList(type, description, amount);
});
