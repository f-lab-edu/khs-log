import Button from '@/components/Button'
import Profile from '@/components/Profile'
import {createBrowserClient} from '@/supabase/client'

interface Props {
  className?: string
}

const LoginForm = ({className}: Props) => {
  const supabase = createBrowserClient()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: location.origin,
      },
    })
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <Profile position="right" />
      <Button name="Login" type="submit" />
    </form>
  )
}

export default LoginForm
