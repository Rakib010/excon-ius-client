import "@/styles/auth.css";

type AuthSplitLayoutProps = {
  children: React.ReactNode;
  wideForm?: boolean;
  panelTitle: string;
  panelLead?: string;
  quote?: string;
  quoteAuthor?: string;
  quoteRole?: string;
  panelImageSrc?: string;
};

export function AuthSplitLayout({
  children,
  wideForm = false,
  panelTitle: _panelTitle,
  panelLead: _panelLead,
  quote: _quote,
  quoteAuthor: _quoteAuthor,
  quoteRole: _quoteRole,
  panelImageSrc: _panelImageSrc,
}: AuthSplitLayoutProps) {
  // Right-panel image 
  const images = [wideForm ? "/ius.jpg" : "/ius1.jpg"];
  const hasImages = images.length > 0;

  return (
    <div className="auth-split">
      <div className="auth-split__form">
        <div className={wideForm ? "auth-split__form-inner auth-split__form-inner--wide" : "auth-split__form-inner"}>
          {children}
        </div>
      </div>

      <aside className="auth-split__panel" data-auth-variant={wideForm ? "register" : "login"} aria-label="Branding">
        {hasImages ? (
          <div className="auth-split__image-grid auth-split__image-grid--single" aria-hidden>
            {images.map((src) => (
              <img key={src} className="auth-split__image" src={src} alt="" />
            ))}
          </div>
        ) : (
          <div className="auth-split__panel-fallback" aria-hidden />
        )}
      </aside>
    </div>
  );
}
