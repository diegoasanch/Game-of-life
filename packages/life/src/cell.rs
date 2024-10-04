#[derive(Debug, Clone, Copy)]
pub struct Cell {
    alive: bool,
    age: u32,
}

impl Cell {
    pub fn new(alive: bool, age: u32) -> Cell {
        Cell { alive, age }
    }

    pub fn default() -> Cell {
        Cell {
            alive: false,
            age: 0,
        }
    }

    pub fn from_alive(alive: bool) -> Cell {
        Cell { alive, age: 0 }
    }

    /// Set the cell to be alive or dead.
    /// If the cell is being set to alive, increment its age.
    /// If the cell is being set to dead, reset its age to 0.
    pub fn set_alive(&mut self, alive: bool) {
        self.alive = alive;
        self.age = if alive { self.age + 1 } else { 0 }
    }

    pub fn alive(&self) -> bool {
        self.alive
    }

    pub fn age(&self) -> u32 {
        self.age
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn creates_new_cell() {
        let cell = Cell::default();
        assert_eq!(cell.alive(), false);
        assert_eq!(cell.age, 0);
    }

    #[test]
    fn creates_cell_from_alive() {
        let cell = Cell::from_alive(true);
        assert_eq!(cell.alive(), true);
        assert_eq!(cell.age, 0);
    }

    #[test]
    fn creates_cell_from_dead() {
        let cell = Cell::from_alive(false);
        assert_eq!(cell.alive(), false);
        assert_eq!(cell.age, 0);
    }

    #[test]
    fn sets_alive() {
        let mut cell = Cell::default();
        cell.set_alive(true);
        assert_eq!(cell.alive(), true);
        assert_eq!(cell.age, 1);
    }

    #[test]
    fn sets_dead() {
        let mut cell = Cell::from_alive(true);
        cell.set_alive(false);
        assert_eq!(cell.alive(), false);
        assert_eq!(cell.age, 0);
    }
}
