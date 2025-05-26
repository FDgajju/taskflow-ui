import type React from "react";

type ButtonProps = {
	text: string;
	type: "button" | "submit" | "reset";
	style?: string;
	onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({ text, type, style, onClick }) => {
	return (
		<button
			type={type}
			className={`bg-btn-primary py-2 px-4 text-btn-primary-text font-bold rounded-lg text-sm ${style}`}
			onClick={onClick}
		>
			{text}
		</button>
	);
};

export default Button;
