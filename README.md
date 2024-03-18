### Interlink Hub

This project creates a place for academics and layment to come together and discuss the newest ideas and breakthroughs to help us understand how we can best use our understanding of the universe in our daily lives.

#### Hypohtesis and Findings

There are two main post types that you can create on Interlink. One is called a hypothesis, this is a starting point to exploring something new, e.g. 'Relationship between accurate perception of time and acuity of sight.'. And findings are simply any findings or useful information that can help us explore a hypothesis further.

### Project Structure

The projext is built with NextJS where the backend api routes are located within `src/api` and start with `/api`.

### Installation and set up for development

1. Install the npm dependencies with `npm install`
2. Run a postgres database on port 5433 the set up details can be found in `.env.local`
3. Run prisma migrations with `env-cmd -f .env.local npx prisma migrate dev` , env-cmd is a global library that can point to specific .env files. In this case we are pointing to `.env.local` for development purposes
4. (Optional) Run seeders with env-cmd -f .env.local npx prisma migrate seed
5. Start the app with `npm run dev`

##### Steps 2-5 can be replaced with running the `./run-all.sh` bash script.
