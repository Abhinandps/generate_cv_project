export function getFileInfo(url: any) {
  const parts = url.key.split('/');
  const name = parts[parts.length - 1].split('_')[parts[parts.length - 1].split('_').length - 1];
  const formattedName = name.split('-').filter(Boolean).join(' ').trim();
  return { name: formattedName, type: url.fileType, key: url.key, url: url.fileUrl };
}
