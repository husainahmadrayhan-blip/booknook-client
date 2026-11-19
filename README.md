# BookNook – A Small Online Library

BookNook is a responsive community library where readers can discover books, contribute titles, borrow available copies for seven days, and return them.

**Live site:** Pending deployment. Add the public Vercel URL here after deployment.  
**Client repository:** Add the public GitHub client repository URL here.  
**Server repository:** Add the public GitHub server repository URL here.

## Features

- Browse the community bookshelf and see the newest six arrivals on the home page.
- Search the catalogue by book title, author, and category.
- Register and sign in with email/password or Google using BetterAuth and its MongoDB adapter.
- Add books with an imgbb-hosted cover image, category, description, and total copy count.
- Edit or delete only the books contributed by the signed-in user.
- Borrow books for seven days and track the borrow and due dates.
- Prevent duplicate active borrows and prevent borrowing when no copies are available.
- Return borrowed books to restore availability for the next reader.
- Protect write operations with short-lived JWTs issued after validating the BetterAuth session.
- Responsive pages, loading states, custom confirmation dialogs, toast feedback, and a custom 404 page.

## Tech stack

- Client: Next.js App Router, React, TypeScript, Swiper, Lucide, Sonner.
- Authentication: BetterAuth with MongoDB adapter and Google OAuth.
- API: Express.js, MongoDB Node.js driver, JSON Web Tokens.
- Image hosting: imgbb.

## Local development

1. Install the client dependencies from the project root: `npm install`.
2. Copy `.env.example` to `.env.local` and fill in MongoDB, BetterAuth, Google OAuth, JWT, API and imgbb settings.
3. Use the same `MONGODB_URI` and `JWT_SECRET` in the client and server environment files.
4. In a second terminal, open `server/`, run `npm install`, copy `server/.env.example` to `server/.env`, and configure the values.
5. Start the API from `server/` with `npm run dev` (default port 4000).
6. Start the client from the project root with `npm run dev` (default port 3000).

## Environment variables

Client `.env.local`: `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_APP_URL`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `JWT_SECRET`, `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_IMGBB_API_KEY`.

Server `server/.env`: `MONGODB_URI`, `JWT_SECRET`, `API_PORT`, `CLIENT_URL`.

For Google sign-in, register the BetterAuth callback URL in Google Cloud Console. For deployment, host the Next.js client on Vercel and the Express API on Render, then configure the production origins and secrets in both dashboards.

## API routes

- `GET /books` – list books (newest first).
- `GET /books/:id` – retrieve a book.
- `POST /books` – add a book (JWT required).
- `PATCH /books/:id` – update an owned book (JWT required).
- `DELETE /books/:id` – delete an owned book (JWT required).
- `POST /borrows` – borrow an available book (JWT required).
- `GET /borrows` – list the signed-in user's active borrows (JWT required).
- `DELETE /borrows/:id` – return an owned borrow (JWT required).

## Deployment checklist

- [ ] Configure production MongoDB, BetterAuth, Google OAuth, JWT and imgbb credentials.
- [ ] Deploy the Express API and verify `/health`.
- [ ] Deploy the Next.js client and set its API URL.
- [ ] Set the API CORS allowlist to the deployed client origin.
- [ ] Add the live site and both repository URLs above.
- [ ] Verify route refresh, sign-in persistence, borrow/return stock counts and Google OAuth on the deployed domain.
