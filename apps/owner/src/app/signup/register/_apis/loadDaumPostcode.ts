export function loadDaumPostcode(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("window is undefined"));
      return;
    }

    if (window.daum?.Postcode) {
      resolve();
      return;
    }

    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[src*="postcode.v2.js"]',
    );

    if (existingScript) {
      existingScript.addEventListener(
        "load",
        () => {
          if (window.daum?.Postcode) resolve();
          else reject(new Error("Daum Postcode is not loaded."));
        },
        { once: true },
      );

      existingScript.addEventListener(
        "error",
        () => reject(new Error("Failed to load Daum Postcode script.")),
        { once: true },
      );

      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;

    script.onload = () => {
      if (window.daum?.Postcode) resolve();
      else reject(new Error("Daum Postcode is not loaded."));
    };

    script.onerror = () => {
      reject(new Error("Failed to load Daum Postcode script."));
    };

    document.head.appendChild(script);
  });
}