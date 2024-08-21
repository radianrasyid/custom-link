"use client";
import { useEffect, useRef } from "react";

export default function Home() {
  const buttonRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.click();
    }
  }, []);

  function generateMailtoUrl(options: {
    to: string | string[];
    subject?: string;
    body?: string;
    cc?: string | string[];
    bcc?: string | string[];
  }): string {
    const { to, subject, body, cc, bcc } = options;

    // Helper function to process email arrays
    const processEmails = (emails: string | string[] | undefined): string => {
      if (!emails) return "";
      const emailArray = Array.isArray(emails) ? emails : [emails];
      return emailArray
        .map((email) => encodeURIComponent(email.trim()))
        .join(",");
    };

    let url = "mailto:" + processEmails(to);

    const params: string[] = [];

    if (subject) params.push("subject=" + encodeURIComponent(subject));
    if (body) params.push("body=" + encodeURIComponent(body));
    if (cc) params.push("cc=" + processEmails(cc));
    if (bcc) params.push("bcc=" + processEmails(bcc));

    if (params.length > 0) {
      url += "?" + params.join("&");
    }

    return url;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    const clickedUrl = generateMailtoUrl({
      to: "ulstudioworkspace@gmail.com",
      body: "I have an idea!",
      subject: "Job Offer!",
    });

    window.location.href = clickedUrl;
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <a href={"#"} ref={buttonRef} onClick={handleClick}></a>
    </div>
  );
}
