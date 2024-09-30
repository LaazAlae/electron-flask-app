from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
from core import main as process_document

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'docx'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# In-memory storage (replace with database in production)
employees = []
flights = []
documents = []
selected_document = None

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/api/employees', methods=['GET', 'POST'])
def handle_employees():
    global employees
    if request.method == 'GET':
        return jsonify(employees)
    elif request.method == 'POST':
        new_employee = request.json
        employees.append(new_employee)
        return jsonify(new_employee), 201

@app.route('/api/employees/<id>', methods=['PUT', 'DELETE'])
def handle_employee(id):
    global employees
    if request.method == 'PUT':
        updated_data = request.json
        for employee in employees:
            if employee['id'] == id:
                employee.update(updated_data)
                return jsonify(employee)
        return jsonify({'error': 'Employee not found'}), 404
    elif request.method == 'DELETE':
        employees = [e for e in employees if e['id'] != id]
        return '', 204

@app.route('/api/flights', methods=['GET', 'POST'])
def handle_flights():
    global flights
    if request.method == 'GET':
        return jsonify(flights)
    elif request.method == 'POST':
        new_flight = request.json['flight']
        flights.append(new_flight)
        return jsonify(new_flight), 201

@app.route('/api/flights/<id>', methods=['PUT', 'DELETE'])
def handle_flight(id):
    global flights
    if request.method == 'PUT':
        updated_flight = request.json['flight']
        index = flights.index(id)
        flights[index] = updated_flight
        return jsonify(updated_flight)
    elif request.method == 'DELETE':
        flights.remove(id)
        return '', 204

@app.route('/api/documents', methods=['GET', 'POST'])
def handle_documents():
    global documents
    if request.method == 'GET':
        return jsonify(documents)
    elif request.method == 'POST':
        if 'file' not in request.files:
            return jsonify({'error': 'No file part'}), 400
        file = request.files['file']
        if file.filename == '':
            return jsonify({'error': 'No selected file'}), 400
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
            new_document = {
                'id': len(documents) + 1,
                'title': request.form['title'],
                'filename': filename,
                'path': file_path
            }
            documents.append(new_document)
            return jsonify(new_document), 201

@app.route('/api/documents/<int:id>', methods=['DELETE'])
def handle_document(id):
    global documents
    document = next((d for d in documents if d['id'] == id), None)
    if document:
        os.remove(document['path'])
        documents = [d for d in documents if d['id'] != id]
        return '', 204
    return jsonify({'error': 'Document not found'}), 404

@app.route('/api/documents/<int:id>/select', methods=['POST'])
def select_document(id):
    global selected_document, documents
    document = next((d for d in documents if d['id'] == id), None)
    if document:
        selected_document = document
        return jsonify(selected_document)
    return jsonify({'error': 'Document not found'}), 404

@app.route('/api/submit', methods=['POST'])
def submit_form():
    form_data = request.json
    if not selected_document:
        return jsonify({'error': 'No document selected'}), 400
    
    # Process the document using the core.py function
    result = process_document(selected_document['path'], form_data)
    
    return jsonify({'message': 'Form submitted successfully', 'result': result})

if __name__ == '__main__':
    app.run(debug=True)