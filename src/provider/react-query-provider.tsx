import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
interface Props {
  children: React.ReactNode;
}
function ReactQueryProvider({ children }: Props) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry(failureCount, error: any) {
          if (error?.status === 404) return false;
          if (error.status === 401) return false;
          else if (failureCount < 2) return true;
          else return false;
        },
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools></ReactQueryDevtools>
    </QueryClientProvider>
  );
}
export default ReactQueryProvider;
