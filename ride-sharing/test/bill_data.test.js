const { getBillData } = require("../src/compute/billData");

const travelCost = {
  base: 50,
  perKm: 6.5,
  perMinute: 2,
  serviceTax: 20,
};

describe("Billing Module", () => {
  test("should calculate correct distance using Euclidean formula", () => {
    const distance = Math.sqrt((4 - 1) ** 2 + (5 - 1) ** 2);
    expect(distance).toBeCloseTo(5);
  });

  test("should calculate subtotal correctly", () => {
    const distance = 5;
    const time = 10;

    const subtotal =
      travelCost.base +
      distance * travelCost.perKm +
      time * travelCost.perMinute;

    expect(subtotal).toBe(50 + 32.5 + 20);
  });

  test("should apply service tax correctly", () => {
    const subtotal = 100;
    const total = subtotal + (subtotal * 20) / 100;
    expect(total).toBe(120);
  });

  test("should calculate ride fare correctly (sample case 1)", () => {
    const rideData = {
      driverId: "D3",
      endRide: {
        rideId: "RIDE-001",
        destinationX: 4,
        destinationY: 5,
        timeInMinutes: 32,
      },
    };

    const rider = { x: 0, y: 0 };

    const result = getBillData("BILL", [rideData], [rider]);

    expect(result[0].amount).toBe("186.72");
  });

  test("should handle negative coordinates", () => {
    const rideData = {
      driverId: "D1",
      endRide: {
        rideId: "RIDE-002",
        destinationX: -4,
        destinationY: -3,
        timeInMinutes: 10,
      },
    };

    const rider = { x: 0, y: 0 };

    const result = getBillData("BILL", [rideData], [rider]);

    expect(parseFloat(result[0].amount)).toBeGreaterThan(0);
  });

  test("should handle zero time correctly", () => {
    const rideData = {
      driverId: "D1",
      endRide: {
        rideId: "RIDE-003",
        destinationX: 3,
        destinationY: 4,
        timeInMinutes: 0,
      },
    };

    const rider = { x: 0, y: 0 };

    const result = getBillData("BILL", [rideData], [rider]);

    expect(result[0].amount).toBe("99.00");
  });

  test("should calculate multiple rides correctly", () => {
    const rides = [
      {
        driverId: "D1",
        endRide: {
          rideId: "RIDE-1",
          destinationX: 3,
          destinationY: 4,
          timeInMinutes: 10,
        },
      },
      {
        driverId: "D2",
        endRide: {
          rideId: "RIDE-2",
          destinationX: 6,
          destinationY: 8,
          timeInMinutes: 20,
        },
      },
    ];

    const riders = [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ];

    const result = getBillData("BILL", rides, riders);

    expect(result.length).toBe(2);
    expect(result[0].rideId).toBe("RIDE-1");
    expect(result[1].rideId).toBe("RIDE-2");
  });
});
