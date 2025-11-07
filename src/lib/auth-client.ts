import { createAuthClient } from 'better-auth/react'
import { adminClient, organizationClient } from 'better-auth/client/plugins'
import { ac, admin, user } from '@/lib/auth/permissions'

export const authClient = createAuthClient({
  plugins: [
    adminClient({
      ac,
      roles: {
        admin,
        user
      }
    }),
    organizationClient()
  ],
  baseURL: process.env.BETTER_AUTH_URL
})

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  sendVerificationEmail,
  revokeOtherSessions,
  revokeSession,
  forgetPassword,
  changePassword,
  resetPassword,
  updateUser,
  changeEmail,
  deleteUser,
  getSession
} = authClient
