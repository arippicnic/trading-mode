import Link from "@/components/Link";
import siteMetadata from "@/siteMetadata";

const Footer: React.FC = () => {
  const links = [
    { label: "Open Source", href: "https://github.com/arippicnic/trading-mode" },
    { label: "Credits", href: "/credit" },
  ].map(({ label, href }: { label: string; href: string }) => {
    return (
      <Link href={href}>
        <li>{label}</li>
      </Link>
    );
  });

  return (
    <footer className="flex flex-col items-center pt-20">
      <div className="mb-3 text-sm text-gray-500 dark:text-gray-40 text-center">
        <ul className="pb-2 flex space-x-2 0">{links}</ul>
        <Link href="/">
          {`© ${new Date().getFullYear()}`} {siteMetadata.author}
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
