(() => {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
        form.addEventListener('click', event => {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }

            form.classList.add('was-validated')
        }, false)
    })
})()

document.addEventListener('DOMContentLoaded', function () {
    const tipButtons = document.querySelectorAll('.but');
    const customTip = document.getElementById('custom');
    const billAmount = document.getElementById('bill');
    const numPeople = document.getElementById('number');
    const tipAmount = document.getElementById('tipAmount');
    const totalAmount = document.getElementById('total');
    const resetButton = document.getElementById('resetBtn');

    let selectedTip = 0;

    // Tip button selection
    tipButtons.forEach(button => {
        button.addEventListener('click', function () {

            // Remove active class from all buttons
            tipButtons.forEach(btn => btn.classList.remove('active'));

            // Add active class to clicked button
            this.classList.add('active');

            // Get the tip percentage
            selectedTip = parseInt(this.getAttribute('data-percent'));

            // Clear custom tip input
            customTip.value = '';

            // Calculate tip
            calculateTip();
        });
    });

    // Custom tip input
    customTip.addEventListener('input', function () {
        
        // Remove active class from all buttons
        tipButtons.forEach(btn => btn.classList.remove('active'));

        // Get custom tip value
        selectedTip = parseInt(this.value) || 0;

        // Calculate tip
        calculateTip();
    });

    // Calculate tip when bill amount or number of people changes
    billAmount.addEventListener('input', calculateTip);
    numPeople.addEventListener('input', calculateTip);

    // Calculate tip function
    function calculateTip() {
        const bill = parseFloat(billAmount.value) || 0;
        const people = parseInt(numPeople.value) || 1;

        if (bill > 0 && selectedTip >= 0) {
            const tipValue = (bill * selectedTip) / 100;
            const total = bill + tipValue;
            const tipPerPerson = tipValue / people;
            const totalPerPerson = total / people;

            tipAmount.textContent = `$${tipPerPerson.toFixed(2)}`;
            totalAmount.textContent = `$${totalPerPerson.toFixed(2)}`;
        } else {
            tipAmount.textContent = '$0.00';
            totalAmount.textContent = '$0.00';
        }
    }

    // Reset button
    resetButton.addEventListener('click', function () {
        billAmount.value = '';
        numPeople.value = '';
        customTip.value = '';
        tipButtons.forEach(btn => btn.classList.remove('active'));
        selectedTip = 0;
        tipAmount.textContent = '$0.00';
        totalAmount.textContent = '$0.00';
    });
});