import os

from termcolor import colored

class Logger:
    mode = os.MODE

    def info(self, message: str, color='cyan') -> None:
        print(
            colored(f"{message}", color)
        )
    
    def error(self, message: str, color='red') -> None:
        print(
            colored(f"{message}", color)
        )
