import * as FileSystem from 'expo-file-system';

export async function readFileAsBase64(uri) {
  const extension = uri.split('.').pop();
  let mimeType = 'video/3gp';
  if (extension === 'm4a') {
    mimeType = 'audio/m4a';
  }
  const base64String = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
    mimeType: mimeType,
  });
  return base64String;
}
