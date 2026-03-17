import CookieBanner from "./cookie-banner";
import { HeaderVisibilityProvider } from "./header-visibility-context";
import SiteFooter from "./site-footer";
import SiteHeader from "./site-header";

export default function SitePageShell({ route = "", children, supplemental }) {
  return (
    <HeaderVisibilityProvider>
      <SiteHeader route={route} />
      <main>{children}</main>
      <SiteFooter route={route} />
      <CookieBanner />
      {supplemental}
    </HeaderVisibilityProvider>
  );
}
