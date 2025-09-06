import LoginComponent from "@/components/molecules/loginComponent"

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="p-6 bg-white shadow-lg rounded-lg w-full max-w-md flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-black mb-2 text-center">Iniciar sesión</h1>
        <LoginComponent />
        <div className="text-center mt-4">
          <p className="text-black">¿No tienes cuenta?</p>
          <a href="/register" className="font-medium text-blue-400 hover:text-yellow-300">Registrate</a>
        </div>
      </div>
    </main>
  )
}
