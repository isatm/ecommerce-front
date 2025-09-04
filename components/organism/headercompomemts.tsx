import ButtonComponent from "../atoms/buttonComponent"


export default function HeaderComponent() {
  return (
    <header className="bg-amber-500">
      <nav aria-label="Global" className="flex items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1" >
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img src="https://cdn.freelogovectors.net/wp-content/uploads/2020/02/reverb-logo.png" alt="" className="h-25 w-auto" />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200">
            <span className="sr-only">Open main menu</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" data-slot="icon" aria-hidden="true" className="size-6">
              <path d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <a href="#" className="text-sm/6 font-semibold text-white">Product</a>
          <a href="#" className="text-sm/6 font-semibold text-white">Features</a>
          <a href="#" className="text-sm/6 font-semibold text-white">Marketplace</a>
          <a href="#" className="text-sm/6 font-semibold text-white">Company</a>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#"><ButtonComponent className="bg-sky-900">Register</ButtonComponent></a>
        
          <a href="#" className="text-sm/6 font-semibold text-white">Log in <span aria-hidden="true">&rarr;</span></a>
        </div>
      </nav>
    </header>
  )
}
