import pygame
import random
from airtable import Airtable
import threading
from threading import Timer
import time

pygame.init()

global airtable
global Player2Finished

airtable = Airtable('appRmpy8EhT0DInrt', 'StatTable', 'key7Y4dh7XQsHo8VB')

game = pygame.display.set_mode((800, 600))
pygame.display.set_caption("learn the square colors with Kedar")

clock = pygame.time.Clock()


class RepeatedTimer(object):
    def __init__(self, interval, function, *args, **kwargs):
        self._timer = None
        self.interval = interval
        self.function = function
        self.args = args
        self.kwargs = kwargs
        self.is_running = False
        self.start()

    def _run(self):
        self.is_running = False
        self.start()
        self.function(*self.args, **self.kwargs)

    def start(self):
        if not self.is_running:
            self._timer = Timer(self.interval, self._run)
            self._timer.start()
            self.is_running = True

    def stop(self):
        self._timer.cancel()
        self.is_running = False


 def hello():
     global Player2Finished
     row = airtable.get_all()[1]
     Player2Finished = row['fields']['Player2Time']


def generate_square():
    files = ["a", "b", "c", "d", "e", "f", "g", "h"]
    file = random.randint(0, 7)
    rank = random.randint(1, 8)
    number_to_color = {0: "black", 1: "white"}
    answer = number_to_color[(file + 1 + rank) % 2]

    return files[file] + str(rank), answer.upper()


exited = False
user_answer = ""
square, answer = generate_square()
square_color = pygame.Color("blue")
next_question = 0
rt = RepeatedTimer(0.3, hello)
rt.start()
start = None
end = None
while not exited:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            rt.stop()
            exited = True
        if event.type == pygame.MOUSEBUTTONDOWN:
            mouse = pygame.mouse.get_pos()
            if next_question == 0:
                if (1 * game.get_width() / 6 < mouse[0] < 2 * game.get_width() / 6) and (
                        2 * game.get_height() / 3 < mouse[1] < 2 * game.get_height() / 3 + 50):
                    user_answer = "WHITE"
                    if user_answer == answer:
                        square_color = pygame.Color("green")
                    else:
                        square_color = pygame.Color("red")
                    next_question = True
                elif (4 * game.get_width() / 6 < mouse[0] < 5 * game.get_width() / 6) and (
                        2 * game.get_height() / 3 < mouse[1] < 2 * game.get_height() / 3 + 50):
                    user_answer = "BLACK"
                    if user_answer == answer:
                        square_color = pygame.Color("green")
                    else:
                        square_color = pygame.Color("red")

    game.fill((255, 255, 255))

    pygame.draw.rect(game, (128, 128, 128),
                     (1 * game.get_width() / 6, 2 * game.get_height() / 3, game.get_width() / 6, 50))
    font = pygame.font.Font('freesansbold.ttf', 32)
    text = font.render("WHITE", True, (255, 255, 255))
    textRect = text.get_rect()
    textRect.center = (game.get_width() / 6 + game.get_width() / 12, 2 * game.get_height() / 3 + 25)
    game.blit(text, textRect)

    pygame.draw.rect(game, (128, 128, 128),
                     (4 * game.get_width() / 6, 2 * game.get_height() / 3, game.get_width() / 6, 50))
    font = pygame.font.Font('freesansbold.ttf', 32)
    text = font.render("BLACK", True, (0, 0, 0))
    textRect = text.get_rect()
    textRect.center = (4 * game.get_width() / 6 + game.get_width() / 12, 2 * game.get_height() / 3 + 25)
    game.blit(text, textRect)

    font = pygame.font.Font('freesansbold.ttf', 32)
    text = font.render(square, True, square_color)
    textRect = text.get_rect()
    textRect.center = (game.get_width() / 2, game.get_height() / 2)
    game.blit(text, textRect)

    if square_color != pygame.Color("blue"):
        if next_question == 80 and Player2Finished == 0:
            airtable.update(airtable.get_all()[1]['id'], {'Player1Time': })
            square_color = pygame.Color("blue")
            square, answer = generate_square()
            next_question = 0
        else:
            next_question += 1

    pygame.display.update()
    clock.tick(60)
