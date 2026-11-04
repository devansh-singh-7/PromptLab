# PromptLab — Multi-Domain Product & Curriculum Master Plan

**Document type:** Product specification for AI coding agents and product collaborators  
**Product:** PromptLab  
**Core promise:** Learn. Practice. Experiment. Build.  
**Initial implementation focus:** Web Development  
**Long-term vision:** A flexible, multi-domain platform that teaches people to use AI effectively to accomplish real professional and creative work.

---

## 1. Product vision

PromptLab is an interactive, personalized learning platform for applied AI and prompt engineering. It teaches users how to communicate with AI systems, evaluate their outputs, refine their instructions, and use AI to complete meaningful tasks across different domains.

PromptLab is not simply a prompt library, a generic AI chatbot, or a conventional video-course website. It combines:

- Structured learning paths and progressive curricula.
- Short video lessons and written explanations.
- Interactive quizzes and prompt challenges.
- AI-assisted evaluation, hints, and feedback.
- Domain-specific practical workspaces or studios.
- Real-world assignments and capstone projects.
- Personalized roadmaps based on user goals and existing knowledge.
- Gamification, progress tracking, and skill mastery.

The platform must teach users to **think critically about AI outputs**, not merely copy prompts from examples.

### Product positioning

> Learn to direct AI. Build things that work.

### Core learning loop

1. Learn a concept.
2. Inspect strong and weak examples.
3. Practice the concept in a short exercise.
4. Write or improve a prompt.
5. Receive feedback and hints.
6. Apply the skill in a domain-specific studio.
7. Verify the result.
8. Reflect on performance and progress.

---

## 2. Product principles

All domains must follow these principles.

### 2.1 Personalization without unnecessary complexity

Before starting a domain, users complete a short adaptive onboarding questionnaire. It should identify:

- Current experience and confidence.
- Goals and intended outcomes.
- Relevant tools, technologies, platforms, or methods.
- Preferred explanation language.
- Preferred learning format.
- Learning pace and available time.
- Practical interests and desired project types.
- Previous experience with AI tools and prompting.

Ask approximately 3–5 questions per screen. Use conditional follow-up questions, allow optional questions to be skipped, and allow preferences to be edited later.

The system should generate a proposed roadmap for the user to review and approve before starting.

### 2.2 Separate explanation language from technical language

These are independent settings.

- **Explanation language:** English, Hindi, Marathi, Spanish, French, Japanese, and other supported languages.
- **Technical language/tools:** e.g. JavaScript, Python, SQL, R, React, Excel, Power BI, image-generation models, video tools, or domain-specific software.

For example, a learner may study React using Hindi explanations. Do not translate code syntax, API names, identifiers, SQL keywords, file paths, or technical terminology in ways that break correctness.

### 2.3 Support multiple AI providers

Teach transferable prompting principles. Do not design the entire curriculum around one AI provider.

Allow users to indicate their preferred AI tools, such as ChatGPT, Gemini, Claude, Copilot, or relevant specialist tools. Explain when a workflow depends on provider-specific capabilities.

### 2.4 Practical outcomes matter

A learner should finish a domain with something demonstrable: an application, analysis, model, campaign, research brief, storyboard, or other domain-appropriate artifact.

Evaluate both:
- The quality and suitability of the prompt.
- The quality, correctness, and usefulness of the resulting work.

A long prompt should not automatically receive a high score.

### 2.5 Domain-specific experiences

All studios share a common foundation, but they must not be identical interfaces with different accent colours.

Use a reusable **Studio Engine** with common capabilities and domain-specific tools:
- Common: task brief, prompt editor, AI feedback, hints, submission history, evaluation, progress.
- Specialized: code editor, dataset explorer, notebook, image composition brief, video storyboard, content calendar, research document viewer, etc.

For a custom domain without a dedicated studio, assemble a suitable workspace from reusable components and provide a general workspace fallback. Do not promise a bespoke professional IDE for every imaginable field.

---

## 3. Domain portfolio

The platform should support curated learning paths and user-defined custom domains.

### Initial curated domains

1. Web Development & Software Engineering
2. Data Analytics
3. Machine Learning & AI Model Development
4. Image Generation
5. Video Generation
6. Content Creation & Digital Marketing

### Future expansion domains

7. Research & Academic Productivity
8. Business, Entrepreneurship & Operations
9. Finance & Business Analysis
10. Architecture & Interior Design
11. Cybersecurity
12. Productivity & Knowledge Work
13. Education & Instructional Design
14. Data Science & Statistical Modelling
15. GIS & Geospatial Analysis
16. Scientific Computing
17. Robotics & Embedded Systems
18. Music and Audio Production
19. Healthcare Research and Administration
20. Legal Research and Documentation

These are possible learning areas, not a commitment to launch every domain at once. Domains involving regulated or high-stakes decisions must teach verification, professional oversight, privacy, and limitations. PromptLab must not imply that AI outputs replace qualified professionals.

### Recommended delivery order

**Release 1:** Web Development as the first complete domain.

**Release 2:** Data Analytics and Machine Learning, reusing the first release's learning engine and studio architecture.

**Release 3:** Image Generation, Video Generation, and Content Creation & Digital Marketing.

**Later releases:** Research, Business, Finance, Architecture, Cybersecurity, and other custom paths based on learner demand.

The product architecture should support all domains from the beginning, but the first release should not attempt to fully populate every course.

---

# PART A — DOMAIN CURRICULA AND STUDIO REQUIREMENTS

## 4. Domain 1: Web Development & Software Engineering

**Purpose:** Teach learners to use AI throughout the software development lifecycle while understanding, reviewing, testing, and improving the code produced.

### Personalization questions

- Current coding experience: beginner, basic, intermediate, advanced.
- Existing project experience.
- Preferred frontend technologies: HTML, CSS, JavaScript, TypeScript, React, Next.js, Vue, Angular, Svelte, etc.
- Preferred backend: Node.js, Express, Python, Django, Flask, FastAPI, Java, PHP, etc.
- Database preferences: PostgreSQL, MySQL, MongoDB, SQLite, Firebase, etc.
- Goals: portfolio, job preparation, freelance work, personal project, AI-assisted development.
- Preferred AI coding tools.
- Desired project type and explanation language.

Do not force a specific stack. If the learner is unsure, recommend a beginner-friendly stack and explain why.

### Suggested curriculum

**Level 1 — Prompt Engineering Foundations**
- What prompt engineering is and how language models respond.
- Role, context, task, constraints, examples, and output format.
- Context engineering and supplying project information.
- Zero-shot and few-shot prompting.
- Iterative refinement and common mistakes.
- Asking AI to explain code and assumptions.

**Level 2 — AI-Assisted Frontend Development**
- Translating requirements into components.
- HTML and CSS prompting.
- JavaScript and TypeScript prompting.
- Responsive design and accessibility.
- Component-based development.
- Framework-aware prompting.

**Level 3 — Full-Stack Development**
- Project planning and architecture.
- API design and implementation.
- Database schema and query generation.
- Authentication and authorization.
- Frontend/backend integration.
- Environment configuration and deployment preparation.

**Level 4 — Debugging, Testing, and Quality**
- Supplying useful error context.
- Debugging stack traces.
- Code review and refactoring.
- Performance optimization.
- Unit and integration tests.
- Security awareness and validation.
- Verifying AI-generated code.

**Level 5 — End-to-End AI Development Workflows**
- Converting ideas into requirements.
- Breaking projects into manageable tasks.
- Multi-step prompting.
- Working with existing codebases.
- Documentation and deployment workflows.
- Managing context, regressions, and AI limitations.

### Practical assignments

1. Generate a personal portfolio webpage.
2. Build a responsive landing page.
3. Build a functional task-management application.
4. Debug and improve a deliberately flawed application.
5. Complete a multi-page website or selected full-stack capstone.

### Studio

A developer workspace containing:
- Challenge and lesson instructions.
- Prompt editor and prompt history.
- AI response viewer.
- Code editor.
- Live preview.
- Console and error display.
- Prompt feedback and hints.
- Submission and project evaluation.

Use an isolated execution environment. Never run arbitrary generated code in the main application server or privileged application context. Consider Sandpack or WebContainers for supported frontend projects; use isolated containers for more advanced workloads.

### Assessment

Assess prompt quality, requirements fulfilment, functionality, code quality, responsiveness, testing, and verification. Example weights can be configured per assignment rather than fixed globally.

---

## 5. Domain 2: Data Analytics

**Purpose:** Teach users to use AI to investigate data, formulate analytical questions, clean data, write queries, explore patterns, communicate insights, and verify conclusions.

### Personalization questions

- Current analytics and statistics experience.
- Preferred tools: Python, R, SQL, Excel, Google Sheets, Power BI, Tableau.
- Preferred databases and data formats.
- Industry interests: retail, finance, healthcare, marketing, logistics, education, etc.
- Familiarity with statistics and visualization.
- Desired outputs: dashboards, reports, business insights, automated analysis.
- Preferred explanation language and pace.

### Suggested curriculum

**Level 1 — Analytical Thinking and Prompt Foundations**
- Turning vague business questions into answerable questions.
- Providing dataset context and data dictionaries.
- Specifying assumptions, output format, and analytical scope.
- Asking AI to identify missing information.
- Avoiding unsupported conclusions.

**Level 2 — Data Understanding and Cleaning**
- Inspecting schemas and data types.
- Missing values, duplicates, inconsistent categories.
- Data quality checks.
- Cleaning plans and reproducible transformations.
- Prompting for Python, R, and spreadsheet formulas.

**Level 3 — SQL and Exploratory Data Analysis**
- Query generation and explanation.
- Filtering, aggregation, joins, subqueries, and window functions.
- EDA workflows.
- Descriptive statistics and distributions.
- Asking AI to explain query logic and validate results.

**Level 4 — Visualization and Statistical Reasoning**
- Choosing appropriate charts.
- Interpreting trends and relationships.
- Hypothesis formulation.
- Statistical tests and uncertainty.
- Avoiding misleading visualizations and causal overclaims.

**Level 5 — Insight Communication and Analytics Workflows**
- Turning analysis into recommendations.
- Executive summaries and analytical reports.
- Dashboard planning.
- Reproducible workflows.
- Validating calculations and source data.
- Presenting limitations and uncertainty.

### Practical assignments

1. Inspect and profile a supplied dataset.
2. Clean a messy dataset and document decisions.
3. Answer business questions using SQL or a selected tool.
4. Build a dashboard or analytical report.
5. Complete an end-to-end case study with recommendations.

### Studio

A data workstation with:
- Dataset upload or curated sample datasets.
- Dataset/schema explorer.
- Prompt editor.
- SQL or Python/R output panel.
- Table preview.
- Chart and visualization panel.
- Findings and report area.
- Evaluation and reproducibility checklist.

### Assessment

Assess analytical question quality, data handling, query/code correctness, statistical reasoning, visualization suitability, insight quality, reproducibility, and communication.

AI-generated analysis must be checked against actual data. Do not reward plausible-sounding but unsupported findings.

---

## 6. Domain 3: Machine Learning & AI Model Development

**Purpose:** Teach learners to use AI responsibly across the ML lifecycle, from problem formulation and data preparation through model evaluation and deployment.

This is a separate learning path from Data Analytics. Analytics focuses on extracting and communicating insights; ML focuses on developing, validating, and improving predictive or learning systems.

### Personalization questions

- Programming experience.
- ML and statistics background.
- Preferred language: Python or R.
- Libraries: scikit-learn, TensorFlow, PyTorch, XGBoost, etc.
- Preferred environment: notebooks, local IDE, cloud notebook.
- Experience with supervised, unsupervised, or deep learning.
- Areas of interest: classification, regression, NLP, computer vision, forecasting, recommendation systems.

### Suggested curriculum

**Level 1 — ML Problem Formulation**
- Translating a real problem into an ML task.
- Classification, regression, clustering, and forecasting.
- Defining target variables and success metrics.
- Asking AI to identify assumptions and feasibility issues.

**Level 2 — Dataset Understanding and Preparation**
- Dataset profiling.
- Missing data and outliers.
- Encoding, scaling, and transformations.
- Feature engineering.
- Train/validation/test separation.
- Data leakage and sampling risks.

**Level 3 — Model Selection and Training**
- Baselines and model selection.
- Prompting for training pipelines.
- Hyperparameter search.
- Reproducibility and random seeds.
- Code explanation and debugging.

**Level 4 — Evaluation and Improvement**
- Accuracy, precision, recall, F1, ROC-AUC.
- Regression metrics such as MAE, RMSE, and R².
- Confusion matrices and error analysis.
- Cross-validation.
- Imbalanced datasets and threshold selection.
- Overfitting, underfitting, and model limitations.

**Level 5 — Deployment and Responsible ML Workflows**
- Model serialization and inference.
- API integration.
- Monitoring and drift concepts.
- Documentation and model cards.
- Reproducibility and ethical considerations.
- Communicating limitations.

### Practical assignments

1. Define an ML problem and evaluation plan.
2. Profile and prepare a dataset.
3. Train a baseline model.
4. Compare and improve multiple models.
5. Complete an end-to-end ML project with evaluation and documentation.

### Studio

An ML workbench with:
- Dataset explorer.
- Notebook or code editor.
- Experiment configuration.
- Training and evaluation status.
- Metrics and charts.
- Model comparison.
- Prompt evaluation and hints.
- Reproducibility and leakage checklist.

### Assessment

Evaluate problem framing, data preparation, leakage prevention, model selection, validation methodology, metrics, error analysis, reproducibility, and interpretation.

Do not judge a model solely by accuracy. Require an appropriate evaluation strategy.

---

## 7. Domain 4: Image Generation

**Purpose:** Teach users to write, refine, and evaluate prompts for image-generation systems and creative visual workflows.

The initial course can be entirely text-prompt focused. It does not require PromptLab to generate images through an image-generation API.

### Personalization questions

- Experience with AI image tools.
- Preferred tools or models.
- Interests: illustration, product photography, concept art, branding, architecture, posters, character design, etc.
- Preferred visual styles.
- Intended use: social media, commercial work, personal art, design concepts.
- Experience with composition, photography, and design.

### Suggested curriculum

**Level 1 — Visual Prompt Foundations**
- Subject, action, setting, and context.
- Specificity and visual intent.
- Positive and negative instructions.
- Prompt ambiguity.

**Level 2 — Composition and Visual Direction**
- Framing and camera angle.
- Lighting and shadows.
- Perspective and depth.
- Colour palettes and mood.
- Background and environment.

**Level 3 — Style and Technical Control**
- Art direction and visual references.
- Aspect ratio and resolution concepts.
- Materials, textures, and detail.
- Model-specific syntax and limitations.
- Consistency across variations.

**Level 4 — Editing and Refinement**
- Image-to-image instruction concepts.
- Inpainting and outpainting instructions.
- Local edits and preservation constraints.
- Iterative refinement.
- Avoiding unintended changes.

**Level 5 — Creative Briefs and Visual Campaigns**
- Translating a creative brief into prompts.
- Building a consistent visual series.
- Product and brand imagery.
- Multi-image storytelling.
- Evaluating prompt-output alignment.

### Practical assignments

1. Create a structured portrait or object prompt.
2. Create a scene with controlled composition and lighting.
3. Refine a weak prompt for a chosen style.
4. Develop a consistent set of campaign visuals.
5. Produce a complete visual campaign prompt pack.

### Studio

A creative image studio with:
- Creative brief.
- Prompt editor.
- Prompt component builder.
- Style, composition, lighting, and aspect-ratio controls.
- Negative instruction area.
- Prompt variants and version history.
- Curated reference gallery or user-provided reference area.
- Evaluation and comparison panel.

The initial studio may evaluate prompts without calling an image-generation API. Clearly distinguish prompt evaluation from actual image generation.

### Assessment

Evaluate subject clarity, composition, visual direction, controllability, consistency, constraints, and alignment with the creative brief.

---

## 8. Domain 5: Video Generation

**Purpose:** Teach users to create structured prompts for AI video generation and communicate motion, scenes, camera direction, continuity, and storytelling.

The first release can teach and evaluate text prompts and storyboards without generating videos through an external API.

### Personalization questions

- Experience with video editing or AI video tools.
- Preferred video tools/models.
- Desired content: advertisements, cinematic clips, explainers, social media, product demos, short films.
- Preferred duration and aspect ratio.
- Storytelling and camera experience.
- Character or visual consistency requirements.

### Suggested curriculum

**Level 1 — Video Prompt Foundations**
- Subject, action, scene, and duration.
- Difference between image and video instructions.
- Temporal sequence and motion.
- Clear action descriptions.

**Level 2 — Camera and Motion**
- Camera movement.
- Shot types and framing.
- Subject movement.
- Scene dynamics.
- Motion intensity and pacing.

**Level 3 — Scene Design and Continuity**
- Environment and lighting.
- Character and object consistency.
- Beginning, middle, and end.
- Transitions and continuity.
- Multi-shot planning.

**Level 4 — Advanced Video Direction**
- Cinematic style.
- Timing and action sequencing.
- Dialogue, sound, and atmosphere where supported.
- Negative constraints.
- Tool-specific prompt adaptation.

**Level 5 — Storyboards and Production Workflows**
- Translating briefs into scenes.
- Shot lists and storyboards.
- Multi-scene prompt packs.
- Consistency checks.
- Iterative refinement and review.

### Practical assignments

1. Write a prompt for a short single-shot video.
2. Control camera movement and subject action.
3. Design a three-scene sequence.
4. Improve continuity across scenes.
5. Create a complete short-video storyboard and prompt pack.

### Studio

A video storyboard studio with:
- Creative brief.
- Scene and shot cards.
- Prompt editor for each scene.
- Camera and motion controls.
- Duration and aspect-ratio fields.
- Character and setting continuity notes.
- Timeline/storyboard preview.
- Prompt evaluation and revision history.

### Assessment

Evaluate action clarity, temporal logic, camera direction, continuity, scene consistency, constraints, and alignment with the brief.

---

## 9. Domain 6: Content Creation & Digital Marketing

**Purpose:** Teach users to use AI to research audiences, develop brand-aligned content, plan campaigns, create channel-specific material, and evaluate performance responsibly.

### Personalization questions

- Experience level.
- Preferred platforms: Instagram, YouTube, LinkedIn, X, blogs, email, etc.
- Industry or niche.
- Target audience.
- Brand voice and tone.
- Content formats.
- Marketing goals: awareness, engagement, leads, conversions, retention.
- Preferred analytics and scheduling tools.

### Suggested curriculum

**Level 1 — Audience and Brand Foundations**
- Defining audience segments.
- Audience needs and intent.
- Brand voice and positioning.
- Content objectives.
- Avoiding generic AI copy.

**Level 2 — Content Strategy**
- Content pillars.
- Editorial calendars.
- Campaign briefs.
- Platform-specific requirements.
- Research and idea generation.

**Level 3 — Content Production**
- Social posts and captions.
- Blog and SEO briefs.
- Email campaigns.
- Video scripts and hooks.
- Repurposing content across channels.

**Level 4 — Campaign Planning and Optimization**
- Campaign objectives and funnel stages.
- Calls to action.
- A/B test planning.
- Performance analysis.
- Iterative copy refinement.
- Claims, disclosures, and factual verification.

**Level 5 — Integrated Marketing Workflows**
- Multi-channel campaigns.
- Consistent messaging.
- Content calendars and asset briefs.
- Reporting and recommendations.
- Brand consistency checks.

### Practical assignments

1. Develop an audience persona and brand voice.
2. Create a week of platform-specific content.
3. Write an SEO-oriented article brief and outline.
4. Develop an email campaign and variations.
5. Build a multi-channel marketing campaign with measurement plan.

### Studio

A content studio with:
- Brand profile and voice settings.
- Audience profile.
- Campaign brief.
- Content calendar.
- Channel-specific editors.
- Copy variants.
- SEO and messaging checklist.
- Evaluation and revision history.

### Assessment

Evaluate audience fit, objective alignment, brand consistency, clarity, originality, platform suitability, factual accuracy, and measurable campaign logic.

---

# PART B — FUTURE DOMAIN BLUEPRINTS

## 10. Research & Academic Productivity

**Purpose:** Teach users to use AI for research planning, literature discovery support, synthesis, methodology design, and academic communication while maintaining source verification and academic integrity.

### Curriculum outline

1. Research questions, scope, and problem framing.
2. Search strategies, keywords, and literature discovery workflows.
3. Summarization, comparison, and evidence extraction.
4. Research methodology, hypotheses, and study design.
5. Literature reviews, reports, and presentation workflows.
6. Citation verification, source quality, bias, and academic integrity.

### Practical assignments

- Refine a broad topic into a research question.
- Create a search strategy.
- Compare a set of supplied papers.
- Draft a literature review structure.
- Produce a research proposal or evidence-based report.

### Studio

Research workspace with:
- Research question and scope panel.
- Document/PDF viewer.
- Source and citation manager.
- Evidence extraction table.
- Literature comparison matrix.
- Draft editor.
- Verification checklist.

Never fabricate references. Clearly label AI-generated summaries and require users to inspect original sources.

---

## 11. Business, Entrepreneurship & Operations

**Purpose:** Teach users to use AI to investigate business problems, develop plans, analyze operations, and support decisions.

### Curriculum outline

1. Business problem framing and stakeholder context.
2. Market and customer research.
3. Business models and value propositions.
4. Operations, processes, and workflow design.
5. Scenario planning, risk analysis, and decision support.
6. Business reports, presentations, and implementation plans.

### Practical assignments

- Create a business problem brief.
- Develop a customer research plan.
- Compare business model options.
- Map and improve an operational workflow.
- Produce a business plan or strategic recommendation.

### Studio

Business workspace with:
- Business brief.
- Stakeholder and customer profiles.
- SWOT and scenario templates.
- Process maps.
- Assumption and risk register.
- Report/presentation editor.

---

## 12. Finance & Business Analysis

**Purpose:** Teach AI-assisted financial analysis, budgeting, forecasting, and financial communication. This is an educational and analytical domain, not personalized investment advice.

### Curriculum outline

1. Financial terminology and problem framing.
2. Spreadsheet and financial-data prompting.
3. Budgeting and variance analysis.
4. Forecasting and scenario modelling.
5. Financial statements and business metrics.
6. Communicating assumptions, risks, and uncertainty.

### Practical assignments

- Clean a financial spreadsheet.
- Build a budget and variance report.
- Create a scenario-based forecast.
- Analyze a supplied company's financial statements.
- Produce a management financial summary.

### Studio

Financial analysis workspace with:
- Spreadsheet/data viewer.
- Assumptions panel.
- Formula and calculation review.
- Scenario controls.
- Charts and report output.
- Audit and verification checklist.

Never present unverified calculations as financial facts or imply guaranteed returns.

---

## 13. Architecture & Interior Design

**Purpose:** Teach users to communicate spatial requirements, design intent, materials, lighting, layouts, and visual references to AI tools.

### Curriculum outline

1. Translating client needs into design briefs.
2. Space planning and functional requirements.
3. Materials, textures, colour, and lighting.
4. Style direction and visual references.
5. Iterative design critique and revision.
6. Presentations, mood boards, and client communication.

### Practical assignments

- Create a room design brief.
- Write a prompt for a specified room and style.
- Compare material and lighting directions.
- Develop a consistent mood board brief.
- Produce a concept presentation.

### Studio

Design workspace with:
- Client brief.
- Room dimensions and constraints.
- Style and material controls.
- Lighting and mood controls.
- Reference gallery.
- Prompt variants.
- Presentation board.

AI-generated design concepts must not be treated as construction-ready architectural or engineering plans.

---

## 14. Cybersecurity

**Purpose:** Teach safe, defensive, and authorized AI-assisted security workflows.

### Curriculum outline

1. Security concepts and threat modelling.
2. Secure coding and code review.
3. Log analysis and incident triage.
4. Vulnerability report interpretation.
5. Defensive testing in authorized labs.
6. Incident documentation and remediation planning.

### Practical assignments

- Review a deliberately vulnerable sample application.
- Classify sample security findings.
- Analyze sanitized logs.
- Create a threat model for a toy application.
- Write a remediation and incident report.

### Studio

Defensive security workspace with:
- Scenario and authorization scope.
- Sanitized logs and sample code.
- Findings table.
- Severity and evidence fields.
- Remediation checklist.
- Report editor.

Only support authorized, defensive, and educational activities. Do not provide workflows intended to compromise real systems, evade detection, steal credentials, or deploy malware.

---

## 15. Productivity & Knowledge Work

**Purpose:** Teach users to use AI to organize information, plan work, communicate, and automate repeatable knowledge tasks.

### Curriculum outline

1. Context-rich instructions and task decomposition.
2. Summarizing and extracting information.
3. Planning, prioritization, and decision support.
4. Email, documentation, and meeting workflows.
5. Reusable templates and multi-step workflows.
6. Reviewing accuracy, privacy, and action boundaries.

### Practical assignments

- Turn unstructured notes into an action plan.
- Summarize a document with traceable evidence.
- Create a project plan.
- Build reusable communication templates.
- Design a repeatable personal workflow.

### Studio

Productivity workspace with:
- Task brief.
- Document and notes viewer.
- Summary and action list.
- Workflow builder.
- Template library.
- Review and verification panel.

---

## 16. Education & Instructional Design

**Purpose:** Teach educators and learners to use AI to create lesson plans, explanations, assessments, and learning materials.

### Curriculum outline

1. Learning objectives and learner profiles.
2. Lesson and curriculum design.
3. Differentiated explanations.
4. Quiz and assessment generation.
5. Feedback and rubric design.
6. Reviewing factual accuracy, accessibility, and bias.

### Practical assignments

- Create a lesson plan for a specified learner.
- Explain a topic at three difficulty levels.
- Generate and validate a quiz.
- Design an assessment rubric.
- Build a short learning module.

### Studio

Instructional design workspace with:
- Learner profile.
- Learning objectives.
- Lesson outline.
- Content editor.
- Quiz builder.
- Rubric and accessibility checklist.

---

## 17. Data Science & Statistical Modelling

**Purpose:** Teach AI-assisted statistical reasoning, modelling, uncertainty analysis, and reproducible computational workflows.

This may share tools with Data Analytics and ML but should have its own advanced curriculum when sufficient demand exists.

### Curriculum outline

1. Statistical problem framing.
2. Probability and distributions.
3. Sampling, estimation, and hypothesis testing.
4. Regression and statistical modelling.
5. Model assumptions and diagnostics.
6. Communicating uncertainty and reproducible results.

### Practical assignments

- Select a suitable statistical method for a question.
- Analyze a sample distribution.
- Conduct and interpret a hypothesis test.
- Fit and diagnose a regression model.
- Write a reproducible statistical report.

### Studio

Statistical workbench with:
- Dataset explorer.
- Notebook/code editor.
- Distribution and diagnostic plots.
- Test and model configuration.
- Assumption checklist.
- Results interpretation panel.

---

## 18. GIS & Geospatial Analysis

**Purpose:** Teach AI-assisted spatial data understanding, GIS workflows, mapping, and geographic analysis.

### Curriculum outline

1. Spatial data types and coordinate systems.
2. GIS problem framing and data discovery.
3. Spatial joins, buffers, and overlays.
4. Geospatial visualization.
5. Spatial statistics and interpretation.
6. Reproducible map and analysis workflows.

### Practical assignments

- Inspect a geospatial dataset.
- Clean and validate geographic fields.
- Perform a buffer or spatial join.
- Create a thematic map.
- Produce a geographic analysis report.

### Studio

GIS workspace with:
- Map preview.
- Layer manager.
- Dataset and attribute explorer.
- Spatial operation builder.
- Prompt editor.
- Map and report output.

---

## 19. Scientific Computing

**Purpose:** Teach AI-assisted computational experiments, numerical methods, simulations, and scientific documentation.

### Curriculum outline

1. Translating scientific questions into computational tasks.
2. Selecting methods and assumptions.
3. Numerical computation and simulation.
4. Experiment design and reproducibility.
5. Result visualization and uncertainty.
6. Scientific reporting and verification.

### Practical assignments

- Formulate a computational experiment.
- Implement a numerical method.
- Run a simple simulation.
- Compare outputs under different assumptions.
- Produce a reproducible report.

### Studio

Scientific workbench with:
- Experiment brief.
- Parameter controls.
- Notebook/code editor.
- Result plots.
- Run history.
- Assumption and reproducibility checklist.

---

## 20. Robotics & Embedded Systems

**Purpose:** Teach AI-assisted embedded programming, sensor/actuator workflows, simulation, and safe hardware development.

### Curriculum outline

1. Hardware and system requirements.
2. Microcontrollers and programming environments.
3. Sensors, actuators, and data interpretation.
4. Control logic and state machines.
5. Simulation, debugging, and testing.
6. Documentation and safe deployment.

### Practical assignments

- Write a hardware requirements brief.
- Generate and review a sensor-reading program.
- Design a state machine.
- Debug a simulated device workflow.
- Document a small robotics or embedded project.

### Studio

Robotics workbench with:
- Hardware profile.
- Pin and component map.
- Code editor.
- Simulation or sample telemetry.
- Serial/log viewer.
- Safety and testing checklist.

Do not imply that generated code is safe to flash to physical hardware without testing and appropriate safeguards.

---

## 21. Music & Audio Production

**Purpose:** Teach users to communicate musical and audio production goals to AI tools and organize creative production workflows.

### Curriculum outline

1. Describing genre, mood, tempo, and intent.
2. Instrumentation and arrangement briefs.
3. Song structure and transitions.
4. Sound design and production direction.
5. Mixing and mastering instruction concepts.
6. Reviewing creative results and rights considerations.

### Practical assignments

- Create a detailed music brief.
- Develop an arrangement plan.
- Write a sound-design prompt.
- Plan a short audio production.
- Produce a complete track brief and production checklist.

### Studio

Audio production planning workspace with:
- Creative brief.
- Genre and mood controls.
- Tempo and instrumentation.
- Arrangement timeline.
- Production notes.
- Prompt comparison and evaluation.

Do not reproduce copyrighted songs or provide instructions to imitate a living artist's voice. Encourage original creative direction.

---

## 22. Healthcare Research & Administration

**Purpose:** Teach safe AI use for administrative, educational, and research-support workflows in healthcare settings.

### Curriculum outline

1. Safe and appropriate AI use in healthcare.
2. Summarizing non-identifiable educational material.
3. Structuring administrative documents.
4. Research and evidence review.
5. Data privacy and information handling.
6. Human review, uncertainty, and escalation.

### Practical assignments

- Summarize a fictional, de-identified case document for educational purposes.
- Create an administrative workflow.
- Structure a research question.
- Compare supplied evidence summaries.
- Produce a document with source and uncertainty checks.

### Studio

Healthcare research/administration workspace with:
- Fictional or de-identified sample documents.
- Document viewer.
- Structured extraction panel.
- Evidence and source checklist.
- Human review status.
- Privacy warnings.

Do not provide diagnosis, treatment decisions, or clinical instructions as substitutes for qualified professionals. Do not ask learners to upload identifiable patient information.

---

## 23. Legal Research & Documentation

**Purpose:** Teach safe AI-assisted legal research organization, document analysis, and drafting support, without representing AI output as legal advice.

### Curriculum outline

1. Defining legal research questions and jurisdiction.
2. Organizing statutes, cases, and source material.
3. Extracting facts and comparing documents.
4. Drafting structured legal research notes.
5. Citation and authority verification.
6. Limitations, confidentiality, and professional review.

### Practical assignments

- Extract issues from a fictional legal scenario.
- Organize supplied legal sources.
- Compare two supplied decisions.
- Draft a research memorandum outline.
- Verify citations and prepare a source table.

### Studio

Legal research workspace with:
- Jurisdiction and issue brief.
- Document viewer.
- Source and authority table.
- Fact/issue extraction.
- Draft editor.
- Citation verification checklist.

Never invent legal authorities or present generated text as professional legal advice. Require jurisdiction-specific source verification and qualified review.

---

# PART C — CUSTOM DOMAIN CREATION

## 24. User-defined learning paths

Users should be able to enter a domain not already in the curated catalogue.

Example:
- “Prompt engineering for architecture and interior design.”
- “AI for supply chain analytics.”
- “Prompt engineering for academic biology research.”
- “AI-assisted game development.”

### Custom domain creation flow

1. User enters a domain or professional goal.
2. System asks a few clarifying questions.
3. AI proposes:
   - Domain description.
   - Target learner profile.
   - Prerequisite knowledge.
   - Tools and technical options.
   - Learning objectives.
   - Beginner-to-advanced modules.
   - Exercises and practical assignments.
   - Final project.
   - Suggested studio components.
4. User reviews and edits the proposed path.
5. User approves the roadmap.
6. The system creates a custom learning path.

### Custom studio assembly

Select reusable components based on the domain:
- Text/prompt editor.
- Document viewer.
- Code editor.
- Dataset explorer.
- Chart panel.
- Image reference gallery.
- Video storyboard.
- Timeline.
- Checklist.
- Report editor.
- Evaluation panel.

The system must use a general workspace if a specialist tool is unavailable. Do not invent capabilities or claim to execute a workflow that the platform cannot support.

### Custom-domain safety and quality checks

- Identify high-stakes or regulated tasks.
- Flag domains that require professional oversight.
- Avoid unsafe or disallowed workflows.
- Require source verification where factual accuracy matters.
- Do not create fake certifications or imply professional qualification.
- Let users report and edit generated curricula.

---

# PART D — SHARED PLATFORM EXPERIENCE

## 25. Shared learning architecture

Every domain should use the same core learning model:

**Domain → Personalized Path → Course → Level/Module → Lesson → Practice → Challenge → Practical → Capstone**

Each lesson should support:
- Learning objectives.
- Video.
- Written explanation.
- Examples.
- Interactive practice.
- Prompt challenge.
- Hints.
- Evaluation rubric.
- Completion criteria.

The curriculum must be data-driven. Do not hardcode course content into React components.

## 26. Shared challenge engine

Support reusable challenge formats:

- Multiple-choice questions.
- True/false and concept checks.
- Arrange prompt components.
- Fill missing prompt sections.
- Identify the stronger prompt.
- Repair a weak prompt.
- Explain why a prompt is unsuitable.
- Write a prompt from a scenario.
- Improve a prompt based on feedback.
- Multi-step real-world missions.
- Practical project submissions.

Each challenge should define:
- Domain and skill tags.
- Difficulty.
- Instructions and expected outcome.
- Evaluation rubric.
- Hints.
- Attempts and resubmission policy.
- XP reward.
- Completion criteria.

## 27. Shared AI evaluation engine

Use a hybrid evaluation architecture:

1. Deterministic checks for required fields, format, constraints, and objective conditions.
2. LLM evaluation for context-sensitive quality, reasoning, and improvement suggestions.
3. Domain-specific checks to validate actual outputs where possible.
4. Human review or source verification for high-stakes or ambiguous tasks.

Return:
- Score with an explanation.
- Strengths.
- Missing requirements.
- Specific weaknesses.
- Progressive hints.
- Improvement suggestions.
- Resubmission opportunity.

Store evaluation rubric versions so changes to rubrics do not silently alter the meaning of historical scores.

Do not expose hidden answer keys or ideal prompts before the learner has attempted the task.

## 28. Shared gamification

Use a friendly, colourful, Duolingo-inspired visual language while retaining PromptLab's own identity.

Proposed palette:
- Primary purple: `#7655E8`
- Mint green: `#29C5A4`
- Achievement gold: `#FFCA55`
- Coral: `#FF806B`
- Soft lavender: `#F5F3FF`
- Dark navy: `#24243A`

Use:
- Rounded cards and clear progress indicators.
- Learning-path maps with connected lesson nodes.
- XP, levels, streaks, badges, and daily goals.
- Daily quests and optional leaderboards.
- Skill mastery indicators.
- Friendly micro-interactions and a recognizable original mascot.

Keep the design accessible, responsive, and usable for long learning sessions. Gamification must encourage learning without punishing users for taking breaks.

### Skill mastery

Track actual skills, not only XP. Shared skill dimensions may include:
- Context building.
- Task clarity.
- Constraint definition.
- Output specification.
- Iterative refinement.
- Verification and critical thinking.

Add domain-specific skills, such as debugging for web development or statistical reasoning for analytics.

## 29. Shared application navigation

Recommended primary areas:

- Dashboard.
- Learning Paths.
- My Learning.
- Domain Studios.
- Challenge Arena.
- Practical Projects.
- Prompt Library.
- Achievements.
- Profile and Preferences.

The navigation should not expose unavailable domains as fully functional courses. Future domains can appear as clearly labelled upcoming paths if desired.

## 30. Video learning

Support two video sources:

1. External YouTube tutorials embedded using the official player.
2. PromptLab-created videos hosted using a video service such as Cloudflare Stream or Mux.

Do not download or re-upload third-party videos without permission.

Store video metadata, captions/transcripts where permitted, duration, provider, lesson association, and completion state. Track lesson progress, bookmarks, and quiz results.

---

# PART E — TECHNICAL ARCHITECTURE

## 31. Recommended technology stack

The following is a recommended default, not a forced requirement if the existing project has a sound alternative.

| Layer | Suggested technology |
|---|---|
| Frontend | Next.js, React, TypeScript |
| Styling | Tailwind CSS, shadcn/ui |
| Animation | Framer Motion |
| Backend | Next.js server routes or a dedicated backend |
| Database | PostgreSQL |
| ORM | Prisma |
| Authentication | Auth.js |
| AI evaluation | Gemini API initially, provider abstraction |
| Shared rate limiting | Redis or atomic database counters |
| Charts | Recharts |
| Video hosting | Cloudflare Stream or Mux |
| External video | YouTube embed |
| Code execution | Sandpack/WebContainers or isolated containers |
| Deployment | Vercel for web app; separate secure execution service where needed |

## 32. Modular architecture

Organize the platform around shared engines and domain modules.

Illustrative structure:

```text
promptlab/
  app/
    (marketing)/
    (auth)/
    dashboard/
    learning-paths/
    onboarding/
    learn/[courseId]/
    studios/
      web-development/
      data-analytics/
      machine-learning/
      image-generation/
      video-generation/
      content-marketing/
      research/
    challenges/
    practicals/
    achievements/
    profile/
    admin/
    api/

  components/
    design-system/
    navigation/
    dashboard/
    learning/
    lessons/
    challenges/
    gamification/
    video/
    studio-engine/

  domains/
    web-development/
    data-analytics/
    machine-learning/
    image-generation/
    video-generation/
    content-marketing/
    research/
    business/
    finance/
    architecture/
    cybersecurity/

  lib/
    ai/
    evaluation/
    database/
    auth/
    quota/
    storage/
    security/

  prisma/
    schema.prisma
```

Each domain module should define:
- Domain metadata.
- Questionnaire schema.
- Curriculum configuration.
- Skill taxonomy.
- Challenge types.
- Evaluation rubrics.
- Studio component configuration.
- Practical assignment templates.

Avoid duplicating common logic in each domain.

## 33. Database concepts

Plan for entities such as:

- User
- UserProfile
- LearningPreferences
- UserDomainPreferences
- Domain
- LearningPath
- Course
- Module
- Lesson
- Video
- Challenge
- ChallengeRubric
- Practical
- PromptSubmission
- PromptEvaluation
- EvaluationRubricVersion
- UserProgress
- SkillMastery
- Achievement
- UserAchievement
- DailyActivity
- AIUsage
- AIQuotaWindow
- CustomDomainRequest
- CustomLearningPath
- StudioSession
- ProjectArtifact

Store global user preferences separately from per-domain preferences. A user's Web Development stack should not dictate their Image Generation preferences.

## 34. AI provider and quota architecture

PromptLab's core value is its curriculum, evaluation rubrics, challenges, and studios—not training a foundation model.

Start with an existing LLM API. Keep the provider behind a server-side abstraction so providers can be changed later.

For Gemini:
- Keep API keys server-side in environment variables.
- Never expose keys through `NEXT_PUBLIC_` variables.
- Use a shared project/model-level limiter that reflects the active provider quota.
- Track request and token usage.
- Handle RPM, TPM, RPD, 429 responses, retry guidance, and provider errors.
- Use atomic updates for concurrent requests.
- Do not count failed attempts as successful usage without understanding provider billing/usage behaviour.
- Do not promise automatic quota synchronization unless the provider exposes a reliable supported mechanism.
- Treat provider quotas as authoritative.
- Keep lessons, quizzes, and deterministic checks usable when AI quota is exhausted.

Do not invent per-user daily limits if the intended architecture is to mirror shared provider quotas. Explain to users when shared AI capacity is temporarily exhausted.

## 35. Security and privacy

- Authenticate and authorize all protected operations.
- Validate user input on the server.
- Keep API keys and provider credentials server-side.
- Use least-privilege access.
- Isolate generated code execution.
- Apply execution time, memory, filesystem, and network restrictions.
- Never execute untrusted code with application secrets or production database access.
- Protect uploaded files and enforce file size/type limits.
- Avoid storing unnecessary personal data.
- Provide account and data deletion workflows.
- Use fictional or de-identified data in sensitive-domain demonstrations.
- Maintain audit logs for admin actions and consequential operations.

---

# PART F — ADMIN AND CONTENT OPERATIONS

## 36. Admin panel

Admins/content authors should be able to:

- Create and edit domains and learning paths.
- Create courses, levels, modules, and lessons.
- Add written theory and examples.
- Add YouTube URLs and original video uploads.
- Create quizzes and interactive challenges.
- Configure hints and evaluation rubrics.
- Create practicals and capstone projects.
- Configure studio components.
- Preview lessons as a learner.
- Publish, unpublish, reorder, and version content.
- Review learner analytics and feedback.
- Track content quality and AI evaluation outcomes.

Do not require a code deployment for ordinary curriculum edits.

## 37. Content quality process

Before publishing a lesson:
1. Confirm learning objectives.
2. Check technical accuracy.
3. Test all examples.
4. Verify video rights and links.
5. Test the exercise.
6. Test the evaluation rubric with weak, acceptable, and strong submissions.
7. Confirm hints are useful and do not reveal the answer too early.
8. Confirm accessibility and localization.
9. Preview the learner experience.

---

# PART G — DELIVERY ROADMAP

## 38. Product delivery strategy

Build the reusable platform foundation, but release one complete domain first.

### Release 1 — Web Development

Build:
- Product branding and design system.
- Landing page and authentication.
- Dashboard and learning path.
- Personalized onboarding.
- Web Development curriculum.
- Video lesson engine.
- Quiz and challenge engine.
- AI evaluation.
- Web Development Studio.
- Secure code preview.
- Practical assignments and capstone.
- Admin content management.
- Progress and achievements.

### Release 2 — Data Analytics and Machine Learning

Reuse:
- Onboarding engine.
- Course and lesson engine.
- Challenge engine.
- Evaluation service.
- Gamification.
- Admin panel.

Add:
- Dataset explorer.
- SQL/Python/R workbench.
- Charts and analytics outputs.
- ML notebook and model evaluation components.

### Release 3 — Image Generation, Video Generation, and Content Marketing

Add:
- Creative prompt builder.
- Image reference gallery.
- Video storyboard and timeline.
- Brand profile and content calendar.
- Creative brief evaluation.

Do not add media-generation API costs unless actual generation becomes a deliberate product requirement.

### Later releases

Prioritize Research, Business, Finance, Architecture, Cybersecurity, Productivity, Education, and custom domains using learner demand and feasibility.

---

## 39. Development phases for the first domain

An indicative solo/small-team schedule:

1. Product foundation and design system — 1 week.
2. Dashboard and gamification — 1 week.
3. Personalized onboarding — 1 week.
4. Course and lesson engine — 1–2 weeks.
5. AI evaluation and quota handling — 1 week.
6. Web Development Studio — 2 weeks.
7. Practicals and final project — 1 week.
8. Testing and beta launch — 1 week.

Estimated total: approximately 9–10 weeks. Actual time depends on content production, sandbox complexity, team size, and existing code.

---

# PART H — PRODUCT SUCCESS AND ACCEPTANCE CRITERIA

## 40. First-release acceptance criteria

The Web Development release is not complete merely because its pages render.

A learner must be able to:

1. Register and sign in.
2. Complete Web Development onboarding.
3. Select their preferred explanation language and technology stack.
4. Receive and approve a personalized roadmap.
5. Follow a learning path.
6. Watch a lesson and read its explanation.
7. Complete an interactive quiz.
8. Submit a prompt challenge.
9. Receive meaningful evaluation and hints.
10. Revise and resubmit a prompt.
11. Complete a practical assignment.
12. Use the Web Development Studio.
13. View generated code in a secure preview environment.
14. Track course and skill progress.
15. Earn achievements and XP.
16. Resume learning after leaving the platform.

Admins must be able to create and edit course content without changing application code.

## 41. Quality metrics

Measure:
- Onboarding completion.
- Roadmap approval and modification.
- Lesson completion.
- Challenge attempt and resubmission rates.
- Improvement between first and later prompt attempts.
- Practical completion.
- Capstone quality.
- Learner retention.
- AI evaluation latency and error rate.
- Cost and quota utilization.
- Learner-reported usefulness of feedback.

Do not treat streaks, XP, or time spent as proof of learning. Use skill mastery and demonstrated project outcomes.

---

# PART I — INSTRUCTIONS FOR AN AI CODING AGENT

## 42. How to use this specification

Treat this document as the product-level source of truth for PromptLab's multi-domain vision.

### Mandatory implementation rules

1. Inspect the existing repository before changing files.
2. Identify the current framework, dependencies, routes, design system, database, and existing features.
3. Do not overwrite or remove working functionality without a clear reason.
4. Convert this specification into a phased implementation checklist.
5. Implement Web Development as the first complete domain.
6. Keep the architecture ready for additional domains.
7. Build reusable engines rather than duplicating domain logic.
8. Keep course content database-driven.
9. Do not hardcode React, Python, or English as universal requirements.
10. Keep explanation language separate from technical stack preferences.
11. Do not claim that AI-generated code, analysis, or research is correct without validation.
12. Do not execute untrusted generated code in the main application environment.
13. Do not expose API keys or secrets to the browser.
14. Do not implement fake buttons or placeholder interactions as finished features.
15. Use responsive and accessible UI patterns.
16. Add loading, empty, error, and success states.
17. Test important user journeys and server-side authorization.
18. Do not build every future domain before the Web Development release is complete.

### Recommended working process

For each phase:
1. Inspect relevant existing code.
2. State the scope and files likely to change.
3. Implement the smallest coherent feature set.
4. Run type checks, linting, and relevant tests.
5. Fix regressions.
6. Summarize completed work and known limitations.
7. Update the implementation checklist.
8. Wait for approval before moving into a major new phase if the user is directing development step by step.

### First task for the coding agent

Do not immediately generate the entire platform.

First:
- Inspect the repository.
- Compare the existing project with this specification.
- Identify what already exists.
- Produce a gap analysis.
- Propose an implementation sequence for Release 1 (Web Development).
- Identify technical risks, especially secure code execution and shared AI quotas.
- Then implement only the first approved phase.

---

## 43. Final product definition

PromptLab should become a multi-domain applied AI learning platform where users can:

- Learn prompt engineering through structured paths.
- Choose their own explanation language and domain tools.
- Practice through interactive challenges.
- Receive useful AI-assisted feedback.
- Work in domain-specific studios.
- Build tangible projects.
- Verify and improve AI-generated results.
- Track their real skills over time.
- Create custom learning paths when their domain is not already listed.

The defining product principle is:

**PromptLab does not just teach people to write prompts. It teaches them to use AI effectively, critically, and practically to accomplish real work.**
