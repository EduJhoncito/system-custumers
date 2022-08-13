from flask import Flask, render_template, jsonify, request
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['MYSQL_HOST']= 'localhost'
app.config['MYSQL_USER']= 'root'
app.config['MYSQL_PASSWORD']= ''
app.config['MYSQL_DB']= 'sistema_zoraida'
mysql = MySQL(app)

@app.route('/api/customers/<int:id>') #GET
@cross_origin() #esto hace que se pueda llamar desde paginas diferentes
def getCustomer(id):
    # Aqui usamos json
    cur = mysql.connection.cursor()
    cur.execute('SELECT id, nombre, apellido, telefono, tipo_evento, dia_evento, mes_evento, direccion_casa, direccion_evento, dia_cumpleaños, mes_cumpleaños, observaciones, correo_electronico FROM clientes WHERE id=' + str(id))
    data = cur.fetchall()
    content = {}
    for row in data:
       content = {'id': row[0],
          'nombre': row[1],
          'apellido': row[2],
          'telefono': row[3],
          'tipo_evento': row[4],
          'dia_evento': row[5],
          'mes_evento': row[6],
          'direccion_casa': row[7],
          'direccion_evento': row[8],
          'dia_cumpleaños': row[9],
          'mes_cumpleaños': row[10],
          'observaciones': row[11],
          'correo_electronico': row[12]
       }
    return jsonify(content)

@app.route('/api/customers') #GET
@cross_origin()
def getAllCustomer():
    #Aqui usamos json
    cur=mysql.connection.cursor()
    cur.execute('SELECT id, nombre, apellido, telefono, tipo_evento, dia_evento, mes_evento, direccion_casa, direccion_evento, dia_cumpleaños, mes_cumpleaños, observaciones, correo_electronico FROM clientes')
    data=cur.fetchall()
    result=[]
    for row in data:
        content = { 'id': row[0],
          'nombre': row[1],
          'apellido': row[2],
          'telefono': row[3],
          'tipo_evento': row[4],
          'dia_evento': row[5],
          'mes_evento': row[6],
          'direccion_casa': row[7],
          'direccion_evento': row[8],
          'dia_cumpleaños': row[9],
          'mes_cumpleaños': row[10],
          'observaciones': row[11],
          'correo_electronico': row[12]
        }
        result.append(content)
    return jsonify(result)

@app.route('/api/customers', methods=['POST']) #POST
@cross_origin()
def createCustomer():
    if 'id' in request.json:
        updateCustomer()
    else:
        createCustomer()
    return "ok"

def createCustomer():
    cur = mysql.connection.cursor()
    cur.execute("INSERT INTO `clientes` (`id`, `nombre`, `apellido`, `telefono`, `tipo_evento`, `dia_evento`, `mes_evento`, `direccion_casa`, `direccion_evento`, `dia_cumpleaños`, `mes_cumpleaños`, `observaciones`, `correo_electronico`) VALUES (NULL, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s);", (request.json['nombre'], request.json['apellido'], request.json['telefono'], request.json['tipo_evento'], request.json['dia_evento'], request.json['mes_evento'], request.json['direccion_casa'], request.json['direccion_evento'], request.json['dia_cumpleaños'], request.json['mes_cumpleaños'], request.json['observaciones'], request.json['correo_electronico']))
    mysql.connection.commit()
    return "Cliente guardado"

def updateCustomer():
    cur = mysql.connection.cursor()
    cur.execute("UPDATE `clientes` SET `nombre` = %s, `apellido` = %s, `telefono` = %s, `tipo_evento` = %s, `dia_evento` = %s, `mes_evento` = %s, `direccion_casa` = %s, `direccion_evento` = %s, `dia_cumpleaños` = %s, `mes_cumpleaños` = %s, `observaciones` = %s, `correo_electronico` = %s WHERE `clientes`.`id` = %s;", (request.json['nombre'], request.json['apellido'], request.json['telefono'], request.json['tipo_evento'], request.json['dia_evento'], request.json['mes_evento'], request.json['direccion_casa'], request.json['direccion_evento'], request.json['dia_cumpleaños'], request.json['mes_cumpleaños'], request.json['observaciones'], request.json['correo_electronico'], request.json['id']))
    mysql.connection.commit()
    return "Cliente guardado"

@app.route('/api/customers/<int:id>', methods=['DELETE']) #DELETE
@cross_origin()
def removeCustomer(id):
    cur = mysql.connection.cursor()
    cur.execute("DELETE FROM `clientes` WHERE `clientes`.`id` = " + str(id) + ";")
    mysql.connection.commit()
    return "Cliente eliminado"

@app.route('/')
@cross_origin()
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(None, 3001, True)