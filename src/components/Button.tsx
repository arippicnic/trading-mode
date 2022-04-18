import cn from "classnames";

type Props = {
  children: string | React.ReactNode;
  color?: "primary" | "secondary";
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  type?: "button" | "submit" | "reset";
  onClick?: ((event: React.MouseEvent<HTMLButtonElement>) => void) | undefined;
};

const Footer: React.FC<Props> = ({ children, className, onClick, disabled, type = "button" }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={cn(
        className,
        disabled ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-700",
        "py-2 px-3 border border-transparent rounded-md text-white"
      )}
    >
      {children}
    </button>
  );
};

export default Footer;
