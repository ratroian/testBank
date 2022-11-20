const closeButtons = modal.querySelectorAll(".button");
const newOperationButton = document.querySelector("#new-operation");
const modalBlock = document.querySelector("#modal");

const closeModal = () => {
    closeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            modal.style.display = "none";
        });
    });
};

export const showModal = () => {
    newOperationButton.addEventListener("click", () => {
        modalBlock.style.display = "flex";
    });
    closeModal();
};