import Link from "@/components/Link";
import Button from "@/components/Button";

const Error: React.FC<{ code: number; error: string }> = ({ code, error }) => {
  return (
    <div className="grid place-items-center mt-20">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-extrabold">{code}</h1>
        <p className="mb-5">{error}</p>
        <Link href="/">
          <Button className="text-xs">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default Error;
