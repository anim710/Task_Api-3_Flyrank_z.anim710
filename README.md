# Assignment 3: Dockerized Express & PostgreSQL Task API

A RESTful task management API built with Node.js, Express, PostgreSQL, and Docker Compose.

## Architecture
- **API**: Express server running on port 3000 inside Node alpine container.
- **Database**: PostgreSQL 15 container.
- **Persistence**: Managed via Docker named volume (`taskdata`).

## Quick Start with Docker Compose
1. Clone the repository:
bash
git clone