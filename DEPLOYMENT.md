# 🩺 Dr. NEET CBT Exam Portal - Deployment & Sharing Guide

Aapki girlfriend is portal ko apne **phone, tablet, ya laptop** par direct link khol kar access kar sake, iske liye aap ise 2 minute me free deploy kar sakte ho:

---

### Option 1: Vercel par 1-Click Free Deploy (Recommended)
1. **GitHub par code upload karein:**
   ```bash
   git init
   git add .
   git commit -m "Dr. NEET CBT Portal"
   git branch -M main
   # Apne GitHub repository ka remote add karein:
   git remote add origin https://github.com/<your-username>/neet-cbt-portal.git
   git push -u origin main
   ```
2. [Vercel.com](https://vercel.com) par jayein (free account login karein).
3. "Add New Project" -> Select your GitHub repo -> Click **Deploy**.
4. 30 seconds me aapko ek live link mil jayegi (jaise: `https://dr-neet-prep.vercel.app`), jo aap WhatsApp/Telegram par direct share kar sakte ho!

---

### Option 2: Netlify Drop (Bina Git ke, Direct Drag & Drop)
1. Project me build run karein:
   ```bash
   npm run build
   ```
2. Ek `dist` folder create ho jayega.
3. [app.netlify.com/drop](https://app.netlify.com/drop) par jayein.
4. `dist` folder ko browser me drag & drop kar dein.
5. Instant free live URL generate ho jayega!

---

### Option 3: Local Network (Ghar ke Wi-Fi par)
Agar dono ek hi Wi-Fi par connected hain:
- Browser me open karein: `http://10.46.71.35:5173/` (aapke laptop ka Wi-Fi IP)
- Woh apne mobile browser me yeh link dal kar access kar sakti hai!

---

### 🌟 Portal ke Features
- **Official NTA CBT Interface**: Real exam console with question palette (Green, Red, Purple, Gray), +4/-1 marking, countdown timer, question paper view, and section tabs.
- **Preloaded NEET Mocks**: Physics, Chemistry, Botany, and Zoology with authentic NCERT step-by-step solutions.
- **Personalized Touch**: "Dr. Sahiba" motivation notes, streak tracking, and celebratory confetti upon test submission.
- **Mistake Notebook**: 1-click bookmark to revise tricky questions and weak topics.
- **Custom Test Creator**: Aap khud bhi naye chapter tests ya coaching questions add kar sakte ho.
