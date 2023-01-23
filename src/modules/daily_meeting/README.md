# SCRUM COUNTDOWN
## This python tool would be helpful to achieve a smooth and neat online based daily meeting.

# Packages Install
For bigger numbers:
```console
$ pip install art
```

# Usage:
```console
$ ./daily.sh {famp|lisa|shed|escalation}
```

# Parameters:
## Participants
This file has the list of all the people that will participate on the daily. The participant list will be shown shuffled. 
### Example participants file
    Participant 1
    Participant 2
    Participant ....
    Participant N

## Information
This file has the information that the DM facilitation wants to shown during the DM. The content of each line will be shown in order. 
### Example information file
    GOAL: "REPLACE WITH THE GOAL OF THE SPRINT"
    * What will you do today?
    * What have you done yesterday?   
    * Any impediments in yor way?

## Pendings
This file has the pending tasks that the DM facilitation wants to shown during the DM. The content of each line will be shown in order. 
### Example information file
    Pending task 1
    Pending task 2
    Pending task ...
    Pending task N

## Criticals
This file has the critical tasks that the DM facilitation wants to shown during the DM. The content of each line will be shown in order. 
### Example information file
    Critical task 1
    Critical task 2
    Critical task ...
    Critical task N
