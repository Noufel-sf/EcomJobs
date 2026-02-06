import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

interface FooterLink {
  text: string;
  url: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface FooterProps {
  logo?: {
    src: string;
    alt: string;
    url: string;
  };
  tagline?: string;
  menuItems?: FooterSection[];
  copyright?: string;
  bottomLinks?: FooterLink[];
}

const defaultMenuItems: FooterSection[] = [
  {
    title: "Sections",
    links: [
      { text: "Partners", url: "#" },
      { text: "Categories", url: "#" },
      { text: "Offers", url: "#" },
      { text: "Best Products", url: "#" },
      { text: "Why Us", url: "#" },
      { text: "Testimonials", url: "#" },
    ],
  },
  {
    title: "Categories",
    links: [
      { text: "GPU", url: "/category/gpu" },
      { text: "Motherboards", url: "/category/motherboards" },
      { text: "CPU", url: "/category/cpu" },
      { text: "Storage", url: "/category/storage" },
      { text: "Power Supplies", url: "/category/psu" },
      { text: "RAM", url: "/category/ram" },
    ],
  },
];

const defaultBottomLinks: FooterLink[] = [
  { text: "Terms and Conditions", url: "#" },
  { text: "Privacy Policy", url: "#" },
];

const socialLinks = [
  { icon: Facebook, label: "Facebook", url: "#" },
  { icon: Twitter, label: "Twitter", url: "#" },
  { icon: Linkedin, label: "LinkedIn", url: "#" },
  { icon: Instagram, label: "Instagram", url: "#" },
];

const FooterUI = ({
  logo = {
    src: "/logo.png",
    alt: "Dragon-Logo",
    url: "/",
  },
  tagline = "A Store You Trust!",
  menuItems = defaultMenuItems,
  copyright = "© 2025 shoppingjobs All rights reserved.",
  bottomLinks = defaultBottomLinks,
}: FooterProps) => {
  return (
    <footer className="py-16 md:py-32 px-6 container mx-auto" role="contentinfo">
      <div className="container">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-6 text-center md:text-start">
          <div className="col-span-2 mb-8 lg:mb-0">
            <div className="flex items-center gap-2 justify-center md:justify-start">
              <Link href={logo.url} aria-label="Go to homepage">
                <Image 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="h-15" 
                  width={120}
                  height={60}
                />
              </Link>
            </div>
            <p className="mt-4 font-bold">{tagline}</p>

            <div className="get-in-touch mt-5">
              <h2 className="text-base font-medium">Get in touch</h2>
              <div 
                className="icons flex items-center justify-center md:justify-start gap-3 mt-4"
                role="list"
                aria-label="Social media links"
              >
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    className="bg-slate-100 dark:bg-white text-black p-2 rounded-full hover:bg-primary hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    aria-label={`Visit our ${social.label} page`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <social.icon size={25} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {menuItems.map((section, sectionIdx) => (
            <nav key={sectionIdx} aria-labelledby={`footer-section-${sectionIdx}`}>
              <h3 id={`footer-section-${sectionIdx}`} className="mb-4 font-bold">
                {section.title}
              </h3>
              <ul className="space-y-4 text-muted-foreground">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx} className="font-medium">
                    <Link
                      href={link.url} 
                      className="hover:text-primary transition-colors duration-200 focus:outline-none focus:underline"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
          <p>{copyright}</p>
          <nav aria-label="Footer legal links">
            <ul className="flex gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx}>
                  <Link
                    href={link.url}
                    className="underline hover:text-primary transition-colors duration-200 focus:outline-none focus:text-primary"
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default memo(FooterUI);
