export interface MerchantLinkData {
  merchant_id: string
  name: string
  email: string
  phone_number?: string
  address?: Address
  owners?: Owner[]
  time_of_run_business_months: number
  last_six_months_revenue: Revenue[]
  responsible_public_authority?: string
  legal_form: string
  registration_number?: string
  register?: string
  crefo_id?: string
  legal_representative?: string
  website?: string
  number_of_employees?: number
  tax_number?: string
  subject_to_vat?: boolean
  vat_id?: string
  timestamp: string
}
export interface Owner {
  title: string
  email: string
  first_name: string
  last_name: string
  date_of_birth: string
  nationality: string
  tax_number: string
  shares_percent: number
  ultimate_beneficial: boolean
  legal_representative: boolean
  address: Address
}

export interface Address {
  address_1: string
  address_2?: string
  street_number: string
  zip_code: string
  city: string
  state: string
  country: string
}

export interface Revenue {
  month: number
  revenue_cents: number
  currency: string
}
