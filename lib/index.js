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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLCtDQUFnQztBQUNoQywyQ0FBNEI7QUFFckIsTUFBTSw2QkFBNkIsR0FBRyxLQUFLLEVBQ2hELGdCQUF3QixFQUN4QixpQkFBeUIsRUFDekIsVUFBNEIsRUFDWCxFQUFFO0lBQ25CLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDL0MsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ3pCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUNWLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFN0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUM3QixZQUFZLEVBQUUsWUFBWTtRQUMxQixTQUFTLEVBQUUsZUFBZTtLQUMzQixDQUFDLENBQUE7SUFFRixNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUE7SUFFdEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQzNDLE1BQU0sS0FBSyxHQUFHLE1BQU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUMxQyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFFcEUsc0dBQXNHO0lBQ3RHLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtJQUN2RCxNQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDbkMsTUFBTSxRQUFRLEdBQUksUUFBUSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQ3ZDLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQTtJQUU1RSxNQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzdFLE1BQU0sR0FBRyxHQUFHLEVBQUUsR0FBRyxFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLHNCQUFzQixFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQTtJQUM1RyxNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQTtJQUUzRSxNQUFNLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxHQUFHLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNyRyxPQUFPLGFBQWEsQ0FBQTtBQUN0QixDQUFDLENBQUE7QUFsQ1ksUUFBQSw2QkFBNkIsaUNBa0N6QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lcmNoYW50TGlua0RhdGEgfSBmcm9tICcuL3R5cGVzJ1xuaW1wb3J0ICogYXMgY3J5cHRvIGZyb20gJ2NyeXB0bydcbmltcG9ydCAqIGFzIHpsaWIgZnJvbSAnemxpYidcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUJhbnh3YXJlTGlua0ludGVncmF0aW9uID0gYXN5bmMgKFxuICBjbGllbnRQcml2YXRlS2V5OiBzdHJpbmcsXG4gIGJhbnh3YXJlUHVibGljS2V5OiBzdHJpbmcsXG4gIGNsaWVudERhdGE6IE1lcmNoYW50TGlua0RhdGEsXG4pOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICBjb25zdCBtZXJjaGFudEluZm8gPSBKU09OLnN0cmluZ2lmeShjbGllbnREYXRhKVxuICBjb25zdCBzaWduID0gY3J5cHRvLmNyZWF0ZVNpZ24oJ1JTQS1TSEEyNTYnKVxuICBzaWduLnVwZGF0ZShtZXJjaGFudEluZm8pXG4gIHNpZ24uZW5kKClcbiAgY29uc3Qgc2lnbmF0dXJlUmVzdWx0ID0gc2lnbi5zaWduKGNsaWVudFByaXZhdGVLZXksICdiYXNlNjQnKVxuXG4gIGNvbnN0IG1lc3NhZ2UgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgbWVyY2hhbnRJbmZvOiBtZXJjaGFudEluZm8sXG4gICAgc2lnbmF0dXJlOiBzaWduYXR1cmVSZXN1bHRcbiAgfSlcblxuICBjb25zdCBjb21wcmVzc2VkTWVzc2FnZSA9IHpsaWIuZGVmbGF0ZVJhd1N5bmMobWVzc2FnZSlcblxuICBjb25zdCBhZXNLZXkgPSBhd2FpdCBjcnlwdG8ucmFuZG9tQnl0ZXMoMzIpXG4gIGNvbnN0IGFlc0l2ID0gYXdhaXQgY3J5cHRvLnJhbmRvbUJ5dGVzKDE2KVxuICBjb25zdCBjaXBoZXJpdiA9IGNyeXB0by5jcmVhdGVDaXBoZXJpdignYWVzLTI1Ni1nY20nLCBhZXNLZXksIGFlc0l2KVxuXG4gIC8vIEFwcGVuZCB0aGUgYXV0aFRhZyBvbnRvIHRoZSBlbmNyeXB0ZWQgbWVzc2FnZSB0byBlbXVsYXRlIHRoZSBKYXZhIGltcGxlbWVudGF0aW9uIG9mIEFFUyBHQ00gY2lwaGVyLlxuICBjb25zdCBtZXNzYWdlQnl0ZXMgPSBjaXBoZXJpdi51cGRhdGUoY29tcHJlc3NlZE1lc3NhZ2UpXG4gIGNvbnN0IGZpbmFsQnl0ZXMgPSBjaXBoZXJpdi5maW5hbCgpXG4gIGNvbnN0IHRhZ0J5dGVzID0gIGNpcGhlcml2LmdldEF1dGhUYWcoKVxuICBjb25zdCBlbmNyeXB0ZWRNZXNzYWdlID0gQnVmZmVyLmNvbmNhdChbbWVzc2FnZUJ5dGVzLCBmaW5hbEJ5dGVzLCB0YWdCeXRlc10pXG5cbiAgY29uc3QgbWVzc2FnZUtleSA9IGFlc0tleS50b1N0cmluZygnYmFzZTY0JykgKyAnJCcgKyBhZXNJdi50b1N0cmluZygnYmFzZTY0JylcbiAgY29uc3Qga2V5ID0geyBrZXk6IGJhbnh3YXJlUHVibGljS2V5LCBwYWRkaW5nOiBjcnlwdG8uY29uc3RhbnRzLlJTQV9QS0NTMV9PQUVQX1BBRERJTkcsIG9hZXBIYXNoOiAnc2hhMjU2JyB9XG4gIGNvbnN0IGVuY3J5cHRpb25SZXN1bHQgPSBjcnlwdG8ucHVibGljRW5jcnlwdChrZXksIEJ1ZmZlci5mcm9tKG1lc3NhZ2VLZXkpKVxuXG4gIGNvbnN0IGVuY3J5cHRlZEJsb2IgPSBlbmNyeXB0ZWRNZXNzYWdlLnRvU3RyaW5nKCdiYXNlNjQnKSArICckJyArIGVuY3J5cHRpb25SZXN1bHQudG9TdHJpbmcoJ2Jhc2U2NCcpXG4gIHJldHVybiBlbmNyeXB0ZWRCbG9iXG59XG4iXX0=