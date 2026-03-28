import { error } from "itty-router";
import type { GetSheetBySlug } from "@/application/sheet/GetSheetBySlug";
import type { CreateSheet } from "@/application/sheet/CreateSheet";
import type { Sheet } from "@/domain/entities/Sheet";

export interface ISheetController {
  getOne(slug?: string): Promise<unknown>
  create(body: Omit<Sheet, 'id'> | null): Promise<unknown>
}

export const makeSheetController = (
  getSheetBySlug: GetSheetBySlug,
  createSheet: CreateSheet,
) => ({
  async getOne(slug?: string) {
    if (!slug) return error(400, "Missing slug");
    const sheet = await getSheetBySlug.execute(slug);
    if (!sheet) return error(404, "Sheet not found");
    return sheet;
  },

  async create(body: Omit<Sheet, "id"> | null) {
    if (!body || typeof body !== "object") return error(400, "Missing body");
    return createSheet.execute(body);
  },
});
