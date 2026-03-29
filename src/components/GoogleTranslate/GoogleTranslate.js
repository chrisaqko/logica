import React, { useEffect } from "react";
import "../../css/googleTranslate.css";

export default function GoogleTranslate() {
  useEffect(() => {
  
    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "es" },
        "google_translate_element"
      );
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
      delete window.googleTranslateElementInit;
    };
  }, []);

  return <div id="google_translate_element"></div>;
}