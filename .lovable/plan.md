

# RAG Tutor — AI Teaching Assistant

A premium, production-ready web application where students can upload study documents and chat with an AI that answers questions based on their notes.

---

## 🎨 Design System

**Dark Theme with Premium Feel:**
- Deep navy background (`#0F172A`)
- Glassmorphism cards with subtle blur effects
- Electric blue accent (`#38BDF8`) for CTAs and highlights
- Smooth Framer Motion animations throughout
- Rounded corners (2xl) and generous whitespace
- Professional typography with clear hierarchy

---

## 📱 Screens & Features

### 1. Landing Page (/)

**Hero Section**
- Bold headline: "Your AI Study Companion Powered by Your Notes"
- Animated gradient background with subtle floating elements
- Two CTAs: "Try Demo" and "Upload Notes"

**Feature Grid**
Four glassmorphism cards showcasing:
- 📄 Document Upload — drag & drop simplicity
- 🧠 Smart AI Answers — context-aware responses
- ✓ Zero Hallucination — answers from your notes only
- 🎯 Personalized Learning — your knowledge, enhanced

**Navigation Bar**
- Logo: "RAG Tutor" with gradient accent
- Links: Home, Chat, Upload
- Auth buttons: Login / Sign Up

---

### 2. Authentication (/auth)

**Login/Signup Flow**
- Beautiful glassmorphism card centered on screen
- Toggle between Login and Sign Up
- Email and password fields with validation
- Error handling with friendly messages
- Redirect to Chat after successful auth

---

### 3. Chat Interface (/chat) — Main Application

**Left Sidebar (collapsible on mobile)**
- User avatar and display name
- "Upload Document" button with icon
- List of uploaded files with file type icons
- "Clear Chat" action
- Dark/Light mode toggle
- Settings link

**Chat Window**
- Message bubbles with distinct styling:
  - User messages: light blue bubbles, right-aligned
  - AI responses: dark glass cards, left-aligned
- Typing indicator with animated dots
- Auto-scroll to newest messages
- Timestamps on messages

**Input Bar**
- Text input with placeholder: "Ask anything from your notes…"
- Upload icon for quick file attachment
- Send button with blue glow effect
- Keyboard shortcut support (Enter to send)

**Mock AI Behavior**
- Simulated responses for demo purposes
- Typing delay for realistic feel
- Sample responses about study topics

---

### 4. Upload Page (/upload)

**Upload Zone**
- Large drag & drop area with dashed border
- Animated icon showing upload action
- Supported formats clearly displayed (PDF, DOCX, TXT)
- Click-to-browse fallback

**Progress & Feedback**
- Animated progress bar during upload
- Success animation (checkmark with confetti effect)
- Error states with clear messaging

**File Management**
- Grid/list view of uploaded documents
- File cards with:
  - File name and type icon
  - Upload date
  - File size
  - Delete button with confirmation

---

### 5. Settings Panel

Accessible from sidebar, includes:
- **Appearance**: Dark/Light mode toggle with preview
- **Profile**: Edit display name
- **Data**: Clear all documents (with confirmation)
- **Storage**: Visual indicator of storage used
- **Account**: Logout button

---

## 🎬 Animations

All powered by Framer Motion:
- Page transitions with fade and slide
- Message bubbles fade in and scale
- Button hover effects with subtle glow
- Floating cards on landing page
- Typing indicator with bouncing dots
- Success celebrations on file upload
- Smooth sidebar collapse/expand

---

## 📱 Responsive Design

**Desktop**: Full sidebar + spacious chat panel
**Tablet**: Collapsible sidebar with overlay
**Mobile**: Bottom navigation, full-screen chat, sheet-based sidebar

---

## 🔌 Backend Integration Ready

The frontend will be structured to easily connect with your FastAPI backend:
- API service layer with typed requests
- `POST /ask` endpoint for AI questions
- File upload handlers ready for real storage
- Auth integration points clearly defined

---

## 🔐 Authentication

Using Supabase for:
- Email/password signup and login
- Session persistence
- Protected routes (Chat, Upload require auth)
- User profile storage

