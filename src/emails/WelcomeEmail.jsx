import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export default function WelcomeEmail() {
  return (
    <Html>
      <Head />
      <Preview>Welcome to the CaseStudy Coffee Lounge Newsletter!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section>
            <Text style={heading}>
              Welcome to the CaseStudy Coffee Lounge Newsletter!
            </Text>
            <Text style={paragraph}>
              Thank you for subscribing to our newsletter. We&apos;re excited to
              have you on board!
            </Text>
            <Text style={paragraph}>
              Stay tuned for the latest updates, news, and exclusive offers.
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
