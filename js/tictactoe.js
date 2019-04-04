let playerOne = []; //created an empty array for each player to push IDs of their clicked boxes
let playerTwo = [];
let playerOneTurn = true;
/*  3X3 Board (Easy Level)
                          |           |
                    1     |     2     |     3
                          |           |
                __________|___________|_____________
                          |           |
                    4     |     5     |     6
                __________|___________|_____________
                          |           |
                    7     |     8     |      9
                          |           |

You win if you have one of the following combos: 123 || 456 || 789 || 159 || 357 || 147 || 258 || 369
*/
const findPlayerWon = function(player) {
  return ((player.includes("one") && player.includes("two") && player.includes("three")) ||
          (player.includes("four") && player.includes("five") && player.includes("six")) ||
          (player.includes("seven") && player.includes("eight") && player.includes("nine")) ||
          (player.includes("one") && player.includes("four") && player.includes("seven")) ||
          (player.includes("two") && player.includes("five") && player.includes("eight")) ||
          (player.includes("three") && player.includes("six") && player.includes("nine")) ||
          (player.includes("one") && player.includes("five") && player.includes("nine")) ||
          (player.includes("three") && player.includes("five") && player.includes("seven")));
};


let playTournament = false; //Logic to make the tournament rounds execute
let tournamentGames;
let playerOneWins;
let playerTwoWins;
let numberOfRounds = 0;

/*    4X4 Board (Hard Level)
                          |           |          |
                    1     |     2     |     3    |    4
                          |           |          |
                __________|___________|__________|__________
                          |           |          |
                    5     |     6     |     7    |    8
                __________|___________|__________|__________
                          |           |          |
                    9     |     10    |    11    |    12
                __________|___________|__________|__________
                          |           |          |
                    13    |     14    |    15    |    16
                          |           |          |

You win if you have one of the following combos: 1234 || 5678 || 9 10 11 12 || 13 14 15 16 ||
  1 5 9 13 || 2 6 10 14 || 3 7 11 15 || 4 8 12 16 || 1 6 11 16 || 4 7 10 13
*/

const findHardPlayerWon = function(player) {
  return ((player.includes("1") && player.includes("2") && player.includes("3") &&    player.includes("4")) ||
          (player.includes("5") && player.includes("6") && player.includes("7") && player.includes("8")) ||
          (player.includes("9") && player.includes("10") && player.includes("11") && player.includes("12")) ||
          (player.includes("13") && player.includes("14") && player.includes("15") && player.includes("16")) ||
          (player.includes("1") && player.includes("5") && player.includes("9") && player.includes("13")) ||
          (player.includes("2") && player.includes("6") && player.includes("10") && player.includes("14")) ||
          (player.includes("3") && player.includes("7") && player.includes("11") && player.includes("15")) ||
          (player.includes("4") && player.includes("8") && player.includes("12") && player.includes("16")) ||
          (player.includes("1") && player.includes("6") && player.includes("11") && player.includes("16")) ||
          (player.includes("4") && player.includes("7") && player.includes("10") && player.includes("13")));
};
