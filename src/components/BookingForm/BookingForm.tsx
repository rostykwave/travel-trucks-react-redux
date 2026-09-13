import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import Button from '@/components/Button/Button'
import styles from '@/components/BookingForm/BookingForm.module.css'
import {
  bookingSchema,
  type BookingFormValues,
} from '@/components/BookingForm/bookingSchema'

/**
 * Two fields (name, email) match the real Form frame exactly — see ADR-009.
 * Submission is a stub: success notification and reset land in commit 33.
 */
function BookingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({ resolver: zodResolver(bookingSchema) })

  const onSubmit = handleSubmit(async () => {
    await new Promise((resolve) => setTimeout(resolve, 500))
  })

  return (
    <form className={styles.form} onSubmit={(event) => void onSubmit(event)}>
      <div className={styles.title}>
        <h3 className="text-h3">Book your campervan now</h3>
        <p className={`text-body ${styles.subtitle}`}>
          Stay connected! We are always ready to help you.
        </p>
      </div>
      <div className={styles.fields}>
        <div className={styles.field}>
          <input
            {...register('name')}
            type="text"
            placeholder="Name*"
            aria-invalid={Boolean(errors.name)}
            className={`text-body ${styles.input} ${
              errors.name ? styles.inputError : ''
            }`}
          />
          {errors.name && (
            <span className={`text-body ${styles.errorMessage}`}>
              {errors.name.message}
            </span>
          )}
        </div>
        <div className={styles.field}>
          <input
            {...register('email')}
            type="email"
            placeholder="Email*"
            aria-invalid={Boolean(errors.email)}
            className={`text-body ${styles.input} ${
              errors.email ? styles.inputError : ''
            }`}
          />
          {errors.email && (
            <span className={`text-body ${styles.errorMessage}`}>
              {errors.email.message}
            </span>
          )}
        </div>
      </div>
      <Button type="submit" variant="primary" disabled={isSubmitting}>
        Send
      </Button>
    </form>
  )
}

export default BookingForm
