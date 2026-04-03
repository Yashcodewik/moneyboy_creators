"use client";

import React, { useEffect, useRef, useState } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store } from "./store";
import { persistStore, Persistor } from "redux-persist";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const persistorRef = useRef<Persistor | null>(null);

  if (!persistorRef.current) {
    persistorRef.current = persistStore(store);
  }

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>
  );
}
