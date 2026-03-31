import type { CompasserApi } from "../core/types";
import { createAuthModule } from "./auth";
import { createHealthModule } from "./health";
import { createMemberModule } from "./member";
import { createOrderModule } from "./order";
import { createOwnerModule } from "./owner";
import { createPaymentModule } from "./payment";
import { createRandomBoxModule } from "./random-box";
import { createStoreModule } from "./store";
import { createStoreImageModule } from "./store-image";
import { createStoreManagerModule } from "./store-manager";

export const createCompasserModules = (api: CompasserApi) => ({
  auth: createAuthModule(api),
  health: createHealthModule(api),
  member: createMemberModule(api),
  order: createOrderModule(api),
  owner: createOwnerModule(api),
  payment: createPaymentModule(api),
  randomBox: createRandomBoxModule(api),
  store: createStoreModule(api),
  storeImage: createStoreImageModule(api),
  storeManager: createStoreManagerModule(api),
});