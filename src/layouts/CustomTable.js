const CustomTable = ({ headers, children, title }) => {
	return (
		<div className="flex flex-col m-1">
			<div className="py-2">{title}</div>
			<div className="flex flex-col">
				<div id="table-scroll" className="overflow-x-auto">
					<div className="inline-block w-full">
						<div
							id="table-scroll"
							className="overflow-x-auto border border-border rounded-md bg-secondary max-h-[calc(100vh_-_160px)"
						>
							<table className="w-full items-center text-sm border-collapse">
								<thead className="sticky top-0 bg-secondary ring-1 ring-border z-0">
									<tr>
										{headers.map((header) => {
											return (
												<th
													key={header}
													className="px-4 py-2 whitespace-nowrap align-top text-left font-medium border-solid uppercase tracking-wider"
													scope="col"
												>
													{header}
												</th>
											);
										})}
									</tr>
								</thead>
								{children}
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const TData = ({ children, className, ...props }) => {
	return (
		<td
			className={`px-4 py-2 align-middle border-l-0 border-r-0 ${
				className || ""
			}`}
			{...props}
		>
			{children}
		</td>
	);
};

export { CustomTable, TData };
