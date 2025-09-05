//este boton es una funcion a la cual se le pasa un numero y el contenido que quieres que aparezca en el boton
export default function ButtonComponent(type: Number, content:string) {

  let style;

  //en base al numero que le pases este adoptara determinado estilo, correspondiente a ese numer

  switch (type) {
    case 1:
      style = "text-black hover:text-orange-400 font-medium py-2 px-4 rounded-lg transition"; // boton de login y register en el header
      break;
    case 2:
      style = "w-full bg-yellow-400 hover:bg-yellow-300 text-black font-medium py-2 rounded-lg transition"; // iniciar sesion
      break;
    case 3:
      style = ""; // negro de necesitas ayuda
      break;
    default:
      style = "";
  }
  return (
    <div>
        {/* Se le pasa la variable style a classname con el estilo que se quiera usar */}
        <button className={style}> 
          {/* colocas el contenido que quieres que aparezca en el boton. ejemplo "inicia sesión" o "registrar" */}
          {content}
        </button>
    </div>
  )
}
/**
 * Que hacer:
 * nose, no esperaba llegar tan lejos
 */
