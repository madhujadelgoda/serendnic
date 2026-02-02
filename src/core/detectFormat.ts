import { NICFormat } from "../types";
import { OLD_NIC_REGEX, NEW_NIC_REGEX } from "../utils/regex";

export function detectNICFormat(nic: string): NICFormat {
  const value = nic.trim();

  if (OLD_NIC_REGEX.test(value)) return "OLD";
  if (NEW_NIC_REGEX.test(value)) return "NEW";

  return "UNKNOWN";
}
