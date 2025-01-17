export default function supabaseLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number | string;
  quality: number | string;
}) {
  return `${src}?width=${width}&quality=${quality || 75}`;
}
