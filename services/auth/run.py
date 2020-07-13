import application

if __name__ == '__main__':
    application.create_app().run(debug=True, host='0.0.0.0', use_reloader=True)
