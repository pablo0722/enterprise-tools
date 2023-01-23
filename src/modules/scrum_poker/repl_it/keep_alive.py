import json
import os
from flask import Flask, request
from flask_cors import CORS
from threading import Thread
import time

app = Flask('')
CORS(app)

def read(filename):
    f=open(filename, "r")
    data=f.read()
    f.close() 
    return data

@app.route('/')
def home():
    if not hasattr(home, "req_num"):
         home.req_num = 0
    home.req_num=home.req_num+1
    print('arrived request: '+str(home.req_num))
    return "Hello. I am alive! "+str(home.req_num)

@app.route('/rm')
def rm():
    filename=request.args.get('filename')

    try:
        os.remove(filename)
    except:
        pass
    return "Archivo "+filename+" eliminado n_n"

@app.route('/post')
def post():
    filename=request.args.get('filename')
    data=request.args.get('data')

    content=[]
    if (os.path.exists(filename)):
        content=json.loads(read(filename))
    content.append(data)

    with open(filename, 'w') as outfile:
        json.dump(content, outfile)
    return read(filename)

@app.route('/edit')
def edit():
    filename=request.args.get('filename')

    req = dict(request.args)
    del req['filename']

    content={}
    if (os.path.exists(filename)):
        content=json.loads(read(filename))
    content.update(req)

    with open(filename, 'w') as outfile:
        json.dump(content, outfile)
    return read(filename)

@app.route('/editAdd')
def editAdd():
    print ('start')
    filename=request.args.get('filename')

    req = dict(request.args)
    del req['filename']

    time.sleep(1) # Para asegurarse de añadir desp del mensaje de borrar (editRM)

    content={}
    if (os.path.exists(filename)):
        content=json.loads(read(filename))
        print ('content')
        print (content)
    for key in req:
      print ('key')
      print (key)
      print (content[key])
      if not isinstance(content[key], list):
          print (key + ' no es lista. tenia ' + content[key])
          if (content[key] == 'offline'):
            content[key]=[]
          else:
            content[key] = [content[key]]
      print ('content[key]')
      print (content[key])
      content[key].append(req[key])
      content[key]=list(set(content[key]))

    with open(filename, 'w') as outfile:
        json.dump(content, outfile)
    print ('end')
    return read(filename)

@app.route('/editRm')
def editRm():
    filename=request.args.get('filename')

    req = dict(request.args)
    del req['filename']

    content={}
    if (os.path.exists(filename)):
        content=json.loads(read(filename))
    for key in req:
      pass
      #content[key]=[]

    with open(filename, 'w') as outfile:
        json.dump(content, outfile)
    return read(filename)

@app.route('/get')
def get():
    filename=request.args.get('filename')
    if (os.path.exists(filename)):
      read(filename)
      return read(filename)
    else:
      return ''

def run():
    print('running server n_n')
    app.run(host='0.0.0.0',port=8080)

def keep_alive():
    t = Thread(target=run)
    t.start()