import * as fs from 'fs';
import fetch from 'node-fetch';
import { createMerchantInfo } from './testMerchant';
import { MerchantLinkData } from '../src/types';
import { createBanxwareLinkIntegration } from '../src/index';
import assert from 'assert';

describe("link integration", () => {
    test('it should create a session', async () => {

        const testTenantPrivateKey = fs.readFileSync('./resources/test-tenant-private-key-1.pem').toString();
        const banxwareDevPublicKey = fs.readFileSync('./resources/banxware-dev-public-key-1.pem').toString();
        
        const merchantInfo: MerchantLinkData = createMerchantInfo();
        
        const queryParam = await createBanxwareLinkIntegration(testTenantPrivateKey, banxwareDevPublicKey, merchantInfo);
        const devEndpoint = `https://panther-services-api-dev.pc-in.net/link-integration?merchant_info=${queryParam}`;
        console.log({ devEndpoint });

        const response = await fetch(devEndpoint, {
            headers: {
                'Tenant-Code': 'TEST-TENANT',
            },
            method: 'POST',
        });
        console.log({ response });
        assert.equal(response.status, 200);
    });
});
