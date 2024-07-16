import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export default function ContactFormResponse({ name, email }) {
  return (
    <Html>
      <Head />
      <Preview>Thank you for contacting us!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text style={heading}>
              Hey {name}, Thank you for contacting us!
            </Text>
            <Text style={paragraph}>
              We have received your message and will get back to you at {email}{" "}
              as soon as possible.
            </Text>
            <Text style={paragraph}>
              Best regards,
              <br />
              CaseStudyCoffee Team
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  margin: "0 auto",
  fontFamily: "Arial, sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #e0e0e0",
  borderRadius: "8px",
  margin: "40px auto",
  padding: "20px",
  maxWidth: "600px",
};

const heading = {
  fontSize: "24px",
  fontWeight: "bold",
  lineHeight: "1.5",
  margin: "0 0 20px 0",
  color: "#333333",
};

const paragraph = {
  fontSize: "16px",
  margin: "0 0 20px 0",
  lineHeight: "1.6",
  color: "#555555",
};
