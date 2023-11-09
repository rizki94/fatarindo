import { useEffect, useState } from "react";
import { apiClient } from "../services/api";

const Images = ({id, parentModalChange, submitHandler}) => {

    const [ images, setImages ] = useState ([]);
    const [ fetchError, setFetchError ] = useState(null);
    const [ imageLoading, setImageLoading ] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            setImageLoading(true);
            try {
                const response = await apiClient.get('api/filterimage', {
                    params: {
                        unique_id: id,
                    }
                })
                if (isMounted) {
                    setImages(response.data.data);
                    setFetchError(null);
                }
            } catch (err) {
                if (isMounted) {
                    setFetchError(err.message);
                    console.log(fetchError);
                    setImages([]);
                }
            } finally {
                isMounted && setImageLoading(false);
            }
        }
        fetchData();
        const cleanUp = () => {
            isMounted = false;
        }
        return cleanUp;
    }, [fetchError, parentModalChange, submitHandler, id]);

    const handleDownload = (e) => {
        e.preventDefault();
        apiClient.get(`api/imagedownload/${e.target.innerHTML}`, {
            name: e.target.innerHTML
        }).then((response) => {
            const link = document.createElement('a');
            link.href = response.request.responseURL;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
    }

    return (
        <div className="mt-2">
        { imageLoading ? 
            <div className="w-full h-20">
                <div className="animate-pulse">
                    <div className="h-20 bg-slate-400 rounded"></div>
                </div>
            </div>
        :
            <>
                { (images.length > 0) ?
                    <div className="flex flex-col items-center">
                        <div className="flex-1">
                            <div className={`grid gap-2 grid-cols-4 ${ parentModalChange ? 'lg:grid-cols-8' : 'lg:grid-cols-12'} md:grid-cols-8 sm:grid-cols-7 mx-auto`}>
                                {images.map((image) => (
                                    <button key={image.id} onClick={handleDownload} className="bg-secondary w-20 h-20 p-4 border border-gray-700 hover:border-blue-800 ring ring-transparent hover:ring-blue-900/50 rounded">
                                        <span className="text-ellipsis break-words line-clamp-3 text-xs pointer-event-none">
                                            {image.image_name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    :
                    <div className="flex justify-center items-center w-full h-20">
                        <div className="justify-center items-center align-middle text-center">
                            Tidak ada file diupload
                        </div>
                    </div>
                }
            </>
        }
        </div>
    )
};

export default Images;