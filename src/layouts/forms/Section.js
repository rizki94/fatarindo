import { cls } from "../../utils/helpers";
import { Title } from "./Form";

const classes = {
	base: "flex flex-wrap p-1 bg-primary rounded-md",
	direction: {
		h: "flex-row",
		v: "flex-col",
	},
};

const Section = ({
	className,
	children,
	title,
	navigation1,
	navigation2,
	direction = "h",
	...props
}) => {
	return (
		<div className="flex-1 lg:flex-row flex-col m-1 justify-between items-start border border-border bg-secondary rounded-md">
			{title && (
				<div className="w-full border-b border-border">
					<Title>{title}</Title>
				</div>
			)}
			<div
				className={cls(`
			${classes.base}
			${classes.direction[direction]}
			${className}
		`)}
				{...props}
			>
				{children}
			</div>
		</div>
	);
};

const formClasses = {
	base: "flex-1 flex-wrap w-full p-1 bg-primary rounded-md",
	direction: {
		h: "flex-row",
		v: "flex-col",
	},
};

const Form = ({
	className,
	children,
	title,
	navigation1,
	navigation2,
	direction = "h",
	...props
}) => {
	return (
		<div className="flex-1 lg:flex-row flex-col my-2 p-4 max-w-screen justify-between items-start border border-border rounded-md">
			{title && (
				<div className="lg:flex-shrink-0 mx-2 flex w-64 justify-start">
					<Title className="font-medium">{title}</Title>
				</div>
			)}
			<div
				className={cls(`
			${formClasses.base}
			${formClasses.direction[direction]}
			${className}
		`)}
				{...props}
			>
				{children}
			</div>
		</div>
	);
};

export { Section, Form };
