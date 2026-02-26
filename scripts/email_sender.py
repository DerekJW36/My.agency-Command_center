import smtplib
import os
import sys
import json
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()

class EmailSender:
    def __init__(self):
        self.smtp_server = os.getenv("SMTP_SERVER", "smtp.gmail.com")
        self.smtp_port = int(os.getenv("SMTP_PORT", 587))
        self.email_user = os.getenv("EMAIL_USER")
        self.email_pass = os.getenv("EMAIL_PASS")

    def send_outreach(self, to_email, subject, body):
        """Send a personalized outreach email."""
        if not self.email_user or not self.email_pass:
            print("[ERROR] Email credentials missing. Check your .env file (EMAIL_USER, EMAIL_PASS).")
            return False

        try:
            msg = MIMEMultipart()
            msg['From'] = self.email_user
            msg['To'] = to_email
            msg['Subject'] = subject

            msg.attach(MIMEText(body, 'plain'))

            server = smtplib.SMTP(self.smtp_server, self.smtp_port)
            server.starttls()
            server.login(self.email_user, self.email_pass)
            server.send_message(msg)
            server.quit()

            print(f"[SUCCESS] Email sent to {to_email}")
            return True
        except Exception as e:
            print(f"[ERROR] Failed to send email: {e}")
            return False

if __name__ == "__main__":
    if len(sys.argv) > 3:
        sender = EmailSender()
        to_email = sys.argv[1]
        subject = sys.argv[2]
        body = sys.argv[3]
        sender.send_outreach(to_email, subject, body)
    else:
        print("Email Sender Initialized.")
        print("Usage: python scripts/email_sender.py <to_email> <subject> <body>")
