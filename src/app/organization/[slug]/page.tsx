import { getOrganizationBySlug } from '@/server-actions/organization'
import { getUsers } from '@/server-actions/users'
import AllUsers from '../_components/all-users'
import MembersTable from '../_components/members-table'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function OrganizationPage({ params }: PageProps) {
  return (
    <div className='mx-auto flex max-w-3xl flex-col gap-4 py-10'>
      <Suspense fallback={<Skeleton />}>
        <DynamicContent params={params} />
      </Suspense>
    </div>
  )
}

async function DynamicContent({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const organization = await getOrganizationBySlug(slug)
  const users = await getUsers(organization?.id || '')

  return (
    <div className='mx-auto flex max-w-3xl flex-col gap-4 py-10'>
      <h1 className='text-2xl font-bold'>{organization?.name}</h1>
      <MembersTable members={organization?.members || []} />
      <AllUsers users={users} organizationId={organization?.id || ''} />
    </div>
  )
}
