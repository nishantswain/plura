import { FC } from 'react'
import Navigation from '@/components/ui/site/navigation'
interface layoutProps {
  children:React.ReactNode
}

const layout: FC<layoutProps> = ({children}) => {
  return <div><Navigation/>{children}</div>
}

export default layout