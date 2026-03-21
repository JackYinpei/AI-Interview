import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default function MarkdownRenderer({ content }) {
  return (
    <div
      className="prose prose-lg max-w-none
        prose-headings:font-bold prose-headings:text-ink
        prose-h1:font-display prose-h1:text-3xl prose-h1:mb-8
        prose-h2:font-display prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-subtle
        prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
        prose-p:leading-8
        prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-a:font-medium
        prose-strong:text-ink
        prose-code:text-primary-700 prose-code:bg-primary-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-normal prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:shadow-lg prose-pre:overflow-x-auto
        prose-pre:code:bg-transparent prose-pre:code:text-inherit prose-pre:code:p-0 prose-pre:code:text-sm
        prose-blockquote:border-l-4 prose-blockquote:border-primary-400 prose-blockquote:bg-primary-50 prose-blockquote:py-1 prose-blockquote:not-italic
        prose-table:border-collapse
        prose-th:bg-surface-muted prose-th:border prose-th:border-subtle prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold prose-th:text-ink
        prose-td:border prose-td:border-subtle prose-td:px-4 prose-td:py-2
        prose-img:rounded-xl prose-img:shadow-md
        prose-hr:border-subtle
        prose-ul:list-disc
        prose-ol:list-decimal
        prose-li:my-1"
      style={{ color: 'var(--text-body)' }}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </div>
  )
}
