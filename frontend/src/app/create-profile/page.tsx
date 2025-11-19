import Link from 'next/link'
import { CreateProfile } from '@/components/profile/create-profile'

export default function CreateProfilePage() {
  return (
    <main className="min-h-screen pb-16">
      <section className="container-layout py-12 space-y-6">
        <div className="flex flex-col gap-2">
          <p className="text-[#FBCC5C] text-sm uppercase font-semibold">Profile</p>
          <h1 className="text-3xl font-bold text-white">Create your profile</h1>
          <p className="text-white/70 max-w-2xl">
            Complete your on-chain profile to unlock personalized routing and module access.
          </p>
        </div>
        <CreateProfile />
        <p className="text-sm text-white/60">
          Already created a profile?{' '}
          <Link href="/modules" className="text-[#FBCC5C] hover:underline">
            Explore modules
          </Link>
          .
        </p>
      </section>
    </main>
  )
}
