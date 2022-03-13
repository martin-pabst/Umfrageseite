document.cookie = "sessionkey=" + Math.floor(Math.random()*9999999);

var currentTab = 0; // Current tab is set to be the first tab (0)
var numberOfTabs = 0;
$(() => {
    numberOfTabs = $('.tab').length;
    for(let i = 0; i < numberOfTabs; i++){
        $('#circlediv').append($('<span class="step"></span>'));
    }
    showTab(currentTab); // Display the current tab
    $(':radio').on('change', () => {validateForm()})
})

function showTab(n) {
    // This function will display the specified tab of the form ...
    var x = document.getElementsByClassName("tab");
    x[n].style.display = "block";
    // ... and fix the Previous/Next buttons:
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    let $nextButton = $('#nextBtn');
    if (n == (x.length - 1)) {
        $nextButton.text("Abschicken");
        $nextButton.removeClass('btn-primary').addClass('btn-success');
    } else {
        $nextButton.text("Weiter");
        $nextButton.addClass('btn-primary').removeClass('btn-success');
    }
    // ... and run a function that displays the correct step indicator:
    fixStepIndicator(n)
    $('#nextBtn').prop("disabled", true);
    validateForm();
}

function nextPrev(n) {
    // This function will figure out which tab to display
    var x = document.getElementsByClassName("tab");
    // Exit the function if any field in the current tab is invalid:
    if (n == 1 && !validateForm()) return false;
    // Hide the current tab:
    x[currentTab].style.display = "none";
    // Increase or decrease the current tab by 1:
    currentTab = currentTab + n;
    // if you have reached the end of the form... :
    if (currentTab >= x.length) {
        //...the form gets submitted:
        document.getElementById("regForm").submit();
        return false;
    }
    // Otherwise, display the correct tab:
    showTab(currentTab);
}

function validateForm() {
    // This function deals with validation of the form fields
    let valid = true;
    let x = document.getElementsByClassName("tab");

    let $tab = $(x[currentTab]);

    let $radiogroups = $tab.find(".radiogroup");

    $radiogroups.each((index, radiogroup) => {

        let $radiogroup = $(radiogroup);
        let $radioButtons = $radiogroup.find(":radio");

        if($radioButtons.length > 0){
            let checkedButtonFound = false;
            $radioButtons.each((index, element) => {
                if($(element).is(":checked")){
                    checkedButtonFound = true;
                }
            })
            if(checkedButtonFound){
                $radiogroup.removeClass("invalid");
            } else {
                $radiogroup.addClass("invalid");
                valid = false;
            } 
        }

    })

    // If the valid status is true, mark the step as finished and valid:
    if (valid) {
        $(document.getElementsByClassName("step")[currentTab]).addClass("finish");
    } else {
        $(document.getElementsByClassName("step")[currentTab]).removeClass("finish");
    }
    $('#nextBtn').prop("disabled", !valid);
    return valid; // return the valid status
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class to the current step:
    x[n].className += " active";
}