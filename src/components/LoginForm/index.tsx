import Button from '@/components/Button'
import Profile from '@/components/Profile'

interface Props {
  className?: string
  onSubmit: () => void
}

const LoginForm = ({className, onSubmit}: Props) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <Profile position="right" />
      <Button name="Login" type="submit" />
    </form>
  )
}

export default LoginForm
