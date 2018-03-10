var MatchGame = {};
var turns = 0;
/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready(function() {
  MatchGame.newGame();
  $('.restartBtn').click(function(){
    MatchGame.newGame();
  })
})
/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var ordered_numbers = [];
  var random_numbers = [];

  for(var i = 0; i < 8; i++) {
    ordered_numbers.push(i + 1);
    ordered_numbers.push(i + 1);
  }

  while(ordered_numbers && ordered_numbers.length) {
    var rand_int = Math.floor(Math.random() * Math.floor(ordered_numbers.length));

    random_numbers.push(ordered_numbers[rand_int]);
    ordered_numbers.splice(rand_int, 1);
  }
  return random_numbers;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  $game.html("");
  $game.data('flippedCards', []);
  var colors = ["hsl(25, 85%, 65%)", "hsl(55, 85%, 65%)", "hsl(90, 85%, 65%)",
  "hsl(160, 85%, 65%)", "hsl(220, 85%, 65%)", "hsl(265, 85%, 65%)", "hsl(310, 85%, 65%)", "hsl(360, 85%, 65%)"];

  for(var i = 0; i < cardValues.length; i++) {
    var value = cardValues[i];
    var color = colors[value - 1];
    var data = {
      value: value,
      color: color,
      isFlipped: false
    };

    var $cardElement = $('<div class="col-3 card"></div>');
    $cardElement.data(data);
    $game.append($cardElement);
  }
$(".card").click(function() {
  MatchGame.flipCard($(this), $('.game'));
});
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if($card.data('isFlipped')) {
    return;
  }
  $card.css('background-color', $card.data('color'))
      .text($card.data('value'))
      .data('isFlipped', true);

      var flippedCards = $game.data('flippedCards');
      flippedCards.push($card);

    if (flippedCards.length === 2) {
      turns += 1;
      $("#turnCount").html("Turns: " + turns);
      if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
        var matchCss = {
          backgroundColor: 'rgb(153, 153, 153)',
          color: 'rgb(204, 204, 204)'
        };
        flippedCards[0].css(matchCss);
        flippedCards[1].css(matchCss);
      } else {
        var card1 = flippedCards[0];
        var card2 = flippedCards[1];
        window.setTimeout(function() {
          card1.css('background-color', 'rgb(32, 64, 86)')
              .text('')
              .data('isFlipped', false);
              card2.css('background-color', 'rgb(32, 64, 86)')
              .text('')
              .data('isFlipped', false);
            }, 350);
          }
          $game.data('flippedCards', []);
  }
};

/* Begins a new game */

MatchGame.newGame = function(){
  var $game = $('.game');
  var values = MatchGame.generateCardValues();
  turns = 0;
  $("#turnCount").html("Turns: 0");
  MatchGame.renderCards(values, $game);
}
