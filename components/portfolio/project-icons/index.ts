import type { ComponentType, SVGProps } from "react";
import AreaDoCliente from "./area-do-cliente";
import OvniIcon from "./ovni-icon";
import RastreioIcon from "./rastreio-icon";
import { withBasePath } from "@/lib/base-path";

export const projectIcons: Record<
  string,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  "area-do-cliente": AreaDoCliente,
  ovni: OvniIcon,
  rastreio: RastreioIcon,
};

export const projectImages: Record<string, string> = {
  abelha: withBasePath("/images/sistema-abelha.png"),
};
