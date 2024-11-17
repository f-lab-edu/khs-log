'use client'

import {useState, useRef} from 'react'

import {deleteBlog} from '@/app/api/deleteBlog'
import {getAllPosts} from '@/app/api/getPosts'
import BlogEditModal, {
  type BlogEditModalRef,
} from '@/features/blog/components/BlogEditModal'
import BlogList from '@/features/blog/components/BlogList'
import EditProfileModal, {
  type EditProfileModalRef,
} from '@/features/profile/components/EditProfileModal'
import Button from '@/shared/components/Button'
import Dialog from '@/shared/components/Dialog'
import Icon from '@/shared/components/Icon'
import IconButton from '@/shared/components/IconButton'
import Typography from '@/shared/components/Typography'
import {type BlogData} from '@/shared/types'
import {useUser} from '@/store/user'
import Layout from '@/widgets/Layout/components'

interface Props {
  data: BlogData[]
}

const BlogDashBoardPage = ({data}: Props) => {
  const user = useUser(state => state.user)

  // State
  const [blogsData, setBlogsData] = useState<BlogData[]>(data)
  const [selectedBlog, setSelectedBlog] = useState<BlogData | null>(null)
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null)

  // Refs for Modals
  const editProfileModalRef = useRef<EditProfileModalRef>(null)
  const blogEditModalRef = useRef<BlogEditModalRef>(null)

  // Handlers
  const handleEditProfile = () => editProfileModalRef.current?.openModal()

  const handleEditBlog = (blog: BlogData) => {
    setSelectedBlog(blog)
    blogEditModalRef.current?.openModal()
  }

  const handleDeleteBlog = async (blogId: string) => {
    if (!user) return

    try {
      await deleteBlog({userId: user.id, blogId, role: user.role})
      setBlogsData(prev => prev.filter(blog => blog.id !== blogId))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to delete blog:', error)
    }
  }

  const confirmDelete = () => {
    if (deleteTargetId) {
      handleDeleteBlog(deleteTargetId)
      setDeleteTargetId(null)
    }
  }

  const refetchBlogs = async () => {
    try {
      const updatedData = await getAllPosts()
      if (updatedData) setBlogsData(updatedData)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Failed to fetch blogs data:', error)
    }
  }

  return (
    <div>
      <Layout>
        {/* Header Button */}
        <Button onClick={handleEditProfile} className="group w-1/2 h-15 m-3">
          <Icon iconName="blog" fill="fill-accent-3" />
          <Typography text="홈 추가/수정" className="base2" />
        </Button>

        {/* Blog List */}
        {blogsData.length > 0 ? (
          blogsData.map((blog, index) => (
            <div
              key={`${index}-${blog.id}`}
              className="flex justify-between items-center">
              <BlogList
                onClick={() => handleEditBlog(blog)}
                title={blog.title}
                isAdmin
              />
              <IconButton
                buttonClassName="ml-4 fill-accent-1"
                iconName="delete"
                onClick={() => setDeleteTargetId(blog.id)}
              />
            </div>
          ))
        ) : (
          <Typography text="No blogs found." />
        )}
      </Layout>
      {/* Modals */}
      <EditProfileModal ref={editProfileModalRef} />
      <BlogEditModal
        ref={blogEditModalRef}
        blogData={selectedBlog || undefined}
        refetchBlogs={refetchBlogs}
      />
      <Dialog
        isVisible={!!deleteTargetId}
        message="삭제하시겠습니까?"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  )
}

export default BlogDashBoardPage
