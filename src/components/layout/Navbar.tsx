import Link from "next/link";

export function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-brand">
          Worship Song Manager
        </Link>
        <nav className="navbar-nav">
          <Link href="/" className="nav-link">
            Home
          </Link>
          <Link href="/songs" className="nav-link">
            Songs
          </Link>
          <Link href="/recommendations" className="nav-link">
            Recommendations
          </Link>
          <Link href="/youtube" className="nav-link">
            YouTube search
          </Link>
        </nav>
      </div>
    </header>
  );
}
