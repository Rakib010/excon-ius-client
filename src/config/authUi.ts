/**
 * Optional hero image for login/register right panel.
 * Add file to `public/` (e.g. `public/campus.jpg`) and set in `.env`:
 * `VITE_AUTH_PANEL_IMAGE=/campus.jpg`
 */
export const AUTH_PANEL_IMAGE: string | undefined =
  typeof import.meta.env.VITE_AUTH_PANEL_IMAGE === "string" && import.meta.env.VITE_AUTH_PANEL_IMAGE.length > 0
    ? import.meta.env.VITE_AUTH_PANEL_IMAGE
    : undefined;
