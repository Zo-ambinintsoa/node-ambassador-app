import crypto from 'crypto';

/**
 * Generates a formatted file name by adding a unique identifier to the original file name.
 * @param originalFileName - The original file name.
 * @returns The formatted file name.
 */
export function generateFormattedFileName(originalFileName: string): string {
    const fileExtension = getFileExtension(originalFileName);
    const uniqueIdentifier = crypto.randomBytes(8).toString('hex');

    return `${uniqueIdentifier}-${Date.now()}.${fileExtension}`;
}

/**
 * Retrieves the file extension from the original file name.
 * @param fileName - The original file name.
 * @returns The file extension.
 */
export function getFileExtension(fileName: string): string {
    return fileName.split('.').pop() || '';
}

/**
 * Retrieves the file size in kilobytes.
 * @param fileSize - The file size in bytes.
 * @returns The file size in kilobytes.
 */
export function getFileSize(fileSize: number): number {
    return Math.round(fileSize / 1024);
}

/**
 * Retrieves the file type based on the MIME type.
 * @param mimeType - The MIME type of the file.
 * @returns The file type.
 */
export function getFileType(mimeType: string): string {
    return mimeType.split('/')[0];
}
