import { error } from "itty-router";
import { Exercice } from "@/domain/entities/Exercice";
import { CreateExercice } from "@/application/exercice/CreateExercice";
import { GetExerciceBySlug } from "@/application/exercice/GetExerciceBySlug";

export interface IExerciceController {
  getOne(slug?: string): Promise<unknown>
  create(body: Omit<Exercice, 'id'> | null): Promise<unknown>
}

export const makeExerciceController = (
  getExerciceBySlug: GetExerciceBySlug,
  createExercice: CreateExercice,
) => ({
  async getOne(slug?: string) {
    if (!slug) return error(400, "Missing slug");
    const sheet = await getExerciceBySlug.execute(slug);
    if (!sheet) return error(404, "Sheet not found");
    return sheet;
  },

  async create(body: Omit<Exercice, "id"> | null) {
    if (!body || typeof body !== "object") return error(400, "Missing body");
    return createExercice.execute(body);
  },
});
