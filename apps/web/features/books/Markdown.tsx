import type { CSSProperties } from "react";
import type { Components } from "react-markdown";

import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight as prismDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import remarkGfm from "remark-gfm";

const dark: Record<string, CSSProperties> = prismDark;

export function Markdown({children}: {children: string}) {
  const components: Components = {
    blockquote: (props) => (
      <blockquote
        {...props}
        className="mt-6 border-l-4 pl-4 mb-4 font-light italic"
      ></blockquote>
    ),
    code: ({
      children,
      className,
      ...props
    }) => {
      const match = /language-(\w+)/.exec(className || "");
      const code = typeof children === "string" ? children : Array.isArray(children) ? children.join("") : "";
      const normalizedCode = code.replace(/\n$/, "");

      if (match) {
        return (
          <div className="bg-[#FAFAFA] border-1 rounded-sm p-4 my-4">
            <SyntaxHighlighter
              customStyle={{
                backgroundColor: "transparent",
                fontSize: ".9rem",
                margin: 0,
                overflow: "hidden",
                padding: 0
              }}
              language={match[1]}
              PreTag="div"
              showLineNumbers
              style={dark}
            >
              {normalizedCode}
            </SyntaxHighlighter>
          </div>
        );
      }

      return (
        <code
          className={`${className ?? ""} bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold`}
          {...props}
        >
          {children}
        </code>
      );
      
    },
    h1: (props) => (
      <h1
        className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0"
        {...props}
      ></h1>
    ),
    h2: (props) => (
      <h2
        className="scroll-m-20 pb-2 text-3xl/12 font-semibold tracking-tight first:mt-0"
        {...props}
      ></h2>
    ),
    h3: (props) => (
      <h3
        className="scroll-m-20 text-2xl font-semibold tracking-tight"
        {...props}
      ></h3>
    ),
    p: (props) => <p className="text-2xl/10" {...props}></p>,
    table: (props) => (
      <div className="my-6 w-full overflow-y-auto">
        <table className="w-full" {...props}></table>
      </div>
    ),
    td: (props) => (
      <td
        {...props}
        className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
      ></td>
    ),
    th: (props) => (
      <th
        {...props}
        className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right"
      ></th>
    ),
    tr: (props) => (
      <tr {...props} className="even:bg-muted m-0 border-t p-0"></tr>
    ),
    ul: (props) => (
      <ul
        className="my-6 ml-6 text-2xl/8 list-disc [&>li]:mt-2"
        {...props}
      ></ul>
    ),
  };
  return <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>{children}</ReactMarkdown>
}