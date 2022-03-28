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
    const merchantLinkPayload = {
        merchantInfo: clientData,
        encryptionTime: new Date().toISOString(),
    };
    const messagePayload = JSON.stringify(merchantLinkPayload);
    const sign = crypto.createSign('RSA-SHA256');
    sign.update(messagePayload);
    sign.end();
    const signatureResult = sign.sign(clientPrivateKey, 'base64');
    const message = JSON.stringify({
        payload: messagePayload,
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
    return encryptedMessage.toString('base64') + '$' + encryptionResult.toString('base64');
};
exports.createBanxwareLinkIntegration = createBanxwareLinkIntegration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLCtDQUFnQztBQUNoQywyQ0FBNEI7QUFFckIsTUFBTSw2QkFBNkIsR0FBRyxLQUFLLEVBQ2hELGdCQUF3QixFQUN4QixpQkFBeUIsRUFDekIsVUFBNEIsRUFDWCxFQUFFO0lBQ25CLE1BQU0sbUJBQW1CLEdBQXdCO1FBQy9DLFlBQVksRUFBRSxVQUFVO1FBQ3hCLGNBQWMsRUFBRSxJQUFJLElBQUksRUFBRSxDQUFDLFdBQVcsRUFBRTtLQUN6QyxDQUFBO0lBQ0QsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFBO0lBQzFELE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQTtJQUMzQixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7SUFDVixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLFFBQVEsQ0FBQyxDQUFBO0lBRTdELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUM7UUFDN0IsT0FBTyxFQUFFLGNBQWM7UUFDdkIsU0FBUyxFQUFFLGVBQWU7S0FDM0IsQ0FBQyxDQUFBO0lBRUYsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBRXRELE1BQU0sTUFBTSxHQUFHLE1BQU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUMzQyxNQUFNLEtBQUssR0FBRyxNQUFNLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDMUMsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLGNBQWMsQ0FBQyxhQUFhLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBRXBFLHNHQUFzRztJQUN0RyxNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUE7SUFDdkQsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ25DLE1BQU0sUUFBUSxHQUFJLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUN2QyxNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUE7SUFFNUUsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUM3RSxNQUFNLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxpQkFBaUIsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0IsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUE7SUFDNUcsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUE7SUFFM0UsT0FBTyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxHQUFHLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUN4RixDQUFDLENBQUE7QUFyQ1ksUUFBQSw2QkFBNkIsaUNBcUN6QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lcmNoYW50TGlua0RhdGEsIE1lcmNoYW50TGlua1BheWxvYWQgfSBmcm9tICcuL3R5cGVzJ1xuaW1wb3J0ICogYXMgY3J5cHRvIGZyb20gJ2NyeXB0bydcbmltcG9ydCAqIGFzIHpsaWIgZnJvbSAnemxpYidcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZUJhbnh3YXJlTGlua0ludGVncmF0aW9uID0gYXN5bmMgKFxuICBjbGllbnRQcml2YXRlS2V5OiBzdHJpbmcsXG4gIGJhbnh3YXJlUHVibGljS2V5OiBzdHJpbmcsXG4gIGNsaWVudERhdGE6IE1lcmNoYW50TGlua0RhdGEsXG4pOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICBjb25zdCBtZXJjaGFudExpbmtQYXlsb2FkOiBNZXJjaGFudExpbmtQYXlsb2FkID0ge1xuICAgIG1lcmNoYW50SW5mbzogY2xpZW50RGF0YSxcbiAgICBlbmNyeXB0aW9uVGltZTogbmV3IERhdGUoKS50b0lTT1N0cmluZygpLFxuICB9XG4gIGNvbnN0IG1lc3NhZ2VQYXlsb2FkID0gSlNPTi5zdHJpbmdpZnkobWVyY2hhbnRMaW5rUGF5bG9hZClcbiAgY29uc3Qgc2lnbiA9IGNyeXB0by5jcmVhdGVTaWduKCdSU0EtU0hBMjU2JylcbiAgc2lnbi51cGRhdGUobWVzc2FnZVBheWxvYWQpXG4gIHNpZ24uZW5kKClcbiAgY29uc3Qgc2lnbmF0dXJlUmVzdWx0ID0gc2lnbi5zaWduKGNsaWVudFByaXZhdGVLZXksICdiYXNlNjQnKVxuXG4gIGNvbnN0IG1lc3NhZ2UgPSBKU09OLnN0cmluZ2lmeSh7XG4gICAgcGF5bG9hZDogbWVzc2FnZVBheWxvYWQsXG4gICAgc2lnbmF0dXJlOiBzaWduYXR1cmVSZXN1bHRcbiAgfSlcblxuICBjb25zdCBjb21wcmVzc2VkTWVzc2FnZSA9IHpsaWIuZGVmbGF0ZVJhd1N5bmMobWVzc2FnZSlcblxuICBjb25zdCBhZXNLZXkgPSBhd2FpdCBjcnlwdG8ucmFuZG9tQnl0ZXMoMzIpXG4gIGNvbnN0IGFlc0l2ID0gYXdhaXQgY3J5cHRvLnJhbmRvbUJ5dGVzKDE2KVxuICBjb25zdCBjaXBoZXJpdiA9IGNyeXB0by5jcmVhdGVDaXBoZXJpdignYWVzLTI1Ni1nY20nLCBhZXNLZXksIGFlc0l2KVxuXG4gIC8vIEFwcGVuZCB0aGUgYXV0aFRhZyBvbnRvIHRoZSBlbmNyeXB0ZWQgbWVzc2FnZSB0byBlbXVsYXRlIHRoZSBKYXZhIGltcGxlbWVudGF0aW9uIG9mIEFFUyBHQ00gY2lwaGVyLlxuICBjb25zdCBtZXNzYWdlQnl0ZXMgPSBjaXBoZXJpdi51cGRhdGUoY29tcHJlc3NlZE1lc3NhZ2UpXG4gIGNvbnN0IGZpbmFsQnl0ZXMgPSBjaXBoZXJpdi5maW5hbCgpXG4gIGNvbnN0IHRhZ0J5dGVzID0gIGNpcGhlcml2LmdldEF1dGhUYWcoKVxuICBjb25zdCBlbmNyeXB0ZWRNZXNzYWdlID0gQnVmZmVyLmNvbmNhdChbbWVzc2FnZUJ5dGVzLCBmaW5hbEJ5dGVzLCB0YWdCeXRlc10pXG5cbiAgY29uc3QgbWVzc2FnZUtleSA9IGFlc0tleS50b1N0cmluZygnYmFzZTY0JykgKyAnJCcgKyBhZXNJdi50b1N0cmluZygnYmFzZTY0JylcbiAgY29uc3Qga2V5ID0geyBrZXk6IGJhbnh3YXJlUHVibGljS2V5LCBwYWRkaW5nOiBjcnlwdG8uY29uc3RhbnRzLlJTQV9QS0NTMV9PQUVQX1BBRERJTkcsIG9hZXBIYXNoOiAnc2hhMjU2JyB9XG4gIGNvbnN0IGVuY3J5cHRpb25SZXN1bHQgPSBjcnlwdG8ucHVibGljRW5jcnlwdChrZXksIEJ1ZmZlci5mcm9tKG1lc3NhZ2VLZXkpKVxuXG4gIHJldHVybiBlbmNyeXB0ZWRNZXNzYWdlLnRvU3RyaW5nKCdiYXNlNjQnKSArICckJyArIGVuY3J5cHRpb25SZXN1bHQudG9TdHJpbmcoJ2Jhc2U2NCcpXG59XG4iXX0=