export interface PageProps {
    params: Promise<{
    productId: string;
    }>;
    searchParams?: { [key: string]: string | string[] | undefined };
}