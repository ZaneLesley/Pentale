# [Pentale](https://zanelesley.com/pentale/)

*A worlde inspired game for League of Legends Esports*

## About

I created this project out of my passion for sports and esports. One of my favorite things to watch—or participate in—is
any activity where people try to optimize and push the limits of performance. League of Legends esports is especially
inspiring to me, as players constantly min-max, adapt, and execute complex strategies with incredible speed and
precision. This project is a small way for me to give back to a scene that has inspired me so much.

## Technical Aspects

> If you're looking to install this project yourself, you can skip to the installation section. This is just a summary
> of
> the technical components and challenges.

### API, Database, and Python

In `backend/python`, a set of Python scripts interfaces with the
[Leaguepedia's API](https://lol.fandom.com/wiki/Help:Leaguepedia_API) via the
[mwrogue MediaWiki wrapper](https://github.com/RheingoldRiver/mwrogue).

After fetching data, Python returns it to the Node backend using JSON. The data is either piped directly or written to
`.json` files for later processing. These files are then inserted into a PostgreSQL database using Prisma queries.

The orchestration of this process is handled by `scraperController.js`, which is invoked by seed scripts such as
`seed_players.js`. Node also ensures that the correct Python virtual environment and dependencies are used by
referencing its `.env` file.

### Backend

The backend was built with [Express.js](https://expressjs.com/). and serves both the API and frontend.
Routing is split between:

- `apiController.js` - Handles all `/api` endpoints
- `gameController.js` - handles all game-specific state logic via `/game` endpoints

Sessions are tracked using cookies to manage ongoing games and prevent tampering.

### Frontend

The frontend is built with React and styled using
[Material UI](https://mui.com/material-ui/) and [Motion](https://motion.dev/).
The frontend uses the `/game` endpoint to ensure that game state is maintained correctly.
Session data is stored in browser cookies that expire after 24 hours and is validated on the backend to prevent
cheating.

## Challenges and Lessons Learned

### Python and Node Integration

One of the biggest initial hurdles was figuring out how to run Python scripts from Node.js and exchange data between
them. It reminded me of dispatching CUDA threads from a host application — I had to manage virtual environments,
interprocess communication, and error handling.

### Data Handling from Leaguepedia's API

Originally, I piped Python output directly to Node, but I realized this wouldn’t scale well with large datasets. Writing
to `.json` files instead made the process more robust and allowed easier recovery when something went wrong. Reading
these
files into Prisma also proved much easier once the structure was consistent.

### Backend Design

The backend was relatively straightforward. I implemented middleware for session tracking and kept the API minimal.
Although all user input is controlled through the frontend, I plan to add stricter backend validation for peace of mind.

### Frontend Design

React was my weakest area when I started this project. Through this experience, I gained a much deeper understanding of
hooks like `useState`, `useEffect`, and how component lifecycles work. I also became more confident structuring larger
React projects and using external libraries—especially Motion.

## Installation

### Requirements

- Python
- Node
- PostgreSQL
- Docker

### Install

First, clone the project:

```bash
git clone https://github.com/ZaneLesley/Pentale.git
````

Build Database: 

```shell
# Create the Pentale Datbase
psql -U your_postgres_user
CREATE DATABASE Pentale;

# Generate your prisma files
cd /path/to/pentale/backend/prisma
npx prisma migrate dev
npx prisma db generate
```

```shell
# Seed the database, please do these one at a time, does take a significant amount of time due to rate limits
# You can also just use the pg_dump file already used in the repo, you will need to get team_images and
# player_images
npx prisma db seed -- players
# npx prisma db seed -- teams
# npx prisma db seed -- team_images
# npx prisma db seed -- player_images
# npx prisma db seed -- stats
```

Build application:

```bash
cd /path/to/Pentale

# Create the .env files in frontend/backend (use .env.production for production builds)
# Update or create a new pg_dump file if you want in db/init 

# start server (--profile options = dev or build)
docker-compose --profile prod up -d --build
```




