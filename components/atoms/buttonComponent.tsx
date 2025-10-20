import { ButtonProps } from "@/interfaces/button";
import { useButton } from "@/hooks/useButton";


//este boton es una funcion a la cual se le pasa un numero y el contenido que quieres que aparezca en el boton
export default function ButtonComponent(buttonProps:ButtonProps) {
  const { content, icon: Icon  } = buttonProps;
  const { style } = useButton(buttonProps);

  return (
    <div>
        {/* Se le pasa la variable style a classname con el estilo que se quiera usar */}
        <button className={style} > 
          {/* colocas el contenido que quieres que aparezca en el boton. ejemplo "inicia sesión" o "registrar" */}
            <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5em" }}>
            {Icon && <Icon />}  {/* se cambio */}
            {content}
            </span>
        </button>
    </div>
  )
}