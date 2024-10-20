'use client'

import {useRouter} from 'next/navigation'
import {useEffect, useState, useCallback} from 'react'
import {remark} from 'remark'
import html from 'remark-html'

import {createBlog} from '@/app/api/createBlog'
import {editBlog} from '@/app/api/editBlog'
import Button from '@/components/Button'
import Image from '@/components/Image'
import Input from '@/components/Input'
import MarkdownView from '@/components/MarkdownView'
import Textarea from '@/components/Textarea'
import Typography from '@/components/Typography'
import {useUser} from '@/store/user'
import {createBrowserClient} from '@/supabase/client'
import {type Database} from '@/supabase/database.types'

import type React from 'react'

type Props = {
  blogData?: Database['public']['Tables']['posts']['Row']
  onClose?: () => void
  refreshBlogs?: () => void
}

const BlogEdit = ({blogData, onClose, refreshBlogs}: Props) => {
  const router = useRouter()
  const user = useUser(state => state.user)
  const supabase = createBrowserClient()

  const [formData, setFormData] = useState({
    title: blogData?.title ?? '',
    imageUrl: blogData?.titleImageUrl ?? '', // 메인 이미지 URL
    content: blogData?.content ?? '', // 본문 내용
  })
  const [htmlContent, setHtmlContent] = useState('')
  const [mainImageFile, setMainImageFile] = useState<File | null>(null) // 메인 이미지 파일
  const [uploadedImages, setUploadedImages] = useState<string[]>([]) // 업로드한 본문 이미지 URL 리스트

  // 메인 이미지 처리
  const handleMainImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files) {
      const file = event.target.files[0]
      setMainImageFile(file)

      // 메인 이미지 미리보기 URL 생성
      const previewUrl = URL.createObjectURL(file)
      setFormData(prev => ({...prev, imageUrl: previewUrl}))
    }
  }

  // 본문 이미지 업로드 처리
  const handleContentImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files) {
      const file = event.target.files[0]
      const {data, error} = await supabase.storage
        .from('images')
        .upload(file.name, file, {
          cacheControl: '0',
          upsert: true,
        })

      if (error) {
        // eslint-disable-next-line no-console
        console.error('Error uploading image:', error)
        return
      }

      if (data) {
        const {data: publicUrlData} = supabase.storage
          .from('images')
          .getPublicUrl(file.name)

        const imageUrl = publicUrlData.publicUrl || ''

        // 본문 텍스트에 마크다운 형식으로 이미지 URL 삽입
        setFormData(prev => ({
          ...prev,
          content: prev.content + `\n![이미지 설명](${imageUrl})\n`,
        }))

        // 업로드된 이미지 URL을 리스트에 추가
        setUploadedImages(prev => [...prev, imageUrl])
      }
    }
  }

  // 마크다운을 HTML로 변환
  const convertMarkdownToHtml = useCallback(async (markdownBody: string) => {
    const processedContent = await remark().use(html).process(markdownBody)
    setHtmlContent(processedContent.toString())
  }, [])

  // 블로그 저장 처리
  const handleEdit = async () => {
    if (formData.title.length === 0) {
      return alert('제목을 입력해주세요.')
    }

    if (formData.content.length === 0) {
      return alert('내용을 입력해주세요.')
    }

    let updatedImageUrl = formData.imageUrl

    // 메인 이미지가 있으면 업로드
    if (mainImageFile) {
      const {data, error} = await supabase.storage
        .from('images')
        .upload(mainImageFile.name, mainImageFile, {
          cacheControl: '0',
          upsert: true,
        })

      if (error) {
        // eslint-disable-next-line no-console
        console.error('Error uploading image:', error)
        return
      }

      if (data) {
        const {data: publicUrlData} = supabase.storage
          .from('images')
          .getPublicUrl(mainImageFile.name)

        updatedImageUrl = publicUrlData.publicUrl || ''
      }
    }

    const blogPayload = {
      title: formData.title,
      content: formData.content,
      imageUrl: updatedImageUrl, // 메인 이미지 URL
    }

    if (blogData) {
      await editBlog({id: blogData.id, ...blogPayload})
      refreshBlogs?.()
      onClose?.()
      return
    }

    await createBlog({id: user?.id ?? '', ...blogPayload})
    router.push(`/Blog`)
  }

  // 본문 미리보기 업데이트
  useEffect(() => {
    convertMarkdownToHtml(formData.content)
  }, [formData.content, convertMarkdownToHtml])

  useEffect(() => {
    if (blogData) {
      setFormData({
        title: blogData.title,
        imageUrl: blogData.titleImageUrl,
        content: blogData.content,
      })
    }
  }, [blogData])

  return (
    <div className="flex flex-col h-full p-4 overflow-auto">
      <div className="flex justify-end items-center h-18">
        <Button onClick={handleEdit} className="border border-gray-300">
          <Typography
            text={blogData ? '게시글 수정' : '게시글 등록'}
            className="base2"
          />
        </Button>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">제목</h2>
        <Input
          name="title"
          value={formData.title}
          placeholder="제목을 입력해주세요."
          onChange={e => setFormData({...formData, title: e.target.value})}
          className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* 메인 이미지 업로드 */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">메인 이미지</h2>
        <div className="flex items-center">
          <label
            htmlFor="main-image-upload"
            className="border border-gray-300 p-2 rounded-md shadow-sm cursor-pointer hover:bg-gray-100 mr-4">
            <Typography text="메인 이미지 수정" className="base2" />
          </label>
          <input
            id="main-image-upload"
            type="file"
            accept="image/*"
            onChange={handleMainImageChange}
            className="hidden"
          />
          {formData.imageUrl && (
            <div className="flex justify-center items-center">
              <Image
                src={formData.imageUrl}
                alt="Main Image"
                className="max-w-full h-auto rounded-md mr-4"
                width={140}
                height={115}
              />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-row">
        {/* 본문 이미지 업로드 */}
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">본문 이미지 추가</h2>
          <div className="flex items-center">
            <label
              htmlFor="content-image-upload"
              className="border border-gray-300 p-2 rounded-md shadow-sm cursor-pointer hover:bg-gray-100 mr-4">
              <Typography text="본문 이미지 추가" className="base2" />
            </label>
            <input
              id="content-image-upload"
              type="file"
              accept="image/*"
              onChange={handleContentImageUpload}
              className="hidden"
            />
          </div>
        </div>

        {/* 업로드된 이미지 목록 */}
        {uploadedImages.length > 0 && (
          <div className="mb-4">
            <ul className="flex flex-row">
              {uploadedImages.map((imageUrl, index) => (
                <li key={index} className="mb-2">
                  <Image
                    src={imageUrl}
                    alt={`Uploaded Image ${index + 1}`}
                    className="max-w-full h-auto rounded-md mr-4"
                    width={140}
                    height={115}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 본문 내용 입력 */}
      <div className="mt-4">
        <h2 className="text-xl font-bold mb-2">내용</h2>
        <Textarea
          name="content"
          value={formData.content}
          placeholder="내용을 입력해주세요."
          onChange={e => setFormData({...formData, content: e.target.value})}
          className="w-full h-48 p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* 본문 미리보기 */}
      <div className="flex-1 flex flex-col overflow-auto mt-4">
        <h2 className="text-xl font-bold mb-2">미리보기</h2>
        <MarkdownView
          content={htmlContent}
          className="flex-1 p-4 border border-gray-300 rounded-md shadow-sm bg-white"
        />
      </div>
    </div>
  )
}

export default BlogEdit
