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
    "On the applied side, I build LLM systems: hybrid-search RAG pipelines, LangGraph and multi-agent workflows, a coding agent, MCP tools, and a vector database written from scratch in C++. I also build the FastAPI and React services around them.",
  ],
  focusAreas: [
    {
      title: "Scientific deep learning",
      text: "Spatiotemporal forecasting with Swin Transformers, U-Nets, LSTMs and CNNs on reanalysis and satellite data.",
    },
    {
      title: "LLM & RAG systems",
      text: "Hybrid retrieval (dense + BM25), vector databases, LangGraph and multi-agent workflows, MCP tools, and RAG evaluation on golden datasets.",
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
      role: "Artificial Intelligence Intern · Computer Vision & Recommender Systems",
      org: "Smart Bridge",
      period: "May 2023 – Jul 2023",
      points: [
        "Co-developed, in a 4-member team, an end-to-end AI application that recommends movies from a user's live facial emotion, combining computer vision, web scraping and a Flask web app.",
        "Built a real-time emotion recognition pipeline using OpenCV face detection and a pre-trained DeepFace (TensorFlow) model, classifying 7 emotions over a 5-second webcam stream via frame-level majority voting.",
        "Engineered the recommendation layer by mapping emotions to genres and scraping live IMDb listings with BeautifulSoup, serving the top 10 movies with ratings and posters through Flask routes.",
      ],
    },
    {
      role: "M.Tech Student Head, Training & Placement (TnP)",
      org: "NIT Delhi",
      period: "Jan 2026 – May 2027",
      points: [
        "Lead the M.Tech student side of campus placements at NIT Delhi.",
        "Spearheaded outreach to 200+ HRs and hiring managers via LinkedIn, cold email and calls, converting 15% into first-time recruiters for CSE and ECE/EE roles and expanding opportunities for 300+ students.",
      ],
    },
    {
      role: "Deputy General Secretary",
      org: "Upvision (Technical Club), NIT Delhi",
      period: "Aug 2025 – May 2026",
      points: [
        "Bridged the campus–industry gap by organizing 5+ hands-on workshops, mock technical interviews and alumni tech talks on DSA, System Design and GenAI, upskilling 300+ students.",
      ],
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
      id: "restaurant-agent",
      folderName: "Restaurant Order Agent",
      title: "Agentic Restaurant Order Management System (LangGraph)",
      category: "GenAI",
      context: "Multi-agent LLM workflow",
      summary:
        "A stateful multi-agent workflow that takes a free-text food order, checks stock, then handles cooking, serving, retries and failures through one typed state.",
      highlights: [
        "Built a LangGraph workflow with 9 nodes and conditional routing, sharing one typed state across the whole order lifecycle.",
        "Used an LLM (Groq, GPT-OSS-120B) to extract the dish and quantity from free-text orders as structured JSON. A guardrail rejects requests that aren't food orders, and the LLM writes the replies to the customer.",
        "Added inventory checks (fully / partly / not available) with separate retry limits for ordering (3), cooking (2) and serving (2). Cooking and serving fail at random 40% of the time to exercise the failure paths.",
        "Wrote a scenario-based test harness that checks the exact path taken through the graph; all 3 end-to-end test cases passed.",
      ],
      metrics: [
        { value: "9", label: "graph nodes" },
        { value: "3/3", label: "end-to-end tests passed" },
        { value: "40%", label: "injected failure rate" },
      ],
      tags: ["LangGraph", "Multi-agent", "LLM", "Groq", "Structured outputs", "Guardrails", "Python"],
      links: [{ label: "GitHub", url: "https://github.com/Chaitran06/AI_Learning/tree/main/week5/day20" }],
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
      id: "multi-agent",
      folderName: "Multi-Agent Researcher",
      title: "Multi-Agent Research Assistant (single vs multi-agent)",
      category: "GenAI",
      context: "Agent architecture comparison",
      summary:
        "The same research assistant built twice, as one agent and as a manager with specialist helpers, to compare the two designs on a complex query that mixes web search and maths.",
      highlights: [
        "Both versions use Groq (gpt-oss-120b), Tavily web search and a safe AST-based calculator, with a limit of 5 attempts.",
        "Single agent: one LLM holds both tools and decides which to call and how often.",
        "Multi-agent: a Manager that only delegates (no chat history; its memory is a manager_notes.md file of every helper's reply), plus a search-only helper and a calculator-only helper, each defined by its own system prompt.",
        "Tracked token usage per agent to compare cost. Finding: specialised roles keep each agent focused, but every extra LLM call adds tokens, so multi-agent only pays off when the task needs it.",
      ],
      metrics: [
        { value: "3", label: "LLM roles (multi-agent)" },
        { value: "2", label: "tools: search + calculator" },
      ],
      tags: ["Multi-agent", "Tool calling", "Groq", "Tavily", "Token tracking", "Python"],
      links: [{ label: "GitHub", url: "https://github.com/Chaitran06/AI_Learning/tree/main/week5/multiagent" }],
    },
    {
      id: "coding-agent",
      folderName: "Coding Agent",
      title: "Coding Agent: Bug Fixer for C++",
      category: "GenAI",
      context: "Agent built as a plain Python loop",
      summary:
        "A CLI agent that fixes simple bugs in a C++ file: you describe the bug in plain English, and the agent finds and edits the right line, then checks that the code still compiles.",
      highlights: [
        "Three tools used in sequence: search_files (find related files), search_in_file (find matching line numbers) and replace_line (edit one line).",
        "After each attempt it verifies that an edit was made and that the file still compiles with g++.",
        "Retries up to 3 times, then reports that it cannot solve the bug. Every tool call is printed, so the whole flow is visible.",
        "Built without LangGraph, as a plain Python loop of LLM calls and file tools.",
      ],
      metrics: [
        { value: "3", label: "file tools" },
        { value: "3", label: "max attempts" },
      ],
      tags: ["Coding agent", "Tool calling", "C++", "g++ verification", "Python"],
      links: [{ label: "GitHub", url: "https://github.com/Chaitran06/AI_Learning/tree/main/week6/codingagent" }],
    },
    {
      id: "mcp-server",
      folderName: "MCP Server",
      title: "Custom MCP Server Connected to Claude",
      category: "GenAI",
      context: "Model Context Protocol",
      summary: "A custom MCP server written in Python (Chaitran_MCP_Calculator) that plugs my own tool into Claude.",
      highlights: [
        "Exposes a chaitran_add tool through the @mcp.tool() decorator.",
        "The tool deliberately adds +100 to every result, which proves Claude is calling my tool rather than doing the maths itself.",
        "Takeaway: MCP is a standard way to plug your own tools into any LLM client.",
      ],
      metrics: [],
      tags: ["MCP", "Python", "Claude", "Tool integration"],
      links: [{ label: "GitHub", url: "https://github.com/Chaitran06/AI_Learning/tree/main/week6/my_mcp_server" }],
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
        "LangGraph fundamentals: shared typed state, nodes, conditional edges and loops.",
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
    { group: "Languages & CS", items: ["Python", "C++", "SQL / MySQL", "TypeScript", "JavaScript", "MATLAB", "Data Structures & Algorithms", "OOP", "System Design"] },
    {
      group: "ML & Deep Learning",
      items: ["TensorFlow / Keras", "scikit-learn", "statsmodels", "Swin Transformer", "U-Net", "CNN", "LSTM / RNN", "YOLO", "Transfer learning", "Supervised learning (classification, regression)", "Time-series forecasting", "Computer vision", "NLP"],
    },
    {
      group: "LLMs & GenAI",
      items: ["LangGraph", "LangChain", "Multi-agent systems", "MCP", "Agents & tool calling", "Prompt engineering", "RAG", "RAG evaluation", "Hybrid search (dense + BM25)", "Vector databases (Qdrant, HNSW)", "Embeddings", "Structured outputs", "Ollama", "Whisper", "Groq / OpenAI-style APIs"],
    },
    { group: "Data & Scientific", items: ["NumPy", "Pandas", "xarray", "SciPy", "NetCDF", "Matplotlib", "Seaborn", "ERA5 reanalysis", "Significance testing"] },
    { group: "Backend & Web", items: ["FastAPI", "Flask", "REST APIs", "Pydantic", "SQLAlchemy", "PostgreSQL", "React", "TanStack Query"] },
    { group: "Tools & Cloud", items: ["Git", "Google Cloud Platform", "Vercel", "Hugging Face Spaces", "Kaggle GPUs", "Jupyter", "Anaconda", "VS Code"] },
  ],
  achievements: [
    "Ranked 6,160 out of 1,43,265 candidates in TS EAMCET (May 2020).",
    "M.Tech Student Head, Training & Placement, NIT Delhi: converted 15% of 200+ contacted HRs into first-time recruiters, for 300+ students.",
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
