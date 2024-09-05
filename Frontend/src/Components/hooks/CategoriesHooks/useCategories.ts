import { useEffect } from "react";
import { useAppSelector } from "../../../Redux/Store";
import { categoriesService } from "../../../Services/CategoriesService";
import { notify } from "../../../Utils/Notify";

export const useCategories = () => {
  const categories = useAppSelector((state) => state?.categories?.entities);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        await categoriesService.getAll();
      } catch (err: any) {
        notify.error(err);
      }
    };
    fetchCategories();
  }, []);

  return {
    categories,
  };
};
