import os
import textwrap
from reportlab.lib.pagesizes import letter
from reportlab.lib.units import inch
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, Preformatted, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

class NumberedCanvas(canvas.Canvas):
    """Adds running headers and footers with Page X of Y."""
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))
        
        # Header (on pages after the cover)
        if self._pageNumber > 1:
            self.drawString(40, 755, "Irodov Plus Classes — Complete Project Architecture & Codebase")
            self.setStrokeColor(colors.HexColor("#e2e8f0"))
            self.setLineWidth(0.5)
            self.line(40, 750, 572, 750)
            
            # Footer
            self.drawString(40, 25, "Confidential & Proprietary • Full Source Code Reference")
            page_text = f"Page {self._pageNumber} of {page_count}"
            self.drawRightString(572, 25, page_text)
            self.line(40, 35, 572, 35)
        self.restoreState()


def wrap_code_lines(code_text, max_len=94):
    """Wraps long lines so they do not clip on letter-width PDF."""
    lines = code_text.splitlines()
    wrapped_lines = []
    for line in lines:
        if len(line) <= max_len:
            wrapped_lines.append(line)
        else:
            leading_space = len(line) - len(line.lstrip(' '))
            indent = ' ' * leading_space
            sub_lines = textwrap.wrap(line, width=max_len, subsequent_indent=indent + '    ')
            wrapped_lines.extend(sub_lines)
    return "\n".join(wrapped_lines)


def build_full_codebase_pdf(output_pdf_path):
    doc = SimpleDocTemplate(
        output_pdf_path,
        pagesize=letter,
        rightMargin=40,
        leftMargin=40,
        topMargin=50,
        bottomMargin=50
    )

    styles = getSampleStyleSheet()

    primary_color = colors.HexColor("#1e3a8a")     # Deep blue
    accent_color = colors.HexColor("#2563eb")      # Blue
    section_color = colors.HexColor("#0f766e")     # Teal
    dark_gray = colors.HexColor("#1e293b")
    code_bg = colors.HexColor("#f8fafc")
    code_border = colors.HexColor("#cbd5e1")

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=primary_color,
        spaceAfter=6
    )

    subtitle_style = ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=11,
        leading=15,
        textColor=colors.HexColor("#475569"),
        spaceAfter=15
    )

    section_heading = ParagraphStyle(
        'SectionHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=14,
        leading=18,
        textColor=section_color,
        spaceBefore=14,
        spaceAfter=8,
        keepWithNext=True
    )

    file_title_style = ParagraphStyle(
        'FileTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=primary_color,
        spaceBefore=10,
        keepWithNext=True
    )

    file_meta_style = ParagraphStyle(
        'FileMeta',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=8,
        leading=11,
        textColor=colors.HexColor("#475569"),
        spaceAfter=4,
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
        'CodeStyle',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=6.5,
        leading=8.2,
        textColor=colors.HexColor("#0f172a")
    )

    story = []

    # 1. Cover / Header Banner
    story.append(Paragraph("Irodov Plus Classes", title_style))
    story.append(Paragraph("Complete Project Architecture, Structure & Full Source Code Reference (Frontend & Backend)", subtitle_style))
    story.append(HRFlowable(width="100%", thickness=2, color=accent_color, spaceAfter=12))

    # Executive Overview
    overview_text = (
        "<b>Document Purpose:</b> This document contains the full architecture, folder hierarchy, and "
        "<b>100% of the production source code</b> for the <i>Irodov Plus Classes</i> educational web platform. "
        "The application provides online student registration and authentication, a class PDF material distribution engine, "
        "an admissions and course enrollment workflow with UPI payment proof verification, and an administrative CMS for JD Sir."
    )
    story.append(Paragraph(overview_text, body_style))
    story.append(Spacer(1, 8))

    # Tech Stack Summary Table
    tech_summary = [
        [Paragraph("<b>Component</b>", body_style), Paragraph("<b>Tech Stack</b>", body_style), Paragraph("<b>Description</b>", body_style)],
        [Paragraph("Frontend", body_style), Paragraph("React 19 + Vite 7", body_style), Paragraph("Modular Single Page Application with dynamic routing and live auth state.", body_style)],
        [Paragraph("Styling", body_style), Paragraph("Tailwind CSS v4 + DaisyUI", body_style), Paragraph("Responsive utility styling with modal overlays, badges, and drawers.", body_style)],
        [Paragraph("Backend API", body_style), Paragraph("Node.js + Express 5", body_style), Paragraph("REST API handling JSON payloads, JWT sessions, and binary file streams.", body_style)],
        [Paragraph("Database", body_style), Paragraph("MongoDB Atlas + Mongoose 8", body_style), Paragraph("NoSQL cloud database storing students, class PDFs, enrollments, and gallery.", body_style)],
        [Paragraph("Authentication", body_style), Paragraph("Bcrypt (10 salt rounds) + JWT", body_style), Paragraph("Adaptive password hashing with stateless 7-day signed bearer tokens.", body_style)],
        [Paragraph("File Storage", body_style), Paragraph("Multer (MemoryStorage)", body_style), Paragraph("Buffers uploaded PDF documents directly into MongoDB documents.", body_style)],
    ]
    t_summary = Table(tech_summary, colWidths=[1.1*letter[0]/7, 1.8*letter[0]/7, 3.8*letter[0]/7])
    t_summary.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), colors.HexColor("#f1f5f9")),
        ('BOX', (0,0), (-1,-1), 0.5, colors.HexColor("#cbd5e1")),
        ('INNERGRID', (0,0), (-1,-1), 0.5, colors.HexColor("#e2e8f0")),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(t_summary)
    story.append(Spacer(1, 12))

    # 2. Project Directory Tree Structure
    story.append(Paragraph("Project Tree & Directory Structure", section_heading))
    tree_ascii = """Irodovnew/
├── Backend/
│   ├── config/
│   │   ├── development.json         # Dev MongoDB Atlas connection string
│   │   ├── production.json          # Production MongoDB connection string
│   │   ├── keys.js                  # JWT secret key export
│   │   ├── mongoose-connect.js      # Mongoose DB connection logic
│   │   └── multer-config.js         # Multer storage configuration
│   ├── Models/
│   │   ├── Student.js               # Student accounts schema (name, email, bcrypt hash)
│   │   ├── Resource.js              # Class PDF materials schema (binary buffer, metadata)
│   │   ├── Enroll.js                # Course admissions schema (UPI receipt buffer, marks)
│   │   ├── Image.js                 # Institute gallery pictures schema
│   │   └── ownermodel.js            # Admin / Owner account schema
│   ├── Route/
│   │   ├── studentRouter.js         # /api/students: register, login, profile, list all
│   │   ├── resourceRouter.js        # /api/resources: upload, list, inline view, download
│   │   ├── ownerRouter.js           # /owners: admin credentials verification
│   │   └── enroll.js                # /api/enroll: application submission & query
│   ├── utils/
│   │   └── generatetoken.js         # JWT signing helper function
│   ├── createowner.js               # Seed script to initialize JD Sir admin account
│   ├── index.js                     # Express server entry point, CORS whitelist, port listener
│   └── package.json                 # Backend dependencies & scripts
│
└── Frontend/
    ├── public/                      # Static assets, logos, and course JSON data
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx           # Top header bar with reactive student greeting & logout
    │   │   ├── Login.jsx            # Unified authentication modal (Student & Admin)
    │   │   ├── Resources.jsx        # Public class notes library with search & filter chips
    │   │   ├── OwnerResourceUpload.jsx # Admin PDF upload interface & deletion table
    │   │   ├── ViewStudents.jsx     # Admin viewer of registered student accounts
    │   │   ├── owner.jsx            # Admin control center dashboard
    │   │   ├── Enroll.jsx           # Admission form (restricted to logged-in students)
    │   │   ├── ViewEnrollments.jsx  # Admin viewer for admission applications
    │   │   ├── Banner.jsx           # Homepage hero banner with login-aware enroll button
    │   │   ├── Footer.jsx           # Website footer with dynamic student links
    │   │   ├── PhotoGallery.jsx     # Institute classroom and results photo gallery
    │   │   ├── Weprovide.jsx        # Academic offerings and feature cards
    │   │   ├── Academics.jsx        # Academic program descriptions
    │   │   ├── About.jsx            # About the institute & JD Sir
    │   │   ├── Contact.jsx          # Address, phone number, and location map
    │   │   ├── Filterphoto.jsx      # Gallery photo filtering helper
    │   │   ├── Photo.jsx            # Single photo card renderer
    │   │   ├── Result.jsx           # Student ranks and exam scores
    │   │   ├── Slider.jsx           # Interactive photo slider component for displaying featured institute banners
    │   │   ├── SliderPage.jsx       # Slider page wrapper
    │   │   ├── Staffdetails.jsx     # Faculty background and credentials
    │   │   ├── Sucess.jsx           # Enrollment confirmation success screen
    │   │   ├── Enrolls/Enrolls.jsx  # Page container for enrollment form
    │   │   └── Results/             # Board, NIT, and OJEE result categories
    │   ├── utils/
    │   │   └── api.js               # Auto-detects localhost:3000 vs production backend URL
    │   ├── Home/Home.jsx            # Main landing page assembling sections
    │   ├── Results/Results.jsx      # Results page wrapper
    │   ├── Aboutus/Aboutus.jsx      # About Us page wrapper
    │   ├── Contactus/Contactus.jsx  # Contact Us page wrapper
    │   ├── App.jsx                  # React Router client-side URL route definitions
    │   ├── App.css                  # Tailwind imports and DaisyUI theme directives
    │   └── main.jsx                 # Client entry point mounting to index.html
    └── package.json                 # Frontend dependencies (React 19, Vite, Tailwind)"""

    escaped_tree = tree_ascii.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
    story.append(Preformatted(escaped_tree, code_style))
    story.append(PageBreak())

    def add_code_file(relative_path, description):
        full_path = os.path.normpath(relative_path)
        if not os.path.exists(full_path):
            return

        try:
            with open(full_path, 'r', encoding='utf-8', errors='replace') as f:
                code_content = f.read()
        except Exception as e:
            code_content = f"// Error reading file: {str(e)}"

        display_path = relative_path.replace('\\', '/')

        story.append(Paragraph(f"📄 {display_path}", file_title_style))
        if description:
            story.append(Paragraph(f"<b>Purpose:</b> {description}", file_meta_style))
        story.append(HRFlowable(width="100%", thickness=0.5, color=accent_color, spaceAfter=4, spaceBefore=2))

        wrapped = wrap_code_lines(code_content, max_len=94)
        code_lines = wrapped.splitlines()
        
        numbered_lines = []
        for idx, line in enumerate(code_lines, 1):
            numbered_lines.append(f"{idx:3d} | {line}")
        numbered_code = "\n".join(numbered_lines)

        escaped_code = numbered_code.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
        story.append(Preformatted(escaped_code, code_style))
        story.append(Spacer(1, 14))

    # 3. BACKEND SOURCE CODE
    story.append(Paragraph("Part 1: Backend Source Code (Node.js & Express)", section_heading))
    story.append(Paragraph("Complete implementation of the server entry point, MongoDB Mongoose data models, and RESTful route controllers.", body_style))
    story.append(Spacer(1, 6))

    backend_manifest = [
        ("Backend/index.js", "Server entry point: initializes Express, mounts CORS with production/development whitelists, parses JSON bodies and cookies, and registers all REST endpoints."),
        ("Backend/package.json", "Backend project manifest defining npm scripts and runtime dependencies (express, mongoose, bcrypt, jsonwebtoken, multer, cors, cookie-parser)."),
        ("Backend/config/mongoose-connect.js", "Establishes a persistent Mongoose connection to MongoDB Atlas with connection status logging."),
        ("Backend/config/development.json", "Configuration file defining the MongoDB Atlas database connection URI for development environments."),
        ("Backend/config/production.json", "Configuration file defining the MongoDB connection URI for production deployment."),
        ("Backend/config/keys.js", "Module exporting references to server-side cryptographic signing keys."),
        ("Backend/config/multer-config.js", "Configuration module for Multer file upload handling."),
        ("Backend/Models/Student.js", "Mongoose schema defining the Student data model: trimmed full name, lowercase unique email, 6+ char password, class grade, and timestamp."),
        ("Backend/Models/Resource.js", "Mongoose schema for class PDF materials: title, subject category, class grade, chapter, binary PDF buffer, contentType, and original file size."),
        ("Backend/Models/Enroll.js", "Mongoose schema for course enrollment applications: prospective student details, 10th-grade percentage, and binary UPI payment screenshot buffer."),
        ("Backend/Models/Image.js", "Mongoose schema for institute gallery photos: caption name and binary image data buffer."),
        ("Backend/Models/ownermodel.js", "Mongoose schema for administrator / institute owner credentials."),
        ("Backend/Route/studentRouter.js", "Authentication and profile router: implements student registration with bcrypt (10 rounds), login verification, JWT signing, profile queries, and admin student listing."),
        ("Backend/Route/resourceRouter.js", "Class materials router: implements 30MB PDF upload with Multer memoryStorage, lightweight list querying with .select('-pdf.data'), inline browser streaming (/view), and forced download attachment (/download)."),
        ("Backend/Route/ownerRouter.js", "Owner administration router: validates JD Sir admin credentials and sets owner authentication cookies."),
        ("Backend/Route/enroll.js", "Admissions router: accepts multipart enrollment forms with payment proof screenshots and returns base64-encoded admission records for admin review."),
        ("Backend/utils/generatetoken.js", "Helper module for generating 7-day signed JSON Web Tokens for user authorization."),
        ("Backend/createowner.js", "Database seeding script: creates the primary owner (JD Sir) administrative account with a salted bcrypt password hash."),
        ("Backend/.env", "Server environment variables storing secrets: JWT_KEY and EXPRESS_SESSION_SECRET."),
    ]

    for path, desc in backend_manifest:
        add_code_file(path, desc)

    story.append(PageBreak())

    # 4. FRONTEND SOURCE CODE
    story.append(Paragraph("Part 2: Frontend Source Code (React 19 & Vite)", section_heading))
    story.append(Paragraph("Complete implementation of the React client: application routing, smart API configuration, and all interactive components.", body_style))
    story.append(Spacer(1, 6))

    frontend_manifest = [
        ("Frontend/package.json", "Frontend project manifest defining scripts (vite dev, build) and dependencies (React 19, React Router 7, Tailwind CSS 4, DaisyUI, Axios, React Hook Form)."),
        ("Frontend/src/main.jsx", "Client application entry point: mounts the React root element to index.html wrapped in BrowserRouter."),
        ("Frontend/src/App.jsx", "Top-level application component: defines the React Router mapping for all public and administrative client routes."),
        ("Frontend/src/App.css", "Global stylesheets importing Fredoka/Poppins Google Fonts, Tailwind CSS v4, and DaisyUI component plugin."),
        ("Frontend/src/utils/api.js", "Dynamic API base URL resolver: automatically connects to http://localhost:3000 during local development and Render production when deployed."),
        ("Frontend/src/components/Navbar.jsx", "Main responsive navigation header: tracks student auth state via custom DOM events, renders student greeting badge with Logout, and displays the Enroll link only to authenticated students."),
        ("Frontend/src/components/Login.jsx", "Unified authentication modal dialog: features tabbed switching between Student Portal (Login & Register) and Owner / Admin Login with full form validation."),
        ("Frontend/src/components/Resources.jsx", "Public study materials hub: live search bar by chapter/title, filter chips by subject and class, human-readable file size calculation, and action buttons for inline viewing and downloading."),
        ("Frontend/src/components/OwnerResourceUpload.jsx", "Admin PDF study material manager: drag-and-drop 30MB PDF file picker with form inputs, upload progress state, and live table of uploaded materials with delete buttons."),
        ("Frontend/src/components/ViewStudents.jsx", "Admin registered students viewer: searchable tabular list displaying all student accounts registered through the portal."),
        ("Frontend/src/components/owner.jsx", "Admin portal control center: dashboard for JD Sir with quick-navigation cards for PDF uploads, student database, admission applications, and gallery photos."),
        ("Frontend/src/components/Enroll.jsx", "Course enrollment form: displays UPI QR code, accepts payment screenshot and 10th-grade percentage, and enforces student authentication before allowing access."),
        ("Frontend/src/components/ViewEnrollments.jsx", "Admin enrollment review screen: displays student applications alongside decoded base64 payment screenshots and academic records."),
        ("Frontend/src/components/OwnerUpload.jsx", "Admin photo upload screen: handles uploading institute achievement and event images into the database."),
        ("Frontend/src/components/Banner.jsx", "Hero section banner: displays institute banner graphics with a smart 'Enroll now' link (if logged in) or 'Login to Enroll' trigger."),
        ("Frontend/src/components/Footer.jsx", "Global site footer: displays copyright, contact links, social icons, and login-aware enrollment navigation."),
        ("Frontend/src/components/PhotoGallery.jsx", "Public photo gallery: fetches and renders classroom and event images stored in the MongoDB Image collection."),
        ("Frontend/src/components/Weprovide.jsx", "Academic offerings showcase: cards detailing special physics batches, foundation courses, and problem-solving workshops."),
        ("Frontend/src/components/Academics.jsx", "Academic curriculum section: outlines teaching methodology, syllabus pacing, and test series structure."),
        ("Frontend/src/components/About.jsx", "About page component: biography of JD Sir, teaching philosophy, and coaching history."),
        ("Frontend/src/components/Contact.jsx", "Contact details component: phone numbers, coaching address in Baripada, and Google Maps embed."),
        ("Frontend/src/components/Filterphoto.jsx", "Gallery filtering component allowing users to sort photos by category."),
        ("Frontend/src/components/Photo.jsx", "Presentational component rendering an individual gallery photo card."),
        ("Frontend/src/components/Result.jsx", "Student results overview component: displays past top ranks and student testimonials."),
        ("Frontend/src/components/Slider.jsx", "Interactive photo slider component for displaying featured institute banners."),
        ("Frontend/src/components/SliderPage.jsx", "Container page for image slider presentations."),
        ("Frontend/src/components/Staffdetails.jsx", "Faculty profile component highlighting qualifications and mentoring experience."),
        ("Frontend/src/components/Sucess.jsx", "Success confirmation screen displayed after a student submits their course enrollment application."),
        ("Frontend/src/components/Enrolls/Enrolls.jsx", "Page container wrapping Navbar, the Enroll form component, and Footer."),
        ("Frontend/src/components/Results/Board.jsx", "CHSE/CBSE 12th Board examination top scorers and distinction list."),
        ("Frontend/src/components/Results/Nit.jsx", "NIT and JEE Main qualified students achievement showcase."),
        ("Frontend/src/components/Results/Ojee.jsx", "OJEE state rank holders achievement showcase."),
        ("Frontend/src/Home/Home.jsx", "Homepage container assembling Banner, We Provide, Gallery, Academics, and Footer."),
        ("Frontend/src/Results/Results.jsx", "Results page container assembling result categories and rankings."),
        ("Frontend/src/Aboutus/Aboutus.jsx", "About Us page container assembling institute history and faculty profiles."),
        ("Frontend/src/Contactus/Contactus.jsx", "Contact Us page container assembling contact cards and enquiry forms."),
    ]

    for path, desc in frontend_manifest:
        add_code_file(path, desc)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"SUCCESS: Full codebase PDF compiled: {output_pdf_path}")


if __name__ == '__main__':
    target = r"C:\Users\manas\OneDrive\Desktop\All_folder\CODING\Irodovnew\IrodovPlusClasses_Complete_Codebase_and_Structure.pdf"
    build_full_codebase_pdf(target)
