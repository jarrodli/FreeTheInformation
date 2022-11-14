const navigation = [
    { name: 'Make a FOI Request in NSW', href: '/nsw/apply' },
    { name: 'Apply for a FOI Request Review in NSW', href: '/nsw/review' },
    { name: 'Docs', href: '#' },
    { name: 'Company', href: '#' }
]

const Header = () => {
    return (
        <header>
            <nav className="mx-auto w-screen border-b border-white px-12" aria-label="Top">
                <div className="flex w-full items-center justify-between py-6">
                    <a href="/">
                        <span className="sr-only">Free the Information</span>
                        <img className="h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=white"
                             alt=""/>
                    </a>
                    <div className="ml-12 w-full space-x-8 lg:block">
                        {navigation.map((link) => (
                            <a key={link.name} href={link.href}
                               className="text-base font-medium text-white hover:text-indigo-50">
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
