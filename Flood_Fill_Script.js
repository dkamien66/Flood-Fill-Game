/* red #FF0000 */
/* orange #FF8C00 */
/* yellow #FFFF00 */
/* green #006400 */
/* blue #4169E1 */

/* Code for grid of tiles and all relevant functions */
    const grid = {

        matrix: [],

        started: false,

        filled: [],

        visited: [],

        /* id is a two digit number with the left digit = row, right digit = column */
        recursive_check: function(id) {
            this.visited.push(id);
            if (!this.filled.includes(id)) {
                this.filled.push(id);
            }

            let row = Number(id[0]);
            let column = Number(id[1]);

            /* Check if the current row is not the top row */
            if (row > 0) {
                tile_above_id = (row-1).toString()+column.toString();
                /* Check the tile in the row above has the same color and hasn't been visited */
                if (this.matrix[row-1][column] == this.matrix[row][column] && !this.visited.includes(tile_above_id)) {
                    this.recursive_check(tile_above_id);
                }
            }
            /* Check if the current column is not the rightmost column */
            if (column + 1 < this.matrix[0].length) {
                tile_right_id = row.toString()+(column+1).toString();
                /* Check the tile in the column to the right has the same color and hasn't been visited */
                if (this.matrix[row][column+1] == this.matrix[row][column] && !this.visited.includes(tile_right_id)) {
                    this.recursive_check(tile_right_id);
                }
            }
            /* Check if the current row is not the bottom row */
            if (row + 1 < this.matrix.length) {
                tile_below_id = (row+1).toString()+column.toString();
                /* Check the tile in the row below has the same color and hasn't been visited */
                if (this.matrix[row+1][column] == this.matrix[row][column] && !this.visited.includes(tile_below_id)) {
                    this.recursive_check(tile_below_id);
                }
            }
            /* Check if the current column is not the leftmost column */
            if (column > 0) {
                tile_left_id = row.toString()+(column-1).toString();
                /* Check the tile in the column to the right has the same color and hasn't been visited */
                if (this.matrix[row][column-1] == this.matrix[row][column] && !this.visited.includes(tile_left_id)) {
                    this.recursive_check(tile_left_id);
                }
            }
        },
        reset_visited_array: function() {
            this.visited = [];
        },
        check_fill: function(id) {
            if (id === "") {
                return
            }
            else { 
                this.recursive_check(id)
                this.reset_visited_array()
            }
        },
        flood_fill: function(id) {
            for (let i = 0; i < this.filled.length; i++) {
                this.matrix[Number(this.filled[i][0])][Number(this.filled[i][1])] = this.matrix[Number(id[0])][Number(id[1])]
            }
            return id
        },
        select_tile: function(id) {
            /* Check the selected tile has not already been filled (is not in the filled array) */
            if (!this.filled.includes(id)) {
                /* Check the tile is horizontally or vertically adjacent to any filled tile
                    1. Same row but different column
                    2. Different row but same column */
                for (let i = 0; i < this.filled.length; i++) {
                    /* Create variables of number data type for comparison */
                    selected_row = Number(id[0])
                    selected_column = Number(id[1])
                    filled_tile_row = Number(this.filled[i][0])
                    filled_tile_column = Number(this.filled[i][1])
                    if ((selected_row == filled_tile_row && Math.abs(selected_column - filled_tile_column) == 1)||(Math.abs(selected_row - filled_tile_row) == 1 && selected_column == filled_tile_column)) {
                        return this.flood_fill(id)
                    }
                }
                
            }
            return ""
        }
    };

function matrix_maker(rows, columns) {
    const new_matrix = [];
    for (let i = 0; i < rows; i++) {
        const new_row = []
        new_matrix.push(new_row)
        for (let j = 0; j < columns; j++) {
            new_row.push(Math.floor(Math.random()*5))
        }
    }
    return new_matrix
}

/* Code for loading random colors */
const random_colors = ["#FF0000", "#FF8C00", "#FFFF00", "#006400", "#4169E1"];
// red #FF0000
// orange #FF8C00
// yellow #FFFF00
// green #006400
// blue #4169E1

function load_colors() {
    /* Loop over each grid to show a random color */
    for (let i = 0; i < grid.matrix.length; i++) {
        for (let j = 0; j < grid.matrix[0].length; j++) {
            let id = i.toString() + j.toString();
            document.getElementById(id).setAttribute("style", "background-color: " +random_colors[grid.matrix[i][j]])
        }
    }
}

let game_attempts = 0


/* User Events */
const start_button = document.querySelector("button")
start_button.addEventListener("click", () => {
    grid.matrix = matrix_maker(10, 10);
    grid.started = false;
    grid.filled = [];
    game_attempts = 0;
    const attempts_on_screen = document.getElementById("attempts_text")
    attempts_on_screen.innerHTML = attempts_on_screen.innerHTML.slice(0,10) + game_attempts.toString()
    load_colors()
})

// Obtain a node list of all grid tiles in order to add event listener to each
node_list_of_tiles = document.querySelectorAll(".grid-tile")
node_list_of_tiles.forEach(function (currentValue) {
    currentValue.addEventListener("click", () => {
        // If the game hasn't started, only set up filled tiles (selected and any adjacent tiles of the same color)
        if (!grid.started) {
            grid.check_fill(currentValue.getAttribute("id"));
            grid.started = true;
        }
        // If the game has started, use selecting tile process to check if it's a valid tile and check filled
        else {
            selected_tile_id = grid.select_tile(currentValue.getAttribute("id"));
            grid.check_fill(selected_tile_id);
            load_colors();
        }
        game_attempts++;
        const attempts_on_screen = document.getElementById("attempts_text")
        attempts_on_screen.innerHTML = attempts_on_screen.innerHTML.slice(0,10) + game_attempts.toString()
    });
});

