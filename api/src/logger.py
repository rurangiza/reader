import sys
import logging
from termcolor import colored
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

class CustomFormatter(logging.Formatter):
    _format = "%(levelname)-8s - %(message)s (%(filename)s:%(lineno)d)"
    
    def format(self, record):
        colors = {
            logging.DEBUG: 'grey',
            logging.INFO: 'white',
            logging.WARNING: 'yellow',
            logging.ERROR: 'red',
            logging.CRITICAL: 'red'
        }
        colored_levelname = colored(f"{record.levelname:<7}", colors.get(record.levelno))
        original_levelname = record.levelname
        record.levelname = colored_levelname
        formatted_message = logging.Formatter(self._format).format(record)
        record.levelname = original_levelname
        return formatted_message

simple_formatter = logging.Formatter(
    fmt="%(asctime)s - %(levelname)s - %(message)s"
)

stream_handler = logging.StreamHandler(sys.stdout)
file_handler = logging.FileHandler(str(BASE_DIR) + '/app.log')

stream_handler.setFormatter(CustomFormatter())
file_handler.setFormatter(simple_formatter)

logger = logging.getLogger()

logger.handlers = [
    stream_handler,
    file_handler
]

logger.setLevel(logging.INFO)

def main():
    logger.info("Hello, world")
    logger.warning("Hello, world")
    logger.error("Hello, world")

if __name__ == "__main__":
    main()