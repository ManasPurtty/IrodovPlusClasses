import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch

def create_guide_pdf(filename):
    doc = SimpleDocTemplate(
        filename,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=40,
        bottomMargin=40
    )

    styles = getSampleStyleSheet()

    # Custom styles
    primary_color = colors.HexColor("#1e40af")
    secondary_color = colors.HexColor("#2563eb")
    dark_gray = colors.HexColor("#1f2937")
    light_bg = colors.HexColor("#f8fafc")
    border_color = colors.HexColor("#cbd5e1")
    code_bg = colors.HexColor("#0f172a")

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=primary_color,
        spaceAfter=6
    )

    subtitle_style = ParagraphStyle(
        'DocSubTitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor("#4b5563"),
        spaceAfter=15
    )

    h1_style = ParagraphStyle(
        'H1',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=primary_color,
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'H2',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=15,
        textColor=secondary_color,
        spaceBefore=10,
        spaceAfter=5,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=dark_gray,
        spaceAfter=6
    )

    code_style = ParagraphStyle(
        'CodeBlock',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=8,
        leading=10.5,
        textColor=colors.HexColor("#e2e8f0"),
        spaceAfter=6
    )

    qa_title_style = ParagraphStyle(
        'QATitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=14,
        textColor=colors.HexColor("#065f46"),
        spaceAfter=4
    )

    story = []

    # Title & Subtitle
    story.append(Paragraph("Irodov Plus Classes - Full Project & Interview Guide", title_style))
    story.append(Paragraph("A Comprehensive Beginner-to-Advanced Codebase Breakdown, Architecture Overview, and Top Technical Interview Questions & Answers", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=1.5, color=primary_color, spaceAfter=12))

    # Section 1: Project Overview
    story.append(Paragraph("1. Executive Project Overview", h1_style))
    overview_text = (
        "<b>Irodov Plus Classes</b> is a production-ready, full-stack educational portal designed for a premier physics coaching institute "
        "headed by Er. Jagannath Dutta (JD Sir). Built on the <b>MERN stack</b> (MongoDB, Express, React 19, Node.js), it solves two primary "
        "operational requirements: <b>(1) Student Onboarding & Admissions</b> through registration, login, and UPI receipt verification, and "
        "<b>(2) Digital Class Material Distribution</b> enabling the admin to upload lecture notes and problem sheets in PDF format, which students "
        "can search, preview inline in their browser, or download."
    )
    story.append(Paragraph(overview_text, body_style))

    # Tech Stack Table
    tech_data = [
        [Paragraph("<b>Component</b>", body_style), Paragraph("<b>Technology</b>", body_style), Paragraph("<b>Key Role & Architectural Reason</b>", body_style)],
        [Paragraph("Frontend Library", body_style), Paragraph("React 19 + Vite 7", body_style), Paragraph("Modern reactive SPA with sub-second HMR and component modularity.", body_style)],
        [Paragraph("Styling System", body_style), Paragraph("Tailwind CSS v4 + DaisyUI", body_style), Paragraph("Utility-first styling with pre-built accessible components (modals, drawers).", body_style)],
        [Paragraph("Routing & Forms", body_style), Paragraph("React Router 7 + Hook Form", body_style), Paragraph("Client-side routing with high-performance uncontrolled form validations.", body_style)],
        [Paragraph("Backend Framework", body_style), Paragraph("Node.js + Express 5", body_style), Paragraph("REST API gateway managing JSON parsing, streaming, and middleware pipelines.", body_style)],
        [Paragraph("Database & ODM", body_style), Paragraph("MongoDB Atlas + Mongoose 8", body_style), Paragraph("Flexible NoSQL document store with strict schema definitions and validation.", body_style)],
        [Paragraph("Security & Auth", body_style), Paragraph("Bcrypt + JWT + Cookies", body_style), Paragraph("Adaptive 10-round salted password hashing and stateless session tokens.", body_style)],
        [Paragraph("File Storage", body_style), Paragraph("Multer (MemoryStorage)", body_style), Paragraph("Multipart stream parsing storing PDF buffers directly in MongoDB documents.", body_style)],
    ]
    t_tech = Table(tech_data, colWidths=[1.3*inch, 1.6*inch, 4.1*inch])
    t_tech.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), light_bg),
        ('BOX', (0,0), (-1,-1), 0.5, border_color),
        ('INNERGRID', (0,0), (-1,-1), 0.5, border_color),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_tech)
    story.append(Spacer(1, 10))

    # Section 2: Complete Project Structure
    story.append(Paragraph("2. Project Directory Tree & Codebase Blueprint", h1_style))
    tree_text = (
        "<b>Backend Architecture:</b><br/>"
        "• <code>config/</code>: Holds MongoDB connection logic (<code>mongoose-connect.js</code>) and environment-specific database credentials.<br/>"
        "• <code>Models/</code>: Mongoose schemas enforcing database contracts: <code>Student.js</code>, <code>Resource.js</code>, <code>ownermodel.js</code>, <code>Enroll.js</code>, <code>Image.js</code>.<br/>"
        "• <code>Route/</code>: Modular route controllers: <code>studentRouter.js</code> (auth & profile), <code>resourceRouter.js</code> (PDF uploads & streams), <code>ownerRouter.js</code> (admin auth), <code>enroll.js</code>.<br/>"
        "• <code>index.js</code>: Main server entry point establishing CORS, parsing middleware, mounting routers, and launching the listener.<br/><br/>"
        "<b>Frontend Architecture:</b><br/>"
        "• <code>src/utils/api.js</code>: Dynamic API base URL resolver (seamlessly switches between localhost and production).<br/>"
        "• <code>src/components/Navbar.jsx</code>: Stateful global navigation tracking student session via custom events.<br/>"
        "• <code>src/components/Login.jsx</code>: Unified authentication modal supporting both Student (Login/Register) and Admin roles.<br/>"
        "• <code>src/components/Resources.jsx</code>: Student repository with live search, topic/class filters, and PDF action buttons.<br/>"
        "• <code>src/components/OwnerResourceUpload.jsx</code>: Admin dashboard for uploading and deleting PDF materials.<br/>"
        "• <code>src/components/ViewStudents.jsx</code>: Admin view of all registered student accounts.<br/>"
        "• <code>src/App.jsx</code>: Central route registry defining client endpoints (/resources, /owner, /enroll)."
    )
    story.append(Paragraph(tree_text, body_style))
    story.append(Spacer(1, 10))

    story.append(PageBreak())

    # Section 3: In-Depth Backend Code Walkthrough
    story.append(Paragraph("3. Deep-Dive Backend Code Walkthrough", h1_style))
    
    story.append(Paragraph("A. Student Model (Backend/Models/Student.js)", h2_style))
    story.append(Paragraph(
        "Defines the schema for student accounts. Crucially includes unique and lowercase flags on <code>email</code> "
        "to prevent duplicate registrations with varying capitalization, and enforces a minimum 6-character password constraint.", body_style
    ))
    code_student = (
        "const studentSchema = new mongoose.Schema({\n"
        "  fullname: { type: String, required: true, trim: true },\n"
        "  email: { type: String, required: true, unique: true, lowercase: true, trim: true },\n"
        "  password: { type: String, required: true, minLength: 6 }, // Hashed bcrypt string\n"
        "  phone: { type: String, trim: true, default: '' },\n"
        "  classGrade: { type: String, trim: true, default: 'Class 12' },\n"
        "  createdAt: { type: Date, default: Date.now }\n"
        "});"
    )
    t_c1 = Table([[Paragraph(code_student.replace('\n', '<br/>'), code_style)]], colWidths=[7.0*inch])
    t_c1.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), code_bg),
        ('BOX', (0,0), (-1,-1), 0.5, code_bg),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_c1)
    story.append(Spacer(1, 6))

    story.append(Paragraph("B. Resource Model (Backend/Models/Resource.js)", h2_style))
    story.append(Paragraph(
        "Defines the structure of downloadable PDF materials. Stores binary data directly as a <code>Buffer</code> "
        "along with its MIME type (<code>application/pdf</code>), original filename, and size in bytes.", body_style
    ))
    code_res = (
        "const resourceSchema = new mongoose.Schema({\n"
        "  title: { type: String, required: true, trim: true },\n"
        "  description: { type: String, trim: true, default: '' },\n"
        "  subject: { type: String, trim: true, default: 'Physics' },\n"
        "  classGrade: { type: String, trim: true, default: 'All Classes' },\n"
        "  chapter: { type: String, trim: true, default: '' },\n"
        "  pdf: {\n"
        "    data: { type: Buffer, required: true },\n"
        "    contentType: { type: String, default: 'application/pdf' },\n"
        "    fileName: { type: String, required: true },\n"
        "    fileSize: { type: Number, default: 0 }\n"
        "  },\n"
        "  uploadedBy: { type: String, default: 'JD Sir (Admin)' },\n"
        "  createdAt: { type: Date, default: Date.now }\n"
        "});"
    )
    t_c2 = Table([[Paragraph(code_res.replace('\n', '<br/>'), code_style)]], colWidths=[7.0*inch])
    t_c2.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), code_bg),
        ('BOX', (0,0), (-1,-1), 0.5, code_bg),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_c2)
    story.append(Spacer(1, 6))

    story.append(Paragraph("C. Student Router: Registration & Login (Backend/Route/studentRouter.js)", h2_style))
    story.append(Paragraph(
        "Demonstrates the password security lifecycle. Notice the use of <code>bcrypt.hash(password, 10)</code> "
        "for registration and <code>bcrypt.compare(password, student.password)</code> during login.", body_style
    ))
    code_auth = (
        "// 1. Password Hashing & Registration\n"
        "const hashedPassword = await bcrypt.hash(password, 10);\n"
        "const newStudent = new Student({\n"
        "  fullname, email: normalizedEmail, password: hashedPassword, phone, classGrade\n"
        "});\n"
        "await newStudent.save();\n\n"
        "// 2. Authentication & JWT Token Issuance\n"
        "const isMatch = await bcrypt.compare(password, student.password);\n"
        "if (!isMatch) return res.status(401).json({ success: false, message: 'Invalid credentials' });\n\n"
        "const token = jwt.sign(\n"
        "  { id: student._id, email: student.email, role: 'student' },\n"
        "  process.env.JWT_KEY, { expiresIn: '7d' }\n"
        ");"
    )
    t_c3 = Table([[Paragraph(code_auth.replace('\n', '<br/>'), code_style)]], colWidths=[7.0*inch])
    t_c3.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), code_bg),
        ('BOX', (0,0), (-1,-1), 0.5, code_bg),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_c3)
    story.append(Spacer(1, 6))

    story.append(Paragraph("D. Resource Router: Projection Optimization & Streaming (Backend/Route/resourceRouter.js)", h2_style))
    story.append(Paragraph(
        "Key architectural highlight: <code>.select('-pdf.data')</code> strips out multi-megabyte binary buffers from the metadata query, "
        "ensuring instant response times. The inline and download streaming routes set proper HTTP <code>Content-Disposition</code> headers.", body_style
    ))
    code_stream = (
        "// 1. Lightweight Query with Field Projection\n"
        "const resources = await Resource.find(query).select('-pdf.data').sort({ createdAt: -1 });\n\n"
        "// 2. Inline PDF Viewing in Browser Tab\n"
        "router.get('/:id/view', async (req, res) => {\n"
        "  const resource = await Resource.findById(req.params.id);\n"
        "  res.setHeader('Content-Type', 'application/pdf');\n"
        "  res.setHeader('Content-Disposition', `inline; filename=\"${resource.pdf.fileName}\"`);\n"
        "  res.send(resource.pdf.data);\n"
        "});"
    )
    t_c4 = Table([[Paragraph(code_stream.replace('\n', '<br/>'), code_style)]], colWidths=[7.0*inch])
    t_c4.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), code_bg),
        ('BOX', (0,0), (-1,-1), 0.5, code_bg),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_c4)

    story.append(PageBreak())

    # Section 4: In-Depth Frontend Code Walkthrough
    story.append(Paragraph("4. Deep-Dive Frontend Code Walkthrough", h1_style))
    
    story.append(Paragraph("A. Dynamic Base URL Resolver (Frontend/src/utils/api.js)", h2_style))
    story.append(Paragraph(
        "Eliminates hardcoded localhost URLs. If executed in a local browser (<code>hostname === 'localhost'</code>), "
        "it connects to the local backend port 3000; in deployed environments, it automatically defaults to Render production.", body_style
    ))

    story.append(Paragraph("B. Global Reactive Auth State in Navbar (Frontend/src/components/Navbar.jsx)", h2_style))
    story.append(Paragraph(
        "Demonstrates an elegant event-driven state update without adding Redux boilerplate. Dispatches a custom DOM event "
        "<code>studentAuthChange</code> whenever a student logs in or logs out, causing the navigation bar to immediately sync its greeting badge.", body_style
    ))
    code_nav = (
        "useEffect(() => {\n"
        "  const loadStudent = () => {\n"
        "    const saved = localStorage.getItem('studentUser');\n"
        "    setStudent(saved ? JSON.parse(saved) : null);\n"
        "  };\n"
        "  loadStudent();\n"
        "  window.addEventListener('studentAuthChange', loadStudent);\n"
        "  return () => window.removeEventListener('studentAuthChange', loadStudent);\n"
        "}, []);"
    )
    t_c5 = Table([[Paragraph(code_nav.replace('\n', '<br/>'), code_style)]], colWidths=[7.0*inch])
    t_c5.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), code_bg),
        ('BOX', (0,0), (-1,-1), 0.5, code_bg),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_c5)
    story.append(Spacer(1, 6))

    story.append(Paragraph("C. Study Materials Page (Frontend/src/components/Resources.jsx)", h2_style))
    story.append(Paragraph(
        "Features multi-criteria search and filter chips (Mechanics, Electromagnetism, Optics, Class 11, Class 12). "
        "Calculates human-readable file sizes dynamically (KB/MB) and renders cards with inline view and download triggers.", body_style
    ))
    story.append(Spacer(1, 10))

    # Section 5: Top Interview Questions & Detailed Answers
    story.append(Paragraph("5. Top Technical Interview Questions & Answers", h1_style))

    qas = [
        (
            "Q1: Walk me through the architecture and how a request travels from the React frontend to MongoDB.",
            "Our project follows a 3-tier MERN client-server architecture: (1) Presentation layer in React 19 SPA running in the browser, "
            "(2) Application/API layer in Node.js & Express 5, and (3) Data layer in MongoDB Atlas managed through Mongoose 8. "
            "When a user triggers an action (e.g. logging in), React Hook Form validates the input client-side. Axios sends an asynchronous HTTP POST "
            "request with credentials. Express passes the request through CORS and express.json() middlewares. The studentRouter executes business logic, "
            "queries MongoDB via Mongoose, compares password hashes with bcrypt, and returns a signed JWT token. The client stores the user session "
            "in localStorage and dispatches a studentAuthChange event to immediately update the navigation bar."
        ),
        (
            "Q2: Why use Bcrypt instead of SHA-256 for password hashing?",
            "SHA-256 is designed to be fast for file verification and cryptographic proofs. Because it is fast, modern GPUs can compute billions of SHA-256 "
            "hashes per second, making offline rainbow table and brute-force dictionary attacks trivial. In contrast, Bcrypt is deliberately slow and adaptive. "
            "It incorporates a built-in salt to defeat rainbow tables and has a configurable work factor (salt rounds = 10, meaning 2^10 iterations). "
            "This deliberate computational overhead makes brute-force attacks computationally prohibitive even if the database is compromised."
        ),
        (
            "Q3: How do you handle file uploads, and what are the trade-offs of storing file buffers directly in MongoDB?",
            "We use Multer with memoryStorage(), which intercepts multipart/form-data and buffers the incoming file into memory as req.file.buffer. "
            "We then store the binary buffer directly in a Mongoose document. The advantage for this institute portal is a self-contained, zero-dependency "
            "architecture without requiring external cloud accounts (AWS/Cloudinary), with atomic deletions (deleting a resource record purges the file). "
            "The trade-off is MongoDB's 16MB document size limit and database RAM utilization. In a massive enterprise system, we would upload the buffer "
            "to AWS S3 and persist only the resulting CDN URL in MongoDB."
        ),
        (
            "Q4: How did you optimize database queries when listing resources containing large PDFs?",
            "By default, Mongoose loads every field including pdf.data. Pulling 20 PDF documents of 5MB each would transfer 100MB of binary data over the wire "
            "on every single page view! We resolved this using Mongoose Field Projection: Resource.find(query).select('-pdf.data'). This reduces the "
            "payload from 100MB down to ~2KB of lightweight JSON metadata (title, subject, file size, date). The binary data is only loaded on demand when "
            "a student explicitly clicks on /api/resources/:id/view or /api/resources/:id/download."
        ),
        (
            "Q5: How does the server differentiate between opening a PDF in the browser vs forcing a download?",
            "This is controlled using HTTP response headers: For inline viewing, we set Content-Disposition: inline; filename='notes.pdf', "
            "which tells the browser's built-in PDF viewer to open and render the document inside a new browser tab. For forced downloading, we set "
            "Content-Disposition: attachment; filename='notes.pdf' and Content-Type: application/octet-stream, which instructs the browser to open "
            "the OS Save As prompt."
        ),
        (
            "Q6: How would you scale this application from 500 students to 100,000 active students?",
            "I would implement a 4-step scaling strategy: (1) Offload file buffers from MongoDB to Amazon S3 edge-cached through AWS CloudFront CDN. "
            "(2) Deploy a Redis caching layer in front of Express to cache frequent read endpoints (/api/resources, /images), cutting database queries by 80%+. "
            "(3) Add compound database indexes ({ subject: 1, classGrade: 1, createdAt: -1 }) and MongoDB Atlas read replicas. (4) Horizontally scale "
            "the stateless Express server across multiple Docker containers behind an Nginx or AWS Application Load Balancer (ALB)."
        )
    ]

    for q, a in qas:
        q_p = Paragraph(f"<b>{q}</b>", qa_title_style)
        a_p = Paragraph(a, body_style)
        t_qa = Table([[q_p], [a_p]], colWidths=[7.0*inch])
        t_qa.setStyle(TableStyle([
            ('BACKGROUND', (0,0), (-1,-1), light_bg),
            ('BOX', (0,0), (-1,-1), 0.5, border_color),
            ('LINELEFT', (0,0), (0,-1), 3.0, colors.HexColor("#10b981")),
            ('TOPPADDING', (0,0), (-1,-1), 6),
            ('BOTTOMPADDING', (0,0), (-1,-1), 6),
            ('LEFTPADDING', (0,0), (-1,-1), 8),
            ('RIGHTPADDING', (0,0), (-1,-1), 8),
        ]))
        story.append(t_qa)
        story.append(Spacer(1, 6))

    doc.build(story)
    print(f"PDF successfully created: {filename}")

if __name__ == '__main__':
    target = r"C:\Users\manas\OneDrive\Desktop\All_folder\CODING\Irodovnew\IrodovPlusClasses_Project_and_Interview_Guide.pdf"
    create_guide_pdf(target)
