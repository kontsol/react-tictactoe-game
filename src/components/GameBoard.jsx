// 1. gameboard = initialGameBoard
// 2.
// onselectsquare μπαινουν οι τιμες row, col (0,1,..)

const GameBoard = ({ onSelectSquare, board }) => {
  return (
    <ol id="game-board">
      {board.map(
        (
          row, //απο πινακα
          rowIndex //index: 0,1,2..
        ) => (
          <li key={rowIndex}>
            <ol>
              {row.map(
                //map μεσα στην 1η γραμμη
                (
                  playerSymbol,
                  colIndex //map μεσα στις τρεις γραμμες
                ) => (
                  <li key={colIndex}>
                    <button
                      onClick={() => onSelectSquare(rowIndex, colIndex)}
                      disabled={playerSymbol !== null} // με το disabled το button μπορει να πατηθει μονο μια φορα. Αν ειναι !=== Χ ή Ο, disabled=true και δεν μπορει να γινει κλικ ξανα
                    >
                      {playerSymbol}
                      {/* στο 1ο render, playerSymbol = null */}
                      {/* κανω κλικ, ενεργοποιειται το onCLICK, παιρνει τις γραμμες,στηλες παραμετρους, ενημερωνει τον πινακα  και ο ενημερωνενος πινακας παιρνει την τιμη που βαλαμε σαν prop στο app.jsx */}
                      {/* Στο δευτερο κλικ το Χ γινεται Ο με την handleselectsquare */}
                    </button>
                  </li>
                )
              )}
            </ol>
          </li>
        )
      )}
    </ol>
  );
};

export default GameBoard;
