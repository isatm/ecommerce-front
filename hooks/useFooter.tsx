import { SearchForm } from "@/interfaces/searchForm";
import { useForm } from "react-hook-form";

export default function useFooter() {
    const { register, handleSubmit } = useForm<SearchForm>();
    
    const onSubmit = (data: SearchForm) => {
        console.log("Valor del correo:", data.search);
    };
    return { register, 
            handleSubmit, 
            onSubmit };
}