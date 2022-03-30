"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBanxwareLinkIntegration = void 0;
const crypto = __importStar(require("crypto"));
const zlib = __importStar(require("zlib"));
const createBanxwareLinkIntegration = async (clientPrivateKey, banxwarePublicKey, clientData) => {
    clientData["encryptionTime"] = new Date().toISOString();
    const merchantInfo = JSON.stringify(clientData);
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(merchantInfo);
    sign.end();
    const signatureResult = sign.sign(clientPrivateKey, 'base64');
    const message = JSON.stringify({
        merchantInfo: merchantInfo,
        signature: signatureResult
    });
    const compressedMessage = zlib.deflateRawSync(message);
    const aesKey = await crypto.randomBytes(32);
    const aesIv = await crypto.randomBytes(16);
    const cipheriv = crypto.createCipheriv('aes-256-gcm', aesKey, aesIv);
    // Append the authTag onto the encrypted message to emulate the Java implementation of AES GCM cipher.
    const messageBytes = cipheriv.update(compressedMessage);
    const finalBytes = cipheriv.final();
    const tagBytes = cipheriv.getAuthTag();
    const encryptedMessage = Buffer.concat([messageBytes, finalBytes, tagBytes]);
    const messageKey = aesKey.toString('base64') + '$' + aesIv.toString('base64');
    const key = { key: banxwarePublicKey, padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, oaepHash: 'sha256' };
    const encryptionResult = crypto.publicEncrypt(key, Buffer.from(messageKey));
    const encryptedBlob = encryptedMessage.toString('base64') + '$' + encryptionResult.toString('base64');
    return encryptedBlob;
};
exports.createBanxwareLinkIntegration = createBanxwareLinkIntegration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLCtDQUFnQztBQUNoQywyQ0FBNEI7QUFFckIsTUFBTSw2QkFBNkIsR0FBRyxLQUFLLEVBQ2hELGdCQUF3QixFQUN4QixpQkFBeUIsRUFDekIsVUFBNEIsRUFDWCxFQUFFO0lBQ2xCLFVBQWtCLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFBO0lBQ2hFLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDL0MsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ3pCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUNWLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFN0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUM3QixZQUFZLEVBQUUsWUFBWTtRQUMxQixTQUFTLEVBQUUsZUFBZTtLQUMzQixDQUFDLENBQUE7SUFFRixNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUE7SUFFdEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQzNDLE1BQU0sS0FBSyxHQUFHLE1BQU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUMxQyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFFcEUsc0dBQXNHO0lBQ3RHLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUN2RCxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDbkMsTUFBTSxRQUFRLEdBQUksUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQ3ZDLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQTtJQUU1RSxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzdFLE1BQU0sR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLHNCQUFzQixFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQTtJQUM1RyxNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQTtJQUUzRSxNQUFNLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxHQUFHLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNyRyxPQUFPLGFBQWEsQ0FBQTtBQUN0QixDQUFDLENBQUE7QUFuQ1ksUUFBQSw2QkFBNkIsaUNBbUN6QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lcmNoYW50TGlua0RhdGEgfSBmcm9tICcuL3R5cGVzJ1xuaW1wb3J0ICogYXMgY3J5cHRvIGZyb20gJ2NyeXB0bydcbmltcG9ydCAqIGFzIHpsaWIgZnJvbSAnemxpYidcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUJhbnh3YXJlTGlua0ludGVncmF0aW9uID0gYXN5bmMgKFxuICBjbGllbnRQcml2YXRlS2V5OiBzdHJpbmcsXG4gIGJhbnh3YXJlUHVibGljS2V5OiBzdHJpbmcsXG4gIGNsaWVudERhdGE6IE1lcmNoYW50TGlua0RhdGEsXG4pOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAoY2xpZW50RGF0YSBhcyBhbnkpW1wiZW5jcnlwdGlvblRpbWVcIl0gPSBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKClcbiAgY29uc3QgbWVyY2hhbnRJbmZvID0gSlNPTi5zdHJpbmdpZnkoY2xpZW50RGF0YSlcbiAgY29uc3Qgc2lnbiA9IGNyeXB0by5jcmVhdGVTaWduKCdSU0EtU0hBMjU2JylcbiAgc2lnbi51cGRhdGUobWVyY2hhbnRJbmZvKVxuICBzaWduLmVuZCgpXG4gIGNvbnN0IHNpZ25hdHVyZVJlc3VsdCA9IHNpZ24uc2lnbihjbGllbnRQcml2YXRlS2V5LCAnYmFzZTY0JylcblxuICBjb25zdCBtZXNzYWdlID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgIG1lcmNoYW50SW5mbzogbWVyY2hhbnRJbmZvLFxuICAgIHNpZ25hdHVyZTogc2lnbmF0dXJlUmVzdWx0XG4gIH0pXG5cbiAgY29uc3QgY29tcHJlc3NlZE1lc3NhZ2UgPSB6bGliLmRlZmxhdGVSYXdTeW5jKG1lc3NhZ2UpXG5cbiAgY29uc3QgYWVzS2V5ID0gYXdhaXQgY3J5cHRvLnJhbmRvbUJ5dGVzKDMyKVxuICBjb25zdCBhZXNJdiA9IGF3YWl0IGNyeXB0by5yYW5kb21CeXRlcygxNilcbiAgY29uc3QgY2lwaGVyaXYgPSBjcnlwdG8uY3JlYXRlQ2lwaGVyaXYoJ2Flcy0yNTYtZ2NtJywgYWVzS2V5LCBhZXNJdilcblxuICAvLyBBcHBlbmQgdGhlIGF1dGhUYWcgb250byB0aGUgZW5jcnlwdGVkIG1lc3NhZ2UgdG8gZW11bGF0ZSB0aGUgSmF2YSBpbXBsZW1lbnRhdGlvbiBvZiBBRVMgR0NNIGNpcGhlci5cbiAgY29uc3QgbWVzc2FnZUJ5dGVzID0gY2lwaGVyaXYudXBkYXRlKGNvbXByZXNzZWRNZXNzYWdlKVxuICBjb25zdCBmaW5hbEJ5dGVzID0gY2lwaGVyaXYuZmluYWwoKVxuICBjb25zdCB0YWdCeXRlcyA9ICBjaXBoZXJpdi5nZXRBdXRoVGFnKClcbiAgY29uc3QgZW5jcnlwdGVkTWVzc2FnZSA9IEJ1ZmZlci5jb25jYXQoW21lc3NhZ2VCeXRlcywgZmluYWxCeXRlcywgdGFnQnl0ZXNdKVxuXG4gIGNvbnN0IG1lc3NhZ2VLZXkgPSBhZXNLZXkudG9TdHJpbmcoJ2Jhc2U2NCcpICsgJyQnICsgYWVzSXYudG9TdHJpbmcoJ2Jhc2U2NCcpXG4gIGNvbnN0IGtleSA9IHsga2V5OiBiYW54d2FyZVB1YmxpY0tleSwgcGFkZGluZzogY3J5cHRvLmNvbnN0YW50cy5SU0FfUEtDUzFfT0FFUF9QQURESU5HLCBvYWVwSGFzaDogJ3NoYTI1NicgfVxuICBjb25zdCBlbmNyeXB0aW9uUmVzdWx0ID0gY3J5cHRvLnB1YmxpY0VuY3J5cHQoa2V5LCBCdWZmZXIuZnJvbShtZXNzYWdlS2V5KSlcblxuICBjb25zdCBlbmNyeXB0ZWRCbG9iID0gZW5jcnlwdGVkTWVzc2FnZS50b1N0cmluZygnYmFzZTY0JykgKyAnJCcgKyBlbmNyeXB0aW9uUmVzdWx0LnRvU3RyaW5nKCdiYXNlNjQnKVxuICByZXR1cm4gZW5jcnlwdGVkQmxvYlxufVxuIl19