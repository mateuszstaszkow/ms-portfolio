import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="bg-gray-800 text-white fixed w-full z-10 top-0">
            <div className="container mx-auto flex justify-between items-center p-4">
                <div className="text-lg font-bold">Logo</div>
                <div className="space-x-4">
                    <Link href="#about">O mnie</Link>
                    <Link href="#experience">Doświadczenie</Link>
                    <Link href="#education">Edukacja</Link>
                    <Link href="#publications">Publikacje</Link>
                    <Link href="#services">Usługi</Link>
                    <Link href="#contact">Kontakt</Link>
                </div>
            </div>
        </nav>
    );
}
