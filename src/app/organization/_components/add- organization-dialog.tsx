'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'

import { useRouter } from 'next/navigation'

import { FormInput } from '@/components/form/form-base'
import { Field } from '@/components/ui/field'
import { LoadingSwap } from '@/components/shared/loading-swap'
import { Organization } from '@/db/schema/auth-schema'
import z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { authClient } from '@/lib/auth-client'
import { toast } from 'sonner'

const formSchema = z.object({
  name: z.string().min(2).max(50)
  // slug: z.string().min(2).max(50)
})

type Props = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>

  organization?: Organization
}

function AddOrganizationDialog({ setOpen, open, organization }: Props) {
  // const searchParams = useSearchParams()

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: ''
    }
  })
  const { isSubmitting } = form.formState

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const slug = values.name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
    try {
      await authClient.organization.create({
        name: values.name,
        slug
      })

      toast.success('Organization created successfully')
    } catch (error) {
      console.error(error)
      toast.error('Failed to create organization')
    } finally {
      router.refresh()
      setOpen(false)
      form.reset()
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <div className='items-center justify-center'>
                <h2 className='text-primary text-xl font-bold lg:text-3xl'>
                  {organization?.id ? 'Edit' : 'New'} Organization{' '}
                  {organization?.id ? `#${organization.id}` : 'Form'}
                </h2>
              </div>
            </DialogTitle>

            <DialogDescription>
              Create or edit organizations here. Click save when you&apos;re
              done.
            </DialogDescription>
            <>
              <form
                id='organization-form'
                onSubmit={form.handleSubmit(onSubmit)}
                className='space-y-4'
              >
                <FormInput name='name' label='Name' control={form.control} />
                {/* <FormInput name='slug' label='Slug' control={form.control} /> */}
              </form>
              <Field orientation='horizontal' className='justify-between'>
                <Button
                  type='submit'
                  form='organization-form'
                  className='w-full max-w-[150px] cursor-pointer dark:bg-blue-600 dark:text-white'
                  disabled={isSubmitting}
                >
                  <LoadingSwap isLoading={isSubmitting}>Save</LoadingSwap>
                </Button>
                <Button
                  className='border-red-500'
                  type='button'
                  form='organization-form'
                  variant='outline'
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>
              </Field>
            </>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddOrganizationDialog
