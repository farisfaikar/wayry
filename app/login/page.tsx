import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'What do you expect?',
  description: "This isn't that kind of project pal",
}

export default function Login() {
  return (
    <div className="absolute inset-0 -z-10 mx-auto flex max-w-xl items-center justify-center">
      <div className="flex h-20 items-center border-r border-secondary p-5 text-2xl">418</div>
      <p className="p-5 text-sm">
        Funny that you think this app would gain any amount of user base to warrant a login page.
      </p>
    </div>
  )
}
