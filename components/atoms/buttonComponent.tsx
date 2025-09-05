export default function ButtonComponent(type: Number, content:string) {

  let style;

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
        <button className={style}>
          {content}
        </button>
    </div>
  )
}
//variantes para diferentes tipos de botones con los diferentes tipos de classnames para que sea solo importarlas y cambiarle la funcionalidad
