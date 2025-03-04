import LoginForm from "@/features/login/ui/LoginForm";

export default async function Login() {
  return (
    <div className="flex w-full flex-1 flex-col justify-center gap-2 px-8 sm:max-w-md">
      <LoginForm />
    </div>
  );
}
