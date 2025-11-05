import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'

import Link from 'next/link'
import { Suspense } from 'react'
// import { CreateOrganizationForm } from './_components/create-organization-form'
import { getOrganizations } from '@/server-actions/organization'
import { AddOrganizationButton } from './_components/create-organization-button'
import { EmptyState } from '@/components/shared/empty-state'

export default async function OrganizationPage() {
  return (
    <div className='flex h-screen flex-col items-center justify-center gap-2'>
      <Suspense fallback={<Skeleton />}>
        <DynamicContent />
      </Suspense>
    </div>
  )
}

async function DynamicContent() {
  const organizations = await getOrganizations()

  if (organizations.length === 0) {
    return (
      <>
        <div className='mx-auto flex max-w-6xl flex-col gap-2'>
          <EmptyState
            title='Organizations'
            description='You do not have any organizations yet. Click on the button below to create your first organization'
          />
        </div>

        <div className='- mt-12 flex w-full justify-center'>
          <AddOrganizationButton />
        </div>
      </>
    )
  }
  return (
    <div className='flex flex-col gap-2'>
      <div className='- mb-4 flex w-full justify-center'>
        <AddOrganizationButton />
      </div>
      <div className='flex flex-col items-start gap-2'>
        <h2 className='font-bold'>List of organizations:</h2>
        {organizations.map(organization => (
          <Button
            className='w-full'
            variant='outline'
            key={organization.id}
            asChild
          >
            <Link href={`/organization/${organization.slug}`}>
              {organization.name}
            </Link>
          </Button>
        ))}
      </div>
    </div>
  )
}
