import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000*60,
            refetchOnWindowFocus: false // 기본값 true
        }
    }
})