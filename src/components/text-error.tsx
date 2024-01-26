import { ReactNode } from "react";

export function TextError({ children }: { children: ReactNode}) {
  return (
    <div className="text-red-500 text-sm mt-0.5 text-end">
      {children}
    </div>
  )
}