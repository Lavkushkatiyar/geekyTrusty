import { assertEquals } from "@std/assert";

import { describe, it } from "@std/testing/bdd";

import {
  buildScheduleOutput,
  extractCarriages,
  filterCarriagesBeyondMergePoint,
  generateMergedDeparturePlan,
  mergeTrainsCarriages,
  parseCarriages,
  sortCarriagesByDistanceDesc,
} from "../src/train_schedule.js";

const TRAIN_A_ROUTE = Object.freeze({
  CHN: 0,
  SLM: 350,
  BLR: 550,
  KRN: 900,
  HYB: 1200,
  NGP: 1600,
  ITJ: 1900,
  BPL: 2000,
  AGA: 2500,
  NDL: 2700,
});

const MERGED_TRAIN_ROUTE = Object.freeze({
  NGP: 1600,
  ITJ: 1900,
  BPL: 2000,
  AGA: 2500,
  NDL: 2700,
  PTA: 3800,
  NJP: 4200,
  GHY: 4700,
});

describe("train tests", () => {
  describe("Parsing functions", () => {
    it("parseCarriages extracts carriages", () => {
      const result = parseCarriages("TRAIN_A ENGINE A B C");
      assertEquals(result, ["A", "B", "C"]);
    });

    it("extractCarriages extracts both trains", () => {
      const input = "TRAIN_A ENGINE A B\n\nTRAIN_B ENGINE X Y";

      const result = extractCarriages(input);

      assertEquals(result.trainACarriages, ["A", "B"]);
      assertEquals(result.trainBCarriages, ["X", "Y"]);
    });
  });

  it("mergeTrainsCarriages concatenates", () => {
    const merged = mergeTrainsCarriages(["A"], ["B"]);
    assertEquals(merged, ["A", "B"]);
  });

  it("sortCarriagesByDistanceDesc sorts descending", () => {
    const result = sortCarriagesByDistanceDesc(
      ["NGP", "NJP", "BPL"],
      MERGED_TRAIN_ROUTE,
    );

    assertEquals(result, ["NJP", "BPL", "NGP"]);
  });

  it("filterCarriagesBeyondMergePoint removes before HYB", () => {
    const result = filterCarriagesBeyondMergePoint(
      ["CHN", "HYB", "NGP", "ITJ"],
      TRAIN_A_ROUTE,
    );

    assertEquals(result, ["NGP", "ITJ"]);
  });

  it("generateMergedDeparturePlan should build arrivals and departure", () => {
    const result = generateMergedDeparturePlan(
      ["CHN", "HYB", "NGP", "ITJ"],
      ["TVC", "HYB", "NGP", "ITJ"],
    );

    assertEquals(result.trainAArrival, ["NGP", "ITJ"]);
    assertEquals(result.trainBArrival, ["NGP", "ITJ"]);
    assertEquals(result.trainABdeparture, [
      "ITJ",
      "ITJ",
      "NGP",
      "NGP",
    ]);
  });

  it("buildScheduleOutput formats output", () => {
    const output = buildScheduleOutput({
      trainAArrival: ["A"],
      trainBArrival: ["B"],
      trainABdeparture: ["C"],
    });

    const expected = `ARRIVAL TRAIN_A ENGINE A\n
ARRIVAL TRAIN_B ENGINE B\n
DEPARTURE TRAIN_AB ENGINE ENGINE C`;

    assertEquals(output, expected);
  });
});
