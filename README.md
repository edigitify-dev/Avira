# Avira Law

Next.js website with a private enquiry CMS backed by Neon Postgres.

## Development

Use Node.js 22.7 or later (Node.js 24 recommended).

```sh
npm install
npm run dev
```

The website runs at `http://localhost:3000`. The admin inbox is at `/admin`.

## CMS configuration

On a fresh checkout, copy `.env.example` to `.env.local`. If `.env.local` already exists, preserve its existing values.

1. Add the Neon project's PostgreSQL connection string as `DATABASE_URL` in `.env.local`.
2. Run `npm run cms:credentials` and enter an administrator username and password. The command writes a salted scrypt password hash to `.env.local`; the password is not stored in plaintext. It preserves the database connection string.
3. Start or restart the server, then open `/admin` and sign in.

The server initializes the `cms_enquiries`, `cms_admin_sessions`, and `cms_rate_limits` tables automatically on the first database request. It uses an advisory lock so simultaneous requests cannot race during setup. It does not modify other application tables. No database extensions are required.

All database access and authentication happen on the server. Never expose these environment variables with a `NEXT_PUBLIC_` prefix or commit `.env.local`.

### Production environment

Set these values in the hosting platform's runtime environment, then redeploy:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Neon PostgreSQL connection string |
| `ADMIN_USERNAME` | Administrator username |
| `ADMIN_PASSWORD_HASH` | Complete hash produced by `npm run cms:credentials` |
| `APP_URL` | Optional canonical origin, such as `https://aviralaw.com`; omit the path |

Use HTTPS in production. Admin cookies are HttpOnly, SameSite Strict, and Secure in production. Sessions expire after eight hours and are revoked on sign-out. Updating the username or password hash invalidates existing sessions. The admin pages are excluded from search indexing; the API separately authenticates every enquiry read and update.

### Enquiry workflow

- `/contact` saves the sender's name, email, optional organisation and phone, message, and submission time in Neon. Success is displayed only after the database confirms the save.
- Requests are validated on the server, capped in size, checked for same-origin submission, and rate limited. A honeypot field filters basic automated spam. Retrying the same submission uses its original request ID to avoid duplicate records.
- `/admin` provides search, status filters, pagination, full enquiry details, and status tracking. Opening a new enquiry marks it as read. Enquiries can be marked as replied or archived; archiving preserves the record.
- “Reply by email” opens the administrator's email application. The website does not send emails automatically. Mark a message as replied after sending the response.
- Enquiries are stored in Neon, not browser storage or the website filesystem. There are no sample records in the inbox.

The previous contact form only displayed a simulated success state. It did not save submissions, so older messages cannot be recovered from this repository. New messages are captured after Neon is connected.

## Verification

```sh
npm run test:cms
npx tsc --noEmit
npm run build
```

The automated tests cover input validation, password verification, origin protection, and request size limits. With Neon configured, also verify submitting a contact enquiry, signing in, reading and searching it, changing its status, and signing out. Unauthenticated access to `/api/admin/enquiries` must return `401`.
