import { useAuthStore } from "@/store/useAuthStore";
import classNames from "classnames";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";

const Navbar = () => {
  const {
    state: { isCandidate, isUserLogged },
  } = useAuthStore();
  const pathname = usePathname();

  const signOut = () => {
    Cookies.remove("token");
    window.location.href = "/login";
  };

  const routes = [
    {
      label: "Vagas",
      href: "/vacancies",
    },
    {
      label: isCandidate ? "Minhas vagas" : "Dashboard",
      href: isCandidate ? "/candidate/my-vacancies" : "/company/dashboard",
      hidden: !isUserLogged,
    },
    {
      label: "Perfil",
      href: isCandidate ? "/candidate/profile" : "/company/profile",
      hidden: !isUserLogged,
    },
    {
      label: "Login",
      href: "/login",
      hidden: isUserLogged,
    },
    {
      label: "Cadastro",
      href: "/register",
      hidden: isUserLogged,
    },
    {
      label: "Sair",
      href: "/login",
      hidden: !isUserLogged,
      onClick: signOut,
    },
  ];

  return (
    <nav className="h-16 bg-brand-primary">
      <div className="py-5 px-4 flex gap-4 text-white font-semibold justify-end mx-auto max-w-7xl">
        {routes.map((r) => (
          <Link
            key={r.label}
            href={r.href}
            className={classNames({
              hidden: r.hidden,
              "border-b-brand-tertiary border-b-4 pointer-events-none":
                pathname.includes(r.href),
            })}
            onClick={r.onClick}
          >
            {r.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
