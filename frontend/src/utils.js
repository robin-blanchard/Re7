function extractPhotoName(url) {
  const photoUrlRegex = /https:\/\/storage\.googleapis\.com\/?[\w-]+\/((photos\/)?([\w-_]+\.(jpg|png)))\?/g;
  const photoName = photoUrlRegex.exec(url)[1];

  return photoName;
}
export { extractPhotoName };
