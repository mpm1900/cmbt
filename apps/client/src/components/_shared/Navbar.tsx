import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'

export function Navbar() {
  return (
    <div className="w-[64px] h-screen bg-slate-950 py-2 flex justify-center">
      <Link to="/">
        <Button className="p-1">Restart</Button>
      </Link>
    </div>
  )
}
