// Resalta los campos pendientes ("TODO: ...") para que se vean en el preview.
export default function T({ children }: { children: string }) {
  return children.includes("TODO:") ? <span className="todo">{children}</span> : <>{children}</>;
}
