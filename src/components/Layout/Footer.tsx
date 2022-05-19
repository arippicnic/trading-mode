import Link from "@components/Link";
import { siteMeta } from "@siteMeta";

const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col items-center pt-20">
      <div className="mb-3 flex space-x-2 text-sm text-gray-400">
        <div>{`© ${new Date().getFullYear()}`}</div>
        <div>{` • `}</div>
        <Link href={siteMeta.authorUrl}>{siteMeta.author}</Link>
      </div>
    </footer>
  );
};

export default Footer;
