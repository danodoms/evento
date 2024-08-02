# evento

evento is a Progressive Web App (PWA) designed to streamline and modernize attendance tracking for university events by replacing the traditional pen and paper methods with a fast, efficient, and digital solution.

## Features

- **Progressive Web App (PWA)**: Installable on any device and accessible offline, providing a seamless user experience similar to native apps.
- **QR Code Scanning**: Quickly scan student ID QR codes to log attendance instantly.
- **Real-Time Data**: Immediate updates and data synchronization for accurate and up-to-date attendance records.
- **User Roles and Permissions**: Different access levels for main admin, secondary admin, and officers with restricted features to ensure security and proper data management.
- **Notifications and Alerts**: Custom notifications for attendance-related events and potential issues.
- **Responsive Design**: Fully responsive design to ensure usability on any device, including desktops, tablets, and smartphones.

## Screenshots

![Untitled-2](https://github.com/user-attachments/assets/c56edd37-96a2-4ef9-ba52-424fba481635)


# MONOREPO

## Installation

To install and use Evento, follow these steps:

1. **Clone the Repository**:

   ```sh
   git clone https://github.com/domsdano/events-attendance.git
   ```

2. **Navigate to the Project Directory**:

   ```sh
   cd evento
   ```

3. **Install Dependencies**:

   ```sh
   npm install
   ```

4. **Run the App**:

   ```sh
   npm start
   ```

5. **Build the App for Production**:

   ```sh
   npm run build
   ```

6. **Deploy the App**: Follow your preferred method to deploy the built app to your web server or hosting service.

## Usage

1. **Login**: Admins and officers log in using their credentials.
2. **Scan QR Code**: Use the built-in QR code scanner to scan student IDs for attendance.
3. **View Attendance Records**: Access and manage real-time attendance data.
4. **Notifications**: Receive alerts and notifications for attendance-related events.
5. **User Management**: Manage users and assign appropriate roles and permissions.

## Technologies Used

- **React**: For building the user interface.
- **Tailwind CSS**: For styling the application.
- **shadcn**: For accessible components.
- **Zustand**: For state management.
- **React Query**: For data fetching and caching.
- **Html5Qrcode**: For QR code scanning.
- **React Toastify**: For notifications and alerts.
- **TypeScript**: For type safety and better developer experience.
- **Framer Motion**: For smooth animations and transitions.

## Contributing

Contributions to improve Evento are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

1. **Fork the Repository**:

   ```sh
   git fork https://github.com/domsdano/events-attendance.git
   ```

2. **Create a New Branch**:

   ```sh
   git checkout -b feature/your-feature-name
   ```

3. **Commit Your Changes**:

   ```sh
   git commit -m "Add your commit message"
   ```

4. **Push to Your Branch**:

   ```sh
   git push origin feature/your-feature-name
   ```

5. **Open a Pull Request**: Describe your changes and submit a pull request for review.
