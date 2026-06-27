# Full Stack Portfolio Project Report

This report outlines the architecture, configuration changes, database migrations, and frontend updates completed for the Portfolio web application.

---

## 1. Project Architecture

The application has been restructured into a decoupled full-stack architecture:
*   **Backend**: Django (v6.0.6) & Django REST Framework (DRF) serving REST APIs.
*   **Database**: PostgreSQL relational database replacing the initial PyMongo/MongoDB setup.
*   **Frontend**: React (v19.0.0) powered by Vite, utilizing Vanilla CSS for UI/UX rendering.

---

## 2. Backend Configurations

### Database Migration (MongoDB to PostgreSQL)
*   Unused PyMongo helper connections and raw dictionary parsers were removed.
*   The database driver was migrated to `psycopg2-binary` to enable relational mapping.
*   Standard Django migrations were created and executed to map project models to PostgreSQL tables.

### File Modifications
1.  **`backend/settings.py`**:
    *   Updated the `DATABASES` setting to use `django.db.backends.postgresql`.
    *   Integrated environment variables (`DB_NAME`, `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_PORT`) to read secure credentials.
2.  **`core/views.py`**:
    *   Replaced pymongo client endpoints with native DRF generic views:
        *   `ProjectListCreate` uses `generics.ListCreateAPIView` (ordered by creation date).
        *   `ProjectRetrieveUpdateDelete` uses `generics.RetrieveUpdateDestroyAPIView` for detailed operations.
3.  **`core/urls.py`**:
    *   Reverted detail routing primary keys converter from `<str:pk>` (used for Mongo ObjectIDs) back to standard `<int:pk>`.
4.  **`backend/.env`**:
    *   Added environment parameters to map user database credentials.

---

## 3. Frontend Configurations

### Package Configuration
*   Initialized React with Vite inside the `frontend/` directory.
*   Installed dependencies: `axios` (API requests) and `lucide-react` (SVG UI icons).

### Responsive UI Design (`index.css`)
*   Designed a curated dark-mode color system using custom CSS properties.
*   Implemented **Glassmorphism** styling elements (translucent panels, border glow reflections, blur backdrops).
*   Configured a premium custom scrollbar matching the theme color schema.

### Mobile and Android Compatibility
*   Integrated a responsive toggle breakpoint at `1024px`.
*   Desktop menu elements automatically collapse on mobile viewports.
*   Implemented a sliding navigation drawer/sidebar (`.sidebar` & `.sidebar.open`) which pulls from the left edge of the screen on mobile devices.
*   Added a translucent backdrop overlay (`.sidebar-overlay`) to handle clicks outside the menu drawer to dismiss the drawer smoothly.

### API Integration and Fallbacks
*   The main entry component (`App.jsx`) uses React hooks (`useState`, `useEffect`) to fetch projects from `http://127.0.0.1:8000/api/projects/`.
*   Includes a predefined `fallbackProjects` data matrix. If the backend server is unreachable or empty, the frontend displays standard mockup projects instead of failing or rendering blank page sections.
*   Replaced the missing `lucide-react` brand icon exports with a custom embedded inline SVG wrapper (`GithubIcon`) to prevent pre-bundling parse errors in production bundles.

---

## 4. API Endpoints

| Method | Endpoint | Description | Request Body | Response Status |
| :--- | :--- | :--- | :--- | :--- |
| **GET** | `/api/projects/` | Fetch list of all projects | None | `200 OK` |
| **POST** | `/api/projects/` | Create a new project card | JSON | `201 Created` |
| **GET** | `/api/projects/<int:pk>/` | View specific project detail | None | `200 OK` |
| **PUT** | `/api/projects/<int:pk>/` | Update project parameters | JSON | `200 OK` |
| **DELETE** | `/api/projects/<int:pk>/` | Remove project from database | None | `204 No Content` |
