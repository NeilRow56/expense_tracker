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
import { ModeSwitcher } from '@/components/shared/mode-switcher'
import { OrganizationSwitcher } from './_components/organization-switcher'
import { SignOutButton } from '../auth/_components/sign-out-button'
import { OrganizationTabs } from './_components/organization-tabs'

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
        <header className='absolute top-0 right-0 flex w-full items-center justify-end border-b p-4'>
          <OrganizationSwitcher />
          <div className='flex items-center gap-2'>
            <SignOutButton />
            <ModeSwitcher />
          </div>
        </header>
        <div className='mx-auto flex max-w-6xl flex-col gap-2'>
          <EmptyState
            title='Organizations'
            description='You do not have any organizations yet. Click on the button below to create your first organization'
          />
        </div>

        <div className='mt-12 flex w-full justify-center'>
          <header className='absolute top-0 right-0 flex w-full items-center justify-end p-4'>
            <OrganizationSwitcher />
            <ModeSwitcher />
          </header>
          <AddOrganizationButton />
        </div>
      </>
    )
  }
  return (
    <>
      <header className='absolute top-0 right-0 flex w-full items-center justify-between border-b p-4'>
        <OrganizationSwitcher />
        <div className='flex items-center gap-2'>
          <SignOutButton />
          <ModeSwitcher />
        </div>
      </header>

      <div className='flex flex-col gap-2'>
        <div className='- mb-4 flex w-full justify-center'>
          <AddOrganizationButton />
        </div>
        <div className='flex flex-col items-start gap-2'>
          <h2 className='text-2xl font-bold'>List of organizations:</h2>
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
        <OrganizationTabs />
      </div>
    </>
  )
}
