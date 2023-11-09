import { cls } from "../../utils/helpers";
import { Title } from "./Form";

const classes = {
	base: "flex-1 justify-center items-center overflow-auto ",
	padding: {
		noPadding: "",
		normal: "m-2 p-1",
	},
};

const Container = ({
	className,
	children,
	title,
	navigation1,
	navigation2,
	padding = "normal",
	...props
}) => {
	return (
		<main>
			<div className="lg:h-14 w-full border-b border-border bg-primary sticky lg:top-0 top-14 z-20">
				<div className="flex lg:flex-row flex-col flex-wrap justify-between lg:items-center items-start align-middle w-full h-full px-2 lg:py-0 pb-2">
					{title && <Title className='pl-1'>{title}</Title>}
					{navigation1 && (
						<div className="flex lg:flex-row flex-col">
							{navigation1}
						</div>
					)}
					{navigation2 && navigation2}
				</div>
			</div>
			<div
				className={cls(`
                    ${classes.base}
                    ${classes.padding[padding]}
                    ${className}
                `)}
				{...props}
			>
				{children}
			</div>
		</main>
	);
};

const ContainerFull = ({ children }) => {
	return (
		<div className="bg-primary text-primary h-screen">
			<div className="flex flex-col items-center justify-center px-4">
				{children}
			</div>
		</div>
	);
};

export { Container, ContainerFull };
