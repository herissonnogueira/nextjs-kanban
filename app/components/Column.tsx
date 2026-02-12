import { useDroppable } from "@dnd-kit/react";

interface ColumnProps {
  id: string;
  title: string;
  index: number;
  children: React.ReactNode;
}

export function Column({ id, title, index, children }: ColumnProps) {
  const { ref } = useDroppable({
    id,
    type: "column",
    accept: "item",
  });

  return (
    <div ref={ref} className="bg-gray-200 rounded-lg p-4 min-h-[200px]">
      <h2 className="text-lg font-semibold mb-4 text-center">{title}</h2>
      <div className="space-y-3">{children}</div>
    </div>
  );
}
