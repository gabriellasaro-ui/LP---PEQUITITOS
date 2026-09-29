(function () {
  const eventStoreKey = "pequetitos_lp_events";

  function getUtmParams() {
    const params = new URLSearchParams(window.location.search);
    const keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];
    return keys.reduce((acc, key) => {
      const value = params.get(key) || sessionStorage.getItem(key) || "";
      if (value) {
        sessionStorage.setItem(key, value);
        acc[key] = value;
      }
      return acc;
    }, {});
  }

  function track(eventName, payload) {
    const event = {
      event: eventName,
      payload: Object.assign(
        {
          page: window.location.pathname,
          timestamp: new Date().toISOString()
        },
        getUtmParams(),
        payload || {}
      )
    };

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(event);

    try {
      const current = JSON.parse(localStorage.getItem(eventStoreKey) || "[]");
      current.push(event);
      localStorage.setItem(eventStoreKey, JSON.stringify(current.slice(-50)));
    } catch (error) {
      console.warn("Tracking local indisponivel", error);
    }

    console.log("[tracking]", eventName, event.payload);
    return event;
  }

  window.trackCTA = function (label) {
    return track("click_cta", { label: label || "cta" });
  };

  window.trackLeadSubmit = function (payload) {
    return track("lead_submit", payload || {});
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      track("page_view");
    });
  } else {
    track("page_view");
  }
})();
