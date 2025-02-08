interface Props {
  type: "button" | "submit" | "reset";
  children: string;
  rounded?: boolean;
  disabled?: boolean;
}

const Button = ({
  type = "button",
  children,
  rounded = false,
  disabled,
}: Props) => {
  return (
    <div>
      <button
        className={`max-w-full px-5 py-3 ${
          disabled
            ? "bg-[#DEE6FF] text-[#AEBDF2] cursor-default"
            : "bg-blue-600 text-white cursor-pointer"
        } ${rounded ? "rounded-sm" : ""}`}
        type={type}
        style={{
          width: "100%",
        }}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
};

export default Button;
