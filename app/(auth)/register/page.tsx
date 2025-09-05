import RegisterComponent from "@/components/molecules/registerComponent"

export default function RegisterPage() {
    return (
        <main className="flex min-h-screen items-center justify-center bg-white py-8">
            <div className="w-full max-w-md mx-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Únete a millones de músicos de todo el mundo
                    </h1>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <RegisterComponent />
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>

                        </div>
                        <div className="relative flex justify-center text-sm">
                            <p>
                                Este sitio cuenta con la protección de reCAPTCHA Enterprise. Además, se aplican la política de privacidad y los términos del servicio de Google
                            </p>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">o</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <button className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400">
                            Regístrese con Google
                        </button>
                        <div className="mt-4">
                            <button className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400">
                                Regístrese con Apple
                            </button>
                        </div>
                        <div className="mt-4">
                            <button className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400">
                                Regístrese con Facebook
                            </button>
                        </div>
                        <div className="mt-6 text-center text-sm text-gray-600">
                            <p>¿Ya tienes una cuenta?</p>
                            <a href="/login" className="font-medium text-blue-400 hover:text-yellow-300"> Iniciar sesión</a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
