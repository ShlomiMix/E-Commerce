
import { useEffect } from "react";
import { useAppSelector } from "../../../Redux/Store";
import { colorsService } from "../../../Services/ColorsService";
import { notify } from "../../../Utils/Notify";
import { ColorCard } from "../../CardArea/ColorCard/ColorCard";



export function Colors(): JSX.Element {
  const colors = useAppSelector((state) => state.colors.entities);

  useEffect(() => {
    const fetchColors = async ():Promise<void> => {
      try {
       await colorsService.getAll();
      } catch (err:any) {
        notify.error(err);
      }
    };

    fetchColors();
  }, []);

  return (
    <div className="flex gap-x-4 gap-y-4 flex-wrap">
      {colors?.map((color) => (
        <ColorCard key={color._id} color={color} />
      ))}
    </div>
  );
}
