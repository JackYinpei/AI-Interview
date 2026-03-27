import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

export default function MarkdownRenderer({ content }) {
  return (
    <div
      className="prose prose-lg max-w-none
        prose-headings:font-display prose-headings:font-medium prose-headings:tracking-tight prose-headings:text-ink
        prose-h1:text-4xl prose-h1:leading-tight prose-h1:mb-8
        prose-h2:mt-14 prose-h2:mb-5 prose-h2:text-3xl prose-h2:leading-tight
        prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-2xl prose-h3:leading-snug
        prose-p:max-w-none prose-p:text-ink-secondary prose-p:leading-8
        prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-a:underline-offset-4
        prose-strong:text-ink
        prose-em:text-ink
        prose-code:rounded prose-code:bg-[#edf4ff] prose-code:px-1.5 prose-code:py-0.5 prose-code:text-primary-700 prose-code:before:content-none prose-code:after:content-none
        prose-pre:rounded-[1.5rem] prose-pre:bg-[#15171f] prose-pre:px-6 prose-pre:py-5 prose-pre:shadow-[0_16px_36px_rgba(21,23,31,0.18)]
        prose-pre:code:bg-transparent prose-pre:code:p-0 prose-pre:code:text-white
        prose-blockquote:border-l prose-blockquote:border-tertiary prose-blockquote:bg-[rgba(154,62,31,0.04)] prose-blockquote:py-3 prose-blockquote:pl-6 prose-blockquote:font-display prose-blockquote:text-2xl prose-blockquote:italic prose-blockquote:text-ink prose-blockquote:not-italic
        prose-hr:my-10 prose-hr:border-subtle
        prose-ul:list-disc prose-ul:pl-6 prose-ul:text-ink-secondary
        prose-ol:list-decimal prose-ol:pl-6 prose-ol:text-ink-secondary
        prose-li:my-2 prose-li:leading-8
        prose-table:my-8 prose-table:w-full prose-table:border-collapse
        prose-thead:border-b prose-thead:border-subtle
        prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:text-xs prose-th:uppercase prose-th:tracking-[0.18em] prose-th:text-ink-muted
        prose-td:border-b prose-td:border-subtle prose-td:px-4 prose-td:py-4 prose-td:text-ink-secondary
        prose-img:rounded-[1.5rem] prose-img:shadow-[0_14px_30px_rgba(26,28,27,0.08)]"
      style={{ color: 'var(--text-body)' }}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
