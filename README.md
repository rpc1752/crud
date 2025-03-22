# User Management System

A full-stack CRUD application built with Next.js and MongoDB. This application provides a simple user management system with the ability to create, read, update, and delete user records.

## Features

- List all users
- View detailed user information
- Add new users
- Edit existing users
- Delete users
- Form validation on frontend and backend
- Responsive UI using Tailwind CSS
- Dockerized and scalable

## Tech Stack

- **Frontend & Backend**: Next.js
- **Database**: MongoDB
- **Validation**: Yup
- **Styling**: Tailwind CSS
- **Containerization**: Docker

## Prerequisites

Before running this application, you need to have the following installed:

- Node.js (v16 or later)
- npm or yarn
- Docker and Docker Compose (for containerized deployment)
- MongoDB (if running locally without Docker)

## Getting Started

### Local Development

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/user-management-system.git
   cd user-management-system
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Create a `.env.local` file in the root directory with the following variables:

   ```
   MONGODB_URI=mongodb://localhost:27017/user-crud-app
   ```

4. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Using Docker

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/user-management-system.git
   cd user-management-system
   ```

2. Build and start the containers:

   ```bash
   docker-compose up -d
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## API Routes

The application provides the following RESTful API endpoints:

- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/:id` - Get a specific user by ID
- `PUT /api/users/:id` - Update a specific user by ID
- `DELETE /api/users/:id` - Delete a specific user by ID

## User Schema

```typescript
{
  user: string;       // Username (required, min 2 chars)
  interest: string[]; // Array of interests (at least one required)
  age: number;        // Age (required, between 1 and 120)
  mobile: number;     // Mobile number (required, 10-15 digits)
  email: string;      // Email (required, valid format, unique)
}
```

## Deployment

This application can be deployed to any platform that supports Docker containers. The included Dockerfile and docker-compose.yml files make it easy to deploy to services like:

- AWS ECS
- Google Cloud Run
- Azure Container Instances
- Kubernetes clusters

## Scaling

The application is designed to be stateless and can be horizontally scaled by running multiple instances behind a load balancer. The MongoDB database can be scaled separately as needed.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
