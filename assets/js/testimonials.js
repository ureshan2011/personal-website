/* ==========================================================================
   Student Voices — mock testimonial data for the hero globe.
   Replace these entries with real student feedback when ready.
   Each entry:
     name    – student name (or initials for privacy)
     program – course / context
     country – display name
     code    – short label shown on the globe
     region  – used for the filter pills + avatar tint
     lat,lng – map coordinates (decimal degrees) for the globe marker
     rating  – 1–5 (drives the star row + sentiment)
     quote   – the testimonial text
   ========================================================================== */
window.STUDENT_VOICES = [
  {
    name: "Priya Madhavan",
    program: "MSc Information Systems · Yoobee College",
    country: "Sri Lanka", code: "LK", region: "Asia",
    lat: 6.9271, lng: 79.8612, rating: 5,
    quote: "He made the hardest systems concepts finally click. Every lecture felt like a game I actually wanted to win."
  },
  {
    name: "Liam Carter",
    program: "Capstone supervisee · University of Canterbury",
    country: "New Zealand", code: "NZ", region: "Oceania",
    lat: -43.5321, lng: 172.6362, rating: 5,
    quote: "Yasas pushed my AR project further than I thought I could take it — rigorous feedback, always delivered with kindness."
  },
  {
    name: "Aarav Sharma",
    program: "Project Management cohort",
    country: "India", code: "IN", region: "Asia",
    lat: 12.9716, lng: 77.5946, rating: 5,
    quote: "The most engaging lecturer I've had. He turns dense theory into stories you remember months later."
  },
  {
    name: "Yuki Tanaka",
    program: "XR Design workshop",
    country: "Japan", code: "JP", region: "Asia",
    lat: 35.6762, lng: 139.6503, rating: 4.5,
    quote: "His spatial-computing session reshaped how our whole studio thinks about immersive interaction."
  },
  {
    name: "Maya Robinson",
    program: "Online MOOC — AR Fundamentals",
    country: "United States", code: "US", region: "Americas",
    lat: 40.7128, lng: -74.0060, rating: 5,
    quote: "I took his free course on a whim and ended up changing my career into HCI. That's the kind of teacher he is."
  },
  {
    name: "Oliver Bennett",
    program: "Guest lecture series",
    country: "United Kingdom", code: "GB", region: "Europe",
    lat: 51.5074, lng: -0.1278, rating: 5,
    quote: "Clear, generous, and genuinely current. He connects research to real products better than anyone I've studied under."
  },
  {
    name: "Lena Hoffmann",
    program: "Research methods seminar",
    country: "Germany", code: "DE", region: "Europe",
    lat: 52.5200, lng: 13.4050, rating: 4.5,
    quote: "Structured, patient, and deeply knowledgeable. My thesis design improved dramatically after his guidance."
  },
  {
    name: "Charlotte Nguyen",
    program: "Information Systems elective",
    country: "Australia", code: "AU", region: "Oceania",
    lat: -33.8688, lng: 151.2093, rating: 5,
    quote: "He cares whether you actually understand — not whether you pass. Rare and unforgettable."
  },
  {
    name: "Lucas Almeida",
    program: "MOOC learner — Immersive Media",
    country: "Brazil", code: "BR", region: "Americas",
    lat: -23.5505, lng: -46.6333, rating: 5,
    quote: "From São Paulo, his course felt like sitting in the front row of a world-class lab. Inspiring from start to finish."
  },
  {
    name: "Sophie Tremblay",
    program: "Thesis supervisee",
    country: "Canada", code: "CA", region: "Americas",
    lat: 43.6532, lng: -79.3832, rating: 5,
    quote: "He believed in my idea before I did, then gave me the tools to prove it. I defended with confidence."
  },
  {
    name: "Wei Lin Tan",
    program: "Project Management cohort",
    country: "Singapore", code: "SG", region: "Asia",
    lat: 1.3521, lng: 103.8198, rating: 5,
    quote: "Gamified, practical, and demanding in the best way. Easily the highlight of my postgrad year."
  },
  {
    name: "Adaeze Okonkwo",
    program: "Online MOOC — AR Fundamentals",
    country: "Nigeria", code: "NG", region: "Africa",
    lat: 6.5244, lng: 3.3792, rating: 5,
    quote: "Access to teaching this good, for free, from Lagos — it genuinely opened a door for me into XR."
  },
  {
    name: "Omar Al-Farsi",
    program: "Spatial computing workshop",
    country: "United Arab Emirates", code: "AE", region: "Middle East",
    lat: 25.2048, lng: 55.2708, rating: 4.5,
    quote: "He balances academic depth with industry pragmatism — exactly what our innovation team needed."
  },
  {
    name: "Sanne de Vries",
    program: "HCI guest seminar",
    country: "Netherlands", code: "NL", region: "Europe",
    lat: 52.3676, lng: 4.9041, rating: 5,
    quote: "Warm, sharp, and endlessly curious. You leave his sessions thinking differently about technology and people."
  },
  {
    name: "Nimal Perera",
    program: "BSc capstone supervisee",
    country: "Sri Lanka", code: "LK", region: "Asia",
    lat: 6.9271, lng: 79.8612, rating: 5,
    quote: "He treated my undergraduate project like real research. That belief changed the trajectory of my career."
  },
  {
    name: "Dilani Fernando",
    program: "MOOC learner — AR Fundamentals",
    country: "Sri Lanka", code: "LK", region: "Asia",
    lat: 6.9271, lng: 79.8612, rating: 4.5,
    quote: "Studying from Kandy, his lessons were the clearest introduction to AR I could find anywhere online."
  },
  {
    name: "Rohan Gupta",
    program: "Project Management cohort",
    country: "India", code: "IN", region: "Asia",
    lat: 12.9716, lng: 77.5946, rating: 5,
    quote: "Practical, patient, and genuinely invested in our progress. I still use his frameworks at work today."
  },
  {
    name: "Emma Thompson",
    program: "XR Design workshop",
    country: "New Zealand", code: "NZ", region: "Oceania",
    lat: -43.5321, lng: 172.6362, rating: 5,
    quote: "He bridges deep theory and hands-on building better than any lecturer I've worked with at Canterbury."
  }
];
