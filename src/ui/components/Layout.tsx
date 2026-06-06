export default function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "1rem" }}>
      {children}
    </div>
  );
}