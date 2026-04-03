# thoughtArchive
My online presence.

## Private access

To protect the site with a password:

1. Copy `.env.example` to `.env.local`
2. Set `SITE_ACCESS_PASSWORD`
3. (Optional) Set `SITE_ACCESS_TOKEN` to a different secret token value
4. Restart the dev server

When enabled, users must enter the password at `/access` before reaching the site.
Use the `Logout` button in top bars to clear access cookie.
