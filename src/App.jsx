import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./components/winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = {
  X: "Player 1",
  O: "Player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

// συναρτηση που ελεγχει αν Χ ή Ο και δινει αρχικη τιμη το Χ
function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";
  //καθοριζει την σειρα των τρεχων παιχτη
  //αν ειναι χ θα γινει O αλλιως παραμενει Χ
  // στην αρχη ισχυει οτι currentplayer = x γιατι ο πινακας ειναι κενος
  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    //μαλλον ειναι [0] γιατι ειναι το μοναδικο στοιχειο απο το gameturns ετσι κι αλλιως ο πινακας ειναι κενος by default
    currentPlayer = "O";
  }

  // if (prevTurns.length > 0 && prevTurns[0].player === "X") {
  //   currentPlayer = "O";
  // } else {
  //   currentPlayer = "X";
  // }

  return currentPlayer;
}

function deriveWinner(gameBoard, players) {
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    // gameboard ειναι επισης ενας πινακας με στηλη και γραμμη και γιαυτο βαζουμε το row στο row και col στο col
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    // combination[0],1,2 ειναι τα position στα τετραγωνακια

    // combination[0] = {row:0, column: 0}, {row:1, column:0}, 1η γραμμη του object array
    // combination[1] = {row:0, column: 1}, {1,1}, {2,1} 2η γραμμη object array
    // combinations[2] = {row:2, column: 0}

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }

  return winner;
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((array) => [...array])]; //δημιουργεια copy array, αν δεν γινει copy δεν θα λειτουργει το rematch
  //λογικα εδω αποφευγουμε να κανουμε περιττο state

  // οταν ενεργοποιηθει το onselectsquare
  for (const turn of gameTurns) {
    //destructing array gameturn
    const { square, player } = turn; //turn = {square: ... , player: ...}
    const { row, col } = square; // square Εχει μεσα row, col

    gameBoard[row][col] = player; //player = activePlayer, row,col απο square και square απο onselectsquare
    // * πρωτα γινεται κλικ μετα το onselectsquare αποθηκευει το row, col και αυτα περνανε στο gameturns
  }

  return gameBoard;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  // const [activePlayer, setActivePlayer] = useState("X");
  //αυτο θα εμφανιζει την τιμη Χ,Ο, στην συνεχεια το state αυτο θα αντικαταστει γιατι μπορει να βρισκεται μεσα στο gameBoard με το currentPlayer
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns); //το activeplayer Κουβαλει το Χ ή Ο

  const gameBoard = deriveGameBoard(gameTurns);
  // todo Winner
  const winner = deriveWinner(gameBoard, players);

  //Draw
  const hasDraw = gameTurns.length === 9;

  function handleSelectSquare(rowIndex, colIndex) {
    // setActivePlayer((curActivePlayer) => (curActivePlayer === "X" ? "O" : "X"));, με αυτον τον τροπο θα χρειαζομασταν ενα ακομα
    setGameTurns((prevTurns) => {
      // * πρεπει να ξαναμπει οπως το handleselect γιατι οταν θελουμε να κανουμε update το state βασισμενο στο προηγουμενο state
      // επειδη ειναι array δημιουργουμε πρωτα ενα αντιγραφο του πινακα
      const currentPlayer = deriveActivePlayer(prevTurns); //στην αρχη ο πινακας ειναι κενος, με τα απο ενα κλικ αποθηκευεται το prevTurns δηλαδη το X στο πρωτο render

      // Αυτο δεν σχετιζεται με το currentPlayer, απο αυτο θα κανουμε extract το data
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      // first item of array latest turn
      return updatedTurns;
      //η τιμη που παιρνει το setgameturns ειναι του return updatedTurns
    });
  }

  // Restart the game
  function handleRestart() {
    setGameTurns([]);
  }

  // εμφανιζει το ονομα του νικητη μολις τελειωσει
  function handlePlayerNameChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }
  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          {/* Παρολο που ερχονται και τα δυο απο το ιδιο component, οταν γινεται κλικ στο ενα button στο αλλο component δεν γινεται τιποτα, ειναι απομονομενα */}
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard
          onSelectSquare={handleSelectSquare} //οταν symbol=X τοτε handle=O. Αυτο λειτουργει και γινετια update μονο οταν γινει κλικ.
          // Οταν γινεται render το activeplayersymbol θα ειναι χ, δεν παιζει ρολο το οτι υπαρχει η συναρτηση που το αλλαζει
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
