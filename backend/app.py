import os
from flask import Flask, jsonify
from flask_cors import CORS
from backend.config.settings import Config
from backend.routes.api import api_bp
from backend.routes.auth import auth_bp

def create_app():
    # Make sure we have configuration
    Config.validate()

    app = Flask(__name__)
    app.config.from_object(Config)

    # Enable CORS for all routes (allows communication from React frontend)
    CORS(app, resources={r"/api/*": {"origins": "*"}})

    # Register blueprints
    app.register_blueprint(api_bp, url_prefix='/api')
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    @app.route('/')
    def index():
        return jsonify({
            "message": "Welcome to KLE Society's Degree College Gangavathi Tech Fest 2026-27 API Backend",
            "status": "online"
        }), 200

    @app.errorhandler(404)
    def not_found(e):
        return jsonify({"error": "Resource not found"}), 404

    @app.errorhandler(500)
    def server_error(e):
        return jsonify({"error": "An internal server error occurred"}), 500

    return app

if __name__ == '__main__':
    app = create_app()
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
else:
    # Gunicorn or other WSGI entrypoint
    app = create_app()
