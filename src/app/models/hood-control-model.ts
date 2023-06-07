import { Message } from "./message";

export interface HoodControl {
  id: string;
  email: string;
  fans: number;
  lights: number;
  // Micro === System activated (true false not sure)
  micro: number;
  dry_contact: number;
  maint_override: number;
  maint_override_light: number;
  messages: [Message];
}
