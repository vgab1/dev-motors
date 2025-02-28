import { Link } from "react-router";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";

async function handleLogout() {
  await signOut(auth);
}

export function DashboardHeader() {
  return (
    <div className="w-full items-center flex h-10 bg-red-500 rounded-lg text-white font-medium gap-4 px-4 mb-4">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/dashboard/new">Cadastrar carro</Link>
      <button className="ml-auto cursor-pointer" onClick={handleLogout}>
        Sair da conta
      </button>
    </div>
  );
}
