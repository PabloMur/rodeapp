"use client";
import { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

// TEMPORAL: sesión mockeada para desarrollo sin OAuth configurado
// Para restaurar: eliminar mockSession y el prop session={mockSession}
const mockSession = {
  user: {
    name: "Dev User",
    email: "dev@test.com",
    image: "https://ui-avatars.com/api/?name=Dev+User",
  },
  expires: "2099-12-31",
};

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return <SessionProvider session={mockSession}>{children}</SessionProvider>;
}
