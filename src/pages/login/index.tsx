import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import logoImg from "../../assets/logo.svg";
import { Container } from "../../components/container";
import { Input } from "../../components/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
import toast from "react-hot-toast";

const schema = z.object({
  email: z
    .string()
    .email("Insira um email válido")
    .nonempty("O campo email é obrigatório"),
  password: z.string().nonempty("O campo senha é obrigatório"),
});

type FormData = z.infer<typeof schema>;

export function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  useEffect(() => {
    async function handleLogout() {
      await signOut(auth);
    }

    handleLogout();
  }, []);

  function onSubmit(data: FormData) {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((user) => {
        console.log("Logado com sucesso");
        console.log(user);
        toast.success("Logado com sucesso");
        navigate("/dashboard", { replace: true });
      })
      .catch((err) => {
        console.log("Erro ao logar");
        console.log(err);
        toast.error("Erro ao fazer o login.");
      });
  }

  return (
    <Container>
      <div className="w-full min-h-screen flex items-center justify-center flex-col gap-4">
        <Link to="/" className="mb-6 w-full max-w-sm">
          <img src={logoImg} alt="Logo do site" className="w-full" />
        </Link>
        <form
          className="bg-white max-w-xl w-full rounded-lg p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-3">
            <Input
              type="email"
              placeholder="Digite seu email..."
              name="email"
              error={errors.email?.message}
              register={register}
            />
          </div>
          <div className="mb-3">
            <Input
              type="password"
              placeholder="Digite sua senha..."
              name="password"
              error={errors.password?.message}
              register={register}
            />
          </div>
          <button
            type="submit"
            className="bg-zinc-900 w-full rounded-md text-white h-10 font-medium cursor-pointer"
          >
            Acessar
          </button>
        </form>
        <Link to="/register">
          <p>Ainda não possui uma conta? Cadastre-se</p>
        </Link>
      </div>
    </Container>
  );
}
