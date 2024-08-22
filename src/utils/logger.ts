export function logMessage(testInfo, title , message) {
    testInfo.attachments.push({
        name: title,
        contentType: 'text/plain',
        body: Buffer.from(message),
    });
}