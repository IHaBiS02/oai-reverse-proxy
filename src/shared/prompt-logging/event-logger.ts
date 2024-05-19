/** Event logging */

import { logger } from "../../logger";
import { EventLogEntry } from ".";
import { config, getEventDatabase } from "../../config";

const log = logger.child({ module: "event-logger" });

export const logEvent = (payload: EventLogEntry) => {
  if (!config.eventLogging) {
    return;
  }
  const db = getEventDatabase();
  db.prepare(
    `
    INSERT INTO events(date, model, family, hashes, userToken, usage) VALUES (:date, :model, :family, :hashes, :userToken, :usage)
  `
  ).run({
    date: new Date().toISOString(),
    model: payload.model,
    family: payload.family,
    hashes: payload.hashes.join(","),
    userToken: payload.userToken,
    usage: payload.usage,
  });
};
