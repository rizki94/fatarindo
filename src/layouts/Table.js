export const Table = ({headers, data}) => {
    
    return (        
        <div className="flex flex-col">
            <div className="overflow-x-auto">
                <div className="inline-block min-w-full">
                    <div className="overflow-hidden">
                        <table className='w-full items-center text-sm rounded-md shadow bg-secondary border-collapse'>
                            <thead>
                                <tr>
                                {headers.map(header => {
                                    return (<th key={header} className='px-4 py-2 whitespace-nowrap align-top text-left font-medium border-b-2 border-solid border-blueGray-100 uppercase tracking-wider' scope='col'>
                                        {header}
                                    </th>
                                    )
                                })}
                                </tr>
                            </thead>
                            <tbody className='break-words'>
                                {data.map(row => (
                                    <tr key={row.id} className='dark:border-gray-600 odd:bg-gray-50 even:bg-gray-200 odd:dark:bg-gray-800 even:dark:bg-gray-700'>
                                        {headers.map(header => (
                                            <td className="px-4 py-2 align-middle border-l-0 border-r-0">
                                                {row[header]}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}