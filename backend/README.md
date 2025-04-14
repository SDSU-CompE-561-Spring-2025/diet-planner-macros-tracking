## **Requirements**

- Python 3.12 or higher
- PostgreSQL
- Docker (optional, for containerized deployment)

---

## **Setup Instructions**

### **1. Clone the Repository**

```bash
git clone https://github.com/your-username/diet-planner-macros-tracking.git
cd diet-planner-macros-tracking/backend
```

### **2. Set Up the Environment**

1. Create a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

3. Create a `.env` file in the `backend` directory with the following content:
   ```env
   SQLALCHEMY_DATABASE_URL=postgresql://diet_user:diet_password@localhost/diet_planner
   SECRET_KEY="SBBAUGSTEELE"
   POSTGRES_USER=diet_user
   POSTGRES_PASSWORD=diet_password
   POSTGRES_DB=diet_planner
   ```

### **3. Set Up the Database**

1. Start PostgreSQL and create the database:

   ```sql
   psql -U postgres
   CREATE DATABASE diet_planner;
   CREATE USER diet_user WITH PASSWORD 'diet_password';
   GRANT ALL PRIVILEGES ON DATABASE diet_planner TO diet_user;
   \q
   ```

2. Run the application to initialize the database tables:
   ```bash
   uvicorn src.app.main:app --reload
   ```

---

## **Running the Application**

### **1. Locally**

Start the FastAPI server:

```bash
uvicorn src.app.main:app --reload
```

Access the API at:

Swagger UI: http://127.0.0.1:8000/docs
ReDoc: http://127.0.0.1:8000/redoc

### **2. Using Docker**

1. Build the Docker image:

   ```bash
   docker build -t diet-planner-backend .
   ```

2. Run the Docker container:

   ```bash
   docker run -p 8000:8000 diet-planner-backend
   ```

3. Access the API at http://127.0.0.1:8000/docs.

---

## **Testing**

Run the tests using `pytest`:

```bash
pytest
```
