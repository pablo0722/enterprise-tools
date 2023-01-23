# Scrum Poker
WebApp to organize Scrum votations.

This WebApp is hosted in https://scrum-poker.000webhostapp.com/

This implementation uses [000webhostapp](https://ar.000webhost.com/) to host web page, [repl.it](https://replit.com/) to implement the storage, and [uptimerobot](https://uptimerobot.com/) to keep repl.it alive.

## Setup
To host this application:
- Upload all folders except 'repl_it' to a web hosting
- Upload content of 'repl_it' folder to repl.it
- Set an uptimerobot to keet repl.it alive

## Usage
### Server
- Set an {id}, this is an alphanumeric word of any length.
- Tell This {id} to all clients.
- Go to: https://scrum-poker.000webhostapp.com/server.php?id={id}
- Example: https://scrum-poker.000webhostapp.com/server.php?id=quint
- Note: {id} is case-sensitive
- REMEMBER TO RESET VOTATION (or reuse always same {id}).

    Votation is not automatically reset, so this will be storaged forever which may lead to future problems in server.

### Client
- Listen {id} from Scrum Master
- Go to: https://scrum-poker.000webhostapp.com/?id={id}
- Example: https://scrum-poker.000webhostapp.com/?id=quint
- Note: {id} is case-sensitive

# More Info
* [Getting Started With Heroku](./doc/README_Heroku.md) (Heroku is no longer used)
