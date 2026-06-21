import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string | number
  subtitle: string
  icon: LucideIcon
  iconBg: string
  valueColor: string
}

export default function StatCard({ title, value, subtitle, icon: Icon, iconBg, valueColor }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className={`p-2.5 sm:p-3 rounded-lg ${iconBg} shrink-0`}>
          <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider truncate">
            {title}
          </p>
          <p className={`text-2xl sm:text-3xl font-bold mt-1 sm:mt-2 ${valueColor}`}>
            {value}
          </p>
          <p className="text-[11px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1 line-clamp-1">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  )
}