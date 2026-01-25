import { useEffect } from "react";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import * as CookieConsent from "vanilla-cookieconsent";

export default function CookieBanner() {
  useEffect(() => {
    CookieConsent.run({
      guiOptions: {
        consentModal: {
          layout: "box inline",
          position: "bottom right",
        },
      },

      categories: {
        necessary: {
          enabled: true,
          readOnly: true,
        },
        analytics: {
          enabled: false,
        },
      },

      language: {
        default: "es",
        translations: {
          es: {
            consentModal: {
              title: "🔮 Cookies",
              description:
                "Usamos Google Analytics para mejorar la experiencia. Las cookies solo se activan si aceptas.",
              acceptAllBtn: "Aceptar",
              acceptNecessaryBtn: "Rechazar",
            },
          },
        },
      },

      onConsent: () => {
        const categories =
          CookieConsent.getUserPreferences().acceptedCategories;

        if (categories.includes("analytics")) {
          window.gtag("consent", "update", {
            analytics_storage: "granted",
          });
        }
      },
    });
  }, []);

  return null;
}
