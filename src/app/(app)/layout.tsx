import { ReactNode } from "react";
import CustomLayout from "@/components/CustomLayout";

export default function AppLayout({ children }: { children: ReactNode }) {
  return <CustomLayout>{children}</CustomLayout>;
}
