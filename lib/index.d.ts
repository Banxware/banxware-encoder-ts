import { MerchantLinkData } from './types';
export declare const createBanxwareLinkIntegration: (clientPrivateKey: string, banxwarePublicKey: string, clientData: MerchantLinkData) => Promise<string>;
