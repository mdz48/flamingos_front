import Table from "../components/organisms/Table";
import MenuContainer from "../components/organisms/MenuContainer";
import { headers, rows} from "../data/data";
import HorizontalMenu from "../components/molecules/HorizontalMenu";


function InventarioMobiliario() {
  
  const verticalMenuItems = ['Salones', 'Mobiliario', 'Insumos', 'Renta de Mobiliario'];
  const horizontalMenuItems = ['Agregar', 'Editar', 'Borrar'];

  return (
    <div className="p-8">
      <div className="flex">
        <div className="w-1/3">
          <MenuContainer items={verticalMenuItems} />
        </div>
        <div className="w-2/3 p-8">
          <div className="mb-4">
            <HorizontalMenu items={horizontalMenuItems} />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-4">Bienvenido a la Administración de Recursos</h1>
            <Table headers={headers} rows={rows} className="mt-8 shadow-md" />
          </div>
        </div>
      </div>
    </div>
  );
 
 
}
export default InventarioMobiliario
