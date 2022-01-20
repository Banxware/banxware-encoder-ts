import * as fs from 'fs'
import fetch from 'node-fetch'
import { createMerchantInfo } from './testMerchant'
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

    const merchantInfo = createMerchantInfo()
    console.log({ merchantInfo })

    const blob = await createBanxwareLinkIntegration(
      testTenantPrivateKey,
      banxwareDevPublicKey,
      merchantInfo,
    )
    console.log({ blob })

    const response = await fetch(
      'https://panther-services-api-dev.pc-in.net/merchant-integration',
      {
        headers: {
          'Tenant-Code': 'TEST',
        },
        method: 'PUT',
        body: JSON.stringify({ merchantInfo: blob }),
      },
    )
    assert.equal(response.status, 200)

    const body = await response.json()
    console.dir({ body }, { depth: null })
  })
})
