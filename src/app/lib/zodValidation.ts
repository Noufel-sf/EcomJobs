import * as z from 'zod';

// Checkout form validation schema
export const checkoutSchema = z.object({
  // Contact Information
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),

  // Shipping Address
  address: z.string().min(5, 'Address must be at least 5 characters'),
  city: z.string().min(2, 'City is required'),
  wilaya: z.string().min(1, 'Please select a wilaya'),

  // Shipping Method
  shippingMethod: z.enum(['standard', 'express', 'nextDay']),

  // Optional
  notes: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
