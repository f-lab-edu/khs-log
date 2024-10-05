'use client'

import {useCallback, useEffect, useState} from 'react'
import {remark} from 'remark'
import html from 'remark-html'

const MarkdownEditor = () => {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [htmlContent, setHtmlContent] = useState('')

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }

  const handleContentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setContent(event.target.value)
  }

  const convertMarkdownToHtml = useCallback(async (markdownBody: string) => {
    const processedContent = await remark().use(html).process(markdownBody)
    setHtmlContent(processedContent.toString())
  }, [])

  useEffect(() => {
    void convertMarkdownToHtml(content)
  }, [content, convertMarkdownToHtml])

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Title</h2>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          placeholder="Enter your title here..."
        />
      </div>
      <div className="flex-1 flex flex-col">
        <h2 className="text-xl font-bold mb-2">Preview</h2>
        <div
          className="flex-1 overflow-y-auto p-4 border border-gray-300 rounded-md shadow-sm bg-white"
          dangerouslySetInnerHTML={{__html: htmlContent}}
        />
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">Contents</h2>
        <textarea
          value={content}
          onChange={handleContentChange}
          className="w-full h-48 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 resize-none"
          placeholder="Enter your markdown content here..."
        />
      </div>
    </div>
  )
}

export default MarkdownEditor
