import React from "react";
import { cls } from "../../utils/helpers";
import Input from "./Input";
import { VscCloudUpload, VscTrash } from "react-icons/vsc";
import CustomModal from "../modal";
import { useModal } from "../../hooks/useModal";
import { BsImage } from "react-icons/bs";

const classes = {
	base: "flex justify-center items-center bg-secondary w-20 h-20 focus:outline-none transition ease-in-out duration-300 rounded-md border border-gray-200 dark:border-gray-700 focus:border-buttonPrimary ring ring-transparent focus:ring-2 focus:ring-opacity-50 focus:ring-blue-400/50",
	size: {
		noSize: "",
		small: "px-2 py-1 text-sm",
		normal: "px-4 py-2",
		large: "px-8 py-3 text-lg",
	},
	boxSize: {
		small: "",
		normal: "my-1 mx-1",
	},
	disabled: "opacity-50 cursor-not-allowed pointer-events-none",
};

const Image = ({
	label,
	children,
	type = "text",
	disabled = false,
	className,
	size = "normal",
	boxSize = "normal",
	id,
	image,
	setImage,
	imageUrl,
	setImageUrl,
	source,
	...props
}) => {
	const [imagePreviewModal, setImagePreviewModal, ImagePreviewToggle] =
		useModal();

	const selectFile = () => {
		document.getElementById(id).click();
	};

	return (
		<div className={cls(`${classes.boxSize[boxSize]}`)}>
			<div className="flex flex-row items-end gap-2">
				{label && (
					<label className="block text-sm mb-1">{label}</label>
				)}
			</div>
			<div className="flex flex-col w-24">
				<div className="flex justify-center items-center w-24 h-24 bg-secondary rounded-md">
					{image[id] ? (
						<img
							src={URL.createObjectURL(image[id])}
							className="absolute w-24 h-24 bg-cover rounded-md cursor-zoom-in"
							onClick={() => setImagePreviewModal(true)}
						/>
					) : imageUrl[id] ? (
						<img
							src={source(id) && source(id)}
							className="w-24 h-24 bg-cover rounded-md cursor-zoom-in"
							onClick={() => setImagePreviewModal(true)}
						/>
					) : (
						<BsImage className="absolute bg-cover w-12 h-12" />
					)}
				</div>
				<div className="flex flex-row justify-between my-2 items-center">
					<div
						className="flex justify-center items-center w-8 h-8 bg-secondary rounded-md"
						onClick={() => selectFile()}
					>
						<Input
							id={id}
							accept="image/*"
							type="file"
							className="absolute opacity-0 w-8 h-8 rounded-md"
							onChange={(e) => {
								setImage({ ...image, [id]: e.target.files[0] });
								setImageUrl({...imageUrl, [id]: true})
							}}
							{...props}
						/>
						<VscCloudUpload className="absolute w-8 h-8 hover:fill-blue-600" />
					</div>
					{(source(id) || image[id]) && (
						<>
							<div>|</div>
							<div className="flex justify-center items-center w-8 h-8 bg-secondary rounded-md">
								<VscTrash
									onClick={() => {
										setImage({ ...image, [id]: "" });
										setImageUrl({ ...imageUrl, [id]: "" });
									}}
									className="w-full h-full hover:fill-red-600 object-cover"
								/>
							</div>
						</>
					)}
				</div>
			</div>
			{imagePreviewModal && (
				<CustomModal
					title={label}
					toggle={imagePreviewModal}
					setToggle={setImagePreviewModal}
					isActive={imagePreviewModal}
					handleClose={() => setImagePreviewModal(false)}
				>
					{source(id) ? (
						<img
							src={source(id)}
							className="w-24 h-24 bg-cover rounded-md z-0"
						/>
					) : (
						<img
							src={URL.createObjectURL(image[id])}
							className="bg-cover rounded-md"
						/>
					)}
				</CustomModal>
			)}
		</div>
	);
};

export default Image;
