from app import myapp
from flask import request, render_template, session, redirect, url_for, escape
import os
from app.models import *
from sqlalchemy.sql import exists

myapp.secret_key = os.urandom(24)

@myapp.route('/')
@myapp.route('/index', methods=['GET', 'POST'])
def index():
	email = ''
	attempt = request.args.get('attempt')
	if 'email' in session:
		email = escape(session['email'])
		Addresses = Address.query.filter_by(user=email)
		user_orders = UserOrders.query.filter_by(user=email).all()
		all_orders = {}
		for uo in user_orders:
			orderID = uo.orderID
			an_order = Order.query.filter_by(id=orderID).first()
			all_users = []
			another_user_orders = UserOrders.query.filter_by(orderID=an_order.id).all()
			for auo in another_user_orders:
				all_users.append(auo.user)
			all_orders[an_order] = all_users
		return render_template('home.html', Addresses=Addresses, Orders=all_orders)
	else:
		return render_template('login.html')

@myapp.route('/login', methods=['GET', 'POST'])
def login():
	if request.method=='POST':
		email = request.form.get('email')
		password = request.form.get('password')
		user = User.query.filter_by(email=email, password=password).all()
		print User.query.all()
		if user:
			session['email'] = email
			session['password'] = password
			return redirect('/index')
		else:
			return redirect(url_for('index', attempt=True))
	else:
		return redirect('/create')

@myapp.route('/create', methods=['GET', 'POST'])
def create():
	if request.method == 'POST':
		email = request.form.get('email')
		password = request.form.get('password')
		first = request.form.get('first')
		last = request.form.get('last')
		company = request.form.get('company')
		db.session.add(User(email, first, last, password, company))
		db.session.commit()
		session['email'] = email
		session['password'] = password
		return redirect('/index')
	else: 
		return render_template('create.html')

@myapp.route('/logout')
def logout():
	session.pop('password', None)
	session.pop('email', None)
	return redirect(url_for('index'))

@myapp.route('/address', methods=['GET', 'POST'])
def address():
	user = escape(session['email'])
	street = request.form.get('street')
	city = request.form.get('city')
	country = request.form.get('country')
	state = request.form.get('state')
	zipcode = request.form.get('zipcode')
	db.session.add(Address(user, street, city, state, country, zipcode))
	db.session.commit()
	return redirect('/index')

@myapp.route('/order', methods=['GET', 'POST'])
def order():
	total_spent = request.form.get('total_spent')
	num_parts_ordered = request.form.get('num_parts_ordered')
	order = Order(total_spent, num_parts_ordered)
	db.session.add(order)
	db.session.commit()
	order_id = order.id
	print Order.query.all(), order_id
	users = request.form.get('users')
	if users:
		users = users.split(', ')
		order_id = request.args.get('id')
		for user in users:
			db.session.add(UserOrders(user, order_id))
	user = escape(session['email'])
	db.session.add(UserOrders(user, order_id))
	db.session.commit()
	return redirect(url_for('index'))

@myapp.errorhandler(404)
def page_not_found(error):
	return render_template('page_not_found.html'), 404
