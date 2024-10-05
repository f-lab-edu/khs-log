'use client'

import {useCallback, useEffect, useState} from 'react'
import {remark} from 'remark'
import html from 'remark-html'

interface Props {
  markdownBody: string
}

const MarkdownPreview = ({markdownBody}: Props) => {
  const [htmlContent, setHtmlContent] = useState('')

  const convertMarkdownToHtml = useCallback(async () => {
    const processedContent = await remark().use(html).process(markdownBody)
    setHtmlContent(processedContent.toString())
  }, [markdownBody])

  useEffect(() => {
    void convertMarkdownToHtml()
  }, [convertMarkdownToHtml])

  return (
    <div className="flex py-8 border-t border-n-3 lg:block md:py-8 dark:border-n-5">
      <div dangerouslySetInnerHTML={{__html: htmlContent}} />
    </div>
  )
}

export default MarkdownPreview
