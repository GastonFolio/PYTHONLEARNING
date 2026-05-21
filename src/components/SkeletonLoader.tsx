interface SkeletonProps {
  variant?: 'text' | 'title' | 'card' | 'circle' | 'bar';
  width?: string;
  height?: string;
  className?: string;
}

export default function Skeleton({ variant = 'text', width, height, className = '' }: SkeletonProps) {
  const baseClasses = 'skeleton';

  const variantClasses = {
    text: 'h-4 rounded',
    title: 'h-6 rounded-lg',
    card: 'h-32 rounded-2xl',
    circle: 'rounded-full',
    bar: 'h-2 rounded-full',
  };

  const style: React.CSSProperties = {};
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      role="status"
      aria-label="Chargement..."
    />
  );
}

interface SkeletonPageProps {
  type?: 'module' | 'quiz' | 'profile' | 'default';
}

export function SkeletonPage({ type = 'default' }: SkeletonPageProps) {
  if (type === 'module') {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-6">
          <Skeleton variant="text" width="120px" />
          <div className="glass rounded-2xl p-8">
            <div className="flex gap-6">
              <Skeleton variant="circle" width="80px" height="80px" />
              <div className="flex-1 space-y-3">
                <Skeleton variant="text" width="100px" />
                <Skeleton variant="title" width="250px" />
                <Skeleton variant="text" width="100%" />
                <Skeleton variant="text" width="80%" />
              </div>
            </div>
          </div>
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass rounded-xl p-4 flex items-center gap-4">
                <Skeleton variant="circle" width="40px" height="40px" />
                <div className="flex-1 space-y-2">
                  <Skeleton variant="text" width="60%" />
                  <Skeleton variant="text" width="40%" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        <Skeleton variant="title" width="300px" className="mx-auto" />
        <Skeleton variant="text" width="80%" className="mx-auto" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="card" />
          ))}
        </div>
      </div>
    </div>
  );
}
