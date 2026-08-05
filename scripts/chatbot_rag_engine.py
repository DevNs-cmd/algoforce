#!/usr/bin/env python3
"""
AlgoForce AI Chatbot RAG Engine
-------------------------------
Retrieval-Augmented Generation (RAG) Engine powered by Vector Similarity (TF-IDF Cosine Similarity
and BM25-style Keyword Scoring) to query AlgoForce website knowledge accurately.
"""

import json
import math
import re
import sys

# Structured Knowledge Base compiled from the complete AlgoForce Website & Codebase
ALGOFORCE_KNOWLEDGE_DOCS = [
    {
        "id": "summit_general",
        "category": "Summit 2026",
        "title": "AlgoForce AI Transformation Summit Delhi 2026",
        "content": (
            "The AlgoForce AI Transformation Summit Delhi 2026 takes place on 28 October 2026 in Delhi from 9 AM to 6 PM. "
            "Theme: 'Stop Buying AI. Start Deploying AI.' Audience: Founders, CXOs, business leaders, startup teams, and AI innovators. "
            "Registration links: Luma (https://luma.com/t1m4rkst?tk=GuW27n) and Unstop (https://unstop.com/o/a9xApLV)."
        ),
        "keywords": ["summit", "delhi", "2026", "october", "event", "luma", "unstop", "ticket", "register", "conference"]
    },
    {
        "id": "summit_topics_passes",
        "category": "Summit 2026",
        "title": "Summit Key Topics and Pass Categories",
        "content": (
            "Summit Pass Tiers: Student Pass (Valid Student ID Required) and Professional Pass (Founders, CXOs & Professionals). "
            "Every attendee receives: AI Readiness Assessment, AI Strategy Roadmap, Enterprise AI Playbook, Networking Session, and Live AI Demonstrations. "
            "Key Topics covered: Why 90% AI Projects Fail, AI Agents vs Enterprise Systems, Building AI Employees, AI for Sales, AI for HR, AI for Finance, AI for Operations, Live AI Deployment, and Future of AI Companies."
        ),
        "keywords": ["student pass", "professional pass", "key topics", "deliverables", "playbook", "roadmap", "networking", "agenda"]
    },
    {
        "id": "tallygpt_finance",
        "category": "TallyGPT",
        "title": "TallyGPT - AlgoForce Finance AI",
        "content": (
            "TallyGPT (AlgoForce Finance AI) connects directly with Tally Prime to automate accounting workflows, GST autopilot, and ledger registers without replacing Tally. "
            "Eliminates manual copy-pasting, provides an Executive Dashboard, real-time financial insights, and automated transaction verification. "
            "Desktop installer executable is available at /releases/tallygpt-desktop.exe."
        ),
        "keywords": ["tally", "tallygpt", "finance", "accounting", "gst", "ledger", "tally prime", "dashboard", "exe", "download"]
    },
    {
        "id": "leadbolt_whatsapp",
        "category": "LeadBolt",
        "title": "LeadBolt & Official WhatsApp Automation",
        "content": (
            "LeadBolt is AlgoForce's automated sales lead response software. It integrates official WhatsApp Cloud APIs directly with CRM databases (Salesforce, Zoho, HubSpot, Tally). "
            "Qualifies inbound leads within seconds, automates booking calls, and eliminates manual data entry for sales teams."
        ),
        "keywords": ["leadbolt", "whatsapp", "crm", "sales", "leads", "inbound", "qualification", "zoho", "salesforce", "api"]
    },
    {
        "id": "factory_hotel_corpbrain",
        "category": "Products",
        "title": "FactoryGPT, HotelGPT & Corporate Brain",
        "content": (
            "• FactoryGPT: Computer vision quality-inspection and defect detection software for manufacturing plants.\n"
            "• HotelGPT: Guest communication, WhatsApp concierge, and booking workflow automation for hotels & hospitality.\n"
            "• Corporate Brain: Secure internal company knowledge base AI for SOPs, HR policies, and employee document search."
        ),
        "keywords": ["factorygpt", "hotelgpt", "corporate brain", "manufacturing", "hotel", "guest", "sop", "policy", "inspection", "quality"]
    },
    {
        "id": "orion_space",
        "category": "Orion",
        "title": "Orion Advanced Space Systems Initiative",
        "content": (
            "Orion is AlgoForce's Advanced Space Systems Initiative. It focuses on autonomous spacecraft engineering, orbital infrastructure, robotics, satellite star trackers, and mission control intelligence. "
            "Connects systems engineers and hardware builders for long-horizon space missions. Explore more on the /orion page."
        ),
        "keywords": ["orion", "space", "spacecraft", "satellite", "orbital", "robotics", "star tracker", "mission control"]
    },
    {
        "id": "ecosystem_divisions",
        "category": "Ecosystem",
        "title": "Crucible, AlgoForce Labs & Velqora",
        "content": (
            "• Crucible: Startup incubation platform supporting early-stage founders from concept to MVP.\n"
            "• AlgoForce Labs: Developer talent division training engineers to build production enterprise AI systems.\n"
            "• Velqora: Booking, contract, and event management OS for live entertainment performers and talent agencies."
        ),
        "keywords": ["crucible", "labs", "velqora", "incubation", "talent", "performers", "entertainment", "startup"]
    },
    {
        "id": "pricing_retainers",
        "category": "Pricing",
        "title": "Pricing Tiers, Retainers & Invoicing",
        "content": (
            "AlgoForce offers transparent retainer plans starting from $29/mo and milestone-based proposal pricing. "
            "Start with a Free Product Demo and 30-Minute AI Audit. Custom deployments include scoped architecture, integration, and monthly maintenance. "
            "All payments are processed securely via Razorpay with full GST compliance."
        ),
        "keywords": ["pricing", "price", "cost", "retainer", "fee", "$29", "razorpay", "gst", "invoice", "milestone", "audit"]
    },
    {
        "id": "founder_agency_legal",
        "category": "Company",
        "title": "Founder Dev N Suman, Legal Name & MSME Registration",
        "content": (
            "AlgoForce AI OS was founded in June 2026 by Dev N Suman in New Delhi. Dev is an enterprise systems architect, SaaS developer, and Next.js performance engineer.\n"
            "AlgoForce AI is a Government of India registered MSME unit with Udyam ID: UDYAM-DL-08-0122150.\n"
            "Global HQ: South East Delhi, Kalkaji, New Delhi – 110019, India. Phone: +91 8448947436. Email: contact@algoforceai.com. Hours: Mon-Fri 9 AM - 6 PM IST."
        ),
        "keywords": ["founder", "dev", "suman", "msme", "udyam", "udyam-dl-08-0122150", "address", "phone", "email", "delhi", "kalkaji", "contact", "hq"]
    },
    {
        "id": "security_privacy",
        "category": "Security",
        "title": "Data Privacy, Cloud Security & VPC Hosting",
        "content": (
            "AlgoForce enforces strict enterprise data security. We support Private Cloud VPC (AWS, Azure, GCP) and on-premises local LLM deployments (e.g. Llama 3) to prevent data leaks. "
            "Your company data is never used to train public AI models. All access controls and database endpoints are encrypted."
        ),
        "keywords": ["privacy", "security", "vpc", "cloud", "aws", "azure", "llama", "on-premise", "encryption", "leak"]
    }
]

def tokenize(text):
    """Normalize and extract words from string."""
    text = text.lower()
    return re.findall(r'\w+', text)

class SimpleRAGEngine:
    """TF-IDF and Cosine Similarity Retrieval Engine."""
    def __init__(self, docs):
        self.docs = docs
        self.vocab = set()
        self.doc_tokens = []
        self.idf = {}
        self.doc_vectors = []
        
        self._build_index()

    def _build_index(self):
        N = len(self.docs)
        for doc in self.docs:
            full_text = f"{doc['title']} {doc['content']} {' '.join(doc['keywords'])}"
            tokens = tokenize(full_text)
            self.doc_tokens.append(tokens)
            self.vocab.update(tokens)

        # Compute IDF
        for term in self.vocab:
            doc_count = sum(1 for tokens in self.doc_tokens if term in tokens)
            self.idf[term] = math.log((N + 1) / (doc_count + 1)) + 1.0

        # Compute Document Vectors
        for tokens in self.doc_tokens:
            vec = self._vectorize(tokens)
            self.doc_vectors.append(vec)

    def _vectorize(self, tokens):
        tf = {}
        for token in tokens:
            tf[token] = tf.get(token, 0) + 1
        
        length = len(tokens) or 1
        vec = {}
        for token, count in tf.items():
            if token in self.idf:
                vec[token] = (count / length) * self.idf[token]
        return vec

    def _cosine_similarity(self, vec1, vec2):
        dot_product = sum(vec1.get(t, 0) * vec2.get(t, 0) for t in vec1 if t in vec2)
        norm1 = math.sqrt(sum(val ** 2 for val in vec1.values()))
        norm2 = math.sqrt(sum(val ** 2 for val in vec2.values()))
        if norm1 == 0 or norm2 == 0:
            return 0.0
        return dot_product / (norm1 * norm2)

    def query(self, user_query, top_k=2):
        q_tokens = tokenize(user_query)
        q_vec = self._vectorize(q_tokens)

        scores = []
        for i, doc in enumerate(self.docs):
            sim = self._cosine_similarity(q_vec, self.doc_vectors[i])
            
            # Keyword match boost
            kw_matches = sum(1 for kw in doc['keywords'] if kw in q_tokens)
            score = sim + (kw_matches * 0.15)
            scores.append((score, doc))

        scores.sort(key=lambda x: x[0], reverse=True)
        return scores[:top_k]

def main():
    rag = SimpleRAGEngine(ALGOFORCE_KNOWLEDGE_DOCS)
    
    print("=" * 65)
    print("      ALGOFORCE AI - RAG KNOWLEDGE ENGINE INITIALIZED")
    print(f"      Indexed {len(ALGOFORCE_KNOWLEDGE_DOCS)} Document Chunks Across Website")
    print("=" * 65)

    test_queries = [
        "When is the AlgoForce AI Summit in Delhi?",
        "How does TallyGPT work for accounting?",
        "What is your MSME registration number?",
        "Who is the founder of AlgoForce?",
        "What is Orion space systems?"
    ]

    for q in test_queries:
        print(f"\nQUERY: '{q}'")
        results = rag.query(q, top_k=1)
        for score, doc in results:
            print(f" -> SCORE: {score:.3f} | CATEGORY: {doc['category']}")
            print(f" -> TITLE:  {doc['title']}")
            print(f" -> RESULT: {doc['content'][:140]}...")

if __name__ == "__main__":
    main()
