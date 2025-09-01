import { cn } from "@/lib/utils"

const Title = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <h1
      className={cn(
        "text-3xl font-semibold text-green-800 font-sans capitalize tracking-wide",
        className
      )}
    >
      {children}
    </h1>
  )
}
const SubTitle = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <h1 className={cn("font-semibold text-gray-900 font-sans", className)}>
      {children}
    </h1>
  )
}
const SubText = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return <p className={cn("text-gray-600 text-sm", className)}>{children}</p>
}
export { Title, SubText, SubTitle }
