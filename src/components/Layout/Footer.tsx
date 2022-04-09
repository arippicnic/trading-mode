import Link from "@/components/Link";
import siteMetadata from "@/siteMetadata";

const Footer: React.FC = () => {
  const links = [
    { label: "Open Source", href: "https://github.com/arippicnic/trading-mode" },
    { label: "Credits", href: "/credit" },
    { label: `©${new Date().getFullYear()} ${siteMetadata.author}`, href: "/" },
  ].map(({ label, href }: { label: string; href: string }) => {
    return (
      <Link href={href}>
        <li>
          {` • `}
          {label}
        </li>
      </Link>
    );
  });

  return (
    <footer className="flex flex-col items-center pt-20">
      <ul className="flex space-x-2 0 mb-3 text-sm text-gray-500 dark:text-gray-40 text-center">{links}</ul>
    </footer>
  );
};

export default Footer;
