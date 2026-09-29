from flask import Flask, render_template, jsonify, abort
import os

app = Flask(__name__)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

@app.route("/lp/<slug>")
@app.route("/<slug>")
def lp(slug):
    path = os.path.join(BASE_DIR, "templates", f"{slug}.html")
    if not os.path.exists(path):
        abort(404)
    return render_template(f"{slug}.html")

@app.route("/lp/help")
def list_slugs():
    templates_dir = os.path.join(BASE_DIR, "templates")
    slug_list = [f for f in os.listdir(templates_dir) if f.endswith(".html")]
    return {str(i): f.replace(".html", "") for i, f in enumerate(slug_list)}

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8000, debug=False)
