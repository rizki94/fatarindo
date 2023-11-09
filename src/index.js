import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeProvider";
import { ProfileProvider } from "./context/ProfileProvider";
import ToastContainer from "./components/ToastContainer";
import { ToastProvider } from "./context/ToastContext";
import { AuthProvider } from "./context/AuthProvider";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import "./locales/config";
import translations_en from "./locales/en/translations.json";
import translations_id from "./locales/id/translations.json";

i18next.init({
	interpolation: { escapeValue: false },
	lng: localStorage.getItem("locale") ? localStorage.getItem("locale") : "id",
	resources: {
		en: {
			translations: translations_en,
		},
		id: {
			translations: translations_id,
		},
	},
});

ReactDOM.render(
	<StrictMode>
		<I18nextProvider i18n={i18next}>
			<ThemeProvider>
				<ToastProvider>
					<ToastContainer />
					<BrowserRouter>
						<AuthProvider>
							<ProfileProvider>
								<App />
							</ProfileProvider>
						</AuthProvider>
					</BrowserRouter>
				</ToastProvider>
			</ThemeProvider>
		</I18nextProvider>
	</StrictMode>,
	document.getElementById("root")
);
