/** Tiny inline Markdown for letters: **bold**, *italic* and [text](url). */
import { Link, Text } from "@react-pdf/renderer";
import { ink } from "./theme";

const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)\s]+\))/g;

export function Inline({ text }: { text: string }) {
  return (
    <>
      {text.split(TOKEN).map((part, index) => {
        const key = `${index}-${part}`;
        if (/^\*\*[^*]+\*\*$/.test(part))
          return (
            <Text key={key} style={{ fontWeight: 700 }}>
              {part.slice(2, -2)}
            </Text>
          );
        if (/^\*[^*]+\*$/.test(part))
          return (
            <Text key={key} style={{ fontStyle: "italic" }}>
              {part.slice(1, -1)}
            </Text>
          );
        const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
        if (link)
          return (
            <Link
              key={key}
              src={link[2]}
              style={{ color: ink, textDecoration: "underline" }}
            >
              {link[1]}
            </Link>
          );
        return part;
      })}
    </>
  );
}
