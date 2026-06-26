import { cn } from '@/lib/utils/format';
export function GlassCard({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('glass p-6', className)} {...props}>{children}</div>;
}
