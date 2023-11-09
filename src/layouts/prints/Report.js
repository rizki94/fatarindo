import React from "react";
import { useTranslation } from "react-i18next";

const Report = ({ children, ref }) => {
    const [t] = useTranslation();

    return (
        <main className="bg-gray-400 h-full justify-center p-5 gap-10 grid">
            <div className='mt-10'>
                <div ref={ref} className="bg-white flex-col justify-between">
                    {children}
                </div>
            </div>
        </main>
    );
};

export default Report;
