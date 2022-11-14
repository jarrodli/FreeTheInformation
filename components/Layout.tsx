import { FunctionComponent, PropsWithChildren } from 'react'
import Header                                   from './Header'


const Layout: FunctionComponent<PropsWithChildren<{}>> = ({ children }) => {
    return (
        <>
            <div
                className="min-h-screen w-screen bg-midnights bg-fixed md:bg-background md:bg-no-repeat md:bg-cover flex flex-col items-center justify-center">
                <Header/>
                <main>{children}</main>
            </div>
        </>
    )
}

export default Layout