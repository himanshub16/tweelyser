#!/usr/bin/python3
""" This is the flask script for Tweelyser.
"""

from flask import Flask, url_for, session, jsonify, request, \
    flash, render_template, redirect
from flask_oauthlib.contrib.client import OAuth
from flask_oauthlib.contrib.client.exceptions import AccessTokenNotFound


app = Flask(__name__)
app.config.from_pyfile('client-secret.cfg', silent=True)

oauth = OAuth(app)
twitter = oauth.remote_app(
    name='twitter',
    version='1',
    endpoint_url='https://api.twitter.com/1.1/',
    request_token_url='https://api.twitter.com/oauth/request_token',
    access_token_url='https://api.twitter.com/oauth/access_token',
    authorization_url='https://api.twitter.com/oauth/authorize')


@app.route('/')
def index():
    """ The index page
    """
    if oauth_twitter_token():
        return redirect(url_for('results'))
    else:
        return render_template("index.html")


@app.route('/auth/twitter')
def oauth_twitter():
    """ Method to initiate twitter oauth
    """
    try:
        callback_uri = url_for('oauth_twitter_callback', _external=True)
        return twitter.authorize(callback_uri)
    except Exception:
        return 'Cannot connect to Twitter.'


@app.route('/auth/twitter/callback')
def oauth_twitter_callback():
    """ Callback for twitter oauth
    """
    try:
        response = twitter.authorized_response()
        if response:
            session['token'] = (response.token, response.token_secret)
            session['me'] = dict(response)['screen_name']
            return 'success'
        else:
            return 'failed'
    except Exception:
        return "failed"


@app.route('/logout')
def logout():
    """ End this session.
    """
    try:
        session.pop('token', None)
        session.pop('me', None)
    except KeyError:
        pass
    return redirect(url_for('index'))


@app.route('/results')
@app.route('/results/<name>')
def results(name=None):
    """ Show results
    """
    try:
        if not name:
            test = session.get('token')
            name = session.get('me')
        return render_template("results.html", me=name)
    except KeyError:
        return redirect(url_for('index'))


@app.route('/show/<name>')
def show(name):
    """ Get basic data from his/her timeline.
    """
    try:
        if not oauth_twitter_token():
            raise AccessTokenNotFound
        resp = twitter.get('statuses/user_timeline.json?screen_name=' + \
             name + '&count=500&trim_user=true')
        if resp.status_code == 200:
            return jsonify(resp.json())
        else:
            return "error occured"
    except ValueError:
        return 'Invalid value'
    except AccessTokenNotFound:
        return 'You are not supposed to be here. Please <a href="/">login</a> again.'


@app.route('/lookup/<name>')
def lookup(name):
    """ Lookup on user personal data
    """
    try:
        if not oauth_twitter_token():
            raise AccessTokenNotFound
        resp = twitter.get('users/lookup.json?screen_name=' + \
            name + '&include_entities=false')
        if resp.status_code == 200:
            return jsonify(resp.json())
        else:
            return "error occured"
    except ValueError:
        return 'Invalid value'
    except AccessTokenNotFound:
        return 'You are not supposed to be here. Please <a href="/">login</a> again.'


@twitter.tokengetter
def oauth_twitter_token():
    """ Don't know why this exists.
    """
    return session.get('token')


if __name__ == '__main__':
    """ main
    """
    app.run(host="0.0.0.0", port=5000, debug=True)
