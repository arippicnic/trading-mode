import Link from "@/components/Link";
import siteMetadata from "@/siteMetadata";

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col items-center pt-20">
      <div className="mb-3 flex space-x-2 text-sm text-gray-400">
        <div>{`© ${new Date().getFullYear()}`}</div>
        <div>{` • `}</div>
        <Link href={siteMetadata.authorUrl}>{siteMetadata.author}</Link>
      </div>
    </footer>
  );
};

export default Footer;
