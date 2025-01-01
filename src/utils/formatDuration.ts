const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  let formattedDuration = "";

  if (hours > 0) {
    formattedDuration += `${hours} Jam `;
  }

  if (minutes > 0) {
    formattedDuration += `${minutes} Menit `;
  }

  formattedDuration += `${seconds} Detik`;

  return formattedDuration;
};
export default formatDuration;
