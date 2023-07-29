import { defineDocumentType, makeSource } from "contentlayer/source-files"
import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import { visit } from "unist-util-visit"
import path from "path"
import { getHighlighter, loadTheme } from "shiki"

const computedFields = {
  //in case of content -> blog -> blog.mdx it will be /blog/blog, flattenedPath is the part after contentDirPath
  slug: {
    type: "string",
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  //in case of content -> blog -> blog.mdx it will be blog because contentDirPath is .content/ and it is not being included in raw path
  slugAsParams: {
    type: "string",
    resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/"),
  },
}

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    date: {
      type: "date",
      required: true,
    },
    published: {
      type: "boolean",
      default: true,
    },
    image: {
      type: "string",
      required: true,
    },
    authors: {
      type: "list",
      of: { type: "string" },
      required: true,
    },
  },
  computedFields,
}))

export const Author = defineDocumentType(() => ({
  name: "Author",
  filePathPattern: `authors/**/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
    },
    avatar: {
      type: "string",
      required: true,
    },
    linkedIn: {
      type: "string",
      required: true,
    },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: "./content",
  documentTypes: [Post, Author],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,

      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "pre") {
            const codeEl = node.children.find(child => child.tagName === "code");

            if (!codeEl) return;
   
            if (codeEl.data?.meta) {
              // Extract event from meta and pass it down the tree.
              const regex = /event="([^"]*)"/
              const match = codeEl.data?.meta.match(regex)
              if (match) {
                node.event = match ? match[1] : null
                codeEl.data.meta = codeEl.data.meta.replace(regex, "")
              }
            }

            node.raw = codeEl.children?.[0].value
            node.src = node.properties?.src
            node.style = node.properties?.style
          }
        });
      },
      
      [
        rehypePrettyCode,
        {
          theme: "one-dark-pro",
          keepBackground: false,
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }]
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted")
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ["word--highlighted"]
          },
        },
      ],
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === "element" && node?.tagName === "div") {
            if (!("data-rehype-pretty-code-fragment" in node.properties)) {
              return
            }

            const preElement = node.children.at(-1)
            if (preElement.tagName !== "pre") {
              return
            }

            preElement.properties["withMeta"] =
              node.children.at(0).tagName === "div"
            preElement.properties["raw"] = node.raw

            if (node.src) {
              preElement.properties["src"] = node.src
            }

            if (node.event) {
              preElement.properties["event"] = node.event
            }

            if (node.style) {
              preElement.properties["style"] = node.style
            }
          }
        })
      },
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ["subheading-anchor"],
            ariaLabel: "Link to section",
          },
        },
      ],
    ],
  },
})
