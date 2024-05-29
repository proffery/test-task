import { z } from 'zod'

export const loginSchema = z.object({
  password: z.string().min(1, { message: 'Password is required' }),
  username: z
    .string()
    .min(1, { message: 'Username is required' })
    .refine(
      value => /^user\d+$/.test(value ?? ''),
      'User name should be in format: user{N}, example: user1, user2… user33'
    ),
})
