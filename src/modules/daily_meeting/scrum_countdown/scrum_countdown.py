
from time import sleep
import time
from random import shuffle
import sys
import select
import os

from art import *
from enum import Enum

content_list = []
goal=''
sprintgoal_path = ''

minutes_to_seconds = 60

CYELLBG  = '\33[43m'
CYELL    = '\33[33m'
CEND    = '\033[0m'     
CREDBG  = '\33[41m'
CRED    = '\33[31m'
CCYANBG  = '\33[46m'
CCYAN    = '\33[36m'
CEND    = '\033[0m'

# This can be set as a configuration
# Enable the option to enter a free speech mode without timer
enable_free_speech = True
# Time alloted for each participant in seconds
time_per_participant_s = (3*minutes_to_seconds)
# Sleep time in seconds
sleep_in_seconds = 1

class Input_Event(Enum):
    EVENT_NONE = 1
    EVENT_INPUT = 2

class Meeting_State_Machine():
    def __init__(self):
        self.hl_index = 0
        self.meeting_progression = 1
        self.event = Input_Event.EVENT_NONE
        self.t = 0

    def set_initial_t(self, t):
        self.t = t    


def read_goal(goal_path):
    try:
        fp = open(goal_path, 'r')    
        goal = [line.rstrip() for line in fp.readlines()]
        print("\n".join(goal))
    except:
        pass   

def read_pendings(pendings_path):
    try:
        fp = open(pendings_path, 'r')
        pendings = [line.rstrip() for line in fp.readlines()]
        print("\nPendings tasks")
        print("\n".join(pendings))
    except:
        pass        

def read_criticals(criticals_path):
    try: 
        fp = open(criticals_path, 'r')
        criticals = [line.rstrip() for line in fp.readlines()]
        print("\nCritical tasks")
        print(CCYANBG + "\n".join(criticals)+ CEND)
    except:
        pass

def read_participants_list(list_path):
    global content_list #Horrible, corregir
    my_file = open(list_path, "r")
    #Leer el archivo a una lista
    #content_list = my_file.readlines() 
    # Alternativa para remover los enters cuando leo
    content_list = [line.rstrip() for line in my_file.readlines()]
    content_list = [x for x in content_list if not x.startswith('*')]
    remaining_time = len(content_list)
    #print(content_list)
    shuffle(content_list)
    #print("Orden aleatorio:\n")
    #print("\n".join(content_list))
    #print("\n")
    return remaining_time

def print_randomize_list_with_highlight(hl_index):
    global content_list
    hl_list = content_list.copy()
    if (hl_index < len(hl_list) ):        
        hl_list[hl_index] = CREDBG + hl_list[hl_index] + CEND
    print("\n".join(hl_list))

def has_unread_input(stream=sys.stdin, timeout=0):
    '''
    Where stream is a readable file-descriptor, returns
    True if the given stream has input waiting to be read.
    Otherwise returns False.
    The default timeout of zero indicates that the given
    stream should be polled for input and the function
    returns immediately. Increasing the timeout will cause
    the function to wait that many seconds for the poll to
    succeed. Setting timeout to None will cause the function
    to block until it can return True.
    '''
    if( "win32" == sys.platform):
        return True
    else:
        return stream in select.select([stream], [], [], timeout)[0]

#Unused
def discard_input(stream=sys.stdin):
    '''
    Where stream is a readable file-descriptor, reads
    all available data and returns any bytes read. If no
    data is available, then an empty set of bytes is
    returned.
    '''

    data = bytearray()

    while has_unread_input(stream):
        data.extend(stream.readline())

    return bytes(data)


def print_current_screen(hl_index):
    global sprintgoal_path
    global pendings_path
    global criticals_path
    if( "win32" == sys.platform):
        os.system('cls')
    else:
        os.system('clear')

    print_randomize_list_with_highlight(hl_index)
    print('\n')
    CGREEN2 = '\33[92m'
    CGREEN  = '\33[32m'
    CEND    = '\033[0m'
    read_goal(sprintgoal_path)
    if (pendings_path != ''):
        read_pendings(pendings_path)

    if (criticals_path != ''):
        read_criticals(criticals_path)


#Unused
# Disable
def blockPrint():
    sys.stdout = open(os.devnull, 'w')

#Unused
# Restore
def enablePrint():
    sys.stdout = sys.__stdout__

def state_participants_time(meeting_sm):
    global content_list
    if (meeting_sm.event == Input_Event.EVENT_INPUT):
        meeting_sm.hl_index+=1
        if (meeting_sm.hl_index >= len(content_list)):
            # All participants have talked, lets go to free spech or exit
            if (enable_free_speech):
                meeting_sm.meeting_progression = 2
                content_list.append("free speech time")
            else:
                meeting_sm.meeting_progression = 3        
        print_current_screen(meeting_sm.hl_index)

    mins, secs = divmod(meeting_sm.t, 60)
    timeformat = ' {:02.0f}:{:02.0f}'.format(mins, secs)
    print(timeformat, end='\r')
    # Use new art instead of command line
    # print(Art.splitlines(), end='\r')

    # Use new art to generate the number
    Art=text2art(timeformat)
    print(Art, end='\r')
    print("") # TODO: I had to add a new line because the erase list contains one more element, fix this"
    return Art

def state_free_speech(meeting_sm):
    global content_list
    if (meeting_sm.event == Input_Event.EVENT_INPUT):
        meeting_sm.hl_index+=1
        if (meeting_sm.hl_index >= len(content_list)):
            #End the meeting
            meeting_sm.meeting_progression = 3        
        print_current_screen(meeting_sm.hl_index)

    #Time does not pass when in free speech
    meeting_sm.t += sleep_in_seconds
    #Print infinity symbol
    art_one_line=art("infinity")
    Art=text2art(art_one_line)
    print(Art, end='\r')
    print("") # TODO: I had to add a new line because the erase list contains one more element, fix this"
    return Art

def state_end_script(meeting_sm):
    print("\nThank you for your cooperation, have a nice day!")
    #TODO: Art is not working for this text
    #Art=text2art("Thank you for your cooperation, have a nice day!")
    #print(Art, end='\r')
    exit(0)

def erase_current_time(Art):
    erase = Art.split("\r");
    for x in reversed(erase):
        # TODO: The lenght of the black line to add should be taken from the size of the text in reverse
        #print ("\033[A                                                  \033[A")
        print("\033[A" + ' '*(len(x)+10) + "\033[A")

#Remove cursor
#os.system('setterm -cursor off') A ctrl-c does not return the cursor

list_path = sys.argv[1]
sprintgoal_path = sys.argv[2]
pendings_path =  sys.argv[3]
criticals_path = sys.argv[4]

#Create instance of the state machine meeting
meeting_sm = Meeting_State_Machine()

#Set initial time for the meeting
meeting_sm.set_initial_t(((read_participants_list(list_path)) * time_per_participant_s))

#Print initial screen for the meeting
print_current_screen(meeting_sm.hl_index)

while meeting_sm.t:
    switcher = {
        1: state_participants_time,           #1 = participants time  
        2: state_free_speech,                 #2 = free speech time
        3: state_end_script,                  #3 = end script, meeting is over
    }

     # Get the function from switcher dictionary
    func = switcher.get(meeting_sm.meeting_progression, lambda: "Invalid state")
    # Execute the function
    Art = func(meeting_sm)

    # Wait
    time.sleep(sleep_in_seconds)
    
    #Substract one second
    meeting_sm.t -= sleep_in_seconds

    # Erase the previous number    
    erase_current_time(Art)

    meeting_sm.event = Input_Event.EVENT_NONE
    # Process the next input
    if has_unread_input(sys.stdin):
        sys.stdin.readline()
        meeting_sm.event = Input_Event.EVENT_INPUT
        #sys.stdin.flush()        

# Fix this
print("No more time left, initiate self-destruct sequence...")
t = 5
aux = True
while t>=0:
    if aux:
        color = CREDBG
        aux = False
    else:
        color = CEND
        aux = True
    text_to_print = str(" self-destruct in " + "{:.0f}".format(t))
    Art=text2art(text_to_print)
    print(color + Art + CEND, end='\n')    
    ##print(color + " self-destruct in " + "{:.0f}".format(t) + CEND, end='\r')
    time.sleep(0.2)
    t -= 0.2
    # Erase the previous number    
    erase_current_time(Art)
