import { z } from 'zod'

export const bookingSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name.'),
  email: z.string().trim().email('Please enter your email.'),
})

export type BookingFormValues = z.infer<typeof bookingSchema>
