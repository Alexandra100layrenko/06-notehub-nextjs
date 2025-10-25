// components/TanStackProvider/TanStackProvider.tsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

type TanStackProviderProps = Readonly<{ children: ReactNode }>;

export default function TanStackProvider({ children }: TanStackProviderProps) {
  const [queryClient] = useState(() => new QueryClient());
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
