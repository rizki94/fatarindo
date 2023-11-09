import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../layouts/forms/Button";

const ServerNotAvailable = () => {
	const [t] = useTranslation();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/admin/dashboard";
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-primary text-primary">
            <div className="px-4 lg:py-12">
                <div className="lg:gap-4 lg:flex">
                    <div className="flex flex-col items-center justify-center md:py-24 lg:py-32">
                        <h1 className="font-bold text-3xl">501</h1>
                        <p className="mb-2 font-bold text-center text-xl">
                            <span>{t("errors.serverNotAvailable.title")}</span>
                        </p>
                        <p className="mb-8 text-center">
                            {t("errors.serverNotAvailable.description")}
                        </p>
                        <Button
                            onClick={() => window.location.replace('/admin/dashboard')}
                        >
                            {t("errors.serverNotAvailable.action")}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServerNotAvailable;
