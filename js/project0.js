const $p1 = $('<p>');
const $p2 = $('<p>');
const $p3 = $('<p>'); //created new p elements for the DOM to display scores and winner

$(document).ready(function () {

  //created a function to choose game level
  const chooseLevel = function () {
    $('#hard-board').hide();
    //$('#celebration').hide();
    $('.message').html('Choose your Level:').css('color', '#3C3C3D'); //options for the player
    $p1.html('Easy').css({'color': '#FA316B', 'border': 'none'});
    $('.message').append($p1);
    $p2.html('Hard').css({'color': '#7cb360', 'border': 'none'});
    $('.message').append($p2);

    //created on click function for selecting "easy" level (3x3 board)
    $p1.on('click', function () {
      $('.message').html(`Choose Game:`); //two types of rounds to choose from
      $p1.html('Single Round').css('color', '#FA316B');
      $('.message').append($p1);
      $p2.html('Tournament').css('color', '#7cb360');
      $('.message').append($p2);

      $('.box').on('click', playGame); // calling the function for 3x3 board boxes on click

      //created on click function for selecting "single round" game for 3x3 board
      $p1.on('click', function () {
        $('.message').html(`Let's Play!`);
        $p1.html('');
        $p2.html('');
        $('#board').css('visibility', 'visible'); //make 3x3 board visible for the players to play
        if (playerOneTurn) {
          $p3.addClass('blinking');
          $p3.html('Player 1 Turn').css('color', '#FA316B'); //display player 1 turn
          $('.message').append($p3);
        }
      });

      //created on click function for selecting "tournament round" game for 3x3 board
      $p2.on('click', function () {
        //prompt message for the player
        tournamentGames = prompt("Please enter the number of rounds you would like to play");
        $('#board').css('visibility', 'visible'); //make 3x3 board visible for the players to play
        startTournament(); //go to tournament function
      });

    });

    //created on click function for selecting "hard" level (4x4 board)
    $p2.on('click', function () {
      $('.message').html(`Choose Game:`); //Again two types of rounds in the 'hard level' too
      $p1.html('Single Round').css('color', '#FA316B');
      $('.message').append($p1);
      $p2.html('Tournament').css('color', '#7cb360');
      $('.message').append($p2);

      const makeBoard = function () { //function to make 4x4 board on selection of 'hard level'
        const rowstart = '<tr>';
        const rowend = '</tr>';
        const cell = '<td></td>';
        const boardsize = 4;
        let boardrow = rowstart;

        for (let i = 0; i < boardsize; i++) {
          boardrow += cell;
        }

        boardrow += rowend;

        for (let c = 0; c < boardsize; c++) {
          $('#hard-board').append(boardrow);
        }
        $('#hard-board td').addClass('box-hard'); //adding class to 4x4 board

        $('#hard-board td').each( function (index) {
          $(this).attr('id', index+1); //adding individual IDs to each 4x4 board box
        });
      };

      makeBoard(); //calling the function to make 4x4 board on selection of 'hard level'

      $('.box-hard').on('click', playGameHard); // calling the function 4x4 board boxes on click

      //created on click function for selecting "single round" game for 4x4 board
      $p1.on('click', function () {
        $('#board').hide(); //hide 3x3 board as 4x4 board has been selected to play
        $('.message').html(`Let's Play!`);
        $p1.html('');
        $p2.html('');
        $('#hard-board').show(); //show the 4x4 board for the players to play
        if (playerOneTurn) {
          $p3.addClass('blinking');
          $p3.html('Player 1 Turn').css('color', '#FA316B'); //display player 1 turn
          $('.message').append($p3);
        }
      });

      //created on click function for selecting "tournament round" game for 4x4 board
      $p2.on('click', function () {
        tournamentGames = prompt("Please enter the number of rounds you would like to play");
        //prompt message for the player
        $('#board').hide(); //hide 3x3 board as 4x4 board has been selected to play
        $('#hard-board').show(); //show 4x4 board
        startTournament();  //go to tournament function
      });
    });
  };

  //calling choose level function as soon as the page loads
  chooseLevel();

  //---------------------------------------------------------------------------

  //Created a function to be called whenever a 3x3 board boxes are being clicked
  const playGame = function () {
    if (playerOneTurn) {
      const $imageOne = $('<img>');
      $imageOne.attr('src','images/sm_5b0db20a1016b.png'); //creating a new image and setting it to 'heart' - default for player one
      $(this).append($imageOne); //heart image being displayed on player one click
      playerOne.push($(this).attr("id"));
      playerOneTurn = false;
      $p3.addClass('blinking');
      $p3.html('Player 2 Turn').css('color', '#7cb360'); //display player 2 turn
      $('.message').append($p3);
    } else {
      const $imageTwo = $('<img>');
      $imageTwo.attr('src','images/2220251-200.png'); //creating a new image and setting it to 'arrow' - default for player two
      $(this).append($imageTwo); //arrow image being displayed on player two click
      playerTwo.push($(this).attr("id"));
      playerOneTurn = true;
      $p3.addClass('blinking');
      $p3.html('Player 1 Turn').css('color', '#FA316B'); //display player 1 turn
      $('.message').append($p3);
    }

    $(this).off('click'); //Turning off the CLICK on the already clicked box of 3x3 board

    //Calling this function from js file to check which player has met atleast one of the winning conditions
    const heart = findPlayerWon(playerOne); //assigning the value of the function to a variable to do some condition check later
    const arrow = findPlayerWon(playerTwo); //same

    if (heart===true) { //if player one has won then turn off the click listener on the boxes
      playerOneWins++;
      $p3.html('');
      $('.box').off('click'); //turning off onClick function once the game results are out
      $('.message').html('Player One Wins!').show(); //display game result if player 1 won
      $('.message').css('color', '#FA316B');
      checkAndContinueTournament(); //incase of a tournament will got to the next round
      $('#board').css('opacity','0.3');
    }
    else if (arrow===true) { //if player two has won then turn off the click listener on the boxes
      playerTwoWins++;
      $p3.html('');
      $('.box').off('click'); //turning off onClick function once the game results are out
      $('.message').html('Player Two Wins!').show(); //display game result if player 2 won
      $('.message').css('color', '#7cb360');
      checkAndContinueTournament(); //incase of a tournament will got to the next round
      $('#board').css('opacity','0.3');
    }
    else if ((playerTwo.length === 4 && playerOne.length === 5) || (playerTwo.length === 5 && playerOne.length === 4)) { //player who starts first that's player one gets 5 out of 9 chances
    if (heart!==true && arrow!==true) { //if all boxes have been clicked and neither player one nor player two have met any of the winning conditions then the game is a draw
      $p3.html('');
      $('.box').off('click'); //turning off onClick function once the game results are out
      $('.message').html('Game Draw').show(); //display game result if game is a draw
      $('.message').css('color', '#3C3C3D');
      checkAndContinueTournament(); //incase of a tournament will got to the next round
      $('#board').css('opacity','0.3');
    }
  }
};

//-----------------------------------------------------------------------------

//Created a function to be called whenever a 4x4 board box is being clicked
const playGameHard = function () {
  if (playerOneTurn) {
    const $imageOne = $('<img>');
    $imageOne.attr('src','images/clipart-doughnut-1.png'); //creating a new image and setting it to 'doughnut' - default for player one
    $(this).append($imageOne); //doughnut image being displayed on player one click
    playerOne.push($(this).attr("id"));
    playerOneTurn = false;
    $p3.addClass('blinking');
    $p3.html('Player 2 Turn').css('color', '#7cb360'); //display player 2 turn
    $('.message').append($p3);
  } else {
    const $imageTwo = $('<img>');
    $imageTwo.attr('src','images/d0706822863a96ee2b2c657b6e0bb038.png'); //creating a new image and setting it to 'icecream' - default for player two
    $imageTwo.addClass('icon');
    $(this).append($imageTwo); //icecream image being displayed on player two click
    playerTwo.push($(this).attr("id"));
    playerOneTurn = true;
    $p3.addClass('blinking');
    $p3.html('Player 1 Turn').css('color', '#FA316B'); //display player 1 turn
    $('.message').append($p3);
  }

  $(this).off('click'); //Turning off the CLICK on the already clicked button

  //Calling this function from js file to check which player has met atleast one of the winning conditions
  const doughnut = findHardPlayerWon(playerOne); //assigning the value of the function to a variable to do some condition check later
  const icecream = findHardPlayerWon(playerTwo); //same as player one

  if (doughnut===true) { //if player one has won then turn off the click listener on the boxes
    playerOneWins++;
    $p3.html('');
    $('.box-hard').off('click'); //turning off onClick function once the game results are out
    $('.message').html('Player One Wins!').show(); //display result if player 1 won
    $('.message').css('color', '#FA316B');
    checkAndContinueTournament(); //incase of a tournament will got to the next round
    $('#hard-board').css('opacity','0.3');
  }
  else if (icecream===true) { //if player two has won then turn off the click listener on the boxes
    playerTwoWins++;
    $p3.html('');
    $('.box-hard').off('click'); //turning off onClick function once the game results are out
    $('.message').html('Player Two Wins!').show(); //displayer result if player 2 won
    $('.message').css('color', '#7cb360');
    checkAndContinueTournament(); //incase of a tournament will got to the next round
    $('#hard-board').css('opacity','0.3');
  }
  else if (playerTwo.length === 8 && playerOne.length === 8) { //each player gets 8 chances to play
  if (doughnut!==true && icecream!==true) { //if all boxes have been clicked and neither player one nor player two have met any of the winning conditions then the game is a draw
    $p3.html('');
    $('.box-hard').off('click');  //turning off onClick function once the game results are out
    $('.message').html('Game Draw').show(); //display result if game draw
    $('.message').css('color', '#3C3C3D');
    checkAndContinueTournament(); //incase of a tournament will got to the next round
    $('#hard-board').css('opacity','0.3');
  }
}
};

//-------------------------------------------------------------------

//created function for the tournament
const startTournament = function () { //will execute for the 1st round of the tournament
  numberOfRounds++;
  //tournamentGames = 3;
  playTournament = true;
  playerOneWins = 0;
  playerTwoWins = 0;
  $('.message').html(`Round ${numberOfRounds}`);
  $p1.html(`Player I (${playerOneWins}) || Player II (${playerTwoWins})`).css({'color': '#bd5d4a', 'border': '2px solid white'}); //score table
  $('.message').append($p1);
  $('button').off('click', resetButton); //turning off reset button till the end of the tournament
  if (playerOneTurn) {
    $p3.addClass('blinking');
    $p3.html('Player 1 Turn').css('color', '#FA316B');  //display player 1 turn
    $('.message').append($p3);
  }
};

const checkAndContinueTournament = function() { //this function is called inside both playGame & playGameHard functions if tournament is being played
  if (!playTournament) {
    return;
  }

  tournamentGames--;

  if (tournamentGames > 0) { //tournamnet will be continued till al the rounds (input from player) hav ebeen played
    setTimeout(tournamentRounds, 2000); //this function will execute after 2s (as in will go to the next round once the current round results are displayed on the screen)
  } else if (tournamentGames === 0) {
    setTimeout(tournamentResult, 2000); //this function will execute after 2s (as in will go to the final results once the current round results are displayed on the screen)
  }
  else {
    $('button').on('click', resetButton); //turning on the button once tournamnet is over
  }
};

const tournamentRounds = function() { //will execute in every round after the 1st round
  playerOne=[];
  playerTwo=[];
  $p1.html('');
  $p2.html('');
  $('#board').css('opacity','1');
  $('#hard-board').css('opacity','1');
  playerOneTurn = true;
  numberOfRounds++;
  $('.message').html(`Round ${numberOfRounds}`).css('color','#3C3C3D');
  $p1.html(`Player I (${playerOneWins}) || Player II (${playerTwoWins})`).css({'color': '#bd5d4a', 'border': '2px solid white'}); //score table
  $('.message').append($p1);
  if (playerOneTurn) {
    $p3.addClass('blinking');
    $p3.html('Player 1 Turn').css('color', '#FA316B'); //display player 1 turn
    $('.message').append($p3);
  }
  $('.box img').remove(); //remove all the images from 3x3 board once tournament over
  $('.box-hard img').remove();  //remove all the images from 4x4 board once tournamnet over
  $('.box').on('click', playGame);
  $('.box-hard').on('click', playGameHard);
};


const tournamentResult = function () { //displays final results of the tournamnet
  numberOfRounds = 0;
  $('.box').off('click', playGame);
  $('.box-hard').off('click', playGameHard);
  $('.message').html(`Results`).css('color','#3C3C3D');
  $('button').on('click', resetButton);
  if (playerOneWins > playerTwoWins) {
    $p1.html(`Tournament Winner Player I`).css({'color': '#FA316B', 'border': 'none'});
    $('.message').append($p1);
    $p2.html(`Player I (${playerOneWins}) || Player II (${playerTwoWins})`).css({'color': '#bd5d4a', 'border': '2px solid white'});
    $('.message').append($p2);
  } else if (playerTwoWins > playerOneWins) {
    $p2.html('Tournament Winner Player II').css(
      {'color': '#7cb360', 'border': 'none'});
      $('.message').append($p2);
      $p1.html(`Player II (${playerTwoWins}) || Player I (${playerOneWins})`).css({'color': '#bd5d4a', 'border': '2px solid white'});
      $('.message').append($p1);
    } else {
      $p2.html('Tournament Draw').css(
        {'color': 'white', 'border': 'none'});
        $('.message').append($p2);
        $p1.html(`Player I (${playerOneWins}) || Player II (${playerTwoWins})`).css(
          {'color': '#bd5d4a', 'border': '2px solid white'});
          $('.message').append($p1);
        }
      };

  //---------------------------------------------------------------------------

  const resetButton = function() {
    playerOne=[];
    playerTwo=[];
    $('#board').css('opacity','1');
    $('#hard-board').css('opacity','1');
    playerOneTurn = true;
    $('.message').html('');
    $p1.html('');
    $p2.html('');
    $('.box img').remove();
    $('.box-hard img').remove();
    $('#board').show();
    $('#board').css('visibility','hidden');
    $('#hard-board').empty();
    chooseLevel();
  };
  //added a click event listener to the button so that it restarts the game
  $('button').on('click', resetButton);

});
