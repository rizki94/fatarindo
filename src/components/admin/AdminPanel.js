import React from "react";
import { url } from "../../services/api";
import { VscAccount, VscSignOut } from "react-icons/vsc";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const AdminPanel = ({
    wrapperRef,
    toggleUser,
    handleLogout,
    auth,
    setToggleUser,
}) => {
	const [t] = useTranslation();
    return (
        <div ref={wrapperRef} onClick={() => setToggleUser(!toggleUser)}>
            {auth?.user?.avatar_img ? (
                <div className="w-8 h-8 rounded-md overflow-hidden cursor-pointer">
                    <img
                        src={`${url}/uploads/avatar/${auth?.user?.avatar_img}`}
                        className="w-full h-full object-cover"
                    />
                </div>
            ) : (
                <VscAccount className="w-8 h-8 cursor-pointer" />
            )}
            {toggleUser && (
                <div className="mr-2 right-0 absolute w-60 px-5 py-3 bg-primary rounded-lg border border-border mt-2">
                    <div className="flex flex-col justify-center items-center py-1 mb-2">
                        {auth?.user?.avatar_img ? (
                            <div className="w-12 h-12 rounded-md overflow-hidden">
                                <img
                                    src={`${url}/uploads/avatar/${auth?.user?.avatar_img}`}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : (
                            <VscAccount className="w-12 h-12" />
                        )}
                        <div className="pt-2 text-sm font-bold">
                            {auth?.user?.full_name}
                        </div>
                    </div>
                    <ul className="space-y-3 text-primary text-sm">
                        <hr className="border-border" />
                        <li>
                            <Link
                                className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-buttonPrimary"
                                to={`/admin/change_password/${auth?.user?.id}`}
                            >
                                <VscAccount className="mr-3" />
                                {t("users.changePassword")}
                            </Link>
                        </li>
                        <hr className="border-border" />
                        <li>
                            <div
                                onClick={handleLogout}
                                className="cursor-pointer flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600"
                            >
                                <div className="mr-3 text-red-600">
                                    <VscSignOut />
                                </div>
                                {t("navigation.logout")}
                            </div>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
