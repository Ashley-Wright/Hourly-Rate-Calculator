$(document).ready(initialize);

function initialize(){
  $('#addRuleButton').click(addRule);
}

function addRule(){
  // Get Values
  var ruleTitle = $('#ruleTitle').val();
  var ruleValue = parseInt($('#ruleValue').val());

  // Add Row to Rules Table
  var $tr = $('<tr>');
  var $checkbox = $('<input type="checkbox">');
  var $title = $('<td class="tdTitle">');
  $title.text(ruleTitle);
  var $value = $('<td class="tdValue">');
  $value.text(ruleValue);
  $tr.append($checkbox, $title, $value);
  $('table').append($tr);
}
