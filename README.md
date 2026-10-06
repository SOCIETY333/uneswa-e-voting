# UNESWA ICT Society E-Voting (Flask + SQLite)

## Deploy on Railway
1. Push this folder to a GitHub repo and create a Railway project from it (Procfile + requirements.txt are detected).
2. Service > **Variables**:
   - `ADMIN_PATH`  – long random secret, e.g. `officer-7f3k9q2xv8m1` (admin page = `https://YOUR-APP.up.railway.app/<ADMIN_PATH>/`)
   - `ADMIN_PASSWORD` – 8+ characters
   - `SECRET_KEY` – 16+ random characters (e.g. `python -c "import secrets;print(secrets.token_hex(32))"`)
   - `DATA_DIR` – `/data`
3. Service > **Volumes** > add a volume mounted at `/data` (keeps the SQLite database across redeploys).
4. Generate a public domain under Settings > Networking. Share only the root URL with members; keep the admin URL to yourself.

## Run locally
    pip install -r requirements.txt
    ADMIN_PATH=secret-panel-123 ADMIN_PASSWORD=changeme123 SECRET_KEY=$(openssl rand -hex 16) INSECURE_COOKIES=1 python -m flask run

## Election flow (admin page)
Members tab: upload the xlsx/csv + academic year -> Control: Registration -> Nominations -> Voting -> Results.
