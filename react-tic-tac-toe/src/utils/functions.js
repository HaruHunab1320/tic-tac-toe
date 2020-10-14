export function findWinner(boxes) {
  /* winning combinations */
  const rows = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ]

    /* Iterate over the rows with winning combinations */
    for (let i = 0; i < rows.length; i++){
      const [a,b,c] = rows[i];

      /* Check if the game board contains the winning combination */
      if (boxes[a] === boxes[b] && boxes[b] === boxes[c]){
        /* Return the winner X or O */
        return boxes[a]
      }
    }
    /* otherwise do nothing */
    return null;
}

export function areAllBoxesClicked(boxes) {
  /* declare variable to store number of clicked boxes */
  let count = 0;

  /* Iterate over all boxes */
  boxes.forEach((item) => {
    /* Check if box is clicked */
    if(item !== null) {
      // If clicked, increment counter
      count++;
    }
  })

  /* Check if all boxes are clicked */
  if (count === 9) {
    return true;
  } else {
    return false;
  }
}
