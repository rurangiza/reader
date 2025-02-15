import sys
import time
import logging
import inspect

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
        colored_levelname = colored("%-7s", colors.get(record.levelno)) % record.levelname
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

def timer(func):
    def wrapper(*args, **kwargs):
        t1 = time.time()
        result = func(*args, **kwargs)
        t2 = time.time() - t1
        logger.info("%s() ran in %.2f seconds.", func.__name__, t2)
        return result
    return wrapper
    

def main():
    logger.info("Hello, world")
    logger.warning("Hello, world")
    logger.error("Hello, world")

if __name__ == "__main__":
    main()