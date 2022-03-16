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
        signature: signatureResult,
    });
    const compressedMessage = zlib.gzipSync(message);
    const aesKey = await crypto.randomBytes(32);
    const aesIv = await crypto.randomBytes(16);
    const cipheriv = crypto.createCipheriv('aes-256-gcm', aesKey, aesIv);
    const encryptedMessage = cipheriv.update(compressedMessage).toString('base64');
    const messageKey = aesKey.toString('base64') + '$' + aesIv.toString('base64');
    const encryptionResult = crypto.publicEncrypt({
        key: banxwarePublicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
    }, Buffer.from(messageKey));
    const encryptedBlob = encryptedMessage + '$' + encryptionResult.toString('base64');
    return encryptedBlob;
};
exports.createBanxwareLinkIntegration = createBanxwareLinkIntegration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLCtDQUFnQztBQUNoQywyQ0FBNEI7QUFFckIsTUFBTSw2QkFBNkIsR0FBRyxLQUFLLEVBQ2hELGdCQUF3QixFQUN4QixpQkFBeUIsRUFDekIsVUFBNEIsRUFDWCxFQUFFO0lBQ25CLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDL0MsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ3pCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUNWLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFN0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUM3QixZQUFZLEVBQUUsWUFBWTtRQUMxQixTQUFTLEVBQUUsZUFBZTtLQUMzQixDQUFDLENBQUE7SUFFRixNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUE7SUFFaEQsTUFBTSxNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQzNDLE1BQU0sS0FBSyxHQUFHLE1BQU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtJQUMxQyxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsY0FBYyxDQUFDLGFBQWEsRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFFcEUsTUFBTSxnQkFBZ0IsR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBRTlFLE1BQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDN0UsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsYUFBYSxDQUMzQztRQUNFLEdBQUcsRUFBRSxpQkFBaUI7UUFDdEIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsc0JBQXNCO1FBQ2hELFFBQVEsRUFBRSxRQUFRO0tBQ25CLEVBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FDeEIsQ0FBQTtJQUVELE1BQU0sYUFBYSxHQUNqQixnQkFBZ0IsR0FBRyxHQUFHLEdBQUcsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQzlELE9BQU8sYUFBYSxDQUFBO0FBQ3RCLENBQUMsQ0FBQTtBQXJDWSxRQUFBLDZCQUE2QixpQ0FxQ3pDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTWVyY2hhbnRMaW5rRGF0YSB9IGZyb20gJy4vdHlwZXMnXG5pbXBvcnQgKiBhcyBjcnlwdG8gZnJvbSAnY3J5cHRvJ1xuaW1wb3J0ICogYXMgemxpYiBmcm9tICd6bGliJ1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQmFueHdhcmVMaW5rSW50ZWdyYXRpb24gPSBhc3luYyAoXG4gIGNsaWVudFByaXZhdGVLZXk6IHN0cmluZyxcbiAgYmFueHdhcmVQdWJsaWNLZXk6IHN0cmluZyxcbiAgY2xpZW50RGF0YTogTWVyY2hhbnRMaW5rRGF0YSxcbik6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gIGNvbnN0IG1lcmNoYW50SW5mbyA9IEpTT04uc3RyaW5naWZ5KGNsaWVudERhdGEpXG4gIGNvbnN0IHNpZ24gPSBjcnlwdG8uY3JlYXRlU2lnbignUlNBLVNIQTI1NicpXG4gIHNpZ24udXBkYXRlKG1lcmNoYW50SW5mbylcbiAgc2lnbi5lbmQoKVxuICBjb25zdCBzaWduYXR1cmVSZXN1bHQgPSBzaWduLnNpZ24oY2xpZW50UHJpdmF0ZUtleSwgJ2Jhc2U2NCcpXG5cbiAgY29uc3QgbWVzc2FnZSA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICBtZXJjaGFudEluZm86IG1lcmNoYW50SW5mbyxcbiAgICBzaWduYXR1cmU6IHNpZ25hdHVyZVJlc3VsdCxcbiAgfSlcblxuICBjb25zdCBjb21wcmVzc2VkTWVzc2FnZSA9IHpsaWIuZ3ppcFN5bmMobWVzc2FnZSlcblxuICBjb25zdCBhZXNLZXkgPSBhd2FpdCBjcnlwdG8ucmFuZG9tQnl0ZXMoMzIpXG4gIGNvbnN0IGFlc0l2ID0gYXdhaXQgY3J5cHRvLnJhbmRvbUJ5dGVzKDE2KVxuICBjb25zdCBjaXBoZXJpdiA9IGNyeXB0by5jcmVhdGVDaXBoZXJpdignYWVzLTI1Ni1nY20nLCBhZXNLZXksIGFlc0l2KVxuXG4gIGNvbnN0IGVuY3J5cHRlZE1lc3NhZ2UgPSBjaXBoZXJpdi51cGRhdGUoY29tcHJlc3NlZE1lc3NhZ2UpLnRvU3RyaW5nKCdiYXNlNjQnKVxuXG4gIGNvbnN0IG1lc3NhZ2VLZXkgPSBhZXNLZXkudG9TdHJpbmcoJ2Jhc2U2NCcpICsgJyQnICsgYWVzSXYudG9TdHJpbmcoJ2Jhc2U2NCcpXG4gIGNvbnN0IGVuY3J5cHRpb25SZXN1bHQgPSBjcnlwdG8ucHVibGljRW5jcnlwdChcbiAgICB7XG4gICAgICBrZXk6IGJhbnh3YXJlUHVibGljS2V5LFxuICAgICAgcGFkZGluZzogY3J5cHRvLmNvbnN0YW50cy5SU0FfUEtDUzFfT0FFUF9QQURESU5HLFxuICAgICAgb2FlcEhhc2g6ICdzaGEyNTYnLFxuICAgIH0sXG4gICAgQnVmZmVyLmZyb20obWVzc2FnZUtleSksXG4gIClcblxuICBjb25zdCBlbmNyeXB0ZWRCbG9iID1cbiAgICBlbmNyeXB0ZWRNZXNzYWdlICsgJyQnICsgZW5jcnlwdGlvblJlc3VsdC50b1N0cmluZygnYmFzZTY0JylcbiAgcmV0dXJuIGVuY3J5cHRlZEJsb2Jcbn1cbiJdfQ==