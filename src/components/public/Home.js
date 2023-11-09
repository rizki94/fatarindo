import React from 'react'
import { Route, Routes } from 'react-router-dom'


const Home = () => {
    
    document.title = "Home"

    return (
        <div className='flex flex-row'>
            <div className="flex-none mr-4">
                <div className="p-4 mr-4">
                    <div className='font-bold text-2xl'>Perusahaan</div>
                    <ul className='my-2 leading-relaxed'>
                        <li className=''>Profil Perusahaan
                            <ol className='list-outside list-disc ml-4'>
                                <li className=''>Visi &#38; Misi</li>
                            </ol>
                        </li>
                        <li>Penghargaan</li>
                        <li>CSR</li>
                    </ul>
                </div>
            </div>
            <Routes>
                <Route path='/visi'></Route>
            </Routes>
            <div className="flex-1">
                <div className="p-4 leading-tight">
                    <div className='text-xl font-bold'>Profil Perusahaan</div>
                    <br/>
                    <div className='text-md'>CV HR Distribusindo adalah perusahaan yang bergerak dibidang distribusi bahan kue dan consumer goods di bandung. Dengan tujuan mampu bersaing, unggul, dan terdepan dalam memberikan pelayanan, serta berorientasi kepada kepuasan pelanggan.</div>
                    <br/>
                    <div className='text-xl font-bold'>Visi</div>
                    <br/>
                    <div className='text-md'></div>
                </div>
            </div>
        </div>
    )
}

export default Home
