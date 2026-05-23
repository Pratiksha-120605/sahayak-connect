import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/common/Logo";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Sahayak is a community-driven platform connecting people who need a hand with
            verified neighbours ready to help.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Platform</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="hover:text-foreground">
                About
              </Link>
            </li>
            <li>
              <Link to="/safety" className="hover:text-foreground">
                Safety &amp; verification
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-foreground">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-semibold">Get started</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/signup" className="hover:text-foreground">
                Join as beneficiary
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:text-foreground">
                Volunteer with us
              </Link>
            </li>
            <li>
              <Link to="/signin" className="hover:text-foreground">
                Sign in
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Sahayak. Built with care for our community.
      </div>
    </footer>
  );
}
