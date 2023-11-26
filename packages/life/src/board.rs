use crate::cell::Cell;
use std::convert::TryInto;

#[derive(Debug)]
pub struct Board {
    cells: Vec<Cell>,
    width: usize,
    height: usize,
}

impl Board {
    pub fn new(width: usize, height: usize) -> Board {
        let cells = vec![Cell::new(); width * height];
        Board {
            cells,
            width,
            height,
        }
    }

    pub fn from_matrix(matrix: &Vec<Vec<bool>>) -> Board {
        let height = matrix.len();
        let width = matrix[0].len();

        let cells = matrix
            .into_iter()
            .flat_map(|row| {
                row.into_iter()
                    .map(|alive| Cell::from_alive(*alive))
                    .collect::<Vec<Cell>>()
            })
            .collect();

        Board {
            cells,
            width,
            height,
        }
    }

    pub fn width(&self) -> usize {
        self.width
    }

    pub fn height(&self) -> usize {
        self.height
    }

    pub fn get(&self, x: usize, y: usize) -> Option<&Cell> {
        self.cells.get((y * self.width) + x)
    }

    pub fn get_mut(&mut self, x: usize, y: usize) -> Option<&mut Cell> {
        self.cells.get_mut(y * self.width + x)
    }

    pub fn set(&mut self, x: usize, y: usize, cell: Cell) {
        if let Some(c) = self.get_mut(x, y) {
            *c = cell;
        }
    }

    pub fn alive_at(&self, x: usize, y: usize) -> bool {
        self.get(x as usize, y as usize)
            .map_or(false, |c| c.alive())
    }

    fn count_neighbors(&self, x: usize, y: usize) -> usize {
        let mut count = 0;
        let neighbor_range: [i32; 3] = [-1, 0, 1];

        for i in neighbor_range {
            for j in neighbor_range {
                // Skip the current cell
                if i == 0 && j == 0 {
                    continue;
                }
                if let (Ok(neighbor_x), Ok(neighbor_y)) =
                    (self.clean_x(x as i32 + i), self.clean_y(y as i32 + j))
                {
                    if self.alive_at(neighbor_x, neighbor_y) {
                        count += 1;
                    }
                }
            }
        }
        count
    }

    fn next_generation(&self) -> Self {
        let mut next = Board::new(self.width, self.height);
        for x in 0..self.width {
            for y in 0..self.height {
                let current_cell = self.get(x, y).map_or(Cell::new(), |c| *c);
                let neighbors = self.count_neighbors(x, y);
            }
        }
        next
    }

    fn clean_x<T: TryInto<usize> + PartialOrd + From<u8> + Copy>(
        &self,
        x: T,
    ) -> Result<usize, BoardError> {
        let pos = convert_to_usize(x).or(Err(BoardError::ConversionError))?;
        if pos >= self.width {
            Err(BoardError::OutOfBounds)
        } else {
            Ok(pos)
        }
    }

    fn clean_y<T: TryInto<usize> + PartialOrd + From<u8> + Copy>(
        &self,
        y: T,
    ) -> Result<usize, BoardError> {
        let pos = convert_to_usize(y).or(Err(BoardError::ConversionError))?;
        if pos >= self.height {
            Err(BoardError::OutOfBounds)
        } else {
            Ok(pos)
        }
    }
}

enum BoardError {
    ConversionError,
    OutOfBounds,
}

fn convert_to_usize<T: TryInto<usize> + PartialOrd + From<u8> + Copy>(
    num: T,
) -> Result<usize, String> {
    let zero = T::from(0u8); // Direct conversion, no error expected here
    if num >= zero {
        num.try_into()
            .map_err(|_| "Conversion out of range".to_string())
    } else {
        Err("Negative numbers cannot be converted to usize".to_string())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn creates_new_board() {
        let board = Board::new(10, 10);
        assert_eq!(board.width(), 10);
        assert_eq!(board.height(), 10);

        // All cells should start at zero
        for y in 0..board.height() {
            for x in 0..board.width() {
                assert_eq!(board.get(x, y).unwrap().alive(), false);
            }
        }
    }

    #[test]
    fn creates_board_from_matrix() {
        let matrix = vec![
            vec![true, true, false],
            vec![false, true, false],
            vec![false, true, false],
        ];

        let board = Board::from_matrix(&matrix);
        assert_eq!(board.width(), 3);
        assert_eq!(board.height(), 3);

        // Correct cells should be alive
        for x in 0..board.width() {
            for y in 0..board.height() {
                assert_eq!(board.get(x, y).unwrap().alive(), matrix[y][x]);
            }
        }

        println!("{:#?}", board);
    }

    #[test]
    fn counts_neighbors() {
        let matrix = vec![
            vec![false, false, false],
            vec![true, false, false],
            vec![false, false, true],
        ];

        let board = Board::from_matrix(&matrix);
        assert_eq!(board.count_neighbors(0, 0), 1);
        assert_eq!(board.count_neighbors(1, 0), 1);
        assert_eq!(board.count_neighbors(2, 0), 0);
        assert_eq!(board.count_neighbors(0, 1), 0);
        assert_eq!(board.count_neighbors(1, 1), 2);
        assert_eq!(board.count_neighbors(2, 1), 1);
        assert_eq!(board.count_neighbors(0, 2), 1);
        assert_eq!(board.count_neighbors(1, 2), 2);
        assert_eq!(board.count_neighbors(2, 2), 0);
    }
}
