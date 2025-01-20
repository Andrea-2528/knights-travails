function knightMoves(start, end) {
    // Just a quick sanity check (optional)
    if (!isValidSquare(start) || !isValidSquare(end)) {
      throw new Error("Invalid start or end position");
    }
  
    // If the start and end are the same, return immediately
    if (start[0] === end[0] && start[1] === end[1]) {
      return [start];
    }
  
    // Possible knight moves (8 moves in total)
    const moves = [
      [2, 1], [2, -1], [-2, 1], [-2, -1],
      [1, 2], [1, -2], [-1, 2], [-1, -2]
    ];
  
    // Queue for BFS: each item will be a position
    const queue = [start];
  
    // Track visited squares to avoid repetition
    const visited = new Set([start.toString()]);
  
    // Map each square to its "parent" square, to reconstruct the path
    const parentMap = {};
  
    // BFS
    while (queue.length > 0) {
      const current = queue.shift();
      const [curX, curY] = current;
  
      // Explore all possible moves
      for (let [dx, dy] of moves) {
        const nextPosition = [curX + dx, curY + dy];
        const [nx, ny] = nextPosition;
  
        // Make sure the move is on the board and not visited
        if (isValidSquare(nextPosition) && !visited.has(nextPosition.toString())) {
          parentMap[nextPosition] = current; // store where we came from
          visited.add(nextPosition.toString());
          queue.push(nextPosition);
  
          // If we reached the end, rebuild and return the path
          if (nx === end[0] && ny === end[1]) {
            return buildPath(start, end, parentMap);
          }
        }
      }
    }
  
    // If somehow no path is found (which shouldn't happen for a knight in chess)
    throw new Error("What the hell...");
  }
  
  function isValidSquare([x, y]) {
    return x >= 0 && x < 8 && y >= 0 && y < 8;
  }

  function buildPath(start, end, parentMap) {
    const path = [end];
    let current = end;
    while (current.toString() !== start.toString()) {
      current = parentMap[current];
      path.push(current);
    }
    // Reverse to get path from start -> end
    return path.reverse();
  }
  
  // Example usage:
  console.log(knightMoves([0,0], [7,7]));
  