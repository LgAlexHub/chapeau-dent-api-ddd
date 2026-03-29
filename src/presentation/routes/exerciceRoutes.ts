import type { IRequest, RouterType } from "itty-router";
import { Exercice } from "@/domain/entities/Exercice";
import { IExerciceController } from "../controllers/exerciceController";

type ExerciceInput = Omit<Exercice, "id">;

export const registerExerciceController = (
  router: RouterType,
  ExerciceController: IExerciceController,
) => {
  router.get("/exercices/:slug", (request: IRequest) => {
    const slug = request.params?.slug as string | undefined;
    return ExerciceController.getOne(slug);
  });

  router.post("/exercices", async (request: IRequest) => {
    const body = (await request.json().catch(() => null)) as ExerciceInput | null;
    return ExerciceController.create(body);
  });
};
