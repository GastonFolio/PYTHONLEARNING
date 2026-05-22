import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  onClick?: () => void;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Fil d'Ariane" className="flex items-center gap-1 text-sm text-gray-500 mb-6">
      <button
        onClick={() => items[0]?.onClick?.()}
        className="flex items-center gap-1 text-gray-500 hover:text-white transition-colors focus-ring rounded px-1 py-0.5"
        aria-label="Accueil"
      >
        <Home size={14} />
      </button>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1">
          <ChevronRight size={14} className="text-gray-600" />
          {item.onClick ? (
            <button
              onClick={item.onClick}
              className="text-gray-400 hover:text-python-yellow transition-colors focus-ring rounded px-1 py-0.5"
            >
              {item.label}
            </button>
          ) : (
            <span className="text-white font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
