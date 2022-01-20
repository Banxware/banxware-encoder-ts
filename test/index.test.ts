import * as fs from 'fs'
import fetch from 'node-fetch'
import { createMerchantInfo } from './testMerchant'
import { MerchantLinkData } from '../src/types'
import { createBanxwareLinkIntegration } from '../src/index'
import assert from 'assert'

describe('link integration', () => {
  test('it should create a session', async () => {
    const testTenantPrivateKey = fs
      .readFileSync('./resources/test-tenant-private-key-1.pem')
      .toString()
    const banxwareDevPublicKey = fs
      .readFileSync('./resources/banxware-dev-public-key-1.pem')
      .toString()

    const merchantInfo = await createBanxwareLinkIntegration(
      testTenantPrivateKey,
      banxwareDevPublicKey,
      createMerchantInfo(),
    )

    const response = await fetch(
      'https://panther-services-api-dev.pc-in.net/merchant-integration',
      {
        headers: {
          'Tenant-Code': 'TEST',
        },
        method: 'PUT',
        body: JSON.stringify({ merchantInfo }),
      },
    )
    console.log({ response })
    assert.equal(response.status, 200)
  })
})
