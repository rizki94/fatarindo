import { useEffect, useState } from "react";
import { apiClient } from "../services/api";

const useFetch = (path, params) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [fetchError, setFetchError] = useState(null);
	useEffect(() => {
		let isMounted = true;
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await apiClient.get(path);
				if (isMounted) {
					setData(response.data);
					setFetchError(null);
				}
			} catch (err) {
				if (isMounted) {
					setFetchError(err.message);
					console.log(fetchError);
					setData([]);
				}
			} finally {
				isMounted && setIsLoading(false);
			}
		};
		fetchData();
		const cleanUp = () => {
			isMounted = false;
		};
		return cleanUp;
	}, [path, params, fetchError]);

	return { data, setData, isLoading, fetchError };
};

const useFetchWithParams = (path, options, params, params2, params3, params4) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [fetchError, setFetchError] = useState(null);

	useEffect(() => {
		let isMounted = true;
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await apiClient.get(path, options);
				if (isMounted) {
					setData(response.data);
					setFetchError(null);
				}
			} catch (err) {
				if (isMounted) {
					setFetchError(err.message);
					console.log(fetchError);
					setData([]);
				}
			} finally {
				isMounted && setIsLoading(false);
			}
		};
		fetchData();
		const cleanUp = () => {
			isMounted = false;
		};
		return cleanUp;
	}, [path, params, params2, params3, params4, fetchError]);

	return { data, setData, isLoading, fetchError };
};

export { useFetch, useFetchWithParams };
