from flask import Flask
from flask import render_template
from flask import url_for
from flask import redirect
app = Flask(__name__)

#一般
@app.route("/")
def index():
    return render_template('index.html')
################################

#url傳值
@app.route("/user/<username>")
def username(username):
    return 'i am ' + username
################################

#重新導向
@app.route("/a")
def url_for_a():
    return 'here is a'

@app.route("/b")
def b():
    return redirect(url_for('url_for_a'))
################################


if __name__ == '__main__':
    app.debug = True
    app.run()