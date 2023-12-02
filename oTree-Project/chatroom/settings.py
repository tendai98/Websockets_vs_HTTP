from os import environ
import os

SESSION_CONFIGS = [
    {
         'name':'websocket_chat',
	 'display_name':'Websocket Chat Experiment',
         'app_sequence':['websocket_chat'],
	 'num_demo_participants':2
    },
    {
         'name':'websocket_game',
         'display_name':'Websocket Drawing Canvas Experiment',
         'app_sequence':['websocket_game'],
         'num_demo_participants':2
    },

]

# if you set a property in SESSION_CONFIG_DEFAULTS, it will be inherited by all configs
# in SESSION_CONFIGS, except those that explicitly override it.
# the session config can be accessed from methods in your apps as self.session.config,
# e.g. self.session.config['participation_fee']

SESSION_CONFIG_DEFAULTS = dict(
    real_world_currency_per_point=1.00, participation_fee=0.00, doc=""
)

PARTICIPANT_FIELDS = []
SESSION_FIELDS = []

# ISO-639 code
# for example: de, fr, ja, ko, zh-hans
LANGUAGE_CODE = 'en'

# e.g. EUR, GBP, CNY, JPY
REAL_WORLD_CURRENCY_CODE = 'USD'
USE_POINTS = True

# Define the directories where oTree will look for static files
STATICFILES_DIRS = [
    os.path.join('.', 'websocket_chat/static'),
]

ROOMS = [
    dict(
        name='econ101',
        display_name='Econ 101 class',
        participant_label_file='_rooms/econ101.txt',
    ),
    dict(name='live_demo', display_name='Room for live demo (no participant labels)'),
]

ADMIN_USERNAME = 'admin'
# for security, best to set admin password in an environment variable
ADMIN_PASSWORD = 'admin' #environ.get('OTREE_ADMIN_PASSWORD')

DEMO_PAGE_INTRO_HTML = """
Some otree games using websockets
"""

OTREE_PRODUCTION = True
DEBUG = False

SECRET_KEY = '3623946382915'

INSTALLED_APPS = ['otree','websocket_chat', 'websocket_game']

