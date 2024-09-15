import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components"
import * as React from "react"

type VerifyEmailProps = {
  verifyEmailLink?: string
  email?: string
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000"

export const VerifyEmail = ({ verifyEmailLink, email }: VerifyEmailProps) => {
  const previewText = "WAYRY | Verify your email"

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white px-2 font-sans">
          <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-solid border-[#eaeaea] p-[20px]">
            {/* <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/img/wayry-logo.png`}
                width="48"
                height="48"
                alt="WAYRY"
                className="my-0 mx-auto"
              />
            </Section> */}
            <Heading className="mx-0 my-[30px] p-0 text-center text-[24px] font-normal text-black">
              Confirm your email for <strong>WAYRY</strong>
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Before verifying your email, please confirm the detail of your <strong>WAYRY</strong>{" "}
              account:
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              Email: <strong>{email}</strong>
            </Text>
            <Text className="text-[14px] leading-[24px] text-black">
              <strong>If the above detail is correct,</strong> verify your email by tapping the
              button below!
            </Text>
            <Section className="mb-[32px] mt-[32px] text-center">
              <Button
                className="rounded bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={verifyEmailLink}
              >
                Verify email
              </Button>
            </Section>
            <Text className="text-[14px] leading-[24px] text-black">
              ...or copy and paste this URL into your browser:{" "}
              <Link href={verifyEmailLink} className="text-blue-600 no-underline">
                {verifyEmailLink}
              </Link>
            </Text>
            <Hr className="mx-0 my-[26px] w-full border border-solid border-[#eaeaea]" />
            <Text className="text-[12px] leading-[24px] text-[#666666]">
              This invitation was intended for <span className="text-black">{email}</span>. If you
              were not expecting this invitation, you can ignore this email. If you are concerned
              about your account's safety, please reply to this email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default VerifyEmail
