# 'pip install airtable-python-wrapper' if this throws an error give the path to pip or make an environment variable

from airtable import Airtable
from threading import Timer

global airtable
global Player2Finished

airtable = Airtable('appRmpy8EhT0DInrt', 'StatTable', 'key7Y4dh7XQsHo8VB')

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

def retrieveData():
    global Player1Finished
    row = airtable.get_all()[1]
    Player1Finished = row['fields']['Player1Time'] # I am player 1, you are player 2
    Player1Streak = row['fields']['Player1Streak']
    Player2Streak = row['fields']['Player2Streak']
    CurrentProblem = row['fields']['CurrentProblem']
    with open('dummy.txt', 'w') as file:
        file.write(f"Player1Finished: {Player1Finished}\nPlayer1Streak: {Player1Streak}\nCurrentProblem: {CurrentProblem}")

rt = RepeatedTimer(0.3, retrieveData)
rt.start()

# we have to talk about a way to make it stop because currently it won't preventing you from starting the program
