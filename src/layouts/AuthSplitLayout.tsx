import { AUTH_PANEL_IMAGE } from "@/config/authUi";
import "@/styles/auth.css";

type AuthSplitLayoutProps = {
  children: React.ReactNode;
  /** Wider form column for multi-field registration */
  wideForm?: boolean;
  /** Right panel headline */
  panelTitle: string;
  /** Optional supporting line under title */
  panelLead?: string;
  /** Optional testimonial-style quote */
  quote?: string;
  quoteAuthor?: string;
  quoteRole?: string;
  /**
   * Background image URL (e.g. `/campus.jpg` from `public/`).
   * If omitted, uses `VITE_AUTH_PANEL_IMAGE` from `.env` when set.
   */
  panelImageSrc?: string;
};

export function AuthSplitLayout({
  children,
  wideForm = false,
  panelTitle,
  panelLead,
  quote,
  quoteAuthor,
  quoteRole,
  panelImageSrc,
}: AuthSplitLayoutProps) {
  const bg = panelImageSrc ?? AUTH_PANEL_IMAGE;
  const hasImage = Boolean(bg);

  return (
    <div className="auth-split">
      <div className="auth-split__form">
        <div className={wideForm ? "auth-split__form-inner auth-split__form-inner--wide" : "auth-split__form-inner"}>
          {children}
        </div>
      </div>

      <aside
        className={`auth-split__panel${hasImage ? " auth-split__panel--has-bg" : ""}`}
        style={hasImage ? { backgroundImage: `url(${bg})` } : undefined}
        aria-label="Branding"
      >
        {hasImage ? <div className="auth-split__panel-overlay" aria-hidden /> : null}
        <div className="auth-split__panel-inner">
          <h2 className="auth-split__panel-title">{panelTitle}</h2>
          {panelLead ? <p className="auth-split__panel-lead">{panelLead}</p> : null}

          {quote ? (
            <figure className="auth-split__quote-block">
              <span className="auth-split__quote-mark" aria-hidden>
                &ldquo;
              </span>
              <blockquote className="auth-split__quote">{quote}</blockquote>
              {(quoteAuthor || quoteRole) && (
                <figcaption className="auth-split__quote-cite">
                  {quoteAuthor ? <span className="auth-split__quote-name">{quoteAuthor}</span> : null}
                  {quoteRole ? <span className="auth-split__quote-role">{quoteRole}</span> : null}
                </figcaption>
              )}
            </figure>
          ) : null}
        </div>
      </aside>
    </div>
  );
}
