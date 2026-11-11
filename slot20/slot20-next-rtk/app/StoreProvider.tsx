'use client';

import { useState, type ReactNode } from 'react';
import { Provider } from 'react-redux';
import { makeStore, type AppStore } from '@/lib/store';

export default function StoreProvider({ children }: { children: ReactNode }) {
  // useState dạng initializer function chỉ chạy đúng 1 lần khi component mount lần đầu
  const [store] = useState<AppStore>(() => makeStore());

  return <Provider store={store}>{children}</Provider>;
}