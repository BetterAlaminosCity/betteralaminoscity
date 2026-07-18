import { describe, expect, it } from "vitest";

import { buildGovernmentServiceJsonLd, jsonLdScriptHtml } from "../../app/lib/structuredData";

describe("buildGovernmentServiceJsonLd", () => {
  it("builds a schema.org GovernmentService object with an absolute URL", () => {
    const jsonLd = buildGovernmentServiceJsonLd({
      name: "Business Permit Renewal",
      description: "Renew an existing business permit.",
      path: "/services/business/permit-renewal",
      serviceType: "Business",
    });

    expect(jsonLd).toEqual({
      "@context": "https://schema.org",
      "@type": "GovernmentService",
      name: "Business Permit Renewal",
      description: "Renew an existing business permit.",
      url: "https://betteralaminoscity.org/services/business/permit-renewal",
      serviceType: "Business",
      areaServed: { "@type": "City", name: "Alaminos City" },
    });
  });

  it("does not include a provider field, avoiding an implied official affiliation", () => {
    const jsonLd = buildGovernmentServiceJsonLd({
      name: "Business Permit Renewal",
      description: "Renew an existing business permit.",
      path: "/services/business/permit-renewal",
      serviceType: "Business",
    });

    expect(jsonLd).not.toHaveProperty("provider");
  });
});

describe("jsonLdScriptHtml", () => {
  it("escapes < characters to prevent breaking out of the script tag", () => {
    const html = jsonLdScriptHtml({ name: "A </script><script>alert(1)</script> B" });
    expect(html.__html).not.toContain("</script>");
    expect(html.__html).toContain("\\u003c/script\\u003e");
  });
});
