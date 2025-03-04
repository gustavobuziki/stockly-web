import { ReactNode } from "react";

interface Props {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function Header({ title, subtitle, action }: Props) {
  return (
    <header className="flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <p className="text-primary font-semibold text-xs">{title}</p>
        <h3 className="text-slate-900 font-semibold text-xl">
          {subtitle || title}
        </h3>
      </div>
      {action}
    </header>
  );
}
