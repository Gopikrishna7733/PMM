"""
Pharmaceutics Mastery Matrix (PMM) - Streamlit Application
A high-precision, interactive pharmacy science learning & telemetry platform.
"""

import os
import sys
import time
import socket
import threading
import http.server
import socketserver
import streamlit as st
import pandas as pd
import altair as alt

# ==============================================================================
# 1. BACKGROUND LOCAL HTTP SERVER FOR PMM WEB PORTAL
# ==============================================================================
from functools import partial

SERVER_PORT = 8080
PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))

class ReusableServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, format, *args):
        # Suppress noisy standard request logging
        pass

def is_port_in_use(port):
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(('127.0.0.1', port)) == 0

def start_background_server(port=SERVER_PORT):
    if not is_port_in_use(port):
        try:
            handler = partial(QuietHandler, directory=PROJECT_ROOT)
            httpd = ReusableServer(('127.0.0.1', port), handler)
            server_thread = threading.Thread(target=httpd.serve_forever, daemon=True)
            server_thread.start()
        except Exception as e:
            print(f"Server start warning: {e}")

# Start background static server for embedding PMM HTML views
start_background_server(SERVER_PORT)


# ==============================================================================
# 2. STREAMLIT PAGE CONFIGURATION & INJECTED PMM DESIGN SYSTEM
# ==============================================================================
st.set_page_config(
    page_title="Pharmaceutics Mastery Matrix (PMM)",
    page_icon="⚗️",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS matching PMM Design Tokens
PMM_CSS = """
<style>
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap');

  :root {
    --pmm-bg-app: #070a12;
    --pmm-bg-surface: #0d1322;
    --pmm-bg-surface-elevated: #131b2e;
    --pmm-primary: #257bf3;
    --pmm-accent: #22d3ee;
    --pmm-success: #10b981;
    --pmm-warning: #f59e0b;
    --pmm-error: #ef4444;
    --pmm-text-primary: #f8fafc;
    --pmm-text-secondary: #94a3b8;
    --pmm-text-muted: #64748b;
    --pmm-border: #1e293b;
    --pmm-border-strong: #334155;
  }

  /* Main App Container Styling */
  .stApp {
    background-color: var(--pmm-bg-app);
    color: var(--pmm-text-primary);
    font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
  }

  /* Metric Card Box */
  .pmm-st-card {
    background: linear-gradient(180deg, rgba(19, 27, 46, 0.8) 0%, rgba(13, 19, 34, 0.95) 100%);
    border: 1px solid var(--pmm-border);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 16px;
    box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.4);
    position: relative;
    overflow: hidden;
  }
  .pmm-st-card::before {
    content: "";
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(34, 211, 238, 0.4), transparent);
  }

  /* Badge Pills */
  .pmm-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 3px 10px;
    border-radius: 9999px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.02em;
  }
  .pmm-pill--accent {
    background: rgba(34, 211, 238, 0.12);
    color: #22d3ee;
    border: 1px solid rgba(34, 211, 238, 0.3);
  }
  .pmm-pill--success {
    background: rgba(16, 185, 129, 0.12);
    color: #34d399;
    border: 1px solid rgba(16, 185, 129, 0.3);
  }
  .pmm-pill--warning {
    background: rgba(245, 158, 11, 0.12);
    color: #fbbf24;
    border: 1px solid rgba(245, 158, 11, 0.3);
  }
  .pmm-pill--primary {
    background: rgba(37, 123, 243, 0.12);
    color: #60a5fa;
    border: 1px solid rgba(37, 123, 243, 0.3);
  }

  /* Typography */
  .pmm-hero-title {
    font-size: 2.2rem;
    font-weight: 800;
    color: #ffffff;
    letter-spacing: -0.025em;
    margin: 8px 0;
  }
  .pmm-hero-subtitle {
    color: #94a3b8;
    font-size: 1.05rem;
    line-height: 1.5;
  }

  /* Stat Values */
  .pmm-stat-val {
    font-size: 2rem;
    font-weight: 800;
    color: #ffffff;
    font-family: 'JetBrains Mono', monospace;
  }
  .pmm-stat-lbl {
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #94a3b8;
    font-weight: 600;
  }
  .pmm-stat-sub {
    font-size: 0.8rem;
    color: #34d399;
    font-weight: 600;
    margin-top: 4px;
  }

  /* Sidebar styling */
  section[data-testid="stSidebar"] {
    background-color: #0b0f19;
    border-right: 1px solid #1e293b;
  }

  /* Button customizations */
  div.stButton > button:first-child {
    background: linear-gradient(135deg, #257bf3 0%, #1d4ed8 100%);
    color: white;
    border: 1px solid #3b82f6;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.2s ease;
  }
  div.stButton > button:first-child:hover {
    background: linear-gradient(135deg, #3b82f6 0%, #257bf3 100%);
    border-color: #60a5fa;
    box-shadow: 0 0 15px rgba(37, 123, 243, 0.4);
  }
</style>
"""
st.markdown(PMM_CSS, unsafe_allow_html=True)

# ==============================================================================
# 3. REPOSITORY DATA MODELS (Phase 1 Mock Layer)
# ==============================================================================
SUBJECTS_DATA = [
    {
        "id": "subj_pceut",
        "code": "PMM-PCEUT-201",
        "title": "Pharmaceutics & Biopharmaceutics",
        "category": "Clinical Core",
        "progress": 82,
        "topicsCompleted": 23,
        "totalTopics": 28,
        "mcqsSolved": 420,
        "totalMcqs": 1180,
        "accuracy": 94.2,
        "status": "Active",
        "desc": "Dosage forms, modified release systems, BCS classification, preformulation stability, and sterile compounding."
    },
    {
        "id": "subj_pharm",
        "code": "PMM-PHARM-101",
        "title": "Pharmacology & Therapeutics",
        "category": "Intermediate",
        "progress": 68,
        "topicsCompleted": 24,
        "totalTopics": 34,
        "mcqsSolved": 310,
        "totalMcqs": 1420,
        "accuracy": 91.4,
        "status": "Active",
        "desc": "Receptor dynamics, signal transduction, autonomic, cardiovascular, antimicrobial, and CNS pharmacology."
    },
    {
        "id": "subj_clin",
        "code": "PMM-CLIN-501",
        "title": "Clinical Pharmacy & TDM",
        "category": "Clinical Case",
        "progress": 55,
        "topicsCompleted": 20,
        "totalTopics": 36,
        "mcqsSolved": 290,
        "totalMcqs": 1600,
        "accuracy": 93.5,
        "status": "Active",
        "desc": "Therapeutic Drug Monitoring (vancomycin, aminoglycosides, phenytoin), renal adjustments, and clinical scenarios."
    },
    {
        "id": "subj_medchem",
        "code": "PMM-MEDCHEM-401",
        "title": "Medicinal Chemistry & SAR",
        "category": "Advanced Analytical",
        "progress": 30,
        "topicsCompleted": 9,
        "totalTopics": 30,
        "mcqsSolved": 180,
        "totalMcqs": 1350,
        "accuracy": 76.5,
        "status": "Review Needed",
        "desc": "Structure-Activity Relationships (SAR), bioisosterism, Phase I/II Cytochrome P450 metabolism, and prodrug design."
    },
    {
        "id": "subj_anal",
        "code": "PMM-ANAL-601",
        "title": "Pharmaceutical Analysis & HPLC",
        "category": "Instrumentation",
        "progress": 42,
        "topicsCompleted": 11,
        "totalTopics": 26,
        "mcqsSolved": 140,
        "totalMcqs": 980,
        "accuracy": 86.8,
        "status": "Active",
        "desc": "UV-Vis, FTIR, NMR spectrophotometry, HPLC/GC-MS chromatography, dissolution profiles, and compendial validation."
    },
    {
        "id": "subj_pcog",
        "code": "PMM-PCOG-301",
        "title": "Pharmacognosy & Phytomedicine",
        "category": "Foundational",
        "progress": 45,
        "topicsCompleted": 10,
        "totalTopics": 22,
        "mcqsSolved": 80,
        "totalMcqs": 890,
        "accuracy": 85.0,
        "status": "Active",
        "desc": "Secondary plant metabolites, alkaloid isolation, bioactive phytomedicines, standardized monographs, and herbal safety."
    }
]

CLINICAL_QUESTIONS = [
    {
        "id": "PK-408",
        "subject": "Biopharmaceutics",
        "code": "PMM-201",
        "question": "Which pharmacokinetic parameter remains fundamentally unaltered when switching from an intravenous bolus injection to a continuous zero-order infusion at steady state?",
        "options": [
            "A) Peak plasma drug concentration (Cmax)",
            "B) Elimination rate constant (Kel) and intrinsic clearance",
            "C) Fluctuation index between dosing intervals (PTF)",
            "D) Time required to reach steady-state plateau (Css)"
        ],
        "correct": 1,
        "rationale": "The elimination rate constant (Kel) and intrinsic total body clearance are fundamental physiological properties of the drug and biological system; they depend strictly on metabolism and excretion mechanisms, not on the route or schedule of administration (assuming linear first-order pharmacokinetics).",
        "reference": "USP-NF General Chapter <1151> & Rowland and Tozer's Clinical Pharmacokinetics."
    },
    {
        "id": "MED-302",
        "subject": "Medicinal Chemistry",
        "code": "PMM-401",
        "question": "In Phase I hepatic biotransformation, which primary enzyme superfamily utilizes molecular oxygen and NADPH-cytochrome P450 reductase to mediate aliphatic and aromatic hydroxylation?",
        "options": [
            "A) UDP-Glucuronosyltransferases (UGT)",
            "B) Monoamine Oxidases (MAO)",
            "C) Cytochrome P450 Mixed-Function Oxidases (CYP450)",
            "D) Glutathione S-Transferases (GST)"
        ],
        "correct": 2,
        "rationale": "Cytochrome P450 (CYP) hemoproteins function as mixed-function oxygenases requiring NADPH and molecular oxygen (O2) to introduce a single hydroxyl atom into lipophilic substrates.",
        "reference": "Ph. Eur. 10th Ed. Compendial Standards & Goodman & Gilman's Pharmacological Basis of Therapeutics."
    },
    {
        "id": "CLIN-105",
        "subject": "Clinical Pharmacy",
        "code": "PMM-501",
        "question": "When monitoring Vancomycin therapy in severe MRSA bacteremia, what is the current international consensus target pharmacokinetic/pharmacodynamic index for clinical efficacy and minimal nephrotoxicity?",
        "options": [
            "A) Peak concentration (Cmax) between 60 - 80 mg/L",
            "B) AUC24 / MIC ratio of 400 - 600 (assuming MIC = 1 mg/L)",
            "C) Trough concentration strictly below 5 mg/L",
            "D) Area under the percentage kill curve > 95%"
        ],
        "correct": 1,
        "rationale": "The ASHP/IDSA/SIDP consensus guidelines mandate an AUC24-to-MIC ratio of 400 to 600 (using Bayesian pharmacokinetic estimation) to maximize bactericidal efficacy while minimizing nephrotoxicity risks.",
        "reference": "ASHP/IDSA/PIDS/SIDP Consensus Guidelines on Vancomycin Therapeutic Monitoring."
    }
]

# Initialize Session States
if "quiz_index" not in st.session_state:
    st.session_state.quiz_index = 0
if "quiz_score" not in st.session_state:
    st.session_state.quiz_score = 0
if "quiz_answers" not in st.session_state:
    st.session_state.quiz_answers = {}
if "selected_view" not in st.session_state:
    st.session_state.selected_view = "Scholar Dashboard"

# ==============================================================================
# 4. SIDEBAR NAVIGATION & TELEMETRY PROFILE
# ==============================================================================
with st.sidebar:
    st.markdown("""
        <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
          <div style="background: linear-gradient(135deg, #257bf3, #22d3ee); color: #070a12; width: 40px; height: 40px; border-radius: 8px; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 16px;">
            PMM
          </div>
          <div>
            <div style="font-weight: 700; font-size: 15px; color: #ffffff;">Pharmaceutics</div>
            <div style="font-size: 11px; color: #22d3ee; font-weight: 600; text-transform: uppercase;">Mastery Matrix</div>
          </div>
        </div>
    """, unsafe_allow_html=True)

    nav_mode = st.radio(
        "Platform Workspace",
        [
            "📊 Scholar Dashboard",
            "🧪 Interactive Quiz Runner",
            "📚 Core Pharmacy Disciplines",
            "🌐 Live PMM Web App (Embedded)",
            "⚙️ Architecture & Supabase"
        ],
        index=0
    )

    st.markdown("---")

    # Scholar Profile Badge
    st.markdown("""
        <div style="background: #131b2e; border: 1px solid #1e293b; border-radius: 8px; padding: 12px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <div style="background: #257bf3; color: white; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 13px;">
              SC
            </div>
            <div>
              <div style="font-weight: 600; font-size: 13px; color: #ffffff;">Dr. Sarah Chen, PharmD</div>
              <div style="font-size: 11px; color: #94a3b8;">Research Fellow</div>
            </div>
          </div>
          <div style="margin-top: 10px; display: flex; gap: 6px; flex-wrap: wrap;">
            <span class="pmm-pill pmm-pill--accent">🔥 18-Day Streak</span>
            <span class="pmm-pill pmm-pill--success">Verified Active</span>
          </div>
        </div>
    """, unsafe_allow_html=True)

    st.markdown("<br>", unsafe_allow_html=True)
    st.caption("PMM Engine v1.0.0 • Session: `PMM-2026-LIVE`")
    st.caption(f"Local Server: [http://localhost:{SERVER_PORT}](http://localhost:{SERVER_PORT})")

# ==============================================================================
# 5. VIEW 1: SCHOLAR DASHBOARD & TELEMETRY
# ==============================================================================
if "Scholar Dashboard" in nav_mode:
    # Welcome Banner
    st.markdown("""
        <div class="pmm-st-card">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 12px;">
            <div>
              <span class="pmm-pill pmm-pill--accent">Active Research Session • ID: PMM-2026-LIVE</span>
              <div class="pmm-hero-title">Welcome back, Scholar Dr. Sarah Chen</div>
              <div class="pmm-hero-subtitle">
                Your overall matrix retention rate is currently at <strong>94.6%</strong> across 6 enrolled disciplines. Next recommended review: <em>Phase I Cytochrome P450 Biotransformation</em>.
              </div>
            </div>
          </div>
        </div>
    """, unsafe_allow_html=True)

    # 4 Performance Metric Cards
    c1, c2, c3, c4 = st.columns(4)
    with c1:
        st.markdown("""
            <div class="pmm-st-card">
              <div class="pmm-stat-lbl">Mastery Accuracy</div>
              <div class="pmm-stat-val">94.6%</div>
              <div class="pmm-stat-sub">↑ +4.2% vs target index</div>
            </div>
        """, unsafe_allow_html=True)
    with c2:
        st.markdown("""
            <div class="pmm-st-card">
              <div class="pmm-stat-lbl">Quizzes Solved</div>
              <div class="pmm-stat-val">142</div>
              <div class="pmm-stat-sub" style="color: #60a5fa;">1,420 Items Verified</div>
            </div>
        """, unsafe_allow_html=True)
    with c3:
        st.markdown("""
            <div class="pmm-st-card">
              <div class="pmm-stat-lbl">Daily Streak</div>
              <div class="pmm-stat-val">18 Days</div>
              <div class="pmm-stat-sub" style="color: #fbbf24;">🔥 Spaced Recall Active</div>
            </div>
        """, unsafe_allow_html=True)
    with c4:
        st.markdown("""
            <div class="pmm-st-card">
              <div class="pmm-stat-lbl">Academic Standing</div>
              <div class="pmm-stat-val" style="font-size: 1.5rem;">Tier IV: Fellow</div>
              <div class="pmm-stat-sub" style="color: #c084fc;">88% to Dean's Scholar</div>
            </div>
        """, unsafe_allow_html=True)

    st.markdown("### 📚 Enrolled Pharmacy Subjects")

    # Subject Cards Grid
    grid_cols = st.columns(3)
    for i, subj in enumerate(SUBJECTS_DATA):
        with grid_cols[i % 3]:
            status_pill = "pmm-pill--success" if subj["status"] == "Active" else "pmm-pill--warning"
            st.markdown(f"""
                <div class="pmm-st-card">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                    <span style="font-family: 'JetBrains Mono', monospace; font-size: 11px; color: #94a3b8;">{subj['code']}</span>
                    <span class="pmm-pill {status_pill}">{subj['category']}</span>
                  </div>
                  <div style="font-size: 1.15rem; font-weight: 700; color: #ffffff; margin-bottom: 6px;">{subj['title']}</div>
                  <div style="font-size: 12px; color: #64748b; margin-bottom: 12px;">{subj['topicsCompleted']}/{subj['totalTopics']} Topics • {subj['mcqsSolved']} MCQs Solved</div>
                  <div style="font-size: 12px; color: #94a3b8; line-height: 1.4; margin-bottom: 16px; min-height: 50px;">{subj['desc']}</div>
                  <div style="display: flex; justify-content: space-between; font-size: 11px; margin-bottom: 4px; color: #94a3b8;">
                    <span>Curriculum Depth</span>
                    <span style="color: #22d3ee; font-weight: 700;">{subj['progress']}%</span>
                  </div>
                </div>
            """, unsafe_allow_html=True)
            st.progress(subj['progress'] / 100.0)

    # Domain Diagnostic Breakdown
    st.markdown("### 📊 Competency Diagnostics & Accuracy Chart")
    df_chart = pd.DataFrame({
        "Discipline": [s["title"].split(" & ")[0] for s in SUBJECTS_DATA],
        "Accuracy (%)": [s["accuracy"] for s in SUBJECTS_DATA],
        "Progress (%)": [s["progress"] for s in SUBJECTS_DATA],
    })

    col_chart, col_feed = st.columns([3, 2])
    with col_chart:
        chart = alt.Chart(df_chart).mark_bar(cornerRadius=6).encode(
            x=alt.X("Discipline:N", sort="-y", title="Pharmacy Discipline"),
            y=alt.Y("Accuracy (%):Q", scale=alt.Scale(domain=[50, 100]), title="Accuracy (%)"),
            color=alt.Color("Accuracy (%):Q", scale=alt.Scale(scheme="tealblues"), legend=None),
            tooltip=["Discipline", "Accuracy (%)", "Progress (%)"]
        ).properties(height=320)
        st.altair_chart(chart, use_container_width=True)

    with col_feed:
        st.markdown("""
            <div class="pmm-st-card" style="height: 320px; overflow-y: auto;">
              <div style="font-size: 14px; font-weight: 700; color: #ffffff; margin-bottom: 12px;">Recent Study Telemetry</div>
              <div style="border-bottom: 1px solid #1e293b; padding-bottom: 8px; margin-bottom: 8px;">
                <span class="pmm-pill pmm-pill--success">Verified 93.3%</span>
                <div style="font-size: 12px; font-weight: 600; color: #f8fafc; margin-top: 4px;">Biopharmaceutics Elimination Kinetics (t1/2)</div>
                <div style="font-size: 11px; color: #64748b;">Pharmaceutics • Score: 14/15 • 2 hours ago</div>
              </div>
              <div style="border-bottom: 1px solid #1e293b; padding-bottom: 8px; margin-bottom: 8px;">
                <span class="pmm-pill pmm-pill--success">Verified 90.0%</span>
                <div style="font-size: 12px; font-weight: 600; color: #f8fafc; margin-top: 4px;">Autonomic Adrenergic Agonists & Antagonists</div>
                <div style="font-size: 11px; color: #64748b;">Pharmacology • Score: 18/20 • Yesterday</div>
              </div>
              <div>
                <span class="pmm-pill pmm-pill--accent">Milestone</span>
                <div style="font-size: 12px; font-weight: 600; color: #f8fafc; margin-top: 4px;">Tier IV: Fellow Standing Achieved</div>
                <div style="font-size: 11px; color: #64748b;">Telemetry Engine • 3 days ago</div>
              </div>
            </div>
        """, unsafe_allow_html=True)

# ==============================================================================
# 6. VIEW 2: INTERACTIVE CLINICAL QUIZ RUNNER (Phase 2 Preview)
# ==============================================================================
elif "Interactive Quiz Runner" in nav_mode:
    st.markdown("""
        <div class="pmm-st-card">
          <span class="pmm-pill pmm-pill--accent">PMM Interactive Quiz Engine</span>
          <div class="pmm-hero-title">Clinical Pharmacy MCQ Simulator</div>
          <div class="pmm-hero-subtitle">
            Solve board-calibrated examination items with real-time compendial citations (USP-NF, Ph. Eur., FDA Guidance).
          </div>
        </div>
    """, unsafe_allow_html=True)

    curr_idx = st.session_state.quiz_index
    q_data = CLINICAL_QUESTIONS[curr_idx]

    # Question Header
    st.markdown(f"""
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div>
            <span class="pmm-pill pmm-pill--primary">{q_data['subject']}</span>
            <span style="font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #94a3b8; margin-left: 8px;">ITEM #{q_data['id']}</span>
          </div>
          <div style="font-size: 12px; color: #22d3ee; font-weight: 600;">
            Question {curr_idx + 1} of {len(CLINICAL_QUESTIONS)}
          </div>
        </div>
    """, unsafe_allow_html=True)

    st.markdown(f"#### {q_data['question']}")

    # Radio Selection
    user_choice = st.radio(
        "Select your clinical response:",
        q_data["options"],
        key=f"q_{curr_idx}"
    )

    selected_option_idx = q_data["options"].index(user_choice)

    col_btn_sub, col_btn_next, col_btn_prev = st.columns([1, 1, 3])
    
    with col_btn_sub:
        submit_clicked = st.button("Submit Answer", use_container_width=True)
    with col_btn_next:
        if st.button("Next Question", use_container_width=True):
            st.session_state.quiz_index = (curr_idx + 1) % len(CLINICAL_QUESTIONS)
            st.rerun()

    if submit_clicked or curr_idx in st.session_state.quiz_answers:
        st.session_state.quiz_answers[curr_idx] = selected_option_idx
        is_correct = selected_option_idx == q_data["correct"]

        if is_correct:
            st.success(f"✓ Correct Response! (+15 Mastery Points)")
        else:
            st.error(f"✗ Review Needed. Correct response: Option {chr(65 + q_data['correct'])}")

        st.markdown(f"""
            <div class="pmm-st-card" style="margin-top: 12px;">
              <div style="font-size: 13px; font-weight: 700; color: #22d3ee; margin-bottom: 6px;">COMPENDIAL RATIONALE</div>
              <div style="font-size: 13px; color: #cbd5e1; line-height: 1.5;">{q_data['rationale']}</div>
              <div style="font-size: 11px; color: #64748b; margin-top: 8px; font-family: 'JetBrains Mono', monospace;">Standard Reference: {q_data['reference']}</div>
            </div>
        """, unsafe_allow_html=True)

# ==============================================================================
# 7. VIEW 3: CORE PHARMACY DISCIPLINES
# ==============================================================================
elif "Core Pharmacy Disciplines" in nav_mode:
    st.markdown("""
        <div class="pmm-st-card">
          <span class="pmm-pill pmm-pill--accent">Comprehensive Curriculum</span>
          <div class="pmm-hero-title">Academic Pharmacy Syllabi & Decks</div>
          <div class="pmm-hero-subtitle">
            Explore structured domains calibrated to university coursework and licensure standards.
          </div>
        </div>
    """, unsafe_allow_html=True)

    for subj in SUBJECTS_DATA:
        with st.expander(f"📘 {subj['title']} ({subj['code']}) — {subj['progress']}% Complete", expanded=False):
            sc1, sc2, sc3 = st.columns(3)
            sc1.metric("MCQs in Compendium", f"{subj['mcqsSolved']} / {subj['totalMcqs']}")
            sc2.metric("Topics Completed", f"{subj['topicsCompleted']} / {subj['totalTopics']}")
            sc3.metric("Cohort Accuracy", f"{subj['accuracy']}%")
            st.markdown(f"**Curriculum Focus:** {subj['desc']}")
            st.progress(subj['progress'] / 100.0)

# ==============================================================================
# 8. VIEW 4: LIVE PMM WEB APP (Embedded Portal View)
# ==============================================================================
elif "Live PMM Web App" in nav_mode:
    st.markdown(f"""
        <div class="pmm-st-card">
          <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap;">
            <div>
              <span class="pmm-pill pmm-pill--accent">Phase 1 HTML5/CSS3 Application Shell</span>
              <div class="pmm-hero-title">Embedded PMM Web Portal</div>
              <div class="pmm-hero-subtitle">Running locally from PMM Workspace on port {SERVER_PORT}.</div>
            </div>
            <div>
              <a href="http://localhost:{SERVER_PORT}/index.html" target="_blank" style="text-decoration: none;">
                <button style="background: #257bf3; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 600; cursor: pointer;">
                  ↗ Open Full Tab
                </button>
              </a>
            </div>
          </div>
        </div>
    """, unsafe_allow_html=True)

    page_choice = st.segmented_control(
        "Select Portal Page to View",
        ["Home Landing (index.html)", "Scholar Dashboard (dashboard.html)", "Sign In (login.html)", "Registration (register.html)"],
        default="Home Landing (index.html)"
    )

    page_map = {
        "Home Landing (index.html)": "index.html",
        "Scholar Dashboard (dashboard.html)": "dashboard.html",
        "Sign In (login.html)": "login.html",
        "Registration (register.html)": "register.html"
    }

    target_page = page_map.get(page_choice, "index.html")
    iframe_url = f"http://localhost:{SERVER_PORT}/{target_page}"

    st.components.v1.iframe(iframe_url, height=850, scrolling=True)

# ==============================================================================
# 9. VIEW 5: ARCHITECTURE & SUPABASE ROADMAP
# ==============================================================================
elif "Architecture" in nav_mode:
    st.markdown("""
        <div class="pmm-st-card">
          <span class="pmm-pill pmm-pill--accent">Engineering Roadmap</span>
          <div class="pmm-hero-title">Modular Architecture & Supabase Preparedness</div>
          <div class="pmm-hero-subtitle">
            Designed according to strict Phase 1 specifications with decoupled adapter architecture.
          </div>
        </div>
    """, unsafe_allow_html=True)

    ac1, ac2 = st.columns(2)
    with ac1:
        st.markdown("""
            <div class="pmm-st-card">
              <h4>Phase 1: Foundation & Auth Shell (Complete ✅)</h4>
              <ul style="color: #cbd5e1; font-size: 13px; line-height: 1.8;">
                <li>✓ Full PMM Dark Mode Design System (Tokens, Layout, Components)</li>
                <li>✓ Responsive Landing Page with Interactive HUD Simulator</li>
                <li>✓ Scholar Login & Registration with Live Security Meter</li>
                <li>✓ Modular Adapter Pattern (<code>AuthService</code> & <code>DataService</code>)</li>
                <li>✓ Route Protection Guards (<code>PMM_Guard</code>)</li>
                <li>✓ Verified Zero Linter & Accessibility Errors</li>
              </ul>
            </div>
        """, unsafe_allow_html=True)

    with ac2:
        st.markdown("""
            <div class="pmm-st-card">
              <h4>Phase 2: Supabase Integration (Ready ⏳)</h4>
              <ul style="color: #cbd5e1; font-size: 13px; line-height: 1.8;">
                <li>• PostgreSQL Schema (<code>profiles</code>, <code>subjects</code>, <code>questions</code>)</li>
                <li>• Row-Level Security (RLS) policies</li>
                <li>• Seamless swap from <code>MockAuthAdapter</code> to <code>SupabaseAuthAdapter</code></li>
                <li>• Standalone Question Runner Engine</li>
                <li>• Zero modifications required on UI view templates</li>
              </ul>
            </div>
        """, unsafe_allow_html=True)
