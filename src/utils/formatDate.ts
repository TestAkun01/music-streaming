export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  // Menentukan nama bulan dalam bahasa Indonesia
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const day = date.getDate();
  const month = months[date.getMonth()]; // Menyusun bulan berdasarkan index
  const year = date.getFullYear(); // Ambil tahun dengan format 4 digit

  return `${day} ${month}, ${year}`;
};
