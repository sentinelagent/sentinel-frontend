export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen items-center justify-center bg-[#F5F5F4] p-4 selection:bg-black selection:text-white">
            {children}
        </div>
    );
}
