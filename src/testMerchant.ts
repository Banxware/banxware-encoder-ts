import { v4 } from 'uuid'
import { MerchantLinkData } from './types'

export function createMerchantInfo(): MerchantLinkData {
  return {
    merchant_id: v4(),
    name: 'test GmbH',
    email: 'test_gmbh@email.com',
    phone_number: '+491639658152',
    address: {
      address_1: 'Teststrasse',
      address_2: 'complement',
      street_number: '1/2',
      zip_code: '00000',
      city: 'Berlin',
      state: 'Berlin',
      country: 'Germany',
    },
    owners: [
      {
        title: 'mr',
        email: 'owner_1@email.com',
        first_name: 'Owner 1',
        last_name: 'Last name',
        date_of_birth: '1988-11-25',
        nationality: 'BR',
        tax_number: '012345678',
        shares_percent: 100,
        ultimate_beneficial: false,
        legal_representative: true,
        address: {
          address_1: 'Teststrasse',
          address_2: 'complement',
          street_number: '1/2',
          zip_code: '00000',
          city: 'Berlin',
          state: 'Berlin',
          country: 'Germany',
        },
      },
    ],
    time_of_run_business_months: 12,
    last_six_months_revenue: [
      {
        month: 6,
        revenue_cents: 5105600,
        currency: 'EUR',
      },
      {
        month: 7,
        revenue_cents: 5105600,
        currency: 'EUR',
      },
      {
        month: 8,
        revenue_cents: 5105600,
        currency: 'EUR',
      },
      {
        month: 9,
        revenue_cents: 5105600,
        currency: 'EUR',
      },
      {
        month: 10,
        revenue_cents: 5105600,
        currency: 'EUR',
      },
      {
        month: 11,
        revenue_cents: 5105600,
        currency: 'EUR',
      },
    ],
    responsible_public_authority: 'test',
    legal_form: 'GmbH',
    registration_number: '123456789',
    register: 'Berlin',
    crefo_id: '2012961798',
    legal_representative: 'test',
    website: 'www.test.com',
    number_of_employees: 32,
    tax_number: '1234567890',
    subject_to_vat: true,
    vat_id: '1234567',
    timestamp: '2021-11-01T06:38:19Z',
  }
}
