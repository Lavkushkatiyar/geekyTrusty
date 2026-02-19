import { assertEquals } from "@std/assert";

import { describe, it } from "@std/testing/bdd";

import {
  buildScheduleOutput,
  extractCarriages,
  filterCarriagesBeyondMergePoint,
  generateMergedDeparturePlan,
  mergeTrainsCarriages,
  parseCarriages,
  routeForMergeTrain,
  routeForTrain_A,
  routeForTrain_B,
  sortCarriagesByDistanceDesc,
} from "../src/train_schedule.js";

describe("train tests", () => {
  describe("Route generators", () => {
    it("routeForTrain_A returns correct distance", () => {
      const route = routeForTrain_A();
      assertEquals(route["HYB"], 1200);
    });

    it("routeForTrain_B returns correct distance", () => {
      const route = routeForTrain_B();
      assertEquals(route["NGP"], 2400);
    });

    it("routeForMergeTrain returns merge route", () => {
      const route = routeForMergeTrain();
      assertEquals(route["NJP"], 4200);
    });
  });

  describe("Parsing functions", () => {
    it("parseCarriages extracts carriages", () => {
      const result = parseCarriages("TRAIN_A ENGINE A B C");
      assertEquals(result, ["A", "B", "C"]);
    });

    it("extractCarriages extracts both trains", () => {
      const input = "TRAIN_A ENGINE A B\nTRAIN_B ENGINE X Y";

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
    const route = routeForMergeTrain();

    const result = sortCarriagesByDistanceDesc(
      ["NGP", "NJP", "BPL"],
      route,
    );

    assertEquals(result, ["NJP", "BPL", "NGP"]);
  });

  it("filterCarriagesBeyondMergePoint removes before HYB", () => {
    const route = routeForTrain_A();

    const result = filterCarriagesBeyondMergePoint(
      ["CHN", "HYB", "NGP", "ITJ"],
      route,
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

    const expected = `ARRIVAL TRAIN_A ENGINE A
ARRIVAL TRAIN_B ENGINE B
DEPARTURE TRAIN_AB ENGINE ENGINE C`;

    assertEquals(output, expected);
  });
});
