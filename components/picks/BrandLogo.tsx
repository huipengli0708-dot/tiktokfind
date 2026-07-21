import Logo from '@/components/Logo'

export default function BrandLogo({ size = 30 }: { size?: number }) {
  return <Logo size={size} className="shrink-0 text-[#F7F7F3]" />
}
