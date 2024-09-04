import getSentences from '@/server/actions/get-sentences'
import { CloudCog } from 'lucide-react'

export default async function DashboardPage() {
  const { error, success } = await getSentences()

  if (error) {
    throw new Error(error)
  }

  console.log(success)
  if (success) {
    return (
      <div className="mt-5">
        {success.map((sentence) => (
          <div key={sentence.id}>
            <h2>{sentence.sentence}</h2>
            <p>{sentence.person}</p>
          </div>
        ))}
      </div>
    )
  }
}
