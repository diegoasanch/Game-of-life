use chrono::Duration;
use life::board::Board;
use std::{env, thread};
use termion::{clear, cursor};

fn main() {
    let (width, height, frame_rate) = get_board_parameters();

    let mut board = Board::random(width, height);
    let mut last_frame = chrono::Local::now();
    let mut frame_time;

    let mut start_time;
    let mut end_time;
    let mut sleep_time;

    loop {
        start_time = chrono::Local::now();

        println!("{}{}", clear::All, cursor::Goto(1, 1));
        // Display the board
        for y in 0..height {
            for x in 0..width {
                print!("{}", if board.is_alive(x, y) { "█" } else { "." });
            }
            println!();
        }

        board = board.next_generation();

        // Calculate the time it took to render the frame
        end_time = chrono::Local::now();
        frame_time = end_time - start_time;
        sleep_time = Duration::milliseconds((1000 / frame_rate) as i64) - frame_time;

        println!(
            "Generation: {} | Frame time: {}ms | Frame rate: {}fps",
            board.age(),
            frame_time.num_milliseconds(),
            frame_time
                .num_milliseconds()
                .checked_div(1000i64)
                .unwrap_or(0)
        );

        if sleep_time.num_milliseconds() > 0 {
            // Sleep for the remainder of the frame
            thread::sleep(sleep_time.to_std().unwrap());
        }
    }
}

fn get_board_parameters() -> (usize, usize, u64) {
    let args: Vec<String> = env::args().collect();
    let width = args
        .get(1)
        .and_then(|s| s.parse::<usize>().ok())
        .unwrap_or(10);
    let height = args
        .get(2)
        .and_then(|s| s.parse::<usize>().ok())
        .unwrap_or(10);
    let frame_rate = args.get(3).and_then(|s| s.parse::<u64>().ok()).unwrap_or(1);

    (width, height, frame_rate)
}
