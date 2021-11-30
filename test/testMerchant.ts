import { v4 } from 'uuid';
import { MerchantLinkData } from '../src/types';

export function createMerchantInfo(): MerchantLinkData {
  return {
    "merchantId": v4(),
    "name": "test GmbH",
    "email": "test_gmbh@email.com",
    "phoneNumber": "+491639658152",
    "address": {
      "addressLine1": "Teststrasse",
      "addressLine2": "complement",
      "streetNumber": "1/2",
      "zipCode": "00000",
      "city": "Berlin",
      "state": "Berlin",
      "country": "Germany"
    },
    "owners": [{
      "title": "mr",
      "email": "owner_1@email.com",
      "firstName": "Owner 1",
      "lastName": "Last name",
      "dateOfBirth": "1988-11-25",
      "nationality": "BR",
      "taxNumber": "012345678",
      "sharesPercent": 100,
      "ultimateBeneficial": false,
      "legalRepresentative": true,
      "address": {
        "addressLine1": "Teststrasse",
        "addressLine2": "complement",
        "streetNumber": "1/2",
        "zipCode": "00000",
        "city": "Berlin",
        "state": "Berlin",
        "country": "Germany"
      },
    }],
    "timeOfRunBusinessInMonths": 12,
    "lastSixMonthsRevenue": [
      {
        "month": 6,
        "revenueInCents": 5105600,
        "currency": "EUR"
      },
      {
        "month": 7,
        "revenueInCents": 5105600,
        "currency": "EUR"
      },
      {
        "month": 8,
        "revenueInCents": 5105600,
        "currency": "EUR"
      },
      {
        "month": 9,
        "revenueInCents": 5105600,
        "currency": "EUR"
      },
      {
        "month": 10,
        "revenueInCents": 5105600,
        "currency": "EUR"
      },
      {
        "month": 11,
        "revenueInCents": 5105600,
        "currency": "EUR"
      }
    ],
    "responsiblePublicAuthority": "test",
    "legalForm": "GmbH",
    "registrationNumber": "123456789",
    "register": "Berlin",
    "crefoId": "2012961798",
    "website": "www.test.com",
    "numberOfEmployees": 32,
    "taxNumber": "1234567890",
    "subjectToVat": true,
    "vatId": "1234567",
  };
}