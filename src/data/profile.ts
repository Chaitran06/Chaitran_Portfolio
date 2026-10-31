// Single source of truth for the website AND the AI assistant / JD matcher.
// Edit this file to update both. Keep every claim here factual: the AI is told
// to answer only from what is written below.

export type ProjectCategory = "Research" | "GenAI" | "Deep Learning" | "Full-stack";

export interface Project {
  id: string;
  /** Short label shown under the folder icon. */
  folderName: string;
  title: string;
  category: ProjectCategory;
  context: string;
  summary: string;
  highlights: string[];
  metrics: { value: string; label: string }[];
  tags: string[];
  links: { label: string; url: string }[];
  featured?: boolean;
}

export const profile = {
  name: "V. Sree Chaitran",
  fullName: "Vanagarouthu Sree Chaitran",
  headline: "AI/ML & Software Engineer",
  location: "Hyderabad, Telangana, India",
  email: "chaitran.jobs@gmail.com",
  github: "https://github.com/Chaitran06",
  linkedin: "https://www.linkedin.com/in/vanagarouthu-sreechaitran-b0152525a/",
  resumeUrl: "/V_Sree_Chaitran_Resume.pdf",
  openTo: "AI/ML, Machine Learning, Data Science, GenAI and Software Development (SDE) roles (internships and full-time)",
  about: [
    "I'm an M.Tech student in Mathematics and Computing at NIT Delhi, with a B.Tech in Computer Science (IoT) from VIT Vellore. My core interest is AI/ML.",
    "My research applies vision transformers to climate science: Swin-Transformer U-Nets that forecast Arctic sea ice 1-6 months ahead, evaluated with leakage-free cross-validation, ablations and significance testing.",
    "On the applied side, I build LLM systems such as hybrid-search RAG pipelines, agents, structured-output extractors and a vector database written from scratch in C++. I also build the FastAPI and React services around them.",
  ],
  focusAreas: [
    {
      title: "Scientific deep learning",
      text: "Spatiotemporal forecasting with Swin Transformers, U-Nets, LSTMs and CNNs on reanalysis and satellite data.",
    },
    {
      title: "LLM & RAG systems",
      text: "Hybrid retrieval (dense + BM25), vector databases, agents, grounding checks and RAG evaluation on golden datasets.",
    },
    {
      title: "Rigorous evaluation",
      text: "Leakage-free validation, baselines of matched capacity, bootstrap resampling and FDR-corrected significance tests.",
    },
  ],
  education: [
    {
      school: "National Institute of Technology (NIT) Delhi",
      degree: "M.Tech, Mathematics and Computing",
      period: "Aug 2025 – May 2027 (expected)",
      grade: "CGPA 7.25/10",
      notes: "",
    },
    {
      school: "Vellore Institute of Technology (VIT), Vellore",
      degree: "B.Tech, Computer Science and Engineering with IoT",
      period: "Sep 2020 – May 2024",
      grade: "CGPA 7.86/10",
      notes: "Final-year project: real-time cricket shot and umpire gesture detection with deep learning.",
    },
  ],
  coursework: [
    "Data Structures & Algorithms",
    "Machine Learning",
    "Artificial Intelligence",
    "Operating Systems",
    "Database Management",
    "Cloud Computing",
    "Computer Networks",
    "Cyber Security",
  ],
  experience: [
    {
      role: "Artificial Intelligence Intern",
      org: "SmartBridge (with IBM)",
      period: "May 2023 – Jul 2023",
      points: [
        "Built an emotion-based movie recommendation system, with movie data collected by Python web scraping from multiple online sources.",
        "Developed an emotion-driven recommendation model using NLP and sentiment analysis to suggest movies matching the user's emotional state.",
        "Delivered real-time recommendations through an interactive Flask web interface.",
      ],
    },
    {
      role: "Placement Coordinator",
      org: "NIT Delhi",
      period: "Jan 2026 – May 2027",
      points: ["Coordinate campus placement activities between recruiters and students."],
    },
    {
      role: "Core Committee Member",
      org: "Nature Lovers Club, VIT Vellore",
      period: "Jan 2023 – Jan 2024",
      points: ["Part of the core team organising club activities and events."],
    },
  ],
  projects: [
    {
      id: "arctic",
      folderName: "Arctic Sea-Ice Forecasting",
      title: "Seasonal Arctic Sea-Ice Forecasting with Swin-UNet",
      category: "Research",
      context: "Independent research",
      summary:
        "A Swin-UNet pipeline that forecasts Arctic sea-ice concentration 1-6 months ahead. It isolates how much skill comes from sea-ice thickness inputs.",
      highlights: [
        "Built an 18-channel spatiotemporal input (concentration, anomaly, climatology, thickness) on a 96×96 north-polar grid from NSIDC-0051 and PIOMAS data.",
        "Trained a 60-model ensemble (20 folds × 3 seeds) under a leakage-free, leave-one-year-out protocol, with bootstrap resampling and FDR-corrected significance tests.",
        "Removing spring sea-ice thickness lowered September ACC at a 4-month lead by 58.9 points (p = 0.031, FDR 0.10).",
        "Compared against CNN U-Nets at matched (15M) and larger (140M) parameter scales to separate the effect of capacity from that of architecture. The 140M U-Net did worse than the 15M one at 3 of 6 leads.",
        "Out-of-sample correlation over 2020-2023 was 0.80-0.93 across leads.",
      ],
      metrics: [
        { value: "60", label: "model ensemble" },
        { value: "p=0.031", label: "thickness effect" },
        { value: "0.80–0.93", label: "out-of-sample r" },
      ],
      tags: ["Python", "TensorFlow/Keras", "Swin-UNet", "xarray", "SciPy", "NSIDC", "PIOMAS", "Kaggle GPU"],
      links: [{ label: "GitHub", url: "https://github.com/Chaitran06/arctic-seaice-swinunet" }],
      featured: true,
    },
    {
      id: "vehicle-rag",
      folderName: "Vehicle Spec RAG",
      title: "Vehicle Spec Extraction RAG (F-150 Spec Finder)",
      category: "GenAI",
      context: "Applied GenAI system",
      summary:
        "A RAG pipeline that extracts torque values, fluid capacities, part numbers and tolerances from a 2014 Ford F-150 workshop manual, served through a web UI and an API.",
      highlights: [
        "Built hybrid retrieval: MiniLM embeddings in Qdrant plus BM25, merged with reciprocal rank fusion.",
        "Used an LLM (Groq gpt-oss-120b, JSON mode) for structured extraction, with a grounding check against the source text.",
        "Reached 98.6% row recall@6 on 104 queries and 81.0% extraction F1, against 70.4% for a rules-based baseline.",
        "Deployed with FastAPI on Vercel and Hugging Face Spaces.",
      ],
      metrics: [
        { value: "98.6%", label: "recall@6" },
        { value: "81.0%", label: "extraction F1" },
        { value: "+10.6", label: "F1 pts vs rules baseline" },
      ],
      tags: ["RAG", "Qdrant", "BM25", "Reciprocal rank fusion", "MiniLM", "PyMuPDF", "FastAPI", "Groq"],
      links: [{ label: "GitHub", url: "https://github.com/Chaitran06/vehicle-spec-rag-predii" }],
      featured: true,
    },
    {
      id: "vectordb",
      folderName: "C++ Vector DB",
      title: "Vector Database & Local RAG System in C++",
      category: "GenAI",
      context: "Systems project",
      summary:
        "A vector database written from scratch in C++, combined with Ollama to provide fully local, document-based question answering.",
      highlights: [
        "Implemented HNSW, KD-Tree and brute-force similarity search with cosine, Euclidean and Manhattan distance.",
        "Integrated Ollama embeddings and a local LLM to build a document RAG pipeline for semantic search and Q&A.",
        "Exposed REST APIs for vector CRUD, benchmarking, document insertion, retrieval and AI answers, plus a web UI for visualization.",
      ],
      metrics: [
        { value: "3", label: "index types" },
        { value: "3", label: "distance metrics" },
      ],
      tags: ["C++", "HNSW", "KD-Tree", "Ollama", "Embeddings", "REST APIs"],
      links: [],
    },
    {
      id: "cricket",
      folderName: "Cricket Shot Detection",
      title: "Real-time Cricket Shot & Umpire Gesture Detection",
      category: "Deep Learning",
      context: "B.Tech final-year project · team of 3",
      summary:
        "A deep-learning system that classifies batting shots from live video and umpire signals from images, using real-time pose estimation.",
      highlights: [
        "Fed MediaPipe Holistic keypoints, as 30-frame sequences, into an LSTM that classifies batting shots (stance, pull shot, straight drive and others).",
        "Trained a CNN to classify 7 umpire gestures (Out, Six, Wide, No Ball and others).",
        "Achieved 84.34% accuracy on batting shots and 81.7% on umpire gestures.",
      ],
      metrics: [
        { value: "84.34%", label: "shot accuracy" },
        { value: "81.7%", label: "umpire gestures" },
      ],
      tags: ["LSTM", "CNN", "MediaPipe", "OpenCV", "TensorFlow/Keras", "Computer vision"],
      links: [{ label: "GitHub", url: "https://github.com/Chaitran06/realtime-cricket-shot-detection-deep-learning" }],
    },
    {
      id: "opsdesk",
      folderName: "OpsDesk",
      title: "OpsDesk: Internal Operations Web App",
      category: "Full-stack",
      context: "Production-style web app",
      summary:
        "A production-style work-tracking app with per-team roles, approval workflows and safe concurrent editing.",
      highlights: [
        "Built the backend with FastAPI, SQLAlchemy 2 and PostgreSQL, and the frontend with React 18, TypeScript (Vite) and TanStack Query.",
        "Added optimistic claiming, version-based concurrency control (409 on stale edits), Idempotency-Key handling and an append-only audit history.",
        "Covered it with 48 backend tests (pytest against real PostgreSQL) and 5 frontend tests.",
      ],
      metrics: [
        { value: "48", label: "backend tests" },
        { value: "409", label: "stale-edit protection" },
      ],
      tags: ["FastAPI", "PostgreSQL", "SQLAlchemy", "React", "TypeScript", "TanStack Query", "pytest"],
      links: [{ label: "GitHub", url: "https://github.com/Chaitran06/Newtonite" }],
    },
    {
      id: "llm-eng",
      folderName: "LLM Engineering",
      title: "LLM Engineering: Agents, RAG & Evaluators",
      category: "GenAI",
      context: "Ongoing learning log",
      summary:
        "A week-by-week build log of LLM applications, each built from first principles rather than with frameworks.",
      highlights: [
        "Resume Evaluator: scores a resume against a job description and returns a match score, a verdict and its reasoning.",
        "Built a ReAct agent from scratch, a tool-calling agent (web search and calculator), prompt chaining and a streaming chatbot.",
        "YouTube Playlist RAG (DSA assistant): yt-dlp, Whisper transcription, MiniLM embeddings and Qdrant.",
        "Compared chunking strategies, evaluated RAG on a golden dataset, and used Qdrant Cloud with metadata filters.",
      ],
      metrics: [],
      tags: ["LLM APIs", "ReAct", "Tool calling", "Whisper", "Qdrant", "Pydantic", "RAG evaluation"],
      links: [{ label: "GitHub", url: "https://github.com/Chaitran06/AI_Learning" }],
    },
    {
      id: "climate",
      folderName: "Climate Forecasting",
      title: "Climate Time-Series Forecasting Lab",
      category: "Deep Learning",
      context: "M.Tech coursework",
      summary:
        "Forecasting ERA5 sea surface temperature and the NOAA Niño 3.4 index with statistical, machine-learning and deep-learning models.",
      highlights: [
        "Compared ARIMA, SARIMA, linear and polynomial regression, ANN, RNN, LSTM, 1D CNN, SVR and Random Forest models.",
        "Ran ADF stationarity tests, mapped seasonal (DJF/MAM/JJA/SON) spatial regressions and classified ENSO events.",
      ],
      metrics: [],
      tags: ["ARIMA/SARIMA", "LSTM", "1D CNN", "scikit-learn", "statsmodels", "xarray", "NetCDF"],
      links: [{ label: "GitHub", url: "https://github.com/Chaitran06/climate-forecasting-computation-simulation-lab" }],
    },
  ] as Project[],
  publications: [
    {
      title: "Lane Prediction Optimization and Secure Traffic Management Using VANET",
      venue: "Harvest: An International Multidisciplinary and Multilingual Research Journal, Vol. III, Issue III",
      year: "Jul–Sep 2023",
      authors: "Ashok Reddy Kurapati, V Sree Chaitran, Kakumanu LV Surya Anil, Vaibhav Uddavolu, Dr. B. Kalaavathi",
      url: "https://www.harvestjournal.org/archives-view-abstract.aspx?Id=237",
    },
  ],
  skills: [
    { group: "Languages", items: ["Python", "C++", "SQL / MySQL", "TypeScript", "JavaScript", "MATLAB", "PHP", "HTML/CSS"] },
    {
      group: "ML & Deep Learning",
      items: ["TensorFlow / Keras", "scikit-learn", "statsmodels", "Swin Transformer", "U-Net", "CNN", "LSTM / RNN", "Time-series forecasting", "Computer vision", "NLP"],
    },
    {
      group: "LLMs & GenAI",
      items: ["RAG", "Hybrid search (dense + BM25)", "Vector databases (Qdrant, HNSW)", "Embeddings", "Agents & tool calling", "Structured outputs", "RAG evaluation", "Ollama", "Whisper", "Groq / OpenAI-style APIs"],
    },
    { group: "Data & Scientific", items: ["NumPy", "Pandas", "xarray", "SciPy", "NetCDF", "Matplotlib", "ERA5 reanalysis", "Significance testing"] },
    { group: "Backend & Web", items: ["FastAPI", "Flask", "REST APIs", "SQLAlchemy", "PostgreSQL", "React", "TanStack Query"] },
    { group: "Tools & Cloud", items: ["Git", "Google Cloud Platform", "Vercel", "Hugging Face Spaces", "Kaggle GPUs", "VS Code", "Android Studio"] },
  ],
  achievements: [
    "Ranked 6,160 out of 1,43,265 candidates in TS EAMCET (May 2020).",
    "Placement Coordinator at NIT Delhi (Jan 2026 – May 2027).",
    "Regular DSA practice in C++ on LeetCode and GeeksforGeeks (public GitHub repo).",
  ],
};

/** Plain-text dossier given to the LLM as its only source of truth. */
export function profileAsText(): string {
  const p = profile;
  const lines: string[] = [];
  lines.push(`NAME: ${p.name} (full name: ${p.fullName})`);
  lines.push(`HEADLINE: ${p.headline}`);
  lines.push(`LOCATION: ${p.location}`);
  lines.push(`CONTACT: email ${p.email} | GitHub ${p.github} | LinkedIn ${p.linkedin}`);
  lines.push(`OPEN TO: ${p.openTo}`);
  lines.push(`\nABOUT:\n${p.about.join("\n")}`);
  lines.push(`\nEDUCATION:`);
  for (const e of p.education) lines.push(`- ${e.degree}, ${e.school} (${e.period}), ${e.grade}.${e.notes ? ` ${e.notes}` : ""}`);
  lines.push(`Relevant coursework: ${p.coursework.join(", ")}`);
  lines.push(`\nEXPERIENCE & LEADERSHIP:`);
  for (const x of p.experience) lines.push(`- ${x.role}, ${x.org} (${x.period}): ${x.points.join(" ")}`);
  lines.push(`\nPROJECTS:`);
  for (const pr of p.projects) {
    lines.push(`- ${pr.title} [${pr.category}; ${pr.context}]: ${pr.summary}`);
    for (const h of pr.highlights) lines.push(`    • ${h}`);
    lines.push(`    Tech: ${pr.tags.join(", ")}${pr.links.length ? ` | Link: ${pr.links[0].url}` : ""}`);
  }
  lines.push(`\nPUBLICATIONS:`);
  for (const pub of p.publications) lines.push(`- "${pub.title}", ${pub.venue}, ${pub.year}. Authors: ${pub.authors}.`);
  lines.push(`\nSKILLS:`);
  for (const s of p.skills) lines.push(`- ${s.group}: ${s.items.join(", ")}`);
  lines.push(`\nACHIEVEMENTS:\n${p.achievements.map((a) => `- ${a}`).join("\n")}`);
  lines.push(
    `\nWORK EXPERIENCE SUMMARY: One 3-month AI internship (2023), plus substantial research and project work. No full-time industry experience yet; currently a full-time M.Tech student graduating May 2027.`,
  );
  return lines.join("\n");
}
