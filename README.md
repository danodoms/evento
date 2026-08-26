<img width="6067" height="889" alt="Evento — QR code event attendance system for schools and universities" src="https://github.com/user-attachments/assets/19e45515-632f-4913-b209-1cb42774944c" />

<h1 align="center">Evento — QR Code Attendance System for Schools &amp; Universities</h1>

<p align="center">
  <b>Open-source event check-in app.</b> Scan a student ID QR code, log attendance in under a second.<br/>
  A free replacement for pen-and-paper attendance sheets — installable as a PWA on any phone, no app store.
</p>

<p align="center">
  <a href="https://www.danodoms.com/case-studies/evento"><b>Case Study</b></a> ·
  <a href="#-screenshots">Screenshots</a> ·
  <a href="#-quick-start">Quick Start</a> ·
  <a href="#-features">Features</a>
</p>

<p align="center">
  <a href="https://github.com/domsdano/events-attendance/stargazers"><img src="https://img.shields.io/github/stars/domsdano/events-attendance?style=flat-square&logo=github" alt="GitHub stars"></a>
  <img src="https://img.shields.io/badge/PWA-installable-5A0FC8?style=flat-square&logo=pwa" alt="PWA">
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
</p>

---

## Why Evento

Universities still take event attendance with paper sign-in sheets. A single seminar with hundreds of students means a long queue at the door, unreadable handwriting, hours of manual encoding afterwards, and no reliable way to catch someone signing in for a friend.

Evento replaces that with a QR scan. Officers open the web app on their own phone, point it at a student ID, and attendance is recorded in real time — no hardware to buy, no app to install, no encoding afterwards.

**Built for:** student councils, university organizations, department events, seminars, general assemblies, school clubs, and any event that needs fast, verifiable check-in.

📖 **Read the full case study:** https://www.danodoms.com/case-studies/evento

## ✨ Features

| | Feature | What it does |
|---|---|---|
| 📷 | **QR code attendance scanning** | Scan existing student ID QR codes with any phone camera — check-in takes under a second. |
| 📲 | **Installable PWA** | Add to home screen on Android, iOS, or desktop. No app store, no APK, no install friction for volunteers. |
| ⚡ | **Real-time attendance records** | Every scan syncs instantly across all devices — multiple officers can scan at different doors simultaneously. |
| 🔐 | **Role-based access control** | Main admin, secondary admin, and officer roles with scoped permissions so officers can scan but not alter records. |
| 📊 | **Event management** | Create events, track attendance per event, and review who attended without manual encoding. |
| 🔔 | **Instant feedback** | Toast notifications confirm every scan, so officers know immediately whether a check-in succeeded. |
| 📱 | **Responsive on any device** | Works on budget Android phones, tablets, and desktops — the same URL for everyone. |

## 📸 Screenshots

![Evento dashboard showing live event attendance count and recent check-ins](https://github.com/user-attachments/assets/c56edd37-96a2-4ef9-ba52-424fba481635)

![QR code scanner scanning a university student ID for event check-in](https://github.com/user-attachments/assets/f95ba3e7-dccd-451f-bf1d-b047345f0d94)

![Real-time attendance record list with student names and timestamps](https://github.com/user-attachments/assets/6a206e55-0924-4223-b2b6-b6dc583a8063)

![Event creation and management screen in Evento attendance system](https://github.com/user-attachments/assets/a2706983-6bac-4ed5-b05f-5f44c46652ed)

![User management screen with admin and officer role permissions](https://github.com/user-attachments/assets/443c963e-109d-4fb5-bb80-5b623efa6e0b)

![Evento PWA installed on a mobile phone home screen](https://github.com/user-attachments/assets/ab96c810-5853-4a8c-bde8-1043e11815bc)

![Attendance summary view for a university event in Evento](https://github.com/user-attachments/assets/f409b6b0-e990-4828-8cac-20ac3a2a9fbc)

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | **React** + **TypeScript** |
| Styling | **Tailwind CSS** + **shadcn/ui** |
| State | **Zustand** |
| Data fetching | **TanStack Query** (React Query) |
| QR scanning | **Html5Qrcode** |
| Animation | **Framer Motion** |
| Notifications | **React Toastify** |
| PWA | Service worker + web app manifest |

## ⚡ Quick Start

**Prerequisites:** Node.js 18+ and npm.

```sh
# 1. Clone the repository
git clone https://github.com/domsdano/events-attendance.git
cd events-attendance

# 2. Install dependencies
npm install

# 3. Run the development server
npm start
```

Open the local URL printed in your terminal.

**Build for production:**

```sh
npm run build
```

Deploy the build output to Vercel, Netlify, Cloudflare Pages, or any static host. Serve over **HTTPS** — the browser camera API required for QR scanning will not work over plain HTTP.

## 📖 Usage

1. **Log in** — admins and officers sign in with their credentials.
2. **Create an event** — set the event name, date, and which officers can scan for it.
3. **Scan student IDs** — open the scanner and point the camera at each student's ID QR code.
4. **Watch attendance live** — records appear in real time across every logged-in device.
5. **Manage users** — assign admin or officer roles and revoke access when an event ends.

## 🗺️ Roadmap

- [ ] CSV / Excel export of attendance records
- [ ] Offline-first scanning with background sync
- [ ] Time-in / time-out tracking
- [ ] Bulk student import
- [ ] Docker deployment guide

Have a request? [Open an issue](https://github.com/domsdano/events-attendance/issues).

## ❓ FAQ

**Does it need special scanning hardware?**
No. Any phone with a camera works. Evento runs in the browser.

**Does it work with our existing student IDs?**
Yes, as long as the ID has a QR code encoding the student number.

**Can it work offline?**
Not yet — offline-first scanning is on the roadmap. It currently needs a connection to sync in real time.

**Is it free?**
Yes, fully open source. Self-host it for free.

## 🤝 Contributing

Contributions are welcome — bug reports, feature ideas, and pull requests.

1. **Fork** the repository on GitHub (use the Fork button).
2. **Clone your fork and create a branch:**
   ```sh
   git clone https://github.com/YOUR-USERNAME/events-attendance.git
   cd events-attendance
   git checkout -b feature/your-feature-name
   ```
3. **Commit your changes:**
   ```sh
   git commit -m "feat: add your feature"
   ```
4. **Push and open a pull request:**
   ```sh
   git push origin feature/your-feature-name
   ```

Check the [open issues](https://github.com/domsdano/events-attendance/issues) for good places to start.

## 📄 License

MIT

---

<p align="center">
  Built by <a href="https://www.danodoms.com">danodoms</a><br/>
  <b>⭐ If Evento is useful to you or your school, a star helps other organizations find it.</b>
</p>
