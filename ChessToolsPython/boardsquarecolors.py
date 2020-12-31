import pygame
import random
from airtable import Airtable
from threading import Timer
from time import time

pygame.init()

global airtable
global Player1Score
global Player1Done
global row

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


def retrieve_data():
    global Player1Score
    global row
    global Player1Done
    row = airtable.get('recKwCmskgsQjZa4R')
    Player1Score = row['fields']['Player1Score']
    Player1Done = row['fields']['Player1Done']


def generate_square():
    files = ["a", "b", "c", "d", "e", "f", "g", "h"]
    file = random.randint(0, 7)
    rank = random.randint(1, 8)
    number_to_color = {0: "black", 1: "white"}
    color = number_to_color[(file + 1 + rank) % 2]

    return files[file] + str(rank), color.upper()


exited = False
user_answer = ""
square, answer = generate_square()
square_color = pygame.Color("blue")
next_question = 0
rt = RepeatedTimer(0.5, retrieve_data)
rt.start()
start = None
end = None
prev_time = int(time() * 1000)
finish_time = 0
score = 0
Player2Streak = 0
white_button_color = (128, 128, 128)
black_button_color = (128, 128, 128)

airtable.replace("recKwCmskgsQjZa4R",
                 {"Player1Score": 0,
                  "Player2Score": 0,
                  "Player1Streak": 0,
                  "Player2Streak": 0,
                  "Player1Done": "False",
                  "Player2Done": "False",
                  "CurrentProblem": square,
                  "CurrentAnswer": answer})


def make_button(game, color, x, y, width, height, text, text_color):
    pygame.draw.rect(game, color, (x, y, width, height))
    font = pygame.font.Font('freesansbold.ttf', 32)
    text = font.render(text, True, text_color)
    textRect = text.get_rect()
    textRect.center = (x + width / 2, y + height / 2)
    game.blit(text, textRect)

while not exited:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            rt.stop()
            exited = True
        mouse = pygame.mouse.get_pos()
        if next_question == 0:
            if int(time() * 1000) - prev_time >= 6000:
                Player2Streak = 0

                square_color = pygame.Color("red")

                airtable.update("recKwCmskgsQjZa4R", {'Player2Done': "True"})
                airtable.update("recKwCmskgsQjZa4R", {'Player2Streak': Player2Streak})

                prev_time = int(time() * 1000)
            if (1 * game.get_width() / 6 < mouse[0] < 2 * game.get_width() / 6) and (
                    2 * game.get_height() / 3 < mouse[1] < 2 * game.get_height() / 3 + 50):
                white_button_color = (192, 192, 192)
                black_button_color = (128, 128, 128)
                if event.type == pygame.MOUSEBUTTONDOWN:
                    user_answer = "WHITE"
                    if user_answer == answer:
                        square_color = pygame.Color("green")

                        finish_time = int(time() * 1000)
                        score += 6000 - (finish_time - prev_time)
                        Player2Streak += 1

                        airtable.update("recKwCmskgsQjZa4R", {'Player2Score': score})
                        airtable.update("recKwCmskgsQjZa4R", {'Player2Done': "True"})
                        airtable.update("recKwCmskgsQjZa4R", {'Player2Streak': Player2Streak})
                    else:
                        square_color = pygame.Color("red")

                        Player2Streak = 0

                        airtable.update("recKwCmskgsQjZa4R", {'Player2Done': "True"})
                        airtable.update("recKwCmskgsQjZa4R", {'Player2Streak': Player2Streak})

                    next_question = True
            elif (4 * game.get_width() / 6 < mouse[0] < 5 * game.get_width() / 6) and (
                    2 * game.get_height() / 3 < mouse[1] < 2 * game.get_height() / 3 + 50):
                black_button_color = (192, 192, 192)
                white_button_color = (128, 128, 128)
                if event.type == pygame.MOUSEBUTTONDOWN:
                    user_answer = "BLACK"
                    if user_answer == answer:
                        square_color = pygame.Color("green")

                        finish_time = int(time() * 1000)
                        score += 6000 - (finish_time - prev_time)
                        Player2Streak += 1

                        airtable.update("recKwCmskgsQjZa4R", {'Player2Score': score})
                        airtable.update("recKwCmskgsQjZa4R", {'Player2Done': "True"})
                        airtable.update("recKwCmskgsQjZa4R", {'Player2Streak': Player2Streak})
                    else:
                        square_color = pygame.Color("red")

                        Player2Streak = 0

                        airtable.update("recKwCmskgsQjZa4R", {'Player2Done': "True"})
                        airtable.update("recKwCmskgsQjZa4R", {'Player2Streak': Player2Streak})
            else:
                white_button_color = (128, 128, 128)
                black_button_color = (128, 128, 128)
        else:
            white_button_color = (128, 128, 128)
            black_button_color = (128, 128, 128)


    game.fill((255, 255, 255))

    make_button(game, white_button_color, game.get_width()/6, 2*game.get_height()/3, game.get_width()/6, 50, "WHITE", (255, 255, 255))
    make_button(game, black_button_color, 4 * game.get_width() / 6, 2 * game.get_height() / 3, game.get_width() / 6, 50, "BLACK", (0, 0, 0))

    font = pygame.font.Font('freesansbold.ttf', 32)
    text = font.render(square, True, square_color)
    textRect = text.get_rect()
    textRect.center = (game.get_width() / 2, game.get_height() / 2)
    game.blit(text, textRect)

    if square_color != pygame.Color("blue"):
        if next_question == 20 and Player1Done == "True":
            square_color = pygame.Color("blue")

            square, answer = generate_square()
            airtable.update("recKwCmskgsQjZa4R", {'CurrentProblem': square})
            airtable.update("recKwCmskgsQjZa4R", {'CurrentAnswer': answer})

            next_question = 0
            prev_time = int(time() * 1000)
        else:
            next_question += 1

    pygame.display.update()
    clock.tick(10)
