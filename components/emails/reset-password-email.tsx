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
} from '@react-email/components'
import * as React from 'react'

type VerifyEmailProps = {
  resetPasswordLink?: string
  email?: string
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000'

export const ResetPasswordEmail = ({
  resetPasswordLink,
  email,
}: VerifyEmailProps) => {
  const previewText = 'WAYRY | Reset your password'

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            {/* <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/img/wayry-logo.png`}
                width="48"
                height="48"
                alt="WAYRY"
                className="my-0 mx-auto"
              />
            </Section> */}
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Reset your password for <strong>WAYRY</strong>
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              Before resetting your password, please confirm the detail of your <strong>WAYRY</strong> account:
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Email: <strong>{email}</strong>
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>If the above detail is correct,</strong> reset your password by tapping the button below!
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#000000] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href={resetPasswordLink}
              >
                Reset password
              </Button>
            </Section>
            <Text className="text-black text-[14px] leading-[24px]">
              ...or copy and paste this URL into your browser:{" "}
              <Link href={resetPasswordLink} className="text-blue-600 no-underline">
                {resetPasswordLink}
              </Link>
            </Text>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              This email was intended for{" "}
              <span className="text-black">{email}</span>. If you
              were not expecting this email, you can ignore this email. If
              you are concerned about your account's safety, please reply to
              this email to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default ResetPasswordEmail
