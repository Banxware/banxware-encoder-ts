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
    const encryptionResult = crypto.publicEncrypt({
        key: banxwarePublicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: 'sha256',
    }, Buffer.from(messageKey));
    const encryptedBlob = encryptedMessage + '$' + encryptionResult.toString('base64');
    return encryptedBlob;
};
exports.createBanxwareLinkIntegration = createBanxwareLinkIntegration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLCtDQUFnQztBQUNoQywyQ0FBNEI7QUFFckIsTUFBTSw2QkFBNkIsR0FBRyxLQUFLLEVBQ2hELGdCQUF3QixFQUN4QixpQkFBeUIsRUFDekIsVUFBNEIsRUFDWCxFQUFFO0lBQ25CLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUE7SUFDL0MsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUM1QyxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFBO0lBQ3pCLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtJQUNWLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLENBQUE7SUFFN0QsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQztRQUM3QixZQUFZLEVBQUUsWUFBWTtRQUMxQixTQUFTLEVBQUUsZUFBZTtLQUMzQixDQUFDLENBQUE7SUFFRixNQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUU7UUFDekQsTUFBTSxFQUFFO1lBQ04sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxnQkFBZ0I7WUFDbkUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLG9CQUFvQixDQUFDLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxrQkFBa0I7U0FDekU7S0FDRixDQUFDLENBQUE7SUFFRixNQUFNLE1BQU0sR0FBRyxNQUFNLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDM0MsTUFBTSxLQUFLLEdBQUcsTUFBTSxNQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQzFDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUVwRSxNQUFNLGdCQUFnQixHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7SUFFOUUsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUM3RSxNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxhQUFhLENBQzNDO1FBQ0UsR0FBRyxFQUFFLGlCQUFpQjtRQUN0QixPQUFPLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxzQkFBc0I7UUFDaEQsUUFBUSxFQUFFLFFBQVE7S0FDbkIsRUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUN4QixDQUFBO0lBRUQsTUFBTSxhQUFhLEdBQ2pCLGdCQUFnQixHQUFHLEdBQUcsR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUE7SUFDOUQsT0FBTyxhQUFhLENBQUE7QUFDdEIsQ0FBQyxDQUFBO0FBMUNZLFFBQUEsNkJBQTZCLGlDQTBDekMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNZXJjaGFudExpbmtEYXRhIH0gZnJvbSAnLi90eXBlcydcbmltcG9ydCAqIGFzIGNyeXB0byBmcm9tICdjcnlwdG8nXG5pbXBvcnQgKiBhcyB6bGliIGZyb20gJ3psaWInXG5cbmV4cG9ydCBjb25zdCBjcmVhdGVCYW54d2FyZUxpbmtJbnRlZ3JhdGlvbiA9IGFzeW5jIChcbiAgY2xpZW50UHJpdmF0ZUtleTogc3RyaW5nLFxuICBiYW54d2FyZVB1YmxpY0tleTogc3RyaW5nLFxuICBjbGllbnREYXRhOiBNZXJjaGFudExpbmtEYXRhLFxuKTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgY29uc3QgbWVyY2hhbnRJbmZvID0gSlNPTi5zdHJpbmdpZnkoY2xpZW50RGF0YSlcbiAgY29uc3Qgc2lnbiA9IGNyeXB0by5jcmVhdGVTaWduKCdSU0EtU0hBMjU2JylcbiAgc2lnbi51cGRhdGUobWVyY2hhbnRJbmZvKVxuICBzaWduLmVuZCgpXG4gIGNvbnN0IHNpZ25hdHVyZVJlc3VsdCA9IHNpZ24uc2lnbihjbGllbnRQcml2YXRlS2V5LCAnYmFzZTY0JylcblxuICBjb25zdCBtZXNzYWdlID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgIG1lcmNoYW50SW5mbzogbWVyY2hhbnRJbmZvLFxuICAgIHNpZ25hdHVyZTogc2lnbmF0dXJlUmVzdWx0LFxuICB9KVxuXG4gIGNvbnN0IGNvbXByZXNzZWRNZXNzYWdlID0gemxpYi5icm90bGlDb21wcmVzc1N5bmMobWVzc2FnZSwge1xuICAgIHBhcmFtczoge1xuICAgICAgW3psaWIuY29uc3RhbnRzLkJST1RMSV9QQVJBTV9NT0RFXTogemxpYi5jb25zdGFudHMuQlJPVExJX01PREVfVEVYVCxcbiAgICAgIFt6bGliLmNvbnN0YW50cy5CUk9UTElfUEFSQU1fUVVBTElUWV06IHpsaWIuY29uc3RhbnRzLkJST1RMSV9NQVhfUVVBTElUWSxcbiAgICB9LFxuICB9KVxuXG4gIGNvbnN0IGFlc0tleSA9IGF3YWl0IGNyeXB0by5yYW5kb21CeXRlcygzMilcbiAgY29uc3QgYWVzSXYgPSBhd2FpdCBjcnlwdG8ucmFuZG9tQnl0ZXMoMTYpXG4gIGNvbnN0IGNpcGhlcml2ID0gY3J5cHRvLmNyZWF0ZUNpcGhlcml2KCdhZXMtMjU2LWdjbScsIGFlc0tleSwgYWVzSXYpXG5cbiAgY29uc3QgZW5jcnlwdGVkTWVzc2FnZSA9IGNpcGhlcml2LnVwZGF0ZShjb21wcmVzc2VkTWVzc2FnZSkudG9TdHJpbmcoJ2Jhc2U2NCcpXG5cbiAgY29uc3QgbWVzc2FnZUtleSA9IGFlc0tleS50b1N0cmluZygnYmFzZTY0JykgKyAnJCcgKyBhZXNJdi50b1N0cmluZygnYmFzZTY0JylcbiAgY29uc3QgZW5jcnlwdGlvblJlc3VsdCA9IGNyeXB0by5wdWJsaWNFbmNyeXB0KFxuICAgIHtcbiAgICAgIGtleTogYmFueHdhcmVQdWJsaWNLZXksXG4gICAgICBwYWRkaW5nOiBjcnlwdG8uY29uc3RhbnRzLlJTQV9QS0NTMV9PQUVQX1BBRERJTkcsXG4gICAgICBvYWVwSGFzaDogJ3NoYTI1NicsXG4gICAgfSxcbiAgICBCdWZmZXIuZnJvbShtZXNzYWdlS2V5KSxcbiAgKVxuXG4gIGNvbnN0IGVuY3J5cHRlZEJsb2IgPVxuICAgIGVuY3J5cHRlZE1lc3NhZ2UgKyAnJCcgKyBlbmNyeXB0aW9uUmVzdWx0LnRvU3RyaW5nKCdiYXNlNjQnKVxuICByZXR1cm4gZW5jcnlwdGVkQmxvYlxufVxuIl19