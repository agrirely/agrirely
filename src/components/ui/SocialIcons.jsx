const iconClass = "h-[18px] w-[18px]";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={iconClass} aria-hidden>
      <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8.25h4.56V24H.22zM8.34 8.25h4.37v2.14h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 7v8.99h-4.56v-7.97c0-1.9-.03-4.34-2.64-4.34-2.65 0-3.05 2.07-3.05 4.2V24H8.34z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden>
      <rect
        x="3.2"
        y="3.2"
        width="17.6"
        height="17.6"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="3.6" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={iconClass} aria-hidden>
      <path d="M14.7 24V13.1h3.66l.55-4.25H14.7V6.14c0-1.23.34-2.07 2.1-2.07h2.25V.27C18.66.18 17.1 0 15.28 0 11.5 0 8.9 2.3 8.9 6.53v2.32H5.1v4.25h3.8V24h5.8z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={iconClass} aria-hidden>
      <path d="M18.24 2H21.5l-7.5 8.57L22.75 22h-6.56l-5.14-6.72L5.16 22H1.88l8.02-9.17L1.25 2h6.72l4.65 6.16L18.24 2zm-1.15 18.02h1.82L7.02 3.88H5.07l12.02 16.14z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={iconClass} aria-hidden>
      <path d="M23.5 7.2a3.02 3.02 0 0 0-2.13-2.14C19.5 4.6 12 4.6 12 4.6s-7.5 0-9.37.46A3.02 3.02 0 0 0 .5 7.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 4.8 3.02 3.02 0 0 0 2.13 2.14C4.5 19.4 12 19.4 12 19.4s7.5 0 9.37-.46a3.02 3.02 0 0 0 2.13-2.14A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-4.8zM9.75 15.57V8.43L15.84 12l-6.09 3.57z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={iconClass} aria-hidden>
      <path d="M12.04 2C6.5 2 2.02 6.45 2.02 11.96c0 1.75.46 3.46 1.34 4.97L2 22l5.22-1.33a10.02 10.02 0 0 0 4.82 1.23h.01c5.54 0 10.02-4.45 10.02-9.96C22.07 6.45 17.58 2 12.04 2zm5.82 14.21c-.24.68-1.4 1.26-1.94 1.34-.5.07-1.13.1-1.83-.12-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.79-4.16-4.94-4.35-.14-.2-1.18-1.57-1.18-3 0-1.42.74-2.12 1-2.41.24-.27.64-.39.86-.39h.62c.2 0 .46-.08.72.55.27.66.9 2.2.98 2.36.08.16.13.35.02.56-.1.2-.16.33-.31.51-.16.18-.33.4-.47.54-.16.16-.32.33-.14.64.18.31.8 1.32 1.72 2.14 1.18 1.05 2.18 1.38 2.49 1.54.31.16.5.13.68-.08.18-.2.78-.9.99-1.21.2-.31.41-.26.68-.16.27.1 1.72.81 2.01.96.3.15.5.22.57.35.08.13.08.75-.16 1.43z" />
    </svg>
  );
}

function GenericIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass} aria-hidden>
      <path
        d="M10.5 13.5a4.2 4.2 0 0 0 6 0l2.1-2.1a4.25 4.25 0 0 0-6-6L11.4 6.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M13.5 10.5a4.2 4.2 0 0 0-6 0L5.4 12.6a4.25 4.25 0 0 0 6 6L12.6 17.4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

const ICONS = {
  linkedin: LinkedInIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  x: XIcon,
  twitter: XIcon,
  youtube: YouTubeIcon,
  whatsapp: WhatsAppIcon,
};

export function SocialPlatformIcon({ id }) {
  const Icon = ICONS[id] || GenericIcon;
  return <Icon />;
}

const variantClasses = {
  light:
    "border-line bg-surface text-brand-deep hover:border-brand/40 hover:bg-brand hover:text-white hover:shadow-[0_10px_22px_rgba(26,63,115,0.18)]",
  dark: "border-white/15 bg-white/8 text-white hover:border-accent/50 hover:bg-accent hover:text-brand-deep hover:shadow-[0_10px_22px_rgba(139,200,58,0.28)]",
};

const sizeClasses = {
  sm: "h-9 w-9",
  md: "h-10 w-10",
};

export default function SocialIcons({
  links = [],
  variant = "light",
  size = "md",
  className = "",
}) {
  const items = (links ?? []).filter((link) => link?.id);

  if (!items.length) return null;

  return (
    <ul className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {items.map((link) => {
        const label = link.label || link.id;
        const hasUrl = Boolean(link.url);
        const classes = `inline-flex items-center justify-center rounded-full border transition duration-300 ${sizeClasses[size]} ${variantClasses[variant]}`;

        return (
          <li key={link.id}>
            {hasUrl ? (
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className={classes}
              >
                <SocialPlatformIcon id={link.id} />
              </a>
            ) : (
              <span
                aria-label={label}
                title={`${label} — URL coming soon`}
                className={`${classes} cursor-default`}
              >
                <SocialPlatformIcon id={link.id} />
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
