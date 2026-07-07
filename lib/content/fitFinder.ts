// GENERATED from Beyond — The Architecture of Alternatives (R3), 2026-07.
// Source of truth for educational content. Edit deliberately — copy is compliance-reviewed.
import type { FitProfile, FitQuestion } from './types';

export const FIT_PROFILES: Record<string, FitProfile> = {
  "mf": {
    "liq": 5,
    "risk": 3,
    "cf": false,
    "hz": [
      1,
      2,
      3
    ],
    "obj": {
      "grow": 3,
      "bal": 3,
      "inc": 1,
      "pres": 1,
      "frontier": 0
    }
  },
  "fdplus": {
    "liq": 4,
    "risk": 1,
    "cf": true,
    "hz": [
      1,
      2
    ],
    "obj": {
      "grow": 0,
      "bal": 1,
      "inc": 3,
      "pres": 3,
      "frontier": 0
    }
  },
  "dpms": {
    "liq": 3,
    "risk": 2,
    "cf": true,
    "hz": [
      1,
      2
    ],
    "obj": {
      "grow": 0,
      "bal": 1,
      "inc": 3,
      "pres": 2,
      "frontier": 0
    }
  },
  "reit": {
    "liq": 5,
    "risk": 2,
    "cf": true,
    "hz": [
      2,
      3
    ],
    "obj": {
      "grow": 1,
      "bal": 3,
      "inc": 3,
      "pres": 1,
      "frontier": 0
    }
  },
  "mn": {
    "liq": 3,
    "risk": 2,
    "cf": true,
    "hz": [
      1
    ],
    "obj": {
      "grow": 0,
      "bal": 2,
      "inc": 2,
      "pres": 3,
      "frontier": 0
    }
  },
  "lssif": {
    "liq": 3,
    "risk": 2,
    "cf": false,
    "hz": [
      2,
      3
    ],
    "obj": {
      "grow": 2,
      "bal": 3,
      "inc": 1,
      "pres": 2,
      "frontier": 0
    }
  },
  "pcredit": {
    "liq": 1,
    "risk": 2,
    "cf": true,
    "hz": [
      2,
      3
    ],
    "obj": {
      "grow": 0,
      "bal": 1,
      "inc": 3,
      "pres": 2,
      "frontier": 0
    }
  },
  "gift": {
    "liq": 2,
    "risk": 3,
    "cf": false,
    "hz": [
      3,
      4
    ],
    "obj": {
      "grow": 3,
      "bal": 2,
      "inc": 0,
      "pres": 1,
      "frontier": 1
    }
  },
  "loaif": {
    "liq": 2,
    "risk": 4,
    "cf": false,
    "hz": [
      3,
      4
    ],
    "obj": {
      "grow": 3,
      "bal": 1,
      "inc": 0,
      "pres": 0,
      "frontier": 1
    }
  },
  "pms": {
    "liq": 3,
    "risk": 4,
    "cf": false,
    "hz": [
      3,
      4
    ],
    "obj": {
      "grow": 3,
      "bal": 1,
      "inc": 0,
      "pres": 0,
      "frontier": 1
    }
  },
  "pe": {
    "liq": 0,
    "risk": 4,
    "cf": false,
    "hz": [
      4
    ],
    "obj": {
      "grow": 2,
      "bal": 0,
      "inc": 0,
      "pres": 0,
      "frontier": 2
    }
  },
  "preipo": {
    "liq": 1,
    "risk": 5,
    "cf": false,
    "hz": [
      3,
      4
    ],
    "obj": {
      "grow": 2,
      "bal": 0,
      "inc": 0,
      "pres": 0,
      "frontier": 3
    }
  },
  "vc": {
    "liq": 0,
    "risk": 5,
    "cf": false,
    "hz": [
      4
    ],
    "obj": {
      "grow": 1,
      "bal": 0,
      "inc": 0,
      "pres": 0,
      "frontier": 3
    }
  }
};

export const FIT_QUESTIONS: FitQuestion[] = [
  {
    "k": "obj",
    "q": "What is this pool of capital primarily for?",
    "why": "The objective decides the architecture — everything else is engineering.",
    "opts": [
      [
        "pres",
        "Protecting what exists",
        "Capital preservation first"
      ],
      [
        "inc",
        "Producing regular income",
        "Cashflow to the bank account"
      ],
      [
        "bal",
        "Balanced, steadier growth",
        "Growth with a smoother ride"
      ],
      [
        "grow",
        "Aggressive long-term growth",
        "Maximum compounding"
      ],
      [
        "frontier",
        "A calculated frontier bet",
        "High-risk, high-possibility sleeve"
      ]
    ]
  },
  {
    "k": "hz",
    "q": "When might you genuinely need this money back?",
    "why": "Horizon is the honest question — everything locked must mature before you need it.",
    "opts": [
      [
        1,
        "Within 1–3 years",
        ""
      ],
      [
        2,
        "3–5 years",
        ""
      ],
      [
        3,
        "5–7 years",
        ""
      ],
      [
        4,
        "7+ years — this is patient capital",
        ""
      ]
    ]
  },
  {
    "k": "risk",
    "q": "A ₹1 Cr allocation falls to ₹80 L in a sharp correction. Your honest reaction?",
    "why": "Risk appetite measured in rupees, not adjectives.",
    "opts": [
      [
        1,
        "Unacceptable — I would exit",
        "Capital safety dominates"
      ],
      [
        2,
        "Very uncomfortable, but I would hold",
        "Low tolerance"
      ],
      [
        3,
        "Expected occasionally — part of investing",
        "Moderate tolerance"
      ],
      [
        4,
        "I would consider adding more",
        "High tolerance"
      ]
    ]
  },
  {
    "k": "lock",
    "q": "How much lock-in can this capital genuinely accept?",
    "why": "Illiquidity is the price of several premium return streams — but only if it is affordable.",
    "opts": [
      [
        4,
        "None — I need exit within days",
        ""
      ],
      [
        3,
        "Up to 1 year is fine",
        ""
      ],
      [
        2,
        "2–4 years is acceptable",
        ""
      ],
      [
        1,
        "5+ years — truly long-term",
        ""
      ]
    ]
  },
  {
    "k": "cf",
    "q": "Do you want this investment to pay you regularly along the way?",
    "why": "Cashflow products and compounding products are built differently.",
    "opts": [
      [
        true,
        "Yes — periodic income matters",
        "Distributions to bank"
      ],
      [
        false,
        "No — let it all compound",
        "Growth over payouts"
      ]
    ]
  },
  {
    "k": "ticket",
    "q": "What is the realistic size of this deployment?",
    "why": "SEBI sets hard minimums — ₹10 L for SIFs, ₹50 L for PMS, ₹1 Cr for AIFs.",
    "opts": [
      [
        9,
        "Under ₹10 L",
        ""
      ],
      [
        49,
        "₹10 L – ₹50 L",
        ""
      ],
      [
        99,
        "₹50 L – ₹1 Cr",
        ""
      ],
      [
        500,
        "₹1 Cr and above",
        ""
      ]
    ]
  },
  {
    "k": "res",
    "q": "What is your residency status?",
    "why": "Residency changes taxation, routes and even eligibility.",
    "opts": [
      [
        "res",
        "Resident Indian",
        ""
      ],
      [
        "nri",
        "NRI / OCI",
        "Includes US & Canada residents"
      ]
    ]
  }
];
