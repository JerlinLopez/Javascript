let calculation = '';
    function updateCalculation(number){
      calculation += number;
    displayCalculation();
    }

    function displayCalculation(){
   document.querySelector('.display-calculation').innerHTML = calculation;
    }