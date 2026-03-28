import { error, json, Router } from "itty-router";
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { setCorsHeaders } from "@/presentation/middlewares/withCors";

// Infrastructure
import { FirestoreSheetRepository } from "@/infrastructure/repositories/FirestoreSheetRepository";
import { FirestoreSequenceRepository } from "@/infrastructure/repositories/FirestoreSequenceRepository";
import { FirestoreExerciceRepository } from "@/infrastructure/repositories/FirestoreExerciceRepository";
// Application — Use Cases
import { GetSheetBySlug } from "@/application/sheet/GetSheetBySlug";
import { CreateSheet } from "@/application/sheet/CreateSheet";
import { GetAllSequences } from "@/application/sequence/GetAllSequences";
import { GetSequenceBySlug } from "@/application/sequence/GetSequenceBySlug";
import { CreateSequence } from "@/application/sequence/CreateSequence";
import { GetExerciceBySlug } from "@/application/exercice/GetExerciceBySlug";
import { CreateExercice } from "@/application/exercice/CreateExercice";
// Presentation
import { makeSheetController } from "@/presentation/controllers/sheetController";
import { makeSequenceController } from "@/presentation/controllers/sequenceController";
import { makeExerciceController } from "@/presentation/controllers/exerciceController";
import { registerSheetRoutes } from "@/presentation/routes/sheetRoutes";
import { registerSequenceRoutes } from "@/presentation/routes/sequenceRoutes";
import { registerExerciceController } from "@/presentation/routes/exerciceRoutes";

// ── Composition ───────────────────────────────────────────────────────────────
const sheetRepo = new FirestoreSheetRepository();
const sequenceRepo = new FirestoreSequenceRepository();
const exerciceRepo = new FirestoreExerciceRepository();

const sheetController = makeSheetController(
  new GetSheetBySlug(sheetRepo),
  new CreateSheet(sheetRepo),
);

const sequenceController = makeSequenceController(
  new GetAllSequences(sequenceRepo),
  new GetSequenceBySlug(sequenceRepo, sheetRepo),
  new CreateSequence(sequenceRepo),
);

const exerciceController = makeExerciceController(
  new GetExerciceBySlug(exerciceRepo),
  new CreateExercice(exerciceRepo)
);

// ── Router ────────────────────────────────────────────────────────────────────
const router = Router({ base: "/api" });
router.get("/ping", () => ({ message: "pong" }));

registerSheetRoutes(router, sheetController);
registerSequenceRoutes(router, sequenceController);
registerExerciceController(router, exerciceController);

router.all("*", () => error(404, "Not found"));

export default async function handler(req: VercelRequest, res: VercelResponse) {
  setCorsHeaders(res);
  const url = `http://localhost${req.url}`;

  const hasBody = ["POST", "PUT", "PATCH"].includes(req.method ?? "");

  const bodyText = hasBody && req.body ? JSON.stringify(req.body) : undefined;

  const webRequest = new Request(url, {
    method: req.method || "GET",
    headers: req.headers as HeadersInit,
    body: bodyText,
  });

  const response = await router.fetch(webRequest).then(json).catch(error);
  const body = await response.json().catch(() => null);
  res.status(response.status).json(body);
}
