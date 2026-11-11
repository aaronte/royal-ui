"use client"
import { createContext, useContext } from "react"
export const DesignPortalContext = createContext<HTMLElement | null>(null)
export function useDesignPortalContainer() { return useContext(DesignPortalContext) }
