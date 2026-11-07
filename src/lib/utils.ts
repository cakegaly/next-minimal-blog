export { cn } from "cn"

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "numeric",
    day: "numeric",
  })
}
