import { MerchantLinkData } from './types';
import * as crypto from 'crypto';
import * as zlib from 'zlib';


export const createBanxwareLinkIntegration = async (
  clientPrivateKey: string,
  banxwarePublicKey: string,
  clientData: MerchantLinkData,
): Promise<string> => {

  const merchantInfo = JSON.stringify(clientData);
  const sign = crypto.createSign('RSA-SHA256');
  sign.update(merchantInfo);
  sign.end();
  const signatureResult = sign.sign(clientPrivateKey, 'base64');

  const message = JSON.stringify({
    merchantInfo: merchantInfo,
    signature: signatureResult,
  });

  const compressedMessage = zlib.brotliCompressSync(message, {
    params: {
      [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
      [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
    },
  });

  const aesKey = await crypto.randomBytes(32);
  const aesIv = await crypto.randomBytes(16);
  const cipheriv = crypto.createCipheriv('aes-256-gcm', aesKey, aesIv);

  const encryptedMessage = cipheriv.update(compressedMessage).toString('base64');

  const messageKey = aesKey.toString('base64') + '$' + aesIv.toString('base64');
  const encryptionResult = crypto.publicEncrypt(
    {
      key: banxwarePublicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: 'sha256',
    },
    Buffer.from(messageKey),
  );

  const encryptedBlob = encryptedMessage + '$' + encryptionResult.toString('base64');
  const encryptedString = encodeURIComponent(encryptedBlob);

  return encryptedString;
}
