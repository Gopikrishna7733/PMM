@echo off
title Pharmaceutics Mastery Matrix (PMM) - Streamlit
echo ===================================================
echo Starting Pharmaceutics Mastery Matrix (PMM)...
echo ===================================================
cd /d "%~dp0"
if exist .venv\Scripts\activate.bat (
    call .venv\Scripts\activate.bat
)
start "" http://localhost:8501
streamlit run app.py --server.port 8501
pause
