import React from 'react'

type ButtonProps = {
  children: React.ReactNode
  onClick?: () => void
}

const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="px-6 py-2 rounded-2xl bg-violet-600 hover:bg-violet-800 text-white shadow-md transition"
    >
      {children}
    </button>
  )
}

export default Button
