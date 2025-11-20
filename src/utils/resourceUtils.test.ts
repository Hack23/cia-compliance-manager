import { describe, expect, it } from "vitest";
import { getPersonnelRequirements } from "./resourceUtils";
import { SecurityLevel } from "../types/cia";

describe("resourceUtils", () => {
  describe("getPersonnelRequirements", () => {
    it("returns correct FTE for None level", () => {
      expect(getPersonnelRequirements("None" as SecurityLevel)).toBe("0.1 FTE");
    });

    it("returns correct FTE for Low level", () => {
      expect(getPersonnelRequirements("Low" as SecurityLevel)).toBe("0.25 FTE");
    });

    it("returns correct FTE for Moderate level", () => {
      expect(getPersonnelRequirements("Moderate" as SecurityLevel)).toBe("0.5 FTE");
    });

    it("returns correct FTE for High level", () => {
      expect(getPersonnelRequirements("High" as SecurityLevel)).toBe("1 FTE");
    });

    it("returns correct FTE for Very High level", () => {
      expect(getPersonnelRequirements("Very High" as SecurityLevel)).toBe("2 FTE");
    });

    it("returns default FTE for undefined or unknown level", () => {
      // Test the fallback branch with || operator
      expect(getPersonnelRequirements("Unknown" as any)).toBe("0.5 FTE");
    });
  });
});
