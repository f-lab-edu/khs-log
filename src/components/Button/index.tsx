interface Props {
  name: string
  type?: 'submit' | 'reset' | 'button'
  className?: string
  onClick?: () => void
}

const Button = ({name, className, onClick, type = 'button'}: Props) => {
  return (
    <button
      className={`btn-dark btn-small ${className}`}
      onClick={onClick}
      type={type}>
      {name}
    </button>
  )
}

export default Button
