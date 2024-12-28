const formatSongName = (url: string) => {
  try {
    const fileName = decodeURIComponent(url.split("/").pop() || "");
    return fileName.replace(/\.[^/.]+$/, "");
  } catch {
    return url;
  }
};

export default formatSongName;
