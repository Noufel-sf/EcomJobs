import * as z from "zod";

export const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phoneNumber: z
    .string()
    .transform((val) => val.replace(/\s+/g, ""))
    .refine((val) => /^\d+$/.test(val), {
      message: "Phone number must contain only digits",
    })
    .refine((val) => val.length >= 10, {
      message: "Phone number must be at least 10 digits",
    }),
  city: z.string().min(2, "City is required"),
  state: z.string().min(1, "Please select a state"),
  note: z.string().optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
