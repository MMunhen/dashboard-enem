from flask import Flask, jsonify
from flask_cors import CORS
import pymysql
import os

app = Flask(__name__)
CORS(app)

connection = pymysql.connect(
    host='localhost',
    user='root',
    password='senha_do_mysql',
    database='desempenhoenem',
    port=3306,
    cursorclass=pymysql.cursors.DictCursor
)

def carregar_consulta(nome_tabela):
    caminho = os.path.join('sql', f'{nome_tabela}.sql')
    with open(caminho, 'r', encoding='utf-8') as arquivo:
        return arquivo.read()

tabelas = [
    'media_estado',
    'media_municipio_rj',
    'media_sexo',
    'media_cor_raca',
    'media_tipo_escola',
    'media_faixa_etaria',
    'participantes_nota',
    'maior_nota_estado',
    'media_regiao',
    'maior_media_disciplina_estado',
    'media_disciplina_UF',
    'conteudos_mais_errados'
]

@app.route('/api/<nome_tabela>', methods=['GET'])
def get_tabela(nome_tabela):
    if nome_tabela not in tabelas:
        return jsonify({'erro': 'Tabela não encontrada'}), 404

    try:
        consulta = carregar_consulta(nome_tabela)
        with connection.cursor() as cursor:
            cursor.execute(consulta)
            resultados = cursor.fetchall()
        return jsonify(resultados)
    except Exception as e:
        return jsonify({'erro': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=3000)
