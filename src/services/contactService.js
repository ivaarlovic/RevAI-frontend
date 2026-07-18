const configuredEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim();

export const contactEmail = configuredEmail || "";

export const sendContactMessage = async ({ name, email, subject, message }) => {
  if (!configuredEmail || configuredEmail.includes("upisi-svoj-email")) {
    throw new Error(
      "Kontakt email nije podešen. U .env datoteku dodaj VITE_CONTACT_EMAIL.",
    );
  }

  const response = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(configuredEmail)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        subject: subject || "Nova poruka s RevAI aplikacije",
        message,
        _subject: subject || "Nova poruka s RevAI aplikacije",
        _template: "table",
        _captcha: "false",
      }),
    },
  );

  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === "false" || data.success === false) {
    throw new Error(data.message || "Poruku nije moguće poslati.");
  }

  return data;
};
