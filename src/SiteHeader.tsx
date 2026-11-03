import { Link } from "wouter";
import { ThemeToggle } from "./ThemeToggle";
import arcGraphic from "./assets/arc-logo-graphic-white.svg";
import arcExtended from "./assets/arc-logo-extended-white.svg";

export function SiteHeader() {
  return (
    <header class="site-header">
      <Link href="/" class="site-header-logo">
        <img src={arcGraphic} alt="" class="site-logo-graphic" aria-hidden="true" />
        <img src={arcExtended} alt="ARC Robotics" class="site-logo-extended" />
      </Link>
      <ThemeToggle />
    </header>
  );
}
