/**
 * Pharmaceutics Mastery Matrix (PMM) - Mock Data Adapter
 * Provides realistic dashboard data models for Phase 1.
 * Later replaced by Supabase PostgreSQL tables in Phase 2.
 */

(function (global) {
  'use strict';

  const MOCK_SUBJECTS = [
    {
      id: 'subj_pceut',
      code: 'PMM-PCEUT-201',
      title: 'Pharmaceutics & Biopharmaceutics',
      category: 'Clinical Core',
      progress: 82,
      topicsCompleted: 23,
      totalTopics: 28,
      mcqsSolved: 420,
      totalMcqs: 1180,
      accuracy: 94.2,
      lastActive: 'Today',
      status: 'Active'
    },
    {
      id: 'subj_pharm',
      code: 'PMM-PHARM-101',
      title: 'Pharmacology & Therapeutics',
      category: 'Intermediate',
      progress: 68,
      topicsCompleted: 24,
      totalTopics: 34,
      mcqsSolved: 310,
      totalMcqs: 1420,
      accuracy: 91.4,
      lastActive: 'Yesterday',
      status: 'Active'
    },
    {
      id: 'subj_clin',
      code: 'PMM-CLIN-501',
      title: 'Clinical Pharmacy & TDM',
      category: 'Clinical Case',
      progress: 55,
      topicsCompleted: 20,
      totalTopics: 36,
      mcqsSolved: 290,
      totalMcqs: 1600,
      accuracy: 93.5,
      lastActive: '2 days ago',
      status: 'Active'
    },
    {
      id: 'subj_medchem',
      code: 'PMM-MEDCHEM-401',
      title: 'Medicinal Chemistry & SAR',
      category: 'Advanced Analytical',
      progress: 30,
      topicsCompleted: 9,
      totalTopics: 30,
      mcqsSolved: 180,
      totalMcqs: 1350,
      accuracy: 76.5,
      lastActive: '3 days ago',
      status: 'Review Needed'
    },
    {
      id: 'subj_anal',
      code: 'PMM-ANAL-601',
      title: 'Pharmaceutical Analysis & HPLC',
      category: 'Instrumentation',
      progress: 42,
      topicsCompleted: 11,
      totalTopics: 26,
      mcqsSolved: 140,
      totalMcqs: 980,
      accuracy: 86.8,
      lastActive: '4 days ago',
      status: 'Active'
    },
    {
      id: 'subj_pcog',
      code: 'PMM-PCOG-301',
      title: 'Pharmacognosy & Phytomedicine',
      category: 'Foundational',
      progress: 45,
      topicsCompleted: 10,
      totalTopics: 22,
      mcqsSolved: 80,
      totalMcqs: 890,
      accuracy: 85.0,
      lastActive: '1 week ago',
      status: 'Active'
    }
  ];

  const MOCK_ACTIVITIES = [
    {
      id: 'act_001',
      type: 'quiz_completed',
      title: 'Biopharmaceutics Elimination Kinetics (t1/2 & Clearance)',
      subject: 'Pharmaceutics',
      score: '14 / 15',
      accuracy: 93.3,
      timestamp: '2 hours ago',
      badge: 'Verified'
    },
    {
      id: 'act_002',
      type: 'quiz_completed',
      title: 'Autonomic Adrenergic Receptor Agonists & Antagonists',
      subject: 'Pharmacology',
      score: '18 / 20',
      accuracy: 90.0,
      timestamp: 'Yesterday',
      badge: 'Verified'
    },
    {
      id: 'act_003',
      type: 'milestone',
      title: 'Achieved Tier IV Senior Fellow Milestone',
      subject: 'Mastery Matrix',
      score: 'Retention >= 90%',
      accuracy: null,
      timestamp: '3 days ago',
      badge: 'Honors'
    },
    {
      id: 'act_004',
      type: 'quiz_completed',
      title: 'Vancomycin AUC/MIC Therapeutic Drug Monitoring Protocol',
      subject: 'Clinical Pharmacy',
      score: '10 / 10',
      accuracy: 100.0,
      timestamp: '4 days ago',
      badge: 'Perfect'
    }
  ];

  class MockDataAdapter {
    async getDashboardMetrics(userId) {
      await new Promise((r) => setTimeout(r, 150));
      return {
        accuracy: 94.6,
        quizzesCompleted: 142,
        streakDays: 18,
        masteryLevel: 'Tier IV: Fellow',
        masteryPercentage: 88,
        totalQuestionsAnswered: 1420
      };
    }

    async getEnrolledSubjects(userId) {
      await new Promise((r) => setTimeout(r, 150));
      return MOCK_SUBJECTS;
    }

    async getRecentActivity(userId) {
      await new Promise((r) => setTimeout(r, 150));
      return MOCK_ACTIVITIES;
    }
  }

  global.PMM_MockDataAdapter = new MockDataAdapter();
})(typeof window !== 'undefined' ? window : this);
