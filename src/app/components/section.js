export default function Section({ id, title, children }) {
  return (
    <section
      id={id}
      className="min-h-screen flex flex-col justify-center items-center p-10"
    >
      <h2 className="text-3xl font-bold mb-6">{title}</h2>
      <div>{children}</div>
    </section>
  );
}
