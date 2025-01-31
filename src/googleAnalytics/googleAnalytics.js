import { useEffect } from "react";

const GA_TRACKING_ID = "G-VRXPTRMHZ4";

function GoogleAnalytics() {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    gtag("js", new Date());
    gtag("config", GA_TRACKING_ID);
  }, []);

  return null;
}

export default GoogleAnalytics;