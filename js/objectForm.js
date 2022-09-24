"use strict";

void function () {

    const Form = {
        formSelector: null,
        formElement: null,

        searchInputs() {
            const selector = 'input:not([type="checkbox"]), textarea, select, [type="checkbox"]:checked';
            const data = this.formElement.querySelectorAll(selector);
            return Array.from(data);

        },

        submitHandler(event) {
            event.preventDefault();

            const data = this.searchInputs()
                .reduce((acc, input) => {
                acc[input.name] = input.value;
                return acc;
            }, {});

            this.setData(data)
        },

        setData(data) {
            localStorage.setItem(this.formSelector, JSON.stringify(data));
        },

        getData() {
           return localStorage.getItem(this.formSelector);
        },

        loadHandler() {

            const unparsedData = this.getData();
            if(!unparsedData) return;

            const data = JSON.parse(unparsedData);
            this.searchInputs(this.formElement).forEach(input => input.value = data[input.name]);

        },

        setEvents() {
            this.submitHandler = this.submitHandler.bind(this);
            this.formElement.addEventListener("submit", this.submitHandler);
            document.addEventListener("DOMContentLoaded", this.loadHandler.bind(this));
        },

        init(formSelector = null) {

            if(typeof(formSelector) !== "string") throw new Error("Invalid form selector");
            if(formSelector.trim() === 0) throw new Error("Selector is empty");

            this.formSelector = formSelector;

            const form = document.querySelector(this.formSelector);

            if( !(form instanceof HTMLFormElement) ) throw new Error("Form was not found")

            this.formElement = form;
            this.setEvents();

        }

    };

Form.init("#todoForm");

}();
