$(document).ready(initialize);

function initialize(){
  $('#ruleTitle').focus();
  $('#addRuleButton').click(addRule);
  $('#calculateRateButton').click(calculateRate);
}

function addRule(){
  // Get Values
  var ruleTitle = $('#ruleTitle').val();
  var ruleValue = parseInt($('#ruleValue').val());

  if(ruleTitle && ruleValue){
    // Add Row to Rules Table
    var $tr = $('<tr>');
    var $checkbox = $('<input type="checkbox">');
    var $title = $('<td class="tdTitle">');
    $title.text(ruleTitle);
    var $value = $('<td class="tdValue">');
    $value.text(ruleValue);
    $tr.append($checkbox, $title, $value);
    $('table').append($tr);
    // Remove any previous errors
    $('#left .error').addClass('hidden');

  } else {
    // error
    $('#left .error').text('Must enter a Title and a number for Change in Base Rate').removeClass('hidden');
  }

  // Clear Input and re-focus
  $('#ruleTitle').val('');
  $('#ruleValue').val('');
  $('#ruleTitle').focus();
}

function calculateRate() {
  var baseRate = parseInt($('#baseRate').val());
  if (baseRate){
    // Get Values
    var rate = new Rate(baseRate);
    var changeInRate = 0;

    // Loop through Rules that are checked
    var rules = $(':checked');
    rules.each(function(rate){
      var value = $(this).parent().find('.tdValue').text();
      value = parseInt(value);
      changeInRate += value;
    })

    // Update Rate
    if (changeInRate >= 0){
      rate.increaseRate(changeInRate);
    } else if (changeInRate < 0) {
      rate.decreaseRate(changeInRate);
    }

    // Update HTML
    $('#calculatedRate').val(formatDollar(rate.calculatedRate));
    $('#right .error').addClass('hidden');

  } else {
    // error
    $('#right .error').text('Must enter a number into base rate').removeClass('hidden');
  }
}

function formatDollar(value){
  return '$' + value + '/hr';
}

// Rate Object
function Rate(baseRate){
  this.baseRate = baseRate;
  this.calculatedRate = baseRate;
}

Rate.prototype.increaseRate = function(changeInRate){
  this.calculatedRate += changeInRate;
}

Rate.prototype.decreaseRate = function(changeInRate){
  this.calculatedRate += changeInRate;
}
