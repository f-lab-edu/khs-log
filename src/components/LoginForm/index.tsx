import Button from '@/components/Button'
import Profile from '@/components/Profile'
import {useUser} from '@/store/user'
import {createBrowserClient} from '@/supabase/client'

interface Props {
  className?: string
}

const LoginForm = ({className}: Props) => {
  const user = useUser(state => state.user)
  const setUser = useUser(state => state.setUser)

  const supabase = createBrowserClient()

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    if (user) {
      supabase.auth.signOut()
      setUser(null)
      return
    }

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
      <Button buttonName={user ? 'Logout' : 'Login'} type="submit" />
    </form>
  )
}

export default LoginForm
