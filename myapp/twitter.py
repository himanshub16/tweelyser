# coding: utf-8
# source : https://github.com/lepture/flask-oauthlib/blob/master/example/twitter.py

from flask import Flask, jsonify
from flask import g, session, request, url_for, flash
from flask import redirect, render_template
from flask_oauthlib.client import OAuth


app = Flask(__name__)
app.debug = True
app.secret_key = 'development'

oauth = OAuth(app)

twitter = oauth.remote_app(
    'twitter',
    consumer_key='DdehyobPSYjH1NRm2mTWEhTbc',
    consumer_secret='I6MFfAjWNyUUTsFeVK2NSmTk7QnwNtzVf3WGywCPrRnfhJWw6C',
    base_url='https://api.twitter.com/1.1/',
    request_token_url='https://api.twitter.com/oauth/request_token',
    access_token_url='https://api.twitter.com/oauth/access_token',
    authorize_url='https://api.twitter.com/oauth/authenticate',
)


@twitter.tokengetter
def get_twitter_token():
    if 'twitter_oauth' in session:
        resp = session['twitter_oauth']
        return resp['oauth_token'], resp['oauth_token_secret']


@app.before_request
def before_request():
    g.user = None
    if 'twitter_oauth' in session:
        g.user = session['twitter_oauth']


@app.route('/')
def index():
    tweets = None
    if g.user is not None:
        resp = twitter.request('statuses/home_timeline.json')
        if resp.status == 200:
            tweets = resp.data
        else:
            flash('Unable to load tweets from Twitter.')
    return render_template('index.html', tweets=tweets)

@app.route('/show')
def show():
    users = None
    if g.user is not None:
        # resp = twitter.request('followers/list.json?cursor=-1&count=200&screen_name=Adele&skip_status=true&include_user_entities=false')
        # resp = twitter.request('statuses/mentions_timeline.json?count=200')
        resp = twitter.request('statuses/user_timeline.json?screen_name=Adele&count=200&trim_user=true')
        if resp.status == 200:
            users = resp.data
        else:
            flash('Unable to load tweets from Twitter.')
    return jsonify(users)


@app.route('/login')
def login():
    callback_url = url_for('oauthorized', next=request.args.get('next'))
    return twitter.authorize(callback=callback_url or request.referrer or None) 


@app.route('/logout')
def logout():
    session.pop('twitter_oauth', None)
    return redirect(url_for('index'))


@app.route('/oauthorized')
def oauthorized():
    resp = twitter.authorized_response()
    if resp is None:
        flash('You denied the request to sign in.')
    else:
        session['twitter_oauth'] = resp
    return redirect(url_for('index'))





if __name__ == '__main__':
    app.run(host="0.0.0.0")
