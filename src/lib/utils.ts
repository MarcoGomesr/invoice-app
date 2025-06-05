import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

type formatCurrencyProps = {
  amount: number
  currency: "USD" | "EUR"
}

export function formatCurrency({ amount, currency }: formatCurrencyProps) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency
  }).format(amount)
}
