import ButtonComponent from "../atoms/buttonComponent"

export default function HeaderComponent() {
    return (
        <header className="bg-white-500">
        <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
            <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5 flex items-center">
                <span className="sr-only">Your Company</span>
                <img src="https://cdn.freelogovectors.net/wp-content/uploads/2020/02/reverb-logo.png" alt="Company Logo" className="h-25 w-auto"/>
            </a>
            </div>
            
            <div className="flex lg:hidden">
            <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200 hover:text-white hover:bg-amber-600 transition-colors">
                <span className="sr-only">Open main menu</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
                <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </button>
            </div>
            
            <div className="hidden lg:flex lg:gap-x-12">
            <a href="products" className="text-sm/6 font-semibold text-black hover:text-amber-100 transition-colors">Products</a>
            <a href="category" className="text-sm/6 font-semibold text-black hover:text-amber-100 transition-colors">Categories</a>
            <a href="perfil" className="text-sm/6 font-semibold text-black hover:text-amber-100 transition-colors">Perfile</a>
            <a href="shopping_Car" className="text-sm/6 font-semibold text-black hover:text-amber-100 transition-colors">Cart</a>
            <a href="favorite_Products" className="text-sm/6 font-semibold text-black hover:text-amber-100 transition-colors">Favorite</a>
            </div>
            
            <div className="flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4">
            <a href="register">
                <ButtonComponent className="bg-white text-black active:bg-white active:text-white px-4 py-2 rounded-md transition-colors border border-white">
                Register 
                </ButtonComponent>
            </a>
            
            <a href="login">
                <ButtonComponent className="bg-white text-black active:bg-white active:text-white px-4 py-2 rounded-md transition-colors border border-white">
                Log in 
                </ButtonComponent>
            </a>
            </div>
        </nav>
        </header>
    )
}