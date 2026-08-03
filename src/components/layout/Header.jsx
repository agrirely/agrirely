import Logo from "@/components/ui/Logo";
import Navbar from "@/components/layout/Navbar";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-4 px-5 sm:h-20 sm:px-8 lg:px-12">
        <Logo priority width={168} height={50} />
        <Navbar />
      </div>
    </header>
  );
}
