import Hero from "@/components/Hero";
import NavbarLeft from "@/components/NavbarLeft";
import NavbarRigth from "@/components/NavbarRigth";


export default function Home() {
  return (
    <div className="h-screen flex flex-col">
      <div className="flex flex-1">
        <NavbarLeft />
        <Hero />
        <NavbarRigth />
      </div>
    </div>
  );
}
