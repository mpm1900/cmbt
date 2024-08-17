import { Link } from '@tanstack/react-router'
import { MdRestartAlt } from 'react-icons/md'
import { Button } from '../ui/button'

export function Navbar() {
  return (
    <div className="w-[64px] h-screen bg-black flex flex-col justify-start items-center border-r">
      <div className="w-full p-2 text-center font-mono text-muted-foreground border-b mb-2">
        cmbt
      </div>
      <div>
        <Link to="/">
          <Button
            variant="ghost"
            className="h-full p-2 opacity-40 hover:opacity-100"
          >
            <MdRestartAlt size={32} />
          </Button>
        </Link>
      </div>
    </div>
  )
}
