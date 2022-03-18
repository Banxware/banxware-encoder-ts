import { MerchantLinkData } from './types'
import * as crypto from 'crypto'
import * as zlib from 'zlib'

export const createBanxwareLinkIntegration = async (
  clientPrivateKey: string,
  banxwarePublicKey: string,
  clientData: MerchantLinkData,
): Promise<string> => {
  const merchantInfo = JSON.stringify(clientData)
  const sign = crypto.createSign('RSA-SHA256')
  sign.update(merchantInfo)
  sign.end()
  const signatureResult = sign.sign(clientPrivateKey, 'base64')

  const message = JSON.stringify({
    merchantInfo: merchantInfo,
    signature: signatureResult
  })

  const compressedMessage = zlib.deflateRawSync(message)

  const aesKey = await crypto.randomBytes(32)
  const aesIv = await crypto.randomBytes(16)
  const cipheriv = crypto.createCipheriv('aes-256-gcm', aesKey, aesIv)

  // Append the authTag onto the encrypted message to emulate the Java implementation of AES GCM cipher.
  const encryptedMessage = Buffer.concat([cipheriv.update(compressedMessage), cipheriv.final(), cipheriv.getAuthTag()])

  const messageKey = aesKey.toString('base64') + '$' + aesIv.toString('base64')
  const key = { key: banxwarePublicKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, oaepHash: 'sha256' }
  const encryptionResult = crypto.publicEncrypt(key, Buffer.from(messageKey))

  const encryptedBlob = encryptedMessage.toString('base64') + '$' + encryptionResult.toString('base64')
  return encryptedBlob
}
