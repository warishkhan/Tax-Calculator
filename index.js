
document.getElementById('taxForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default form submission behavior
    
    // Reset error messages
    resetErrors();

    // Get input values
    const grossIncome = parseFloat(document.getElementById('grossIncome').value);
    const extraIncome = parseFloat(document.getElementById('extraIncome').value) || 0;
    const deductions = parseFloat(document.getElementById('deductions').value) || 0;
    const age = parseFloat(document.getElementById('age').value);

    // Validate inputs
    let isValid = true;
    if (isNaN(grossIncome) || grossIncome < 0) {
        showError('grossIncomeError', 'Invalid gross income');
        isValid = false;
    }
    if (isNaN(extraIncome) || extraIncome < 0) {
        showError('extraIncomeError', 'Invalid extra income');
        isValid = false;
    }
    if (isNaN(deductions) || deductions < 0) {
        showError('deductionsError', 'Invalid deductions');
        isValid = false;
    }
    if (isNaN(age) || age < 0) {
        showError('ageError', 'Please enter a valid age');
        isValid = false;
    }

    if (isValid) {
        // Calculate tax
        let taxableIncome = grossIncome + extraIncome - deductions;
        let taxAmount = 0;

        if (taxableIncome <= 800000) {
            // No tax if income is under 8 Lakhs
            taxAmount = 0;
        } else {
            // Tax calculation for income over 8 Lakhs
            taxableIncome -= 800000;
            if (age < 40) {
                taxAmount = taxableIncome * 0.3;
            } else if (age >= 40 && age < 60) {
                taxAmount = taxableIncome * 0.4;
            } else {
                taxAmount = taxableIncome * 0.1;
            }
        }

        // Display result in modal
        const modal = document.getElementById('modal');
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `<h2>Your overall income will be</h2> <h4>${taxAmount.toFixed(2)}</h4> <h6>after tax deductions</h6>`;
        modal.style.display = 'block';

        // Close modal when close button is clicked
        document.getElementsByClassName('close')[0].addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
});

function showError(elementId, errorMessage) {
    document.getElementById(elementId).style.display = 'inline'; // Display the error icon
    document.getElementById(elementId).title = errorMessage; // Display the error message in tooltip
}

function resetErrors() {
    const errorIcons = document.querySelectorAll('.error-icon');
    errorIcons.forEach(icon => icon.style.display = 'none'); // Hide all error icons
}
