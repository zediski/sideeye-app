import os
from flask import Flask
from flask import jsonify


app = Flask(__name__)


@app.route("/test")
def test():
    return jsonify(test="test")


@app.after_request
def after_request(response):
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
    response.headers.add("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS")
    return response


if __name__ == "__main__":
    print(os.path.dirname(__file__))
    app.run(host="127.0.0.1", port=3001)
